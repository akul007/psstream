/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import { Dialog } from "primereact/dialog";
import { fetchAllNotifications, setAllNotificationSeen } from "../../../redux";
import NotificationData from "../NotificationData/NotificationData.jsx";
import "./NotificationBell.css";
import { Button } from "primereact/button";

function NotificationBell({userId}) {
  const [displayMaximizable, setDisplayMaximizable] = useState(false);
  const notifications = useSelector(state => state.notifications.data);
  const loading = useSelector(state => state.notifications.loading);
  const unseen = useSelector(state => state.notifications.unseen);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllNotifications(userId));
  }, [])

  const handleBellClick = () => {
    setDisplayMaximizable(true);
    if(unseen!==0){
      dispatch(setAllNotificationSeen(userId));
    }
  }

  const onHide = (_name) => {
    dispatch(fetchAllNotifications(userId));
    setDisplayMaximizable(_name);
  }
    
  return (
    <div className="ml-4">
      <Button icon="pi pi-bell" data-testid="notificationBell" className="p-button-rounded" aria-label="Notification" onClick={handleBellClick}>
        <span data-testid="count" className="bell-notification-count text-xs text-red-600">{unseen==0?null:unseen}</span>
      </Button>
      
      <Dialog data-testid="dialogbox" header="Notifications" visible={displayMaximizable} maximizable modal style={{ width: "50vw" }} breakpoints={{ "960px": "75vw" }} onHide={() => onHide(false)}>
        {loading?
          <h1>Loading...</h1>:<NotificationData notifications={notifications} onHide={onHide}/>
        }
      </Dialog>
    </div>
  )
}

export default NotificationBell