import React,{useRef} from "react";
import { DataScroller } from "primereact/datascroller";
import { Button } from "primereact/button";
import "./NotificationData.css";
import timeDiffCalc from "../../../utils/timeDiffCalc";
import { useNavigate } from "react-router-dom";


function NotificationData({notifications,onHide}) {
  let data = notifications.slice().reverse();
  const ds = useRef(null);
  const navigate = useNavigate();

  const handleClick = (videoId) =>{
    navigate(`/videoPlayingPage/${videoId}`);
    onHide(false);
  }

  const itemTemplate = (notication) => {
    return (
      <div>
        <div className={"notification-item"}>
          <div className="notication-item-start"></div>
          <div className="notification-item-middle">
            <div className="notification-item-middle-title">{notication.channelTag}<span className="notification-item-middle-time">{timeDiffCalc(notication.notificationTime)} ago</span></div>
            <div className="notification-item-middle-content">Uploaded : {notication.videoTitle}</div>
            <div className="notification-item-middle-bottom">
              {notication.channelName}
            </div>
            
            
          </div>
          <div className="notification-item-end" onClick={() => handleClick(notication.videoId)} aria-hidden="true">
            <img className="notification-item-end-image" src={`${notication.thumbnailUrl}`} onError={(e) => e.target.src="https://i.pinimg.com/736x/19/db/31/19db31732931019b73bedcf17924f814.jpg"} alt={notication.videoThumbnail} />
          </div>
          {notication.seen?null:<span className="notification-seen"></span>}
        </div>
      </div>
    );
  }
  const footer = <Button type="text" icon="pi pi-plus" label="Load" onClick={() => ds.current.load()} />;
  return (
    <div className="datascroller-demo">
      <div className="card">
        <DataScroller ref={ds} value={data} itemTemplate={itemTemplate} rows={4}
          loader footer={footer} />
      </div>
    </div>
  )
}

export default NotificationData;