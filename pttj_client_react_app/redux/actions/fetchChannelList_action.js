import axios from "axios";

import { FETCH_CHANNEL_LIST } from "./types";

import { domainSearch } from "../../constants/apiConstants";

export const fetchChannelList = (enterData) => async (dispatch) => {
  axios
    .get(domainSearch+"/search/v1.0/search/channels/"+enterData)
    .then(response => {
      dispatch({
        type: FETCH_CHANNEL_LIST,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error.message)
    });
}