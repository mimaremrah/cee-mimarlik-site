// ============================================
// FIREBASE CONFIG - CEE MİMARLIK
// ============================================

// Firebase modüllerini import et
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';

// Firebase Yapılandırması
const firebaseConfig = {
    apiKey: "AIzaSyD_o4IQg2_a5o2sxZvKwsbQ4R6Y_qE5Zhw",
    authDomain: "cee-mimarlik.firebaseapp.com",
    projectId: "cee-mimarlik",
    storageBucket: "cee-mimarlik.firebasestorage.app",
    messagingSenderId: "479234997700",
    appId: "1:479234997700:web:60182cab4b5bc8936d3891",
    measurementId: "G-WJJRB55W5F"
};

// Firebase'i baÅŸlat
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Global olarak eriÅŸilebilir yap
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDB = db;
window.firebaseStorage = storage;

// Export et
export { app, auth, db, storage };

console.log('✅ Firebase başlatıldı');
console.log('📦 Project ID:', firebaseConfig.projectId);
