import React from "react";
import CustomInput from "../../customcomponents/custominput/CustomInput";
import "./PaymentPage.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useSelector, useDispatch } from "react-redux";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./Util";
import { useState } from "react";
import firebase from "../../firebase";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function PaymentPage() {
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.checkedproduct);
  const user = useSelector((state) => state.user);
  const clearcartFlag = useSelector((state) => state.clearcartFlag);
  const shippingAddress = useSelector((state) => state.currentaddress);
  const [isCardDetailsValid, setIsCardDeatilsValid] = useState(false);

  function handleChange(e) {
    if (e.target.name === "number") {
      e.target.value = formatCreditCardNumber(e.target.value);
    } else if (e.target.name === "expiry") {
      e.target.value = formatExpirationDate(e.target.value);
    } else if (e.target.name === "cvc") {
      e.target.value = formatCVC(e.target.value, cardDetails.number);
    }
    console.log(e.target.value);
    console.log(e.target.name);
    setCardDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleFocus(e) {
    console.log(e.target.name);

    setCardDetails((prev) => ({ ...prev, focused: e.target.name }));
  }

  function getformattedDate(type, separator = "/") {
    let newDate = new Date();

    if (type === "deliverydate") {
      newDate.setDate(newDate.getDate() + 4);
    }

    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${date}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year}`;
  }

  function validateCardDetails() {
    if (isCardDetailsValid) {
      handlePay();
    } else toast.warn("please enter valid card details");
  }

  function handlePay() {
    const modifiedcheckedproduct = cart.map((item) => {
      const orderplaceddate = getformattedDate("orderplaceddate");
      const deliverydate = getformattedDate("deliverydate");

      const orderDetails = item;

      return {
        orderDetails,
        orderplaceddate,
        deliverydate,
        shippingAddress,
        cardDetails,
      };
    });

    modifiedcheckedproduct.map((item) => {
      firebase.database().ref("orders").child(user).push(item);
      firebase.database().ref("carddetails").child(user).push(cardDetails);
    });

    if (clearcartFlag) {
      dispatch({ type: "CLEAR_CART" });
    }
    navigate("/orders");
  }
  function handleCancel() {
    navigate("/shop");
  }

  function handleCallback({ issuer }, isValid) {
    setIsCardDeatilsValid(isValid);
    console.log(isValid);
    if (isValid) {
      setCardDetails((prev) => ({ ...prev, issuer: issuer }));
    }
  }

  return (
    <div className="paymentpage">
      <div className="paymentpage-container">
        <div className="paymentpage-heading">
          <h3>Card Details</h3>
        </div>
        <div className="paymentpage-card-details">
          <div className="paymentpage-card-conatiner">
            <Cards
              number={cardDetails.number}
              name={cardDetails.name}
              expiry={cardDetails.expiry}
              cvc={cardDetails.cvc}
              focused={cardDetails.focused}
              callback={handleCallback}
            />
          </div>
          <div className="paymentpage-details-container">
            <form className="paymentpage-details ">
              <CustomInput
                type="text"
                name="number"
                placeholder="Card Number"
                required
                onChange={handleChange}
                onFocus={handleFocus}
              />
              <CustomInput
                type="text"
                name="name"
                placeholder="Name"
                required
                onChange={handleChange}
                onFocus={handleFocus}
              />

              <div className="paymentpage-details-valid">
                <div className="paymentpage-details-valid-input">
                  <CustomInput
                    type="text"
                    name="expiry"
                    placeholder="Valid Thro.."
                    required
                    onChange={handleChange}
                    onFocus={handleFocus}
                  />
                </div>
                <div className="paymentpage-details-valid-input">
                  <CustomInput
                    type="text"
                    name="cvc"
                    placeholder="CVV"
                    required
                    onChange={handleChange}
                    onFocus={handleFocus}
                  />
                </div>
              </div>

              <div className="paymentpage-btn">
                <button
                  className="custom-primary-btn"
                  onClick={validateCardDetails}
                >
                  PAY
                </button>
                <button className="custom-primary-btn" onClick={handleCancel}>
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;

// paymentment:cardno;expiryand  cvv;name (60%) and image(40%)
