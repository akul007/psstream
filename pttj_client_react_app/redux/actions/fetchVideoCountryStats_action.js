import axios from "axios";

import { VIDEO_BY_COUNTRY_COUNT} from "./types";

import { videosByLocationApi } from "../../constants/apiConstants";


export const fetchVideoCountryStats_action = () => async (dispatch) => {
  axios
    .get(videosByLocationApi)
    .then(response => {
      dispatch({
        type: VIDEO_BY_COUNTRY_COUNT,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error.message)
    });
}