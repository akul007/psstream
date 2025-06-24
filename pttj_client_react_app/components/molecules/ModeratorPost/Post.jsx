/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { useSelector,useDispatch } from "react-redux"
import React from "react";
import { DataView } from "primereact/dataview";
import "./Post.css";
import { useEffect} from "react";
import { fetchUnpublishedVideo } from "../../../redux/actions/fetchUnpublishedVideo_action";
import { useNavigate } from "react-router-dom";

{
  /*
  this component is showing the list of unpublished and unarchived videos on moderator landing page.
  Onclick on particular video we are going to land on video player component
  */
}

const Post = () => {
  const navigate=useNavigate();
  const allvideos = useSelector(state => {
    return state.unPublishedVideos.all;
  })
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUnpublishedVideo());
  }, [])

  //onclick render
  const onClick = async (video) => {

    navigate(`/moderatorVideoPage/${video?.videoId}`);
  }
  

  const renderGridItem = (video) => {
    var videoTitle = "";
    if(video?.videoTitle.length > 20)
      videoTitle = video?.videoTitle.substring(0 ,20)+"...";
    else
      videoTitle = video?.videoTitle;
    return (
      <div className="videocard">
        <div className="col-12 md:col-4">
          <div className="video-grid-item card" style={{cursor:"pointer"}} onClick={() => onClick(video)}>
            <div className="video-grid-item-top">
              <div>
                <i className="pi pi-tag video-category-icon"></i>
                <span className="video-category">{video?.videoType}</span>
              </div>
              <span className="video-badge type">{video?.duration.hours}:{video?.duration.minutes}:{video?.duration.seconds}</span>
            </div>
            <div className="video-grid-item-content">
              <img src={video?.thumbnailUrl} onError={(e) => e.target.src="https://i.pinimg.com/736x/19/db/31/19db31732931019b73bedcf17924f814.jpg"} alt=""/>
              <div className="video-name">{videoTitle}</div>
              <div className="video-description">{video?.videoUploadedOn}</div>
            </div>
            <div className="video-grid-item-bottom">
            </div>

          </div>    
        </div>
      </div>
      
    );
  }

  return (
    <div className="dataview-demo" data-testid="dataviewtest">
      <div className="card border-transparent">
        <DataView value={allvideos} layout={"grid"} itemTemplate={renderGridItem} paginator rows={9}/>
      </div>
    </div>
  );
}
export default Post;

