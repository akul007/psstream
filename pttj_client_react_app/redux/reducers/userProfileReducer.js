import {  USER_PROFILE_INFO } from "../actions/types";

const INITIAL_STATE = { all: [] };

export default function(state = INITIAL_STATE, action={}) {

  switch(action.type){
  case USER_PROFILE_INFO:
    return { ...state, all: action.payload.data};
  default:
    return state;
  }

}