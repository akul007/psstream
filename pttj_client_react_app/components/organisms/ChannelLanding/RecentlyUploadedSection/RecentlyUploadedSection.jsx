import React,{useState,useEffect} from "react";
import axios from "axios";
import { maxvideolimit, minvideolimit } from "../../../../constants/variableConstants";
import CustomCarousel from "../../../molecules/CustomCarousel/CustomCarousel.jsx";
import { channelVideoApi} from "../../../../constants/apiConstants.js";
import { useSelector } from "react-redux";
{
  /* 
  this portion will come on home section of channel landing page. It will give recently uploaded videos
  based on date of upload.
  */
}
const RecentlyUploadedSection = () => {
  const[videoItems,setVideoItems] = useState([]);

  const channelId  = useSelector(state =>{
    return state.channelId.channelId;
  })
  function custom_sort(a, b) {
    return new Date(b.videoUploadedOn).getTime() - new Date(a.videoUploadedOn).getTime();
  }
  videoItems?.sort(custom_sort);
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

  return (
    <div data-testid="test">
      {videoItems?.length===0?<h6>No Recently Uploaded Videos Found</h6>:
        <CustomCarousel videoItems={videoItems} Title="Recently Uploaded Videos"/>
      }
    </div>
  );
}

export default RecentlyUploadedSection;