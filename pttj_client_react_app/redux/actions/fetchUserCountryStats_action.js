import axios from "axios";

import { USER_BY_COUNTRY_COUNT} from "./types";

import { usersByLocationApi } from "../../constants/apiConstants";


export const fetchUserCountryStats_action = () => async (dispatch) => {
  axios
    .get(usersByLocationApi)
    .then(response => {
      dispatch({
        type: USER_BY_COUNTRY_COUNT,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error.message)
    });
}