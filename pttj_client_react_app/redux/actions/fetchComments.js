import axios from "axios";
import { FETCH_COMMENTS } from "./types";
import {fetchCommentsApi} from "../../constants/apiConstants.js";

export const fetchComments = (videoId) => async (dispatch) => {
  axios
    .get(fetchCommentsApi+videoId)
    .then(response => {
      dispatch({
        type: FETCH_COMMENTS,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error.message);
    });
}