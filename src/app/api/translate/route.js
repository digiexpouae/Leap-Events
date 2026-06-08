// app/api/translate/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  const { texts, targetLang, hash, page, indexMap } = await request.json();

  try {
    console.log(`📊 Translating ${texts.length} texts in ONE request`);

    // ✅ Send ALL texts in single API call
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_CLOUD_TRANSLATION_API}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: texts,        // ← all 53 at once
          source: 'en',
          target: targetLang,
          format: 'text'
        })
      }
    );

    const data = await response.json();

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
            q: texts,
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