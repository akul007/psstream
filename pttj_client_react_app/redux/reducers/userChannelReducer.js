import {  FETCH_USER_CHANNELS } from "../actions/types";

const INITIAL_STATE = { channels: [] };

export default function(state = INITIAL_STATE, action={}) {

  switch(action.type){
  case FETCH_USER_CHANNELS:
    return { ...state, channels: action.payload.data};
  default:
    return state;
  }

}