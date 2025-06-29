import {  FETCH_CAPTCHA } from "../actions/types";

const INITIAL_STATE = { all: "" };

export default function(state = INITIAL_STATE, action={}) {

  switch(action.type){
  case FETCH_CAPTCHA:
    return { ...state, all: action.payload.data};
  default:
    return state;
  }

}