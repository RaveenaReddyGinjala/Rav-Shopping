import React from "react";
import "./Carticon.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";

function Carticon() {
  const cartCount = useSelector((state) => state.cart.length);
  console.log(cartCount);

  return (
    <div>
      <AiOutlineShoppingCart fontSize={40} color="black" />
      {cartCount > 0 && <div className="cart-reddot">{cartCount}</div>}
    </div>
  );
}

export default Carticon;
