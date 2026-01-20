# 🏗️ CEE MİMARLIK - EKSİK DOSYALAR KURULUM REHBERİ

## 📋 OLUŞTURULAN DOSYALAR

### Favicon Dosyaları
| Dosya | Boyut | Açıklama |
|-------|-------|----------|
| `favicon.ico` | 32x32 + 16x16 | Ana favicon |
| `favicon.svg` | Vektör | Kaynak SVG |
| `apple-touch-icon.png` | 180x180 | iOS cihazlar |
| `icon-192.png` | 192x192 | PWA küçük ikon |
| `icon-512.png` | 512x512 | PWA büyük ikon |

### Logo Dosyaları
| Dosya | Boyut | Kullanım |
|-------|-------|----------|
| `logo.png` | 400x100 | Standart logo |
| `logo@2x.png` | 800x200 | Retina ekranlar |
| `logo-small.png` | 200x50 | Header |
| `logo.svg` | Vektör | Kaynak |

### Open Graph Görselleri
| Dosya | Boyut | Kullanım |
|-------|-------|----------|
| `og-image.jpg` | 1200x630 | Facebook/LinkedIn |
| `og-image.png` | 1200x630 | Twitter |
| `og-image.svg` | Vektör | Kaynak |

### SEO Dosyaları
| Dosya | Açıklama |
|-------|----------|
| `sitemap.xml` | Güncellenmiş site haritası |
| `robots.txt` | Güncellenmiş bot yönergeleri |

### Kod Düzeltmeleri
| Dosya | Düzeltme |
|-------|----------|
| `index-fixed.html` | Schema.org çift postalCode düzeltildi, Preload resources eklendi |

---

## 🚀 KURULUM ADIMLARI

### 1. Dosyaları Proje Klasörüne Kopyala
```bash
# Root klasöre kopyalanacak dosyalar:
favicon.ico
apple-touch-icon.png
logo.png
logo@2x.png
logo-small.png
og-image.jpg
og-image.png
icon-192.png
icon-512.png
sitemap.xml
robots.txt
```

### 2. index.html Değişikliklerini Uygula
`index-fixed.html` dosyasını `index.html` ile değiştirin veya aşağıdaki değişiklikleri manuel yapın:

**Değişiklik 1: Schema.org Çift postalCode (Satır ~93-101)**
```json
// ESKİ (YANLIŞ)
"postalCode": "59860",
"addressRegion": "Tekirdağ",
"postalCode": "59860",  // ← ÇIFT!

// YENİ (DOĞRU)
"addressRegion": "Tekirdağ",
"postalCode": "59860",  // ← TEK
```

**Değişiklik 2: Preload Resources (Satır ~80)**
```html
<!-- Preload Critical Resources -->
<link rel="preload" href="logo.png" as="image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://www.google-analytics.com">
<link rel="dns-prefetch" href="https://firebasestorage.googleapis.com">
```

### 3. Google Analytics ID Güncelle (Satır ~128, 133)
```javascript
// PLACEHOLDER → GERÇEK ID
'G-XXXXXXXXXX' → 'G-YOUR_REAL_ID'
```

### 4. Facebook Pixel ID Güncelle (Satır ~157, 160)
```javascript
// PLACEHOLDER → GERÇEK ID
'YOUR_PIXEL_ID' → 'YOUR_REAL_PIXEL_ID'
```

---

## ✅ YAPILDI (ZATEN MEVCUT)
- ✅ Cookie Consent script (satır 8995)
- ✅ Service Worker kaydı (satır 8997-9003)
- ✅ SEO Meta etiketleri
- ✅ Open Graph etiketleri
- ✅ CSP güvenlik başlıkları
- ✅ PWA manifest.json

---

## 📊 DOĞRULAMA KONTROL LİSTESİ

Deploy sonrası kontrol edin:

- [ ] `https://www.ceemimarlik.com/favicon.ico` açılıyor mu?
- [ ] `https://www.ceemimarlik.com/robots.txt` doğru mu?
- [ ] `https://www.ceemimarlik.com/sitemap.xml` geçerli mi?
- [ ] Facebook Debugger'da og:image görünüyor mu?
- [ ] Google Search Console'da hata yok mu?
- [ ] Lighthouse SEO skoru 90+ mı?

---

## 🔧 TEST ARAÇLARI

1. **Favicon Tester**: https://realfavicongenerator.net/favicon_checker
2. **OG Debugger**: https://developers.facebook.com/tools/debug/
3. **Schema Validator**: https://validator.schema.org/
4. **Sitemap Validator**: https://www.xml-sitemaps.com/validate-xml-sitemap.html
5. **Robots.txt Tester**: Google Search Console

---

*Oluşturulma Tarihi: 20 Ocak 2026*
