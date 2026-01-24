// KVKK/Cookie Consent Banner
(function() {
    if (localStorage.getItem('cookieConsent') === 'true') return;
    
    const banner = document.createElement('div');
    banner.innerHTML = `
        <div id="cookieBanner" style="position: fixed; bottom: 0; left: 0; right: 0; background: #1a1a1a; color: white; padding: 20px; box-shadow: 0 -4px 20px rgba(0,0,0,0.3); z-index: 99999; animation: slideUp 0.5s;">
            <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 300px;">
                    <p style="margin: 0; font-size: 14px; line-height: 1.6;">
                        🍪 Bu web sitesi, deneyiminizi geliştirmek için çerezler kullanmaktadır. 
                        Siteyi kullanmaya devam ederek <a href="gizlilik.html" target="_blank" style="color: #667eea; text-decoration: underline;">KVKK</a> ve çerez politikamızı kabul etmiş sayılırsınız.
                    </p>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button onclick="acceptCookies()" style="background: #667eea; color: white; border: none; padding: 12px 30px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px;">Kabul Et</button>
                    <button onclick="rejectCookies()" style="background: transparent; color: white; border: 2px solid white; padding: 12px 30px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px;">Reddet</button>
                </div>
            </div>
        </div>
        <style>
            @keyframes slideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
            }
        </style>
    `;
    
    document.body.appendChild(banner);
    
    window.acceptCookies = function() {
        localStorage.setItem('cookieConsent', 'true');
        document.getElementById('cookieBanner').remove();
    };
    
    window.rejectCookies = function() {
        localStorage.setItem('cookieConsent', 'false');
        document.getElementById('cookieBanner').remove();
    };
})();
