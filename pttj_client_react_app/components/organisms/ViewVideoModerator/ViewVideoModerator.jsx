import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { findVideoById, markVideoAsArchived, markVideoPublishedapi, markVideoRejectedapi } from "../../../constants/apiConstants";
import CustomButton from "../../atoms/buttons/CustomButton.jsx";
import Video from "../../atoms/Video/Video.jsx";
import "./ViewVideoModerator.css";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { months } from "../../../constants/variableConstants.js";


export default function ViewVideoModerator(){
  const [showAll, setShowAll] = useState(false);
  const toast = useRef(null);
  const [isArchived,setIsArchived] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const navigate=useNavigate();
  // restrictions on descriptions
  
  let limit = 83;

  //api call to fetch videos
  const [video, setVideo] = useState([]);
  let { videoId } = useParams();

  useEffect(() => {
    axios.get(`${findVideoById}${videoId}`)
      .then(res=>setVideo(res.data))
      .catch(err=>console.log(err));
  }, []);

  //archive functionality
  const markVideoArchived = () =>{
    axios.put(`${markVideoAsArchived}${videoId}`).then(() =>{
      toast.current.show({severity:"success", summary: "Video Archived", detail:"", life: 3000});
    }).catch(()=>{
      toast.current.show({severity:"error", summary: "Video Not Archived", detail:"", life: 3000});
    })
    setIsArchived(true);
  }


  const markVideoRejected = () =>{
    axios.delete(`${markVideoRejectedapi}${videoId}`).then(() =>{
      toast.current.show({severity:"success", summary: "Video Rejected", detail:"", life: 3000});
    }).catch(()=>{
      toast.current.show({severity:"error", summary: "Video Not Rejected", detail:"", life: 3000});
    })
    setIsRejected(true);
    navigate("/moderator");
  }

  const markVideoPublished = () =>{
    axios.put(`${markVideoPublishedapi}${videoId}`).then(() =>{
      toast.current.show({severity:"success", summary: "Video Published", detail:"", life: 3000});
    }).catch(()=>{
      toast.current.show({severity:"error", summary: "Video Not Published", detail:"", life: 3000});
    })
    setIsPublished(true);
    navigate("/moderator");
  }
  
  // In the final case, we show a text with ellipsis and a `Read more` button
  const toShow = video.videoDescription?.substring(0, limit) + "...";

  let year = parseInt(video.videoUploadedOn?.toString().slice(0,4));
  let month = parseInt(video.videoUploadedOn?.toString().slice(5,7));
  let date = parseInt(video.videoUploadedOn?.toString().slice(8,10));
  let dateValue = months[month-1] + " " + date + ", " + year;

  const myTernary = (condition, then, otherwise) => condition ? then : otherwise;

  return(
    <div className="main-container">
      <Toast ref={toast}></Toast>
      {video?.videoId==videoId && 
        <div data-testid="videotestid" className="video-container">
          <Video width="72%" height="60%" url={video?.videoUrl} errorHandler={()=>console.log("no video found")} onEndHandler={(e) => console.log(e)}></Video>
        </div>
      }
      <div data-testid="textconatinertestid" className="text-container card">
        <div className="text-items">
          <div className="title-item">
            <h4>{video.videoTitle}</h4>
          </div>
          <div className="dateview-item">
            <span>{video.views} views</span>
            <span className="date-item" > {dateValue}</span>
          </div>
          <div className="description-item">
            {video.videoDescription?.length<limit?(<div>{video.videoDescription}</div>):myTernary(showAll,
              <div>{video.videoDescription}<CustomButton className="read-button" onClickHandler={()=>setShowAll(!showAll)}>Read less</CustomButton></div>,
              <div>{toShow}<CustomButton className="read-button" onClickHandler={()=>setShowAll(!showAll)}>Read more</CustomButton></div>)
            }
          </div>
        </div>
        <div className="button-container">
          <CustomButton className="approve-button" label="Approve" onClickHandler={markVideoPublished} disabled={isPublished}> </CustomButton>
          <CustomButton className="reject-button" label="Reject" onClickHandler={markVideoRejected} disabled={isRejected}></CustomButton>
          <CustomButton className="archive-button" label="Archive" onClickHandler={markVideoArchived} disabled={isArchived}></CustomButton>
        </div>
      </div>
    </div>
  );
}