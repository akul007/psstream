import React,{useEffect,useState} from "react";
import axios from "axios";
import {minvideolimit,maxvideolimit} from "../../../../constants/variableConstants";
import CustomCarousel from "../../../molecules/CustomCarousel/CustomCarousel.jsx";
import { channelVideoApi } from "../../../../constants/apiConstants";
import { useSelector } from "react-redux";
{
  /* showing most viewed videos and sorting it based on views */
}
const MostViewedSection = () => {
  const[videoItems, setVideoItems] = useState([]);

  const channelId  = useSelector(state =>{
    return state.channelId.channelId;
  })
  videoItems?.sort(function(a, b){
    return b.views - a.views;
  });
  // for videos
  useEffect(() => {
    loadVideoData();
  }, []);

  const loadVideoData = async () =>{
    return axios.get(`${channelVideoApi}${channelId}`)
      .then((response) => {
        setVideoItems(response.data.slice(minvideolimit,maxvideolimit))
      })
      .catch((err) => console.log(err));
  };
  const arr = videoItems.filter(video => video.views > 0);
  return (
    <div data-testid="test">
      {arr?.length===0?<h6>No Most Viewed Videos Found</h6>:
        <CustomCarousel videoItems={arr} Title="Most Viewed Videos"/>
      }
    </div>
  );
}

export default MostViewedSection;