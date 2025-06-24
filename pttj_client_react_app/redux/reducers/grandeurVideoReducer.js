import {  FETCH_GRANDEUR_VIDEOS } from "../actions/types";

const INITIAL_STATE = { all: [] };

export default function(state = INITIAL_STATE, action={}) {

  switch(action.type){
  case FETCH_GRANDEUR_VIDEOS:
    return { ...state, all: action.payload.data};
  default:
    return state;
  }

}