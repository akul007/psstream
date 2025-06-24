import {  FETCH_CMS_LABELS_DATA } from "../actions/types";
const INITIAL_STATE = { all: {} };

export default function(state = INITIAL_STATE,action={}) {
  if(action.type===FETCH_CMS_LABELS_DATA)
  {
    return { ...state, all: action.payload.data};
  }
  else{
    return state;
  }

}