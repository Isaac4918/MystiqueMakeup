import React from "react";
import "./Input.css";

export function Input({id, placeholder, type, handleChange}) {
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

export function InputArea({id,placeholder,type,handleChange}){
  return (
    <textarea
      id={id}
      className="input-area"
      type = {type}
      placeholder={placeholder}
      onChange={(e) => handleChange(e.target.id, e.target.value)}
    />
  );
}