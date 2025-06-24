import {  FETCH_VIDEO_GRANDEURS_LIST } from "../actions/types";

const INITIAL_STATE = { all: [] };

export default function(state = INITIAL_STATE, action={}) {

  switch(action.type){
  case FETCH_VIDEO_GRANDEURS_LIST:
    return { ...state, all: action.payload.data};
  default:
    return state;
  }

}