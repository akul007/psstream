import React, {useEffect,useState} from "react";
import axios from "axios";
import { useSelector} from "react-redux";
import {videoHistoryUrl} from "../../../constants/apiConstants.js";
import "./History.css"
import { VideoCard } from "../../molecules/VideoCard";

{/*
    Show history of all videos user had watched
  */}
export default function History (){
  const [videos, setVideos] = useState([]);
  const [emptyMessage, setEmptyMessage] = useState("loading");
  const loggedInUser = useSelector(state=> state.user.userInfo.id);

  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = await axios.get(videoHistoryUrl + loggedInUser);
      setVideos(res.data)
      if(res.data == null ||res.data.length==0 )
      {
        setEmptyMessage("You have not watched any video");
      }
    };
    fetchPosts();
  },[]);

  return (
    <div className="history" data-testid="videotest">
      <VideoCard videos={videos} emptyMessage= {emptyMessage} title={"User Video History"} />
    </div>
  );
}