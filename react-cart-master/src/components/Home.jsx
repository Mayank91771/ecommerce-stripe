import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import axios from "axios";
import Pagination from "./Pagination";
import productdetail from "../data/data";

const Home = () => {
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);
  const [postPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((err) => {
        console.log("Err: ", err);
      });
    setProductList(response.data);
  };

  const addToCartHandler = (options) => {
    dispatch({ type: "addToCart", payload: options });
    dispatch({ type: "calculatePrice" });
    toast.success("Added To Cart");
  };

  const lastIndex = currentPage * postPerPage;
  const firstIndex = lastIndex - postPerPage;
  const currentPosts = productList.slice(firstIndex, lastIndex);

  return (
    <div className="home">
      {currentPosts <= 0 ? (
        <div class="loader-wrapper">
          <div class="loader">
            <div class="inner-loader"></div>
          </div>
        </div>
      ) : (
        currentPosts.map((i) => (
          <ProductCard
            key={i.id}
            imgSrc={i.image}
            name={i.title.slice(0, 25)}
            price={i.price}
            id={i.id}
            handler={addToCartHandler}
          />
        ))
      )}
      <div className="pagination">
        <Pagination
          totalPosts={productList.length}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

const ProductCard = ({ name, id, price, handler, imgSrc }) => (
  <div className="productCard">
    <img src={imgSrc} alt={name} />
    <p>{name}</p>
    <h4>${price}</h4>
    <button onClick={() => handler({ name, price, id, quantity: 1, imgSrc })}>
      Add to Cart
    </button>
  </div>
);

export default Home;
