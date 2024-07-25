import classes from "./Cart.module.css";
import { useContext } from "react";
import LayOut from "../../componentes/LayOut/LayOut";
import { DataContext } from "../../componentes/DataProvider/DataProvider";
import ProductCard from "../../componentes/product/ProductCard";
import CurrencyFormater from "../../componentes/currencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
  // Get basket and user data from context
  const [{ basket, user }, dispatch] = useContext(DataContext);

  // Calculate total price of items in the basket
  const total = basket.reduce((ammount, item) => {
    return item.price * item.amount + ammount;
  }, 0);

  // Function to increment item amount in the basket
  const increment = (item) => {
    dispatch({ type: Type.ADD_TO_BASKET, item: item });
  };

  // Function to decrement item amount in the basket
  const decrement = (item) => {
    dispatch({ type: Type.REMOVE_FROM_BASKET, id: item.id });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Opps! Your basket is empty </p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section key={i} className={classes.cart__product}>
                  <ProductCard
                    product={item}
                    flex={true}
                    renderDesc={true}
                    renderAdd={false}
                  />
                  <div className={classes.btn__container}>
                    <button
                      className={classes.btn}
                      onClick={() => increment(item)}
                    >
                      <IoIosArrowUp size={30} />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={classes.btn}
                      onClick={() => decrement(item)}
                    >
                      <IoIosArrowDown size={30} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>

        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket?.length} items):</p>
              <CurrencyFormater amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/Payments">Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;