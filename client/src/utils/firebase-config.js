import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTfZhbzO84Kcyfg_IJZRlpGq687YRcwOs",
  authDomain: "devmovie-eed34.firebaseapp.com",
  projectId: "devmovie-eed34",
  storageBucket: "devmovie-eed34.firebasestorage.app",
  messagingSenderId: "736628766837",
  appId: "1:736628766837:web:f8e071f04ba5bbfa27e03c",
  measurementId: "G-HTTE5KV79J",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
