(function () {
  'use strict';
  const bundle = window.MOOST_I18N || {};
  const langs = ['en', 'zh', 'ru', 'fr', 'ar'];
  const langSelect = document.getElementById('lang-select');
  let current = 'en';

  function ui(key) {
    const labels = (bundle.ui || {})[current] || {};
    return labels[key] || ((bundle.ui || {}).en || {})[key] || key;
  }

  function applyLang(lang) {
    current = langs.includes(lang) ? lang : 'en';
    document.documentElement.setAttribute('lang', current);
    document.documentElement.setAttribute('dir', current === 'ar' ? 'rtl' : 'ltr');
    if (langSelect) langSelect.value = current;
    const data = bundle[current] || {};
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const v = (current === 'en' || current === 'zh') ? el.getAttribute('data-' + current) : data[key];
      // The values are authored, static markup from the supplied study, not remote/user input.
      if (typeof v === 'string') el.innerHTML = v;
    });
    document.querySelectorAll('[data-ui]').forEach(function (el) {
      el.textContent = ui(el.dataset.ui);
    });
    document.querySelectorAll('[data-ui-aria]').forEach(function (el) {
      el.setAttribute('aria-label', ui(el.dataset.uiAria));
    });
    const copy = document.querySelector('.copy-btn');
    if (copy) copy.textContent = ui('copy');
    document.querySelectorAll('figure.figure').forEach(function (figure) {
      const caption = figure.querySelector('figcaption');
      const image = figure.querySelector('img');
      if (caption && image) image.alt = caption.textContent.trim();
    });
    document.title = document.querySelector('h1').textContent.trim() + ' | MOOST';
    try { localStorage.setItem('moost-lang', current); } catch (e) {}
  }

  if (langSelect) langSelect.addEventListener('change', function () { applyLang(this.value); });
  window.applyLang = applyLang;
  try { applyLang(localStorage.getItem('moost-lang') || 'en'); }
  catch (e) { applyLang('en'); }

  // Copy the DOI-ready BibTeX using Clipboard API, with a simple local-file fallback.
  const copy = document.querySelector('.copy-btn');
  if (copy) {
    copy.addEventListener('click', async function () {
      const pre = document.getElementById('bibtex-code');
      const content = pre ? pre.textContent : '';
      let ok = false;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try { await navigator.clipboard.writeText(content); ok = true; } catch (e) {}
      }
      if (!ok) {
        const ta = document.createElement('textarea');
        ta.value = content;
        ta.setAttribute('readonly', 'readonly');
        ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        ta.remove();
      }
      copy.textContent = ok ? ui('copied') : ui('copyFailed');
      clearTimeout(copy._resetTimeout);
      copy._resetTimeout = setTimeout(() => { copy.textContent = ui('copy'); }, 1900);
    });
  }

  const modal = document.getElementById('figure-dialog');
  const modalImage = document.getElementById('dialog-image');
  const modalCaption = document.getElementById('dialog-caption');
  if (modal && modalImage) {
    document.querySelectorAll('.figure-zoom').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const img = btn.querySelector('img');
        if (!img) return;
        modalImage.src = img.currentSrc || img.src;
        modalImage.alt = img.alt;
        const caption = btn.closest('.figure')?.querySelector('figcaption');
        if (modalCaption) modalCaption.innerHTML = caption ? caption.innerHTML : '';
        if (typeof modal.showModal === 'function') modal.showModal();
      });
    });
    const close = modal.querySelector('.dialog-close');
    if (close) close.addEventListener('click', () => modal.close());
    modal.addEventListener('click', function (event) {
      if (event.target === modal) modal.close();
    });
  }
})();
