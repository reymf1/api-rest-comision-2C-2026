import "dotenv/config"; // Importo
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  // Objeto de configuración de Firebase que contiene las credenciales necesarias para inicializar la aplicación Firebase. Estas credenciales se obtienen del archivo .env y se utilizan para autenticar y conectar la aplicación con el proyecto de Firebase correspondiente.Process.env se utiliza para acceder a las variables de entorno definidas en el archivo .env, lo que permite mantener las credenciales sensibles fuera del código fuente y facilitar la configuración en diferentes entornos (desarrollo, producción, etc.). Esto es importante para la seguridad y la flexibilidad de la aplicación.
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
