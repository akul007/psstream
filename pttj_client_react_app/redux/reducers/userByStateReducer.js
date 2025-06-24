import {  USER_BY_STATE_COUNT } from "../actions/types";

const INITIAL_STATE = { all: [] };

export default function(state = INITIAL_STATE, action={}) {

  switch(action.type){
  case USER_BY_STATE_COUNT:
    return { ...state, all: action.payload.data};
  default:
    return state;
  }

}