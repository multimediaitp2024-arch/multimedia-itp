
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfzZvz6_Xs6WCqdp8NTVXb83FySOqlt8s",
  authDomain: "multimedia-itp.firebaseapp.com",
  projectId: "multimedia-itp",
  storageBucket: "multimedia-itp.firebasestorage.app",
  messagingSenderId: "1098940170731",
  appId: "1:1098940170731:web:4c840b3dbb51ad7fee99ae",
  measurementId: "G-X4JM2GM2HX"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);