// import React from "react";
import { Link } from "react-router-dom";
import classes from "./catagory.module.css";

function CatagoryCards({ data }) {
  // console.log(data)
  return (
    <div className={classes.catagory}>
      {/* Link to the category page using the category name */}
      <Link to={`/catagory/${data.name}`}>
        <span>
          {/* Display the category title */}
          <h2>{data.title}</h2>
        </span>
        {/* Display the category image */}
        <img src={data.imgLink} alt="" />
        {/* Call to action text */}
        <p className={classes.shopNow}>shop now</p>
      </Link>
    </div>
  );
}

export default CatagoryCards;
