import React from "react";
import "./NameInput.css"; // CSSファイルを作成

function NameInput({ name, setName, email, setEmail, grade, setGrade, class_name, setClass, number, setNumber, handleAddName }) {
  // Enterキーで追加
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && name.trim() !== "" && email.trim() !== "" && 
        grade && class_name && number.trim() !== "") {
      handleAddName();
    }
  };

  // クラスの選択肢を生成
  const classOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  
  // 出席番号の選択肢を生成（1-40）
  const numberOptions = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <div className="input-container">
      <div className="input-row">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="名前を入力"
          className="input-field name-field"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="メールアドレスを入力"
          className="input-field email-field"
          required
        />
      </div>
      
      <div className="select-row">
        <div className="select-group">
          <label>学年</label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="select-field"
            required
          >
            <option value="">選択してください</option>
            <option value="1">1年</option>
            <option value="2">2年</option>
            <option value="3">3年</option>
            <option value="3">4年</option>
            <option value="3">5年</option>
            <option value="3">6年</option>
          </select>
        </div>

        <div className="select-group">
          <label>クラス</label>
          <select
            value={class_name}
            onChange={(e) => setClass(e.target.value)}
            className="select-field"
            required
          >
            <option value="">選択してください</option>
            {classOptions.map(c => (
              <option key={c} value={c}>{c}組</option>
            ))}
          </select>
        </div>

        <div className="select-group">
          <label>出席番号</label>
          <select
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="select-field"
            required
          >
            <option value="">選択してください</option>
            {numberOptions.map(n => (
              <option key={n} value={n}>{n}番</option>
            ))}
          </select>
        </div>
      </div>

      <button 
        onClick={handleAddName} 
        className="add-button"
        disabled={!name.trim() || !email.trim() || !grade || !class_name || !number}
      >
        追加
      </button>
    </div>
  );
}

export default NameInput;
