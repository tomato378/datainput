import React from "react";

function NameList({ names, deleteName }) {
  return (
    <ul className="list">
      {names.map((n) => (
        <li key={n.id || Math.random()} className="list-item">
          <p>名前：{n.name}</p>
          <p>メールアドレス：{n.email}</p>
          <p>
            タイムスタンプ：
            {n.timestamp instanceof Date
              ? n.timestamp.toLocaleString()
              : "日時なし"}
          </p>
          <button className="delete-button" onClick={() => deleteName(n.id)}>
            削除
          </button>
        </li>
      ))}
    </ul>
  );
}

export default NameList;
