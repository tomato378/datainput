import React from "react";

function NameInput({ name, setName, handleAddName }) {
  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前を入力"
        style={inputStyle}
      />
      <button onClick={handleAddName} style={buttonStyle}>
        追加
      </button>
    </div>
  );
}

export default NameInput;
