import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  deleteDoc, 
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import NameInput from "../components/NameInput";
import NameList from "../components/NameList";
import "./Form.css";

// Firebase 設定（環境変数使用）
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
  const [email, setEmail] = useState("");  // 修正
  const [names, setNames] = useState([]);

  // Firestore からデータをリアルタイム取得
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "names"), (snapshot) => {
      const nameList = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        timestamp: doc.data().timestamp,
      }));
      setNames(nameList);
    });

    // クリーンアップ関数（コンポーネントがアンマウントされたら購読解除）
    return () => unsubscribe();
  }, []);

  // Firestore に名前を追加
  const handleAddName = async () => {
    if (name.trim() === "" || email.trim() === "") return;
    try {
      const docRef = await addDoc(collection(db, "names"), {
        name,
        email,
        timestamp: serverTimestamp(),  // Firestore のサーバータイムを使用
      });
      setName("");
      setEmail("");  // 修正
    } catch (error) {
      console.error("データ追加エラー:", error);
    }
  };

  // Firestore から名前を削除
  const deleteName = async (id) => {
    try {
      await deleteDoc(doc(db, "names", id));
    } catch (error) {
      console.error("データ削除エラー:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>名前リスト</h2>
      <NameInput
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}  // 修正
        handleAddName={handleAddName} 
      />
      <NameList names={names} deleteName={deleteName} />
    </div>
  );
}

export default App;
