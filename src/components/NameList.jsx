import React from "react";

function NameList({ names }) {
  return (
    <ul className="list">
      {names.map((n, index) => (
        <li key={index} className="list-item">{n}</li>
      ))}
    </ul>
  );
}

export default NameList;
