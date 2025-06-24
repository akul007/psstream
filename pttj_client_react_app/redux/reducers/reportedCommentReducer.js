import { FETCH_REPORTED_COMMENTS } from "../actions/types";

const INITIAL_STATE= {comments:[] };

export default function(state = INITIAL_STATE, action={}) {

  switch(action.type){
  case FETCH_REPORTED_COMMENTS:
    return {...state, comments: action.payload.data};
  default:
    return state;
  }
  
}
