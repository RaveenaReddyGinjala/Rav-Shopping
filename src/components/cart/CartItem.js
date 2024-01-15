import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import CustomButton from "../../customcomponents/custombutton/CustomButton";

import { useSelector, useDispatch } from "react-redux";
import {
  changeProductCount,
  removeCartItem,
  addSaveForLater,
  removeSaveForLater,
  addToCart,
  addProductsToCheckoutPage,
} from "../../redux/Action";

import { FiMinusCircle } from "react-icons/fi";

import { IoMdAddCircleOutline } from "react-icons/io";

function CartItem(props) {
  const navigate = useNavigate();
  const isCart = props.type === "cart";
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  function changeCount(key, changeType) {
    dispatch(changeProductCount({ key: key, changeType: changeType }));
  }

  function handleRemove(key) {
    if (isCart) dispatch(removeCartItem(key));
    else dispatch(removeSaveForLater(key));
  }

  function handleClick(item) {
    if (isCart) {
      dispatch(removeCartItem(item.id));
      dispatch(addSaveForLater(item));
    } else {
      dispatch(addToCart(item));
      dispatch(removeSaveForLater(item.id));
    }
  }

  function handlePlaceOrder() {
    // dispatch(addProductsToCheckoutPage(myproducts))

    dispatch({ type: "CLEAR_CART_FLAG", payload: true });

    dispatch(addProductsToCheckoutPage(cart));
    navigate("/checkout");

    // console.log("Raveena", user);
    // console.log("Raveena", !user);

    // if (user === "") {
    //   navigate("/login", { state: { referrer: "checkout" } });

    //   return null;
    // } else navigate("/checkout");
  }

  return (
    <div className="cart-item-conatiner">
      <div className="card-title"> {isCart ? "Cart" : "Save for later"}</div>
      {props.products?.map((item) => (
        <div className="cart-item">
          <div className="cart-item-left">
            <div className="img-container">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="cart-item-img"
              ></img>
            </div>

            <div
              className={
                isCart ? "cart-item-count" : "cart-item-count disabled"
              }
            >
              <FiMinusCircle
                fontSize={29}
                onClick={() => changeCount(item.id, "decrement")}
                className={item.count === 1 && isCart ? "disabled" : ""}
              />
              <span> &nbsp;{item.count} &nbsp;</span>
              <IoMdAddCircleOutline
                fontSize={32}
                onClick={() => changeCount(item.id, "increment")}
              />
            </div>
          </div>
          <div className="cart-item-right">
            <div className="item-container">
              <div className="title">{item?.title}</div>
              <div className="price-container">
                <div className="oldPrice">${item?.oldPrice}</div>
                <div className="price"> ${item.price}</div>

                <div className="discountPercentage">
                  {item?.discountPercentage}% off
                </div>
              </div>
            </div>

            <div className="btn-container">
              <div onClick={() => handleClick(item)}>
                {isCart ? "Save for later" : "Move to cart"}
              </div>
              <div onClick={() => handleRemove(item.id)}>Remove</div>
            </div>
          </div>
        </div>
      ))}

      {isCart && (
        <div className="placeholder-btn-container">
          <div className="place-order-btn">
            <CustomButton
              type="primary"
              onClick={handlePlaceOrder}
              label="Place Order"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
