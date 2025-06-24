import axios from "axios";

import { FETCH_GLOBAL_VIDEOS, FETCH_CHANNEL_VIDEOS, FETCH_GRANDEUR_VIDEOS } from "./types";

import { domain } from "../../constants/apiConstants";

export const fetchGlobalVideos = () => async (dispatch) => {
  axios
    .get(domain+"/user/v1.0/home/global")
    .then(response => {
      dispatch({
        type: FETCH_GLOBAL_VIDEOS,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error.message)
    });
}

export const fetchChannelVideos = (userId) => async (dispatch) => {
  axios
    .get(domain+"/user/v1.0/home/subscribedchannels/"+userId)
    .then(response => {
      dispatch({
        type: FETCH_CHANNEL_VIDEOS,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error.message)
    });
}

export const fetchGrandeurVideos = (userId) => async (dispatch) => {
  axios
    .get(domain+"/user/v1.0/home/grandeur/"+userId)
    .then(response => {
      dispatch({
        type: FETCH_GRANDEUR_VIDEOS,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error.message)
    });
}