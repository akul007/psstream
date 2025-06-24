import axios from "axios";
import { FETCH_UNPUBLISHEDVIDEO } from "./types";
import {unpublishedVideoApi} from "../../constants/apiConstants.js";

export const fetchUnpublishedVideo = () => async (dispatch) => {
  axios
    .get(unpublishedVideoApi)
    .then(response => {
      dispatch({
        type: FETCH_UNPUBLISHEDVIDEO,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error.message)
    });
}