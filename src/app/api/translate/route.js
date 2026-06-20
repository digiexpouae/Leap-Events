import path from "path";
import fs from 'fs/promises'
import os from 'os'
import { NextResponse } from "next/server";
export async function POST(request) {
  // ✅ 1. Validate input FIRST (no try-catch needed)
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const { texts, targetLang, hash, page, forceFresh } = body;
console.log("page",page)
  // Validate required fields

  if (!texts || !targetLang || !page) {
    return NextResponse.json({ 
      success: false, 
      error: 'Missing required fields: texts, targetLang, page' 
    }, { status: 400 });
  }

  // Validate array
  if (!Array.isArray(texts) || texts.length <= 0) {
    return NextResponse.json({ 
      success: false, 
      error: 'texts must be a non-empty array' 
    }, { status: 400 });
  }

  // Validate language
  const validLangs = ['ar', 'en', 'fr', 'es', 'de'];
  if (!validLangs.includes(targetLang)) {
    return NextResponse.json({ 
      success: false, 
      error: `Invalid targetLang. Must be one of: ${validLangs.join(', ')}` 
    }, { status: 400 });
  }

  // Validate count
  if (texts.length > 200) {
    return NextResponse.json({ 
      success: false, 
      error: 'Too many texts (max: 100)' 
    }, { status: 400 });
  }

  // ✅ 2. Single try-catch for all file operations
  try {
    const textsArray = [...texts, "HOME", "ABOUT", "SERVICES", "WORK", "CONTACT"];
    const filepath = path.join(process.cwd(), "public", "translations", `${page}_${targetLang}.json`);

    // Let ENOENT error bubble up to outer catch
    const readfile = await fs.readFile(filepath, "utf-8");
    const fileData = JSON.parse(readfile);  // Let JSON.parse error bubble up

    const existingTranslationsArray = Object.keys(fileData.translations || {});

    const newKeys = textsArray.filter(elem => !existingTranslationsArray.includes(elem));
    const removedKeys = existingTranslationsArray.filter(elem => !textsArray.includes(elem));
console.log("fileData",fileData)
    if (newKeys.length > 0) {
      newKeys.forEach(key => fileData.translations[key] = "");
    }

    if (removedKeys.length > 0) {
      removedKeys.forEach(key => delete fileData.translations[key]);
    }
console.log("newkeys",newKeys);

    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "my-temp"));
    const tempFile = path.join(tempDir, "temp.json");

    await fs.writeFile(tempFile, JSON.stringify(fileData));
    await fs.copyFile(tempFile, filepath);

    // Cleanup (ignore errors if cleanup fails)
    await fs.unlink(tempFile).catch(() => {});
    await fs.rm(tempDir, { recursive: true, force: true }).catch(() => {});

    const parseData = JSON.parse(await fs.readFile(filepath, 'utf-8'));

    return NextResponse.json({
      success: true,
      alltranslation: parseData
    });

  } catch (err) {
    // ✅ One catch for everything: file not found, JSON parse error, write error, etc.
    console.error('❌ Translation error:', err);
    
    // Return 404 for file not found
    if (err.code === 'ENOENT') {
      return NextResponse.json({ 
        success: false, 
        error: 'Translation file not found' 
      }, { status: 404 });
    }

    // Everything else → 500
    return NextResponse.json({ 
      success: false, 
      error: err.message 
    }, { status: 500 });
  }
}