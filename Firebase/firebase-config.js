import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyAldOeUpl8uCuWkt7Xt2JxULVfdnQub9Cw",
    authDomain: "doubts-override.firebaseapp.com",
    databaseURL: "https://doubts-override-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "doubts-override",
    storageBucket: "doubts-override.appspot.com",
    messagingSenderId: "128037385724",
    appId: "1:128037385724:web:6e5a54efb91009a67c2e79",
    measurementId: "G-38FVC6JPR2"
};

const firebaseApp = initializeApp(firebaseConfig);

export const database = getDatabase(firebaseApp);

export {firebaseApp};