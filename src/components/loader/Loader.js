import React from "react";
import "./Loader.css";
import { RotatingLines } from "react-loader-spinner";

function Loader() {
  return (
    <div className="loader">
      <RotatingLines
        strokeColor="#fb641b"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
}

export default Loader;
