import axios from "axios";

import { USER_BY_STATE_COUNT} from "./types";

import { usersByLocationApi } from "../../constants/apiConstants";


export const fetchUserStateStats_action = (country) => async (dispatch) => {
  axios
    .get(usersByLocationApi+"/"+country)
    .then(response => {
      dispatch({
        type: USER_BY_STATE_COUNT,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error.message)
    });
}