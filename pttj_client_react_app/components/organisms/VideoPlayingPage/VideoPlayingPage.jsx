import React from "react";
import { useEffect, useState } from "react";
import Video from "../../atoms/Video/Video.jsx";
import { useParams } from "react-router-dom";
import "./VideoPlayingPage.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import {Emojis} from "../../atoms/Emojis/Emojis.jsx";
import {StarRating} from "../../atoms/StarRating/StarRating.jsx";
import Comment from "../Comment/Comment.jsx";
import { useDispatch, useSelector} from "react-redux";
import { fetchVideo } from "../../../redux/actions/fetchVideoAction.js";
import axios from "axios";
import {videoViewedApi, history} from "../../../constants/apiConstants.js";

/*
* This is the Video Playing Page
* the user is directed to this page when they click on a public video
* or a premium video they are eligible to watch
* Like and dislike are handled via the Emojis component
* video is considered as viewed when the user has reached the end of the video
*/

export const VideoPlayingPage = () => {

  const video = useSelector(state => state.videoPlay.video);
  const currentUserId = useSelector(state=> state.user.userInfo.id);
  const [likesCount, setLikesCount] = useState(video?.likes);
  const [viewsCount, setViewsCount] = useState(video?.views);

  const dispatch = useDispatch();
  
  let { videoId } = useParams();

  useEffect( () => {
    dispatch(fetchVideo(videoId));
  }, []);

  function convertedDate(date){
    const videoDate = new Date(date);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return videoDate.toLocaleDateString("en-us", options);
  }

  const handleEnd = () =>{
    setViewsCount(viewsCount+1);

    const data = {
      "videoId": videoId,
      "userId": currentUserId,
      "channelId": video?.channel?.channelId,
    }
    axios.post(`${videoViewedApi}`, data)
      .then(res=> console.log(res.data))
      .catch(err=> console.log(err))

    axios.post(history, data)
      .then(res=> console.log(res.data))
      .catch(err=> console.log(err));
  }

  return( 
    <div className="video-details card border-transparent" data-testid="video-details">
      
      <div className="video-upper-half" data-testid="video-upper-half">
        <div className="video-player-details" data-testid="video-player-details">
   
          {video?.videoId==videoId && 
          <div className="video-player" data-testid="video-player">
            <Video width="100%" height="100%" url={video?.videoUrl} errorHandler={()=>console.log("no video found")} onEndHandler={handleEnd}></Video>
          </div>}

          <div className="video-subdetails">
            {video?.category && <div className="video-category">#{video?.category} </div>}
            <div className="video-title">
              {video?.videoTitle}
              {videoId && <Emojis video={video} incLikes={()=>setLikesCount(likesCount+1)} decLikes={()=> setLikesCount(likesCount-1)} />}
            </div>
            <div className="video-properties">
              <div className="video-buttons ">
                <div className="video-metadata">
                  {viewsCount} views
                  <span className="video-date">{video?.videoUploadedOn && convertedDate(video?.videoUploadedOn)}</span>
                </div>
                <div className="video-like-dislike">
                  {likesCount} likes
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="video-details-card card border-transparent">
          <div className="video-description w-full">
            <div className="video-channel-block">
              <div className="video-channel-metadata" >
                <img id="video-channel-logo" src={video?.channel?.channelLogo} onError={(e) => e.target.src="https://i.pinimg.com/736x/19/db/31/19db31732931019b73bedcf17924f814.jpg"} alt="channel-logo" />
                <div className="video-channel-name">
                  {video?.channel?.channelName}
                  <p className="video-channel-subscribers">{video?.channel?.subscribersCount} subscribers </p>
                </div>
              </div>  
            </div>
            <div>
              <div className="description-title">Description</div>
              <div className="description-content">
                <p>{video?.videoDescription}</p>
              </div>
            </div>
            
            <div className="video-review">
              <StarRating/>
            </div>
          </div>
        </div>
      </div>
      <div className="video-comments">
        <Comment videoId={videoId}/>
      </div>
    </div>
  );

}