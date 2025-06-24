import axios from "axios";

import { VIDEO_BY_STATE_COUNT} from "./types";

import { videosByLocationApi } from "../../constants/apiConstants.js";


export const fetchVideoStateStats_action = (country) => async (dispatch) => {
  axios
    .get(videosByLocationApi+"/"+country)
    .then(response => {
      dispatch({
        type: VIDEO_BY_STATE_COUNT,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error.message)
    });
}