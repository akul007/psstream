/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React,{useState} from "react";
import { OrderList } from "primereact/orderlist";
import "./SearchListComponent.css";
import { useDispatch, useSelector } from "react-redux"
import FilterComponent from "../FilterComponent/FilterComponent.jsx";
import CustomButton from "../../atoms/buttons/CustomButton.jsx";
import { setChannelId } from "../../../redux/actions/channelId_action";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function SearchListComponent(){
  const [selectedType, setSelectedType] = useState(null);
  const [selectedGrandeurs,setSelectedGrandeurs] = useState(null);
  const [selectedSort,setSelectedSort] = useState(null);
  const [channelIdData,setChannelIdData] = useState(0);
  const [videoDataGrand,setVideoDataGrand] = useState([]);
  const [isClicked,setIsClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // setting the channel id in redux
  dispatch(setChannelId(channelIdData));

  //video data
  const videoData = useSelector(state => {
    return state.searchList.all;
  })

  //channeldata
  const channelData = useSelector(state => {
    return state.channelList.all;
  })
  
  //navigate
  if(isClicked){
    navigate("/channelLanding");
  }

  function redirect(videoId){
    navigate(`/videoPlayingPage/${videoId}`);
  }  

  // templates for orderList
  const videoTemplate = (item) => {
    return (
      <div className="product-item" onClick={() => {redirect(item.videoId)}}>
        <div className="image-container">
          <LazyLoadImage src={item.thumbnailUrl}
            style={{width:"10em",height:"6em"}}
            onError={(e) => e.target.src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"}
            alt="video thumbnail"
          />
        </div>
        <div className="product-list-detail">
          <h5 className="mb-2 name-item">{item.videoTitle}</h5>
          <div className="ratings">
            <span className="mb-2 subheading-item">{item.rating}</span>
            <i className="pi pi-star-fill product-category-icon" style={{"fontSize": "0.8em",marginLeft:"0.5em",marginBottom:"0.1em"}}></i>
          </div>
          <i className="pi pi-eye product-category-icon"></i>
          <span className="product-category">{item.views}</span>
        </div>
      </div>
    );
  }
  const channelTemplate = (item) => {
    return (
      <div className="product-item">
        <div className="image-container">
          <img style={{width:"10em",height:"6em"}}  src={item.channelLogo} onError={(e) => e.target.src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"} alt={item.videoTitle} />
        </div>
        <div className="product-list-detail">
          <h5 className="mb-2 name-item">{item.channelName}</h5>
          <h5 className="mb-2 subheading-item">{item.subscribersCount} subscribers</h5>
          <i className="pi pi-tag product-category-icon"></i>
          <span className="product-category">{item.channelTag}</span>
        </div>
        <div className="button-item">
          <CustomButton className="visitbutton-item" label="Visit" onClickHandler={() => {
            setChannelIdData(item.channelId);
            setIsClicked(true);
          }}/>
        </div>
      </div>
    );
  }

  let displayData;
  let displayTemplate;
  let displayHeader;
  
  // handle the type filter...
  if(selectedType === null){
    displayData = videoData;
    displayTemplate = videoTemplate;
    displayHeader = "Searched Videos";
  }else{
    displayData = (selectedType.code === "channel") ? channelData : videoData;
    displayTemplate = (selectedType.code === "channel") ? channelTemplate : videoTemplate;
    displayHeader = (selectedType.code === "channel") ? "Searched Channel" : "Searched Videos";
  }

  let sortedChannelData = channelData;
  let sortedVideoData = videoData;

  //handle sortby filter
  if( selectedSort === null ){
    // do nothing
  }else if(selectedType.code === "channel" && selectedSort === "popularity"){
    displayData = sortedChannelData?.sort(function(a, b){
      return b.subscribersCount - a.subscribersCount;
    });
    displayTemplate = channelTemplate;
    displayHeader = "Searched Channel";
  }else if(selectedType.code === "video" && selectedSort === "popularity"){
    displayData = sortedVideoData?.sort(function(a, b){
      return b.views - a.views;
    });
    displayTemplate = videoTemplate;
    displayHeader = "Searched Videos";
  }else if(selectedType.code === "video" && selectedSort === "ratings"){
    displayData = sortedVideoData.sort(function(a, b){
      return b.rating - a.rating;
    });
    displayTemplate = videoTemplate;
    displayHeader = "Searched Videos";
  }
  if(selectedGrandeurs===null){
    //do nothing
  }
  else if(selectedType.code === "video" && selectedGrandeurs!==null){
    displayData = videoDataGrand;
    displayTemplate = videoTemplate;
    displayHeader = "Searched Videos";
  }

  return (
    <>
      <FilterComponent setSelectedType={setSelectedType} setSelectedGrandeurs={setSelectedGrandeurs} setSelectedSort={setSelectedSort}
        selectedType={selectedType} selectedGrandeurs={selectedGrandeurs} selectedSort={selectedSort} setVideoDataGrand={setVideoDataGrand}/>
      <div data-testid="ordertest" className="orderlist-demo">
        <div className="card mb-2">
          {displayData?.length===0?<h5 style={{padding:"1em",color:"white"}}>No data found</h5>:
            <OrderList className="list" value={displayData} header={displayHeader} dragdrop listStyle={{height:"auto"}} id={displayData.channelId}
              itemTemplate={displayTemplate} onClickHandler={(e) => console.log(e)}>
            </OrderList>
          }
        </div>
      </div>
    </>
  );
}


                 