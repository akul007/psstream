import axios from "axios";

import { FETCH_PRESIGNED_VIDEO} from "./types";

import { presignedVideo } from "../../constants/apiConstants";
export const fetchPresignedUrl = (data) => async (dispatch) => {
  axios
    .post(presignedVideo, data)
    .then(response => {
      dispatch({
        type: FETCH_PRESIGNED_VIDEO,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error.message)
    });
}