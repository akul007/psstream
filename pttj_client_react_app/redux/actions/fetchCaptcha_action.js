import axios from "axios";
import { FETCH_CAPTCHA} from "./types";

import {captchaApi} from "../../constants/apiConstants";

export const fetchCaptcha = (unique_id) => async (dispatch) => {
  axios
    .get(captchaApi+unique_id)
    .then(response => {
      dispatch({
        type: FETCH_CAPTCHA,
        payload: response,//atul
      });
    })
    .catch(error => {
      console.log(error.message)
    });
}