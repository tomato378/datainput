import React from "react";
import "./NameInput.css"; // CSSファイルを作成

function NameInput({ name, setName, email, setEmail, handleAddName }) {
  // Enterキーで追加
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && name.trim() !== "" && email.trim() !== "") {
      handleAddName();
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleKeyPress} // Enterキー対応
        placeholder="名前を入力"
        className="input-field"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={handleKeyPress} // Enterキー対応
        placeholder="メールアドレスを入力"
        className="input-field"
        required
      />
      <button 
        onClick={handleAddName} 
        className="add-button"
        disabled={name.trim() === "" || email.trim() === ""} // 空のときは無効化
      >
        追加
      </button>
    </div>
  );
}

export default NameInput;
