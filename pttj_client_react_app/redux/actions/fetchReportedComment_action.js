import axios from "axios";

import { FETCH_REPORTED_COMMENTS} from "./types";

import { reportedCommentsApi } from "../../constants/apiConstants";
export const reportedCommentAction = () => async (dispatch) => {
  axios
    .get(reportedCommentsApi)
    .then(response => {
      dispatch({
        type: FETCH_REPORTED_COMMENTS,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error.message)
    });
}