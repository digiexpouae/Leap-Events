// app/api/translate/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  const { texts, targetLang, hash, page, indexMap } = await request.json();

  try {
    const textsArray = Array.isArray(texts)
      ? texts
      : texts.split(',').map(t => t.trim()).filter(Boolean);

    // ✅ Guard: block if too many texts
    const MAX_TEXTS = 70;
    if (textsArray.length > MAX_TEXTS) {
      console.warn(`⛔ Blocked: ${textsArray.length} texts exceeds limit of ${MAX_TEXTS}`);
      return NextResponse.json(
        { success: false, error: `Too many texts: ${textsArray.length}. Max allowed is ${MAX_TEXTS}.` },
        { status: 400 }
      );
    }

    // ✅ Guard: block if too many characters per request
    const MAX_CHARS = 2000;
    const totalChars = textsArray.join('').length;
    if (totalChars > MAX_CHARS) {
      console.warn(`⛔ Blocked: ${totalChars} characters exceeds limit of ${MAX_CHARS}`);
      return NextResponse.json(
        { success: false, error: `Too many characters: ${totalChars}. Max allowed is ${MAX_CHARS}.` },
        { status: 400 }
      );
    }

    // ✅ Guard: block if monthly usage limit exceeded
    const MONTHLY_CHAR_LIMIT = 450000;
    const usageFile = path.join(process.cwd(), 'translation_usage.json');

    let usage = { month: new Date().getMonth(), chars: 0 };
    if (fs.existsSync(usageFile)) {
      usage = JSON.parse(fs.readFileSync(usageFile, 'utf-8'));
      if (usage.month !== new Date().getMonth()) {
        usage = { month: new Date().getMonth(), chars: 0 }; // reset every month
      }
    }

    if (usage.chars + totalChars > MONTHLY_CHAR_LIMIT) {
      console.warn(`⛔ Monthly limit reached: ${usage.chars}/${MONTHLY_CHAR_LIMIT} chars used`);
      return NextResponse.json(
        { success: false, error: `Monthly translation limit reached. Used: ${usage.chars}/${MONTHLY_CHAR_LIMIT} chars` },
        { status: 429 }
      );
    }

    console.log(`📊 Translating ${textsArray.length} texts (${totalChars} chars) in ONE request`);
    console.log(`📊 Monthly usage: ${usage.chars + totalChars}/${MONTHLY_CHAR_LIMIT} chars`);

    // ✅ Send ALL texts in single API call
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_CLOUD_TRANSLATION_API}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: textsArray,   // ← fixed: was `texts`, now `textsArray`
          source: 'en',
          target: targetLang,
          format: 'text'
        })
      }
    );

    const data = await response.json();
    console.log('🔍 Google response:', JSON.stringify(data)); // ← debug log

    if (data?.error?.code === 403) {
      console.log('⚠️ Rate limit — waiting 5s and retrying...');
      await delay(5000);

      // retry once
      const retry = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_CLOUD_TRANSLATION_API}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: textsArray,  // ← fixed here too
            source: 'en',
            target: targetLang,
            format: 'text'
          })
        }
      );
      const retryData = await retry.json();
      if (!retryData.data) {
        throw new Error('Google Translate error: ' + JSON.stringify(retryData));
      }
      data.data = retryData.data;
    }

    if (!data.data) {
      throw new Error('Google Translate error: ' + JSON.stringify(data));
    }

    const allTranslations = data.data.translations.map(
      t => t.translatedText
    );

    console.log(`✅ Got ${allTranslations.length} translations`);

    // ✅ Update monthly usage after successful translation
    usage.chars += totalChars;
    fs.writeFileSync(usageFile, JSON.stringify(usage, null, 2));
    console.log(`✅ Monthly usage updated: ${usage.chars}/${MONTHLY_CHAR_LIMIT} chars`);

    // Save JSON cache
    const folder = path.join(process.cwd(), 'public/translations');
    fs.mkdirSync(folder, { recursive: true });

    const filePath = path.join(folder, `${page}_${targetLang}.json`);
    fs.writeFileSync(filePath, JSON.stringify({
      hash,
      page,
      lang: targetLang,
      savedAt: new Date().toISOString(),
      indexMap,
      translations: allTranslations
    }, null, 2));

    console.log(`✅ Saved: ${page}_${targetLang}.json`);

    return NextResponse.json({
      success: true,
      translations: allTranslations
    });

  } catch (err) {
    console.error('❌ Translation error:', err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}