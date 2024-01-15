import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import "./Shop.css";
import { BsSearch } from "react-icons/bs";

import { FaStar } from "react-icons/fa6";
import Loader from "../loader/Loader";

function Shop() {
  const [productData, setProductData] = useState([]);
  const [categories, setCategories] = useState(["Raveena", "Teja"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=100")

      .then((response) => {
        setProductData(response.data.products);
        console.log(response.data.products);
        setIsloading(false);
      });

    axios
      .get("https://dummyjson.com/products/categories")

      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      });
  }, []);

  function handleDropDown(e) {
    setSelectedCategory(e.target.value);
    setSearchQuery("");
    setIsloading(true);

    axios
      .get(`https://dummyjson.com/products/category/${e.target.value}`)

      .then((response) => {
        setProductData(response.data.products);
        console.log(response.data.products);
        setIsloading(false);
      });
  }

  function handleSearch(e) {
    setSelectedCategory("");
    setSearchQuery(e.target.value);
    setIsloading(true);

    axios
      .get(`https://dummyjson.com/products/search?q=${e.target.value}`)

      .then((response) => {
        setProductData(response.data.products);
        console.log(response.data.products);
        setIsloading(false);
      });
  }

  function fetchColor(rating) {
    let color = "";
    if (rating > 3.5) {
      color = "#388e3c";
    } else if (rating > 2.5 && rating <= 3.5) {
      color = "#ff9f00";
    } else color = "#ff6161";
    return color;
  }

  return (
    <div className="shop">
      <div className="shop-search-container">
        <div className="search-bar">
          <BsSearch fontSize={30} />
          <input
            type="text"
            value={searchQuery}
            placeholder="Search Product"
            onChange={handleSearch}
          ></input>
        </div>
        <select value={selectedCategory} onChange={handleDropDown}>
          <option value="">select a category</option>
          {categories.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="products-container">
          {productData.map((product) => (
            <Link to={`/shop/${product.id}`} className="link">
              <div key={product.id} className="product">
                <div className="shop-img-container">
                  <img src={product.thumbnail} alt={product.title}></img>
                </div>

                <label>{product.title}</label>
                <div className="product-details">
                  <label>$ {product.price}</label>
                  <div
                    className="product-rating"
                    style={{ background: fetchColor(product.rating) }}
                  >
                    <span>{product.rating.toString().slice(0, 3)} </span>
                    <FaStar fontSize={14} color="white" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;
