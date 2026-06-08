'use client'

export default function TranslateButtons() {

  // ─── Store original english text once ──────────────────
  let originalTexts = null;

  // ─── Helper: Get Page Key ───────────────────────────────
  function getPageKey() {
    const pathname = window.location.pathname;
    if (pathname === '/' || pathname === '') return 'index';
    return pathname
      .replace(/^\//, '')
      .replace(/\/$/, '')
      .replace('.html', '')
      .replace('.jsx', '')
      .replace(/\//g, '_');
  }

  // ─── Helper: Generate Hash ──────────────────────────────
  async function generateHash(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ─── Helper: Get JSON Cache ─────────────────────────────
  async function getPageCache(page, targetLang) {
    const jsonPath = `/translations/${page}_${targetLang}.json`;
    console.log(`🔍 Checking cache: ${jsonPath}`);

    try {
      const response = await fetch(jsonPath);
      if (!response.ok) {
        console.log(`🆕 No cache: ${jsonPath}`);
        return null;
      }
      const cached = await response.json();
      console.log(`📦 Cache found: ${jsonPath}`);
      return cached;

    } catch (e) {
      console.log(`⚠️ Cache fetch failed: ${jsonPath}`);
      return null;
    }
  }

  // ─── Helper: Apply Translations ─────────────────────────
  function applyTranslations(elements, translations, indexMap, lang) {
    translations.forEach((translation, i) => {
      const originalIndex = indexMap[i];
      if (elements[originalIndex]) {
        elements[originalIndex].innerText = translation;
      }
    });

    if (lang === 'ar') {
      document.body.style.direction = 'rtl';
      document.body.style.textAlign = 'right';
    } else {
      document.body.style.direction = 'ltr';
      document.body.style.textAlign = 'left';
    }
  }

  // ─── Helper: Restore Original English ───────────────────
  function restoreOriginal(elements) {
    if (!originalTexts) {
      console.log('⚠️ No original texts saved');
      return;
    }

    // Restore every element back to original
    elements.forEach((el, i) => {
      if (originalTexts[i]) {
        el.innerText = originalTexts[i];
      }
    });

    // Back to LTR
    document.body.style.direction = 'ltr';
    document.body.style.textAlign = 'left';

    console.log('✅ Restored to original English');
  }

  // ─── Main: Translate Page ────────────────────────────────
async function translatePage(targetLang = 'ar') {

  // STEP 1: Get all elements
  const elements = Array.from(
    document.querySelectorAll('h1,h2,h3,h4,p,span,button,a,li,label,td,th')
  ).filter(el => el.innerText.trim() !== '');

  // STEP 2: Save original texts
  if (!originalTexts) {
    originalTexts = elements.map(el => el.innerText);
  }

  // STEP 3: English → restore original
  if (targetLang === 'en') {
    restoreOriginal(elements);
    return;
  }

  // STEP 4: Build deduped texts + indexMap
  const textsToTranslate = [];
  const indexMap = [];
  const seen = new Map();

  elements.forEach((el, i) => {
    const text = el.innerText.trim();

    const shouldTranslate =
      text.length > 1 &&
      isNaN(text) &&
      !/^[^a-zA-Z]*$/.test(text);

    if (!shouldTranslate) return;

    if (seen.has(text)) {
      // ♻️ Reuse existing translation
      indexMap.push({
        elIndex: i,
        transIndex: seen.get(text)
      });
    } else {
      // 🆕 New unique text
      const transIndex = textsToTranslate.length;
      seen.set(text, transIndex);
      textsToTranslate.push(text);
      indexMap.push({
        elIndex: i,
        transIndex
      });
    }
  });

  // STEP 5: Generate hash
  const currentHash = await generateHash(textsToTranslate.join('|'));
  const page = getPageKey();

  // STEP 6: Check JSON cache
  const cached = await getPageCache(page, targetLang);

  if (cached && cached.hash === currentHash) {
    console.log('✅ Cache hit — 0 API calls');
    applyTranslations(elements, cached.translations, cached.indexMap, targetLang);
    return;
  }

  // STEP 7: Call backend
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        texts: textsToTranslate, // ← deduped ✅
        targetLang,
        hash: currentHash,
        indexMap,
        page
      })
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.error);

    applyTranslations(elements, data.translations, indexMap, targetLang);

  } catch (err) {
    console.error('❌ Translation failed', err);
  }
}
  return (
    <div className="bg-red-500">
      <button onClick={() => translatePage('ar')} className="cursor-pointer">
        🌐 العربية
      </button>
      <button onClick={() => translatePage('en')} className="cursor-pointer">
        English
      </button>
    </div>
  );
}