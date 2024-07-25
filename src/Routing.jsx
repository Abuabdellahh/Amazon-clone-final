import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Payment from "./Pages/Payment/Payment.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import Order from "./Pages/Orders/Order.jsx";
import Landing from "./Pages/Landing/Landing.jsx";
import Results from "./Pages/Results/Results.jsx";
import ProductDetail from "./Pages/ProductDetail/ProductDetail.jsx";
import Auth from "./Pages/Auth/Auth.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoutes from "./componentes/protectedRoutes/ProtectedRoutes.jsx";
const stripePromise = loadStripe(
  "pk_test_51PfbdPRxpS7e0lsZSz8mhsJNJi5TgqOasIeAh5G4CC8Mkgwbv9MbNlHoV2YZqOVfhCd1AFMtMnsamGlOgjtiyWBo00xkLAMLEd"
);

function Routing() {
  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: "{{CLIENT_SECRET}}",
  // };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="auth" element={<Auth />} />
        <Route
          path="/Payments"
          element={
            <ProtectedRoutes
              msg={"you must login to pay"}
              redirect={"/Payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoutes
              msg={"you must login to access orders"}
              redirect={"/order"}
            >
              <Order />
            </ProtectedRoutes>
          }
        />
        <Route path="/catagory/:catagoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />

        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
