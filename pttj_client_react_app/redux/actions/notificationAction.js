import axios from "axios"
import {getNotification,seeNotification} from "../../constants/apiConstants";

export const fetchAllNotifications = (userId) => {
  let url = `${getNotification}/${userId}`;
  return (dispatch) => {
    axios
      .get(url)
      .then(response => {
        let unseen = 0;
        for(let i of response.data){
          if(i.seen===false){
            unseen+=1;
          }
        }
        dispatch(fetchNotifications(response.data,unseen,""))
      })
      .catch(error => {
        dispatch(fetchNotifications([],0,error))
      })
  }
}
export const setAllNotificationSeen = (userId) => {
  let url = `${seeNotification}/${userId}`;
  return (dispatch) => {
    axios
      .get(url)
      .then(response => {
        dispatch(seen(response.data,""));
      })
      .catch(error => {
        dispatch(seen(0,error));
      })
  }
}

export const fetchNotifications = (notifications,unseen,err) => {
  return {
    type: "FETCH_NOTIFICATIONS",
    payload: notifications,
    err:err,
    unseen:unseen,
  }
}
export const seen = (response,err) => {
  return {
    type: "SET_SEEN",
    payload:response,
    err:err
  }
}