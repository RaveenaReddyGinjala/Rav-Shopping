import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Action";
import "./Product.css";
import CustomButton from "../../customcomponents/custombutton/CustomButton";
import { addProductsToCheckoutPage } from "../../redux/Action";

function Product() {
  const [product, setProduct] = useState({});
  const [actualPrice, setActualPrice] = useState("");
  const [listImage, setListImage] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`).then((response) => {
      setProduct({
        ...response.data,
        count: 1,
        oldPrice: calculateActualPrice(
          response.data.price,
          response.data.discountPercentage
        ),
      });

      console.log(response.data);
    });
  }, []);

  function calculateActualPrice(newPrice, discountPercentage) {
    let oldPrice = 0;
    let decimal = discountPercentage / 100;

    oldPrice = newPrice / (1 - decimal);

    console.log(oldPrice);
    return Math.ceil(oldPrice);
  }

  function handleCart() {
    dispatch(addToCart(product));
    navigate("/cart");
  }

  function handleBuyNow() {
    console.log(product);
    dispatch(addToCart(product));
    let myproducts = [];
    myproducts.push(product);
    dispatch(addProductsToCheckoutPage(myproducts));
    dispatch({ type: "CLEAR_CART_FLAG", payload: false });

    navigate("/checkout");
  }

  return (
    <div className="single-product">
      <div className="single-product-container">
        <div className="single-product-container-left">
          <div className="single-product-img-list">
            {product?.images?.map((image) => (
              <div
                className="img-list-container"
                onClick={() => setListImage(image)}
              >
                <img src={image} alt="img"></img>
              </div>
            ))}
          </div>
          <div className="single-product-img-container">
            <img
              src={listImage ? listImage : product.thumbnail}
              className="single-product-img"
            ></img>
          </div>
        </div>

        <div className="single-product-container-right">
          <div className="p-title">{product.title}</div>
          <div className="p-description"> {product.description}</div>
          <StarRatings
            className="star-rating"
            rating={product.rating}
            starDimension="20px"
            starSpacing="5px"
            starEmptyColor="white"
            starRatedColor={
              product.rating > 3.5
                ? "green"
                : product.rating > 2.5 && product.rating < 3.5
                ? "yellow"
                : "red"
            }
          />

          <div className="single-product-price-container">
            <span className="p-newprice">${product.price}</span>
            <span className="p-oldprice">${product.oldPrice}</span>
            <span className="p-discount">
              {product.discountPercentage}% off
            </span>
          </div>
          <div className="product-btn-container">
            {/* <button onClick={handleCart}> Add To Cart</button> */}
            <CustomButton
              type="secondary"
              onClick={handleCart}
              label="Add To Cart"
            />
            {/* <button onClick={() => navigate("/checkout")}> Buy Now</button> */}
            <CustomButton
              type="primary"
              onClick={handleBuyNow}
              label="Buy Now"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
