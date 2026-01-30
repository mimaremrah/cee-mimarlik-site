/**
 * CEE MİMARLIK - Cross-Browser Polyfills
 * Eski tarayıcılar için uyumluluk sağlar
 * Desteklenen: IE11, eski Safari, eski Firefox
 */

(function() {
    'use strict';

    // =============================================
    // 1. CSS CUSTOM PROPERTIES (CSS Variables) Polyfill
    // IE11 için CSS değişkenlerini destekler
    // =============================================
    
    function loadCSSVarsPolyfill() {
        // IE11 kontrolü
        var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
        
        if (isIE11) {
            var script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2';
            script.onload = function() {
                if (typeof cssVars === 'function') {
                    cssVars({
                        include: 'style,link[rel="stylesheet"]',
                        onlyLegacy: true,
                        watch: true,
                        variables: {
                            '--primary': '#2c2c2c',
                            '--secondary': '#666',
                            '--accent': '#1a1a1a',
                            '--bg': '#fafafa',
                            '--white': '#ffffff',
                            '--border': '#e0e0e0',
                            '--shadow': 'rgba(0, 0, 0, 0.05)',
                            '--icon-bg': '#4a4a4a',
                            '--icon-bg-light': '#6a6a6a'
                        }
                    });
                }
            };
            document.head.appendChild(script);
        }
    }

    // =============================================
    // 2. Object-fit Polyfill
    // IE11 ve eski tarayıcılar için
    // =============================================
    
    function objectFitPolyfill() {
        // object-fit desteği kontrolü
        if ('objectFit' in document.documentElement.style === false) {
            var images = document.querySelectorAll('.hero-slide img, .project-item img, .team-member img');
            
            images.forEach(function(img) {
                var parent = img.parentElement;
                var src = img.src || img.getAttribute('data-src');
                
                if (src) {
                    parent.style.backgroundImage = 'url(' + src + ')';
                    parent.style.backgroundSize = 'cover';
                    parent.style.backgroundPosition = 'center center';
                    parent.style.backgroundRepeat = 'no-repeat';
                    img.style.opacity = '0';
                    img.style.position = 'absolute';
                }
            });
        }
    }

    // =============================================
    // 3. Smooth Scroll Polyfill
    // Eski tarayıcılar için
    // =============================================
    
    function smoothScrollPolyfill() {
        // Native smooth scroll desteği kontrolü
        if (!('scrollBehavior' in document.documentElement.style)) {
            // Anchor link'ler için smooth scroll
            document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
                anchor.addEventListener('click', function(e) {
                    var targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    var target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        smoothScrollTo(target.offsetTop, 800);
                    }
                });
            });
        }
    }
    
    function smoothScrollTo(targetPosition, duration) {
        var startPosition = window.pageYOffset;
        var distance = targetPosition - startPosition;
        var startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            var timeElapsed = currentTime - startTime;
            var run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }

    // =============================================
    // 4. IntersectionObserver Polyfill
    // Lazy loading ve animasyonlar için
    // =============================================
    
    function loadIntersectionObserverPolyfill(callback) {
        if (!('IntersectionObserver' in window)) {
            var script = document.createElement('script');
            script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
            script.onload = callback;
            document.head.appendChild(script);
        } else if (callback) {
            callback();
        }
    }

    // =============================================
    // 5. requestAnimationFrame Polyfill
    // IE9 ve eski tarayıcılar için
    // =============================================
    
    (function() {
        var lastTime = 0;
        var vendors = ['webkit', 'moz', 'ms', 'o'];
        
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                                          window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
    })();

    // =============================================
    // 6. forEach Polyfill
    // NodeList.forEach IE11 için
    // =============================================
    
    if (typeof NodeList !== 'undefined' && NodeList.prototype && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }
    
    if (typeof HTMLCollection !== 'undefined' && HTMLCollection.prototype && !HTMLCollection.prototype.forEach) {
        HTMLCollection.prototype.forEach = Array.prototype.forEach;
    }

    // =============================================
    // 7. Element.closest() Polyfill
    // IE ve eski tarayıcılar için
    // =============================================
    
    if (!Element.prototype.closest) {
        Element.prototype.closest = function(s) {
            var el = this;
            do {
                if (Element.prototype.matches.call(el, s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }

    // =============================================
    // 8. Element.matches() Polyfill
    // =============================================
    
    if (!Element.prototype.matches) {
        Element.prototype.matches = 
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s);
                var i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    // =============================================
    // 9. Array.from() Polyfill
    // =============================================
    
    if (!Array.from) {
        Array.from = function(arrayLike) {
            return Array.prototype.slice.call(arrayLike);
        };
    }

    // =============================================
    // 10. Object.assign() Polyfill
    // =============================================
    
    if (typeof Object.assign !== 'function') {
        Object.assign = function(target) {
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            target = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source != null) {
                    for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }
            }
            return target;
        };
    }

    // =============================================
    // 11. Promise Polyfill (hafif versiyon)
    // IE11 için temel Promise desteği
    // =============================================
    
    if (typeof Promise === 'undefined') {
        // Promise polyfill'i CDN'den yükle
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js';
        document.head.appendChild(script);
    }

    // =============================================
    // 12. fetch() Polyfill
    // IE11 için
    // =============================================
    
    if (typeof fetch === 'undefined') {
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/whatwg-fetch@3.6.2/dist/fetch.umd.js';
        document.head.appendChild(script);
    }

    // =============================================
    // 13. CustomEvent Polyfill
    // IE9-11 için
    // =============================================
    
    (function() {
        if (typeof window.CustomEvent === 'function') return;
        
        function CustomEvent(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: null };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }
        
        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent;
    })();

    // =============================================
    // 14. classList Polyfill
    // IE9 için
    // =============================================
    
    if (!('classList' in document.createElement('_'))) {
        (function(view) {
            if (!('Element' in view)) return;
            
            var classListProp = 'classList';
            var protoProp = 'prototype';
            var elemCtrProto = view.Element[protoProp];
            var objCtr = Object;
            
            function DOMEx(type, message) {
                this.name = type;
                this.code = DOMException[type];
                this.message = message;
            }
            
            // DOMTokenList için basit implementasyon
            // Tam polyfill için: https://github.com/eligrey/classList.js
        })(window);
    }

    // =============================================
    // 15. iOS 100vh Fix
    // iOS Safari'de 100vh sorunu
    // =============================================
    
    function setVhProperty() {
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
        document.documentElement.style.setProperty('--full-height', window.innerHeight + 'px');
    }
    
    setVhProperty();
    window.addEventListener('resize', setVhProperty);
    window.addEventListener('orientationchange', function() {
        setTimeout(setVhProperty, 100);
    });

    // =============================================
    // 16. Passive Event Listener Check
    // Performans için
    // =============================================
    
    var supportsPassive = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassive = true;
                return true;
            }
        });
        window.addEventListener('testPassive', null, opts);
        window.removeEventListener('testPassive', null, opts);
    } catch (e) {}
    
    window.passiveSupported = supportsPassive;

    // =============================================
    // 17. Picture Element Polyfill
    // IE11 ve eski tarayıcılar için
    // =============================================
    
    function loadPicturefill() {
        if (!('HTMLPictureElement' in window)) {
            var script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/picturefill@3.0.3/dist/picturefill.min.js';
            document.head.appendChild(script);
        }
    }

    // =============================================
    // 18. String.includes() Polyfill
    // =============================================
    
    if (!String.prototype.includes) {
        String.prototype.includes = function(search, start) {
            if (typeof start !== 'number') {
                start = 0;
            }
            if (start + search.length > this.length) {
                return false;
            } else {
                return this.indexOf(search, start) !== -1;
            }
        };
    }

    // =============================================
    // 19. Array.includes() Polyfill
    // =============================================
    
    if (!Array.prototype.includes) {
        Array.prototype.includes = function(searchElement, fromIndex) {
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (len === 0) {
                return false;
            }
            var n = fromIndex | 0;
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            while (k < len) {
                if (o[k] === searchElement) {
                    return true;
                }
                k++;
            }
            return false;
        };
    }

    // =============================================
    // 20. Number.isFinite() Polyfill
    // =============================================
    
    if (typeof Number.isFinite !== 'function') {
        Number.isFinite = function(value) {
            return typeof value === 'number' && isFinite(value);
        };
    }

    // =============================================
    // INITIALIZATION
    // =============================================
    
    function init() {
        loadCSSVarsPolyfill();
        loadPicturefill();
        smoothScrollPolyfill();
        
        // DOM yüklendikten sonra
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                objectFitPolyfill();
                loadIntersectionObserverPolyfill();
            });
        } else {
            objectFitPolyfill();
            loadIntersectionObserverPolyfill();
        }
    }
    
    init();
    
    // Global erişim için
    window.CEEPolyfills = {
        smoothScrollTo: smoothScrollTo,
        objectFitPolyfill: objectFitPolyfill,
        setVhProperty: setVhProperty,
        supportsPassive: supportsPassive
    };

})();

// =============================================
// CONSOLE LOG FOR DEBUG
// =============================================
console.log('CEE Mimarlık - Cross-browser polyfills loaded');
