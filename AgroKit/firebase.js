import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC9iRact7Iul8uzw98U5IXqcOp3NbdMgjQ",
  authDomain: "agrokit-2025.firebaseapp.com",
  databaseURL: "https://agrokit-2025-default-rtdb.firebaseio.com",
  projectId: "agrokit-2025",
  storageBucket: "agrokit-2025.appspot.com",
  messagingSenderId: "1059070535464",
  appId: "1:1059070535464:web:6a5989e95d6d4c296dd21d"
};

// Inicialización con manejo de errores
let app;
let database;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
  console.log("Firebase inicializado correctamente");
} catch (error) {
  console.error("Error inicializando Firebase:", error);
}

export { database, ref, onValue };