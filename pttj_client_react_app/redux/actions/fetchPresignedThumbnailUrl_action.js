import axios from "axios";

import { FETCH_PRESIGNED_THUMBNAIL} from "./types";

import { presignedThumbnail } from "../../constants/apiConstants";
export const fetchPresignedThumbnailUrl = (userId,fileName) => async (dispatch) => {
  axios
    .get(`${presignedThumbnail}/${userId}/url/${fileName}`)
    .then(response => {
      dispatch({
        type: FETCH_PRESIGNED_THUMBNAIL,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error.message)
    });
}