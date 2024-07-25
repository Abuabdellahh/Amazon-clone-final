import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from "./img/data.js";
import classes from "./Carousel.module.css";

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true} // Automatically play the carousel
        autoFocus={false} // Do not focus on the carousel automatically
        infiniteLoop={true} // Enable infinite looping of slides
        showIndicators={false} // Hide the indicators
        showStatus={false} // Hide the status
        showThumbs={false} // Hide the thumbnails
      >
        {img.map((imageItemLink, i) => {
          return <img src={imageItemLink} key={i} />; // Render each image
        })}
      </Carousel>
      <div className={classes.hero__img}></div> {/* Additional div with a class */}
    </div>
  );
}

export default CarouselEffect;