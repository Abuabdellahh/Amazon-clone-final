// import classes from "./Results.module.css"
import LayOut from "../../componentes/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import { useEffect, useState } from "react";
import classes from "./Result.module.css"
import ProductCard from "../../componentes/product/ProductCard";
import Loader from "../../componentes/Loader/Loader";

function Results() {
  const [results, setResults] = useState([]); // State to store the results
  const { catagoryName } = useParams(); // Get category name from URL parameters
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state

  // Fetch products based on category name
  useEffect(() => {
    setIsLoading(true); // Set loading to true before making the request

    axios.get(`${productUrl}/products/category/${catagoryName}`)
      .then((res) => {
        setResults(res.data); // Set the results with the response data
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        setIsLoading(false); // Set loading to false if there's an error
        console.log(err); // Log the error
      });
  }, [catagoryName]); // Dependency array to refetch data when category name changes

  return (
    <LayOut>
      {isLoading ? (
        <Loader /> // Show loader while data is being fetched
      ) : (
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>Catagory/{catagoryName}</p>
          <hr />
          <div className={classes.products__container}>
            {results?.map((Product) => (
              <ProductCard
                product={Product}
                key={Product.id}
                renderAdd={true}
              />
            ))}
          </div>
        </section>
      )}
    </LayOut>
  );
}

export default Results;