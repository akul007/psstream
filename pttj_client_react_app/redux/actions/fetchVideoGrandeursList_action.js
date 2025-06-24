import axios from "axios";

import { FETCH_VIDEO_GRANDEURS_LIST } from "./types";

import { domainSearch } from "../../constants/apiConstants";

export const fetchVideoGrandeursList = (enterData,category) => async (dispatch) => {
  axios
    .get(domainSearch+"/search/v1.0/search/videosByCategory/"+category+"/"+enterData)
    .then(response => {
      dispatch({
        type: FETCH_VIDEO_GRANDEURS_LIST,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error.message)
    });
}