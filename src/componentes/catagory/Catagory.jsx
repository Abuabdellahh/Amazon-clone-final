import { catagoryImages } from "./catagoryAssets"; // Importing category images
import CatagoryCards from "./CatagoryCards"; // Importing category cards component
import classes from "./catagory.module.css"; // Importing CSS module for styling

function Catagory() {
  return (
    <section className={`${classes.catagory__container} `}>
      {catagoryImages.map((info) => (
        <CatagoryCards data={info} key={info.name} /> //Rendering category cards
      ))}
    </section>
  );
}

export default Catagory; // Exporting the Catagory component
