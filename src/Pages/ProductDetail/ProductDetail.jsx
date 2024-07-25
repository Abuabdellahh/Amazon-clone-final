import { useParams } from "react-router-dom"; // Hook to access URL parameters
import LayOut from "../../componentes/LayOut/LayOut"; // Layout component
import { useEffect, useState } from "react"; // React hooks
import axios from "axios"; // HTTP client for making requests
import { productUrl } from "../../Api/endPoints"; // API endpoint
import ProductCard from "../../componentes/product/ProductCard"; // Product card component
import Loader from "../../componentes/Loader/Loader"; // Loader component

// import classes from './ProductDetail.module.css'
function ProductDetail() {
  const [product, setProduct] = useState({}); // State to store product details
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const { productId } = useParams(); // Get productId from URL parameters

  // Fetch product details when component mounts
  useEffect(() => {
    setIsLoading(true); // Set loading state to true
    axios
      .get(`${productUrl}/products/${productId}`) // Fetch product details
      .then((res) => {
        setProduct(res.data); // Update product state with fetched data
        setIsLoading(false); // Set loading state to false
      })
      .catch((err) => {
        console.log(err); // Log any errors
        setIsLoading(false); // Set loading state to false
      });
  }, [productId]); // Dependency array to re-run effect if productId changes

  return (
    <LayOut>
      {isLoading ? (
        <Loader /> // Show loader if data is being fetched
      ) : (
        <ProductCard product={product} renderAdd={true} flex={true} /> // Show product card if data is fetched
      )}
    </LayOut>
  );
}

export default ProductDetail;