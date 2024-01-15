import React from "react";
import "./CustomInput.css";

function CustomInput({
  type,
  onChange,
  placeholder,
  name,
  required,
  onFocus,
  value,
}) {
  return (
    <div className="custom-input-container ">
      <input
        className="custom-input"
        type={type}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        onFocus={onFocus}
        value={value}
      />
    </div>
  );
}

export default CustomInput;
