import React, { useEffect, useState } from "react";
import hero from "../../assests/hero.png";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";

import Loader from "../loader/Loader";

function Home() {
  const [laptops, setLaptops] = useState([]);
  const [smartPhones, setSmartPhones] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const homeProducts = [...laptops, ...smartPhones];

  console.log(homeProducts);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/category/smartphones")

      .then((response) => {
        setSmartPhones(response.data.products);
      });

    axios
      .get("https://dummyjson.com/products/category/laptops")

      .then((response) => {
        setLaptops(response.data.products);
        setIsloading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="home">
          <div className="hero-img-conatiner">
            <img className="hero-img" src={hero} alt="hero"></img>
          </div>
          <h1> Find Everything You Love in One Place</h1>

          <div className="home-products">
            {homeProducts.map((product) => (
              <Link to={`/shop/${product.id}`} className="link">
                <div className="home-products-conatiner">
                  <div className="home-product-img">
                    <img src={product.thumbnail} alt={product.id}></img>
                  </div>
                  <label className="home-product-label">{product.title}</label>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
