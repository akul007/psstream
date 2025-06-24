/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { Carousel } from "primereact/carousel";
import "./CustomCarousel.css"
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
{
  /* 
  this is a wrapper of carousel in which we are getting videoItems and title as props 
  */
}
const CustomCarousel = ({ videoItems,Title}) => {
  const navigate = useNavigate();
    
  /* in this part we have 3 different options to check responsiveness.
  Whenever screen size reduces, the number of items to be shown on screen also reduces
  */
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: "600px",
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: "480px",
      numVisible: 1,
      numScroll: 1
    }
  ];

  function redirect(videoId){
    navigate(`/videoPlayingPage/${videoId}`);
  }  


  const videoTileTemplate = (videoItem) => {
    return (
      <div data-testid="test" className="product-item" >
        <div className="product-item-content" style={{cursor: "pointer"}} onClick={() => redirect(videoItem.videoId)}>
          <div  className="mb-3">
            <LazyLoadImage src={videoItem.thumbnailUrl}
              style={{width:"15em",height:"7em"}}
              onError={(e) => e.target.src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"}
              alt="Video thumbnail"
            />
          </div>

          <div>
            <h6 className="mb-1">{videoItem.videoTitle}</h6>
            <h6 className="mt-0 mb-3 type-item">{videoItem.videoType}</h6>
            <div>
              <i className="pi pi-eye view-item"></i>
              <span className="mt-0 mb-3 view-item">{videoItem.views}</span>
            </div>
            <div>
              <i className="pi pi-calendar view-item"></i>
              <span className="mt-0 mb-3 view-item">{videoItem.videoUploadedOn}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="carousel-demo" data-testid="carouseltest">
      <div>
        <Carousel data-testid="carousel" value={videoItems} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions}
          itemTemplate={videoTileTemplate} header={<h5 style={{marginLeft:"1em", fontSize:"1em", marginTop:"0.5em"}}> {Title}</h5>} />
      </div>
    </div>
  );                 
}

export default CustomCarousel;