import axios from "axios";

// Create an instance of axios with a custom config
const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/clone-2024-cd71d/us-central1/api",
  // deploy in render url
  baseURL: "https://amazon-api-cl33.onrender.com/",
});

export default axiosInstance;
