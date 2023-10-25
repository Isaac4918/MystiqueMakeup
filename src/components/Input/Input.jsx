import React from "react";
import "./Input.css";

export function Input({id, placeholder, type, handleChange, area = false}) {
  if (area) {
    return (
      <textarea
        id={id}
        className="input"
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.id, e.target.value)}
      />
    );
  } else {
    return (
        <input
            id={id}
            className="input-container"
            placeholder={placeholder}
            type = {type}
            onChange={(e) => handleChange(e.target.id, e.target.value)}
        />
      );
  }
}