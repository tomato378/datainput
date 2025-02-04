import React from "react";

function NameList({ names }) {
  return (
    <ul>
      {names.map((n, index) => (
        <li key={index}>{n}</li>
      ))}
    </ul>
  );
}

export default NameList;
