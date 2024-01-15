import React from "react";
import "./CustomButton.css";

function CustomButton({ onClick, label, type }) {
  return (
    <div
      onClick={onClick}
      className={
        type === "primary" ? "custom-primary-btn" : "custom-secondary-btn"
      }
    >
      {label}
    </div>
  );
}

export default CustomButton;
