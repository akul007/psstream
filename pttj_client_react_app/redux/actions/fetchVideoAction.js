import axios from "axios";
import { FETCH_VIDEO } from "./types";
import {findVideoById} from "../../constants/apiConstants.js";

export const fetchVideo = (videoId) => async (dispatch) => {
  axios
    .get(`${findVideoById}${videoId}`)
    .then(response => {
      dispatch({
        type: FETCH_VIDEO,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error.message)
    });
}