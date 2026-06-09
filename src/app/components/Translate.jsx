'use client'
import { useEffect, useRef } from "react";

export default function TranslateButtons() {
  const originalTextsRef = useRef(null);

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

  async function generateHash(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function getPageCache(page, targetLang) {
    const jsonPath = `/translations/${page}_${targetLang}.json`;
    try {
      const response = await fetch(jsonPath);
      if (!response.ok) return null;
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  function getLeafElements() {
    const all = Array.from(
      document.querySelectorAll('h1,h2,h3,h4,p,span,button,a,li,label,td,th')
    );
    return all.filter(el => {
      const hasChildElements = Array.from(el.children).some(
        child => child.innerText?.trim()
      );
      return !hasChildElements && el.innerText.trim() !== '';
    });
  }

  // ✅ Tag every element with a stable ID on first run
let idCounter = 0; // put this at module scope, outside the component

function tagElements(elements) {
  elements.forEach((el) => {
    if (!el.dataset.translateId) {
      el.dataset.translateId = `t${idCounter++}`;
    }
  });
}

  function applyTranslations(translations, indexMap, lang) {
    indexMap.forEach(({ translateId, transIndex }) => {
      console.log("transIndex",transIndex)
      // ✅ Find element by its stable ID — not array position
      const el = document.querySelector(`[data-translate-id="${translateId}"]`);
      console.log("el",el)
      console.log("translations[transIndex])",translations[transIndex])
     console.log("el && translations[transIndex]",el && translations[transIndex])
    
     if (el && translations[transIndex]) {
        console.log(`id[${translateId}] "${el.innerText}" → "${translations[transIndex]}"`);
        el.innerText = translations[transIndex];
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

  function restoreOriginal() {
    if (!originalTextsRef.current) {
      console.log('⚠️ No original texts saved');
      return;
    }

    // ✅ Restore by stable ID — not array index
    originalTextsRef.current.forEach(({ translateId, text }) => {
      const el = document.querySelector(`[data-translate-id="${translateId}"]`);
      if (el) el.innerText = text;
    });

    document.body.style.direction = 'ltr';
    document.body.style.textAlign = 'left';
    console.log('✅ Restored to original English');
  }

  async function translatePage(targetLang = 'ar') {
    await new Promise(resolve => setTimeout(resolve, 300));
// took the elements
    const elements = getLeafElements();

    // ✅ Tag elements with stable IDs
    tagElements(elements);

    // ✅ Save originals by stable ID — not array index
    if (!originalTextsRef.current) {
      originalTextsRef.current = elements.map(el => ({
        translateId: el.dataset.translateId,
        text: el.innerText
      }));
    }

    if (targetLang === 'en') {
      restoreOriginal();
      return;
    }

    // ✅ Build indexMap using stable translateId
    const textsToTranslate = [];
    const indexMap = [];
    const seen = new Map();

    elements.forEach((el) => {
      const text = el.innerText.trim();
      const translateId = el.dataset.translateId;

      const shouldTranslate =
        text.length > 1 &&
        isNaN(text) &&
        !/^[^a-zA-Z]*$/.test(text);

      if (!shouldTranslate) return;

      if (seen.has(text)) {
        indexMap.push({ translateId, transIndex: seen.get(text)});
      } else {
        const transIndex = textsToTranslate.length;
        seen.set(text, transIndex);
        textsToTranslate.push(text);
        console.log("trans index",transIndex)
        indexMap.push({ translateId, transIndex });
      }
    });

    const page = getPageKey();
    const currentHash = await generateHash(textsToTranslate.join('|'));
    const cached = await getPageCache(page, targetLang);

    if (cached) {
      console.log('✅ Cache hit — 0 API calls');
      // ✅ cached.indexMap has stable translateIds — safe to use!
      applyTranslations(cached.translations, indexMap, targetLang);
      console.log("cached.translations",cached.translations)
      return;
    }
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texts: textsToTranslate,
          targetLang,
          hash: currentHash,
          indexMap,
          page
        })
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error); 
      applyTranslations(data.translations, indexMap, targetLang);

    } catch (err) {
      console.error('❌ Translation failed', err);
    }
  }

  return (
    <div className=" flex flex-col  py-4 md:py-0 ">
      <button onClick={() => translatePage('ar')} className="cursor-pointer md:text-(--color-primary) font-semibold">
        Arabic
      </button>
      <button onClick={() => translatePage('en')} className="cursor-pointer md:text-(--color-primary)  font-semibold">
        English
      </button>
    </div>
  );
}