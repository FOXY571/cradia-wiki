// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAGpI30KEZYziprri66g-HjENkfi4EHOek',
  authDomain: 'cradia-wiki.firebaseapp.com',
  projectId: 'cradia-wiki',
  storageBucket: 'cradia-wiki.firebasestorage.app',
  messagingSenderId: '133732070686',
  appId: '1:133732070686:web:079b627d107aaf443d450f',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }
