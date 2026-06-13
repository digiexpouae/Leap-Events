'use client'
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useDirection } from "./ContextProvider";
// 📑 Helper to tag elements with their original raw English innerHTML source string.
// This attribute remains completely constant and safe from Google Translate mutation.
function tagElements(elements) {
  elements.forEach((el) => {
    if (!el.dataset.i18nSource) {
      // Clean leading/trailing spaces but preserve internal <br /> or strong formatting tags
      el.dataset.i18nSource = el.innerHTML.trim();
    }
  });
}

export default function TranslateButtons({isMenuOpen }) {
  const originalTextsRef = useRef(null);
  const [currentLang, setCurrentLang] = useState('en');
  const pathname = usePathname(); // 🔹 fires on every navigation
const {updateDir} =useDirection() 
  function getPageKey() {
    const path = window.location.pathname;
    if (path === '/' || path === '') return 'index';
    return path
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

  // Optimized leaf-node filter to target elements while allowing innocent inline styling tags (<br/>, <strong>, etc)
  function getLeafElements() {
    const all = Array.from(
      document.querySelectorAll('h1,h2,h3,h4,p,span,button,a,li,label,td,th,div,nav')
    );
    return all.filter(el => {
      // Discard container components that hold large layout sections block structural elements
      const hasBlockChildren = Array.from(el.children).some(
        child => !['BR', , 'STRONG', 'EM', 'B', 'I'].includes(child.tagName)
      );
      return !hasBlockChildren && el.innerHTML.trim() !== '';
    });
  }

  // 🛡️ Safe Dictionary-based Lookup Strategy
  function applyTranslations(translationsPayload, lang) {
    const elements = document.querySelectorAll("[data-i18n-source]");

    elements.forEach((el) => {
      const sourceKey = el.dataset.i18nSource;

      // Direct dynamic lookup by key avoids indexing misalignments completely!
      if (sourceKey && translationsPayload[sourceKey]) {
        // innerHTML preserves layout breaks and text stylings perfectly
        el.innerHTML = translationsPayload[sourceKey];
        console.log("   el.innerHTML",   el.innerHTML," translationsPayload[sourceKey]", translationsPayload[sourceKey])
      }
    });

const target= lang=== "ar"? "rtl":"ltr"
console.log("target",target)
document.body.setAttribute('dir', target);
const newDir=target
updateDir(newDir)
  }

  function restoreOriginal() {
    const elements = document.querySelectorAll("[data-i18n-source]");
    elements.forEach((el) => {
      if (el.dataset.i18nSource) {
        el.innerHTML = el.dataset.i18nSource; // Revert cleanly using immutable saved data source
      }
    });

  document.body.setAttribute('dir', 'ltr');
  updateDir("ltr")
    document.body.style.textAlign = 'left';
    localStorage.setItem('preferredLang', 'en'); 
    setCurrentLang('en');
  }

  async function translatePage(targetLang = 'en') {
    localStorage.setItem('preferredLang', targetLang); 
    setCurrentLang(targetLang);

    await new Promise(resolve => setTimeout(resolve, 300));
    
    const elements = getLeafElements();
    tagElements(elements);

    if (targetLang === 'en') {
      restoreOriginal();
      return;
    }

    const textsToTranslate = [];
    const seen = new Set();

    // Collect array text values using unique set rules
    elements.forEach((el) => {
      const sourceText = el.dataset.i18nSource;
      const cleanCheckText = el.innerText.trim();
      
      const shouldTranslate =
        cleanCheckText.length > 1 && isNaN(cleanCheckText) && !/^[^a-zA-Z]*$/.test(cleanCheckText);
      if (!shouldTranslate) return;

      if (!seen.has(sourceText)) {
        seen.add(sourceText);
        textsToTranslate.push(sourceText); // We pass innerHTML directly so Google handles <br /> tags
      }
    });

    const page = getPageKey();
    const currentHash = await generateHash(textsToTranslate.join('|'));
    const cached = await getPageCache(page, targetLang);

    // 🏎️ Handling the Cached JSON File
    if (cached) {
      // If your JSON file cache already provides an exact dictionary map: { "Hello World": "مرحبا بالعالم" }
      // Use it directly. If it provides a flat array, map it down first:
      let lookupMap;
      if (Array.isArray(cached.translations)) {
        lookupMap = {};
        textsToTranslate.forEach((sourceText, index) => {
          console.log("sourceText",sourceText,index)
          lookupMap[sourceText] = cached.translations[index];
        });
      }
      else {
  lookupMap = cached.translations || {};   // new keyed format
}
      
      applyTranslations(lookupMap, targetLang);
      return;
    }

    // 🌐 Active Live Google API Gateway Fetch Requests Fallback
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // NOTE: Ensure your /api/translate route config specifies mimeType: "text/html" 
        body: JSON.stringify({ texts: textsToTranslate, targetLang, hash: currentHash, page })
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      
      // Zipping raw array strings output back from Google into an aligned object dictionary map
      const customTranslationsPayload = {};
      textsToTranslate.forEach((sourceText, index) => {
        customTranslationsPayload[sourceText] = data.translations[index];
      });

      applyTranslations(customTranslationsPayload, targetLang);
    } catch (err) {
      console.error('Translation failed', err);
    }
  }

  // 🔹 Monitor routing hooks or component mounts to safely fire layout shifts
  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    setCurrentLang(savedLang);

    if (savedLang !== 'en') {
      translatePage(savedLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname,isMenuOpen]); // 🔹 Fires seamlessly on navigation layout refreshes

  return (
    <div className="flex flex-col py-4 md:py-0">
      <button onClick={() => translatePage('ar')} className="cursor-pointer"
        style={{ padding: "5px 14px", borderRadius: "999px", fontSize: "13px",
          fontWeight: 500, border: "none",
          background: currentLang === 'ar' ? "#5686DA" : "transparent",
          color: currentLang === 'ar' ? "#fff" : "#5686DA", transition: "all 0.2s" }}>
        Arabic
      </button>
      <button onClick={() => translatePage('en')} className="cursor-pointer"
        style={{ padding: "5px 14px", borderRadius: "999px", fontSize: "13px",
          fontWeight: 500, border: "none",
          background: currentLang === 'en' ? "#5686DA" : "transparent",
          color: currentLang === 'en' ? "#fff" : "#5686DA", transition: "all 0.2s" }}>
        English
      </button>
    </div>
  );
}
