import axios from "axios";

import { UPLOAD_VIDEO} from "./types";

import { uploadVideo } from "../../constants/apiConstants";
export const uploadVideoAction = (data) => async (dispatch) => {
  axios
    .put(uploadVideo, data)
    .then(response => {
      dispatch({
        type: UPLOAD_VIDEO,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error.message)
    });
}