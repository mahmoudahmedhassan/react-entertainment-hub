
import { React, useState, useEffect } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Image from "react-bootstrap/Image";
import { img_300, noPicture } from "../../config";
import './carousel.css'

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ id, media_type }) => {
  const [credits, setCredits] = useState([]);

  const items = credits.map((el) => (
    <div className="carouselItem">
      <Image
        src={el.profile_path ? `${img_300}/${el.profile_path}` : noPicture}
        alt={el?.name}
        onDragStart={handleDragStart}
        thumbnail
        />
      <p>{el?.name}</p>
    </div>
  ));



  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=8ec65a9de686234cda5ca905a69e7c70&language=en-US`
    );
    setCredits(data.cast);
  };

  useEffect(() => {
    fetchCredits();
   }, [])


   const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 3,
    },
    1024: {
      items: 4,
    },
  };

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  );
};

export default Carousel;