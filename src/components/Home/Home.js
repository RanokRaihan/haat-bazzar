import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import spinner from "../../images/spinner.gif";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://peaceful-thicket-62136.herokuapp.com/allProducts")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <img src={spinner} alt='' className='loading-spinner' />
      ) : (
        <div className='product-container'>
          {products.map((product) => (
            <Product product={product} key={product._id}></Product>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
