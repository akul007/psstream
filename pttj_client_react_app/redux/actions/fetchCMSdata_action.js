import axios from "axios";
import { FETCH_CMS_LABELS_DATA } from "./types.js";
import {API_BASE_URL,API_SPACE_ID,API_KEY} from "../../constants/cmsConstants";


export const fetchCMSLabelsData = () => async (dispatch) => {
  axios
    .get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_KEY}`)
    .then(response => {
      dispatch({
        type: FETCH_CMS_LABELS_DATA,
        payload: response,
      });
      
    })
    .catch((error) => {
      console.log(error);
    });
}