import {FETCH_PRESIGNED_VIDEO} from "../actions/types";

const INITIAL_STATE= { presignedVideoUrl: "", video: {} };

export default function(state = INITIAL_STATE, action={}) {

  switch(action.type){
  case FETCH_PRESIGNED_VIDEO:
    return {...state, presignedVideoUrl: action.payload.data.preSignedUrl, video: action.payload.data.video};
  default:
    return state;
  }
  
}



