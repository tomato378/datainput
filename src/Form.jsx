import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import NameInput from "./components/NameInput";
import NameList from "./components/NameList";

// 環境変数を使った Firebase 設定
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Firebase 初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);

  // Firestore からデータを取得
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "names"));
        console.log("取得データ:", querySnapshot.docs.map(doc => doc.data())); // デバッグ用
        setNames(querySnapshot.docs.map(doc => doc.data().name));
      } catch (error) {
        console.error("データ取得エラー:", error);
      }
    };
    fetchNames();
  }, []);

  // Firestore に名前を追加
  const handleAddName = async () => {
    if (name.trim() === "") return;
    try {
      await addDoc(collection(db, "names"), { name });
      setNames([...names, name]);
      setName("");
    } catch (error) {
      console.error("データ追加エラー:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>名前リスト</h2>
      <NameInput name={name} setName={setName} handleAddName={handleAddName} />
      <NameList names={names} />
    </div>
  );
}

export default App;
