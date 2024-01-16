import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import "./Cart.css";
import emptycart from "../../assests/emptycartremovebg.png";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const saveforlater = useSelector((state) => state.saveforlater);

  return (
    <div className="cart">
      {cart.length ? (
        <div className="cart-container">
          <CartItem products={cart} type="cart" />
        </div>
      ) : (
        <div
          className={
            saveforlater.length > 0
              ? "cart-only-empty-container"
              : "cart-save-empty-container"
          }
        >
          <img
            className={
              saveforlater.length > 0 ? "cart-only-empty" : "cart-save-empty"
            }
            src={emptycart}
            alt="cartempty"
          ></img>
        </div>
      )}

      {saveforlater.length > 0 && (
        <div className="save-for-later-container">
          <CartItem products={saveforlater} type="saveforlater" />
        </div>
      )}
    </div>
  );
}

export default Cart;
