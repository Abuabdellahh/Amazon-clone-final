import { useContext } from "react";
import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

/**
 * Header component that displays the top navigation bar.
 * It includes the logo, delivery location, search bar, language selector,
 * user account links, and the shopping cart.
 */
function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItems = basket?.reduce((amount, item) => amount + item.amount, 0);
  return (
    <section className={classes.header__outer__container}>
      <div className={classes.header__container}>
        <div className={classes.logo__container}>
          {/* logo */}
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="amazon-logo"
            />
          </Link>
          {/* delivery */}
          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p style={{ whiteSpace: "nowrap" }}>Delivered to</p>
              <span style={{ fontWeight: "bold" }}>Ethiopia</span>
            </div>
          </div>
        </div>

        <div className={classes.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" placeholder="Search..." />
          <BsSearch size={25} />
        </div>
        <div className={classes.order__container}>
          <Link to="/" className={classes.language}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/1280px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png"
              alt=""
            />
            <select name="" id="">
              <option value="">EN</option>
            </select>
          </Link>

          <Link to={!user && "/auth"}>
            <div>
              {user ? (
                <>
                  <p>Hello, {user.email?.split("@")[0]}</p>
                  <span onClick={() => auth.signOut()}>Sign Out</span>
                </>
              ) : (
                <>
                  <p>Hello, Sign In</p>
                  <span>Account & Lists</span>
                </>
              )}
            </div>
          </Link>
          <Link to="/order">
            <p>Returns</p>
            <span>& orders</span>
          </Link>
          <Link to="/cart" className={classes.cart}>
            <BiCart size={35} />
            <span>{totalItems}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Header;