/* ═══════════════════════════════════════════════════════════════
   CEE MİMARLIK - ORTAK DİL DEĞİŞTİRME SİSTEMİ (lang-switcher.js)
   Alt sayfalar için: ekip, hakkımızda, hizmetler, projeler, iletişim, gizlilik
   ═══════════════════════════════════════════════════════════════ */

(function() {
    'use strict';

    const LANGS = {
        tr: { flag: '🇹🇷', name: 'Türkçe', dir: 'ltr' },
        en: { flag: '🇬🇧', name: 'English', dir: 'ltr' },
        de: { flag: '🇩🇪', name: 'Deutsch', dir: 'ltr' },
        ru: { flag: '🇷🇺', name: 'Русский', dir: 'ltr' },
        ar: { flag: '🇸🇦', name: 'العربية', dir: 'rtl' },
        fa: { flag: '🇮🇷', name: 'فارسی', dir: 'rtl' },
        es: { flag: '🇪🇸', name: 'Español', dir: 'ltr' }
    };

    // Nav çevirileri
    const NAV_TRANSLATIONS = {
        'Ana Sayfa':  { en: 'Home', de: 'Startseite', ru: 'Главная', ar: 'الرئيسية', fa: 'صفحه اصلی', es: 'Inicio' },
        'Projeler':   { en: 'Projects', de: 'Projekte', ru: 'Проекты', ar: 'المشاريع', fa: 'پروژه‌ها', es: 'Proyectos' },
        'Hizmetler':  { en: 'Services', de: 'Dienstleistungen', ru: 'Услуги', ar: 'الخدمات', fa: 'خدمات', es: 'Servicios' },
        'Hakkımızda': { en: 'About Us', de: 'Über Uns', ru: 'О Нас', ar: 'من نحن', fa: 'درباره ما', es: 'Nosotros' },
        'Ekip':       { en: 'Team', de: 'Team', ru: 'Команда', ar: 'الفريق', fa: 'تیم', es: 'Equipo' },
        'İletişim':   { en: 'Contact', de: 'Kontakt', ru: 'Контакт', ar: 'اتصل بنا', fa: 'تماس', es: 'Contacto' },
        'Gizlilik':   { en: 'Privacy', de: 'Datenschutz', ru: 'Конфиденциальность', ar: 'الخصوصية', fa: 'حریم خصوصی', es: 'Privacidad' }
    };

    let currentLang = localStorage.getItem('cee_public_lang') || 'tr';

    // Sayfa yüklenmeden RTL ayarla
    if (LANGS[currentLang] && LANGS[currentLang].dir === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
    }
    document.documentElement.setAttribute('lang', currentLang);

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('cee_public_lang', lang);

        // Dir & lang
        const dir = LANGS[lang] ? LANGS[lang].dir : 'ltr';
        document.documentElement.setAttribute('dir', dir);
        document.documentElement.setAttribute('lang', lang);

        // data-* çevirileri
        document.querySelectorAll('[data-tr]').forEach(el => {
            const text = el.getAttribute('data-' + lang);
            if (text) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = text;
                } else {
                    el.textContent = text;
                }
            }
        });

        // Nav linklerini çevir
        document.querySelectorAll('#mainNav a, .mobile-nav a').forEach(a => {
            const trText = Object.keys(NAV_TRANSLATIONS).find(key => {
                const txt = a.textContent.trim();
                if (txt === key) return true;
                // Diğer dillerde de eşle
                const trans = NAV_TRANSLATIONS[key];
                return Object.values(trans).includes(txt);
            });
            if (trText) {
                if (lang === 'tr') {
                    a.textContent = trText;
                } else if (NAV_TRANSLATIONS[trText][lang]) {
                    a.textContent = NAV_TRANSLATIONS[trText][lang];
                }
            }
        });

        // Dil butonunu güncelle
        const langBtn = document.getElementById('langBtn');
        if (langBtn) {
            langBtn.textContent = LANGS[lang] ? LANGS[lang].flag + ' ' + lang.toUpperCase() + ' ▼' : lang;
        }

        // Dropdown'ı kapat
        const dd = document.getElementById('langDropdown');
        if (dd) dd.style.display = 'none';
    }

    function createLangSelector() {
        // header-actions'a dil butonu ekle
        const headerActions = document.querySelector('.header-actions');
        if (!headerActions) return;

        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'position:relative;display:inline-block;';

        const btn = document.createElement('button');
        btn.id = 'langBtn';
        btn.style.cssText = 'background:none;border:1px solid rgba(255,255,255,0.3);color:inherit;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:13px;letter-spacing:1px;transition:all 0.3s;';
        const langInfo = LANGS[currentLang];
        btn.textContent = langInfo ? langInfo.flag + ' ' + currentLang.toUpperCase() + ' ▼' : currentLang;
        btn.onclick = function(e) {
            e.stopPropagation();
            const dd = document.getElementById('langDropdown');
            dd.style.display = dd.style.display === 'block' ? 'none' : 'block';
        };

        const dropdown = document.createElement('div');
        dropdown.id = 'langDropdown';
        dropdown.style.cssText = 'display:none;position:absolute;top:110%;right:0;background:#fff;border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.15);z-index:9999;min-width:160px;overflow:hidden;';

        Object.keys(LANGS).forEach(code => {
            const item = document.createElement('div');
            item.style.cssText = 'padding:10px 16px;cursor:pointer;display:flex;align-items:center;gap:10px;color:#333;font-size:14px;transition:background 0.2s;';
            item.innerHTML = '<span style="font-size:20px;">' + LANGS[code].flag + '</span><span>' + LANGS[code].name + '</span>';
            if (code === currentLang) {
                item.style.background = '#f0f0f0';
                item.style.fontWeight = '600';
            }
            item.onmouseenter = function() { this.style.background = '#f5f5f5'; };
            item.onmouseleave = function() { this.style.background = code === currentLang ? '#f0f0f0' : ''; };
            item.onclick = function() { applyLanguage(code); };
            dropdown.appendChild(item);
        });

        wrapper.appendChild(btn);
        wrapper.appendChild(dropdown);

        // Dark toggle'dan önce ekle
        const darkToggle = headerActions.querySelector('.dark-toggle');
        if (darkToggle) {
            headerActions.insertBefore(wrapper, darkToggle);
        } else {
            headerActions.prepend(wrapper);
        }

        // Dışarı tıklayınca kapat
        document.addEventListener('click', function() {
            dropdown.style.display = 'none';
        });
    }

    // RTL CSS ekle
    function addRTLStyles() {
        const style = document.createElement('style');
        style.textContent = `
            html[dir="rtl"] { direction: rtl; }
            html[dir="rtl"] body { text-align: right; }
            html[dir="rtl"] header .header-content { flex-direction: row-reverse; }
            html[dir="rtl"] #mainNav { flex-direction: row-reverse; }
            html[dir="rtl"] .header-actions { flex-direction: row-reverse; }
            html[dir="rtl"] footer { direction: rtl; text-align: right; }
            html[dir="rtl"] .footer-content { direction: rtl; }
        `;
        document.head.appendChild(style);
    }

    // Footer copyright çevirisi
    function translateFooter() {
        const footerTexts = document.querySelectorAll('footer span, footer p');
        footerTexts.forEach(el => {
            if (el.textContent.includes('Tüm hakları saklıdır') || el.textContent.includes('All rights reserved')) {
                const translations = {
                    tr: 'Tüm hakları saklıdır',
                    en: 'All rights reserved',
                    de: 'Alle Rechte vorbehalten',
                    ru: 'Все права защищены',
                    ar: 'جميع الحقوق محفوظة',
                    fa: 'تمامی حقوق محفوظ است',
                    es: 'Todos los derechos reservados'
                };
                el.textContent = translations[currentLang] || translations.tr;
            }
        });
    }

    // Init
    document.addEventListener('DOMContentLoaded', function() {
        addRTLStyles();
        createLangSelector();
        applyLanguage(currentLang);
        translateFooter();
    });

    // Global erişim
    window.switchLang = applyLanguage;
    window.currentLang = currentLang;

})();
