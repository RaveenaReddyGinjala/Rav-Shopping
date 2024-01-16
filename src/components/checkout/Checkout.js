import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Checkout.css";
import CustomButton from "../../customcomponents/custombutton/CustomButton";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.checkedproduct);
  const user = useSelector((state) => state.user);

  const cart1 = [
    {
      id: 3,
      title: "Samsung Universe 9",
      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      discountPercentage: 15.46,
      rating: 4.09,
      stock: 36,
      brand: "Samsung",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
      images: ["https://cdn.dummyjson.com/product-images/3/1.jpg"],
      count: 1,
      oldPrice: 1478,
    },
    {
      id: 2,
      title: "iPhone X",
      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      price: 899,
      discountPercentage: 17.94,
      rating: 4.44,
      stock: 34,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/2/1.jpg",
        "https://cdn.dummyjson.com/product-images/2/2.jpg",
        "https://cdn.dummyjson.com/product-images/2/3.jpg",
        "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
      ],
      count: 1,
      oldPrice: 1096,
    },
  ];

  useEffect(() => {
    console.log(user);
    console.log(!user);
    if (!user) {
      navigate("/login", { state: { referrer: "checkout" } });
    }
  }, [user]);

  console.log(cart1);
  const [cartNewPrice, setCartNewPrice] = useState("");
  const [cartOldPrice, setOldNewPrice] = useState("");
  const [cartDiscount, setCartDiscount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  let deliveryCharges = "free";

  useEffect(() => {
    const totalNewPrice = cart.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    const totalOldPrice = cart.reduce(
      (acc, item) => acc + item.oldPrice * item.count,
      0
    );

    setCartNewPrice(totalNewPrice);
    setOldNewPrice(totalOldPrice);
    setCartDiscount(totalOldPrice - totalNewPrice);
    setTotalAmount(totalNewPrice);
  }, []);

  function handleCheckout() {
    navigate("/addresspage");
  }

  return (
    <div className="checkout">
      <div className="checkout-container">
        <div className="checkout-product-container">
          {cart?.map((product) => (
            <div className="checkout-product">
              <div className="checkout-product-img">
                <img src={product.thumbnail} alt={product.description}></img>
              </div>

              <div className="checkout-product-product-details">
                <label className="checkout-title">Title:{product.title} </label>
                <label className="checkout-newprice">
                  Price: ${product.price}
                </label>
                <label className="checkout-oldprice">
                  Actual Price: ${product.oldPrice}
                </label>
                <label className="checkout-quantity">
                  Quantity: {product.count}
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="chekout-bottom">
          <div className="checkout-total-summary">
            <label className="checkout-price">
              Total Price: ${cartNewPrice}
            </label>
            <label className="checkout-price">
              Actual Price: ${cartOldPrice}
            </label>
            <label className="checkout-price">You Saved: ${cartDiscount}</label>
            <label className="checkout-price">
              Delivery Charges: {deliveryCharges}
            </label>
            <label className="checkout-total-amount">
              Total Amount: ${totalAmount}
            </label>
          </div>
          <div className="checkout-btn">
            <CustomButton
              type="secondary"
              onClick={handleCheckout}
              label="Check Out"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
