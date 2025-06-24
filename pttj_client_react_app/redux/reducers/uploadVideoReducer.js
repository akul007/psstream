import {UPLOAD_VIDEO} from "../actions/types";

const INITIAL_STATE= {video:{} };

export default function(state = INITIAL_STATE, action={}) {

  switch(action.type){
  case UPLOAD_VIDEO:
    return {...state, video: action.payload.data};
  default:
    return state;
  }
  
}



