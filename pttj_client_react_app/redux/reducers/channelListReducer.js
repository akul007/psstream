import {  FETCH_CHANNEL_LIST } from "../actions/types";

const INITIAL_STATE = { all: [] };

export default function(state = INITIAL_STATE, action={}) {

  switch(action.type){
  case FETCH_CHANNEL_LIST:
    return { ...state, all: action.payload.data};
  default:
    return state;
  }

}