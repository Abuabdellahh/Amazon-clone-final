import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  const [product, setProduct] = useState([]); // State to store product data
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state

  useEffect(() => {
    setIsLoading(true); // Set loading to true when fetching data
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProduct(res.data); // Set product data from API response
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.log(err); // Log any errors
        setIsLoading(false); // Set loading to false if there's an error
      });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      {isLoading ? (
        <Loader /> // Show loader while data is being fetched
      ) : (
        <section className={classes.product__container}>
          {product?.map((singleProduct) => (
            <ProductCard
              product={singleProduct} // Pass product data to ProductCard component
              key={singleProduct.id} // Unique key for each product
              renderAdd={true} // Prop to render add button
            />
          ))}
        </section>
      )}
    </>
  );
}
export default Product;