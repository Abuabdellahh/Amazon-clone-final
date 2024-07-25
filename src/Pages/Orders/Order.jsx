import { db } from "../../Utility/firebase"; // Importing Firebase database
import { useState, useEffect, useContext } from "react"; // Importing React hooks
import { DataContext } from "../../componentes/DataProvider/DataProvider"; // Importing DataContext
import LayOut from "../../componentes/LayOut/LayOut"; // Importing layout component
import classes from "./Order.module.css"; // Importing CSS module
import ProductCard from "../../componentes/product/ProductCard"; // Importing ProductCard component

const Order = () => {
  const [{ user }, dispatch] = useContext(DataContext); // Accessing user from context
  const [orders, setOrders] = useState([]); // State for orders
  const [isLoading, setIsLoading] = useState(true); // State for loading status

  useEffect(() => {
    if (user) {
      // If user is logged in
      db.collection("users") // Accessing user collection
        .doc(user.uid) // Getting user document
        .collection("orders") // Accessing orders collection
        .orderBy("created", "desc") // Ordering by creation date
        .onSnapshot((snapShot) => {
          // Listening for real-time updates
          console.log(snapShot); // Logging snapshot
          setOrders(
            // Setting orders state
            snapShot.docs.map((doc) => ({
              id: doc.id, // Document ID
              data: doc.data(), // Document data
            }))
          );
        });
      setIsLoading(true); // Setting loading state
    } else {
      // If no user is logged in
      setOrders([]); // Resetting orders
      setIsLoading(false); // Setting loading state to false
    }
  }, []); // Empty dependency array means this runs once on mount

  return (
    <LayOut>
      <div className={classes.orderPage}>
        <h1 className={classes.title}> Your orders</h1>
        {orders?.length === 0 && ( // Check if there are no orders
          <div style={{ padding: "10px" }}> You don't have orders yet.</div>
        )}
        <hr />
        {orders?.map(
          (
            eachOrder,
            i // Mapping through orders
          ) => (
            <div className={classes.item} key={i}>
              OrderId:{eachOrder.id} {/* Displaying order ID*/}
              {eachOrder?.data?.basket?.map((order) => {
                // Mapping through basket items
                return (
                  <div className={classes.pro_item} key={order.id}>
                    {" "}
                    {/* Added key for each item */}
                    <ProductCard product={order} />;{" "}
                    {/* Displaying product card */}
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </LayOut>
  );
};

export default Order; // Exporting Order component
