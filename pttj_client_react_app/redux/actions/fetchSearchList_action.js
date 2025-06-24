import axios from "axios";

import { FETCH_SEARCH_LIST } from "./types";

import { domainSearch } from "../../constants/apiConstants";

export const fetchSearchList = (enterData) => async (dispatch) => {
  axios
    .get(domainSearch+"/search/v1.0/search/videos/"+enterData)
    .then(response => {
      dispatch({
        type: FETCH_SEARCH_LIST,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error.message)
    });
}