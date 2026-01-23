// ============================================
// DİNAMİK SEO - PROJECT DETAIL
// ============================================
// Bu script'i project-detail.html'e ekleyin
// Firestore'dan yüklenen proje bilgileriyle meta tagları günceller
// ============================================

function updateSEOMetaTags(project) {
    // Title güncelle
    document.title = `${project.title} | CEE Mimarlık`;
    
    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', project.description || `CEE Mimarlık - ${project.title} projesi detayları`);
    
    // Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
    }
    const keywords = project.tags ? project.tags.join(', ') : 'mimarlık, villa, modern tasarım';
    metaKeywords.setAttribute('content', keywords);
    
    // Open Graph - Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', project.title);
    
    // Open Graph - Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', project.description || `CEE Mimarlık - ${project.title}`);
    
    // Open Graph - Image
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', project.thumbnail || project.images[0]);
    
    // Open Graph - URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', window.location.href);
    
    // Twitter Card - Title
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
        twitterTitle = document.createElement('meta');
        twitterTitle.setAttribute('name', 'twitter:title');
        document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', project.title);
    
    // Twitter Card - Description
    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDesc) {
        twitterDesc = document.createElement('meta');
        twitterDesc.setAttribute('name', 'twitter:description');
        document.head.appendChild(twitterDesc);
    }
    twitterDesc.setAttribute('content', project.description || `CEE Mimarlık - ${project.title}`);
    
    // Twitter Card - Image
    let twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImage) {
        twitterImage = document.createElement('meta');
        twitterImage.setAttribute('name', 'twitter:image');
        document.head.appendChild(twitterImage);
    }
    twitterImage.setAttribute('content', project.thumbnail || project.images[0]);
    
    // Twitter Card - Type
    let twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
        twitterCard = document.createElement('meta');
        twitterCard.setAttribute('name', 'twitter:card');
        document.head.appendChild(twitterCard);
    }
    twitterCard.setAttribute('content', 'summary_large_image');
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);
    
    console.log('Ã¢Å“â€¦ SEO meta tagları güncellendi:', project.title);
}

// Export
window.updateSEOMetaTags = updateSEOMetaTags;
