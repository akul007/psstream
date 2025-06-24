import axios from "axios";
import { FETCH_USER_CHANNELS } from "./types.js";
import { channelapi } from "../../constants/apiConstants";


export const fetchUserChannels = (userId) => async (dispatch) => {
  axios
    .get(channelapi+"/channel/"+userId)
    .then(response => {
      dispatch({
        type: FETCH_USER_CHANNELS,
        payload: response,
      });
      
    })
    .catch((error) => {
      console.log(error);
    });
}