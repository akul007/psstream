import axios from "axios";

import { USER_PROFILE_INFO} from "./types";

import { userDetailsUrl } from "../../constants/apiConstants";

export const fetchUserProfile = (userId) => async (dispatch) => {
  axios
    .get(userDetailsUrl+userId)
    .then(response => {
      dispatch({
        type: USER_PROFILE_INFO,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error.message)
    });
}