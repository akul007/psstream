/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { Panel } from "primereact/panel";

import { useSelector } from "react-redux"
import React from "react";
import { DataView } from "primereact/dataview";
import "./VideoCard.css";

import { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import CustomButton from "../../atoms/buttons/CustomButton.jsx";
import axios from "axios";
import { subscribedUrl } from "../../../constants/apiConstants";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


/**
 * @Author Preeti Chiluveru
 * @param {videos, title} props 
 * @returns three kinds of Recommendations:
 *    1. global recommendations - top n viewed videos from all videos in database
 *    2. recommendations based on channels subscribed by the user - latest n videos from all channels subscribed
 *    3. recommendations based on the grandeurs chosen by the user - top n videos with highest views from all the videos belonging to the categories chosen by the user.
 * 
 * Only videos approved by the moderator will be shown to the user.
 */

/*
* Additional Functionality to the video-card: 
  * When user clicks on a premium video, if the user has already subscribed to that video
    by paying the required karma-points, then redirect to video playing page
  * If user has not subscribed previously, then a dialog box appears, showing an option to
    watch by paying the required karma-points, then on clicking watch, a success or error 
    toast would be displayed accordingly.
  * Now if subscribed successfully, redirect to video-playing-page
*/


export const VideoCard = (props) => {
  
  const navigate=useNavigate();
  const [message, setMessage] = useState("");
  const userId = useSelector(state=> state.user.userInfo.id);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  
  const [data, setData]= useState({});
  const toast = useRef(null);
  const [disable, setDisable] = useState(false);

  const onClick = async (video) => {
    
    if(video?.videoType === "PREMIUM"){
      
      let isSubscribed = await isUserSubscribed(video?.videoId, userId);
      
      if(isSubscribed){
        navigate(`/videoPlayingPage/${video?.videoId}`);
      } else {
        setDisplayResponsive(true);
        setData({
          "userId":userId,
          "videoId":video?.videoId,
          "videoKarmaPoints":video?.videoKarmaPoints,
        });
      }
    } else{
      setDisplayResponsive(false);
      navigate(`/videoPlayingPage/${video?.videoId}`);
    }
  }
  
  async function isUserSubscribed(videoId, userId) {
    
    return await axios.get(
      `${subscribedUrl}/${userId}/${videoId}`
    ).then((response)=>{
      return response.data
    });
  }

  async function handleSubscription(data){
    
    return await axios.post(
      subscribedUrl,data
    ).then((response) => {
      return response.data;
    });
  }
    
  const onHide = () => {
    setDisplayResponsive(false);
    setDisable(false);
  }
    
  const onWatch = async (data) => {
    setDisable(true);
      
    let response1 = await handleSubscription(data);
    onHide();
    if(response1 === "Subscription data added successfully"){
      showSuccess();
    } else {
      showError();
    }
  }

  const showSuccess = () => {
    toast.current.show({severity:"success", summary: "Video Unlocked", detail:"Subscription Added Successfully!", life: 5000});
  }
  
  const showError = () => {
    toast.current.show({severity:"error", summary: "Insufficient karma points", detail:"You do not have enough karma points!", life: 5000});
  }

  const renderFooter = (data) => {
    let karmaPoints = "Watch Now for " + data.videoKarmaPoints + " Karma points";
    setMessage("On clicking " + data.videoKarmaPoints+" karma points will be deducted.");
    return (
      <div>
        <CustomButton label="Back" icon="pi pi-times" onClickHandler={() => onHide()} className="p-button-text" />
        <CustomButton label={karmaPoints} disabled={disable} icon="pi pi-check" onClickHandler={() => onWatch(data)} />
      </div>
    );
  }


  const allvideos = props.videos;

  const videos = [];
  allvideos?.forEach(video => {
    if(video.videoType != "PRIVATE"){
      videos.push(video);
    }
  });


  const renderGridItem = (video) => {
    return (
      <div className="videocard border-transparent" data-testid="videocard">
        <div className="col-12 md:col-4">

          <div className="video-grid-item card" data-testid="card-element"  style={{cursor:"pointer"}} onClick={() => onClick(video)}>
            <div className="video-grid-item-content">
              <div className="video-grid-item-top">
                <div className="video-category-item">
                  {/* <i className="pi pi-tag video-category-icon"></i> */}
                  {/* <span className="video-category">{video?.videoType}</span> */}
                </div>
                {(() => {
                  let hours = video?.duration.hours,minutes=video?.duration.minutes,seconds=video?.duration.seconds;
                  if (video?.duration.hours < 9) {
                    hours = "0" + video?.duration.hours
                  }
                  if (video?.duration.minutes < 9) {
                    minutes = "0" + video?.duration.minutes
                  }
                  if (video?.duration.seconds < 9) {
                    seconds = "0" + video?.duration.seconds
                  }
                  return(<span className="video-badge type">{hours}:{minutes}:{seconds}</span>)
                })()}
              </div>
              
              
              <LazyLoadImage src={video?.thumbnailUrl}
                className = "videoThumbnail"
                onError={(e) => e.target.src="https://i.pinimg.com/736x/19/db/31/19db31732931019b73bedcf17924f814.jpg"}
                PlaceholderSrc={"https://i.pinimg.com/736x/19/db/31/19db31732931019b73bedcf17924f814.jpg"}
                alt="Image Alt"
              />
              <div className="video-info">
                <div className="video-type">

                  <div className="video-name text-lg">{video?.videoTitle}</div>
                  {video?.videoType==="PREMIUM" && <span><i className="pi pi-dollar video-category-icon"> PREMIUM</i></span>}

                </div>
                <div className="video-description text-base">{video?.videoUploadedOn}</div>
              </div>
              
            </div>
            <div className="video-grid-item-bottom">
              <span className="video-price text-sm">{video?.videoKarmaPoints} Karma points</span>
              <span className="video-price text-base"><i className="pi pi-eye"></i>  {video?.views}</span>
            </div>
          </div>    
        </div>
        <div className="dialog-demo">
          <div className="card border-transparent">
            
            <Dialog header="PREMIUM" visible={displayResponsive} onHide={() => onHide()} breakpoints={{"960px": "75vw"}} style={{width: "50vw"}} footer={renderFooter(data)}>
              <h4>{message}</h4>
              
            </Dialog>

          </div>
        </div>
        <div>
          <Toast ref={toast} />
          <div className="card border-transparent toast-demo"></div>
        </div>
      </div>
    );
  }

  return (
    <Panel className="panel" header={props.title} toggleable>
      <div className="dataview-demo" data-testid="dataviewtest">
        <div className="card border-transparent" data-testid="card border-transparent">
          <DataView emptyMessage={props.emptyMessage} value={videos} layout={"grid"} itemTemplate={renderGridItem}/>
        </div>
      </div>
    </Panel>
  );
}