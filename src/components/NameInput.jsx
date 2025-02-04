import React from "react";

function NameInput({ name, setName, handleAddName }) {
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前を入力"
      />
      <button onClick={handleAddName}>追加</button>
    </div>
  );
}

export default NameInput;
