// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA0mz_qZtUsV0Vw8cAe5aC74FZ6Y4j6hXU",
  authDomain: "product-management-system-3103.firebaseapp.com",
  projectId: "product-management-system-3103",
  storageBucket: "product-management-system-3103.firebasestorage.app",
  messagingSenderId: "761528681031",
  appId: "1:761528681031:web:2f9b43c1523c8486186762"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);