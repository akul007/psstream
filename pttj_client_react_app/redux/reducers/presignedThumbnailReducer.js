import {FETCH_PRESIGNED_THUMBNAIL} from "../actions/types";

const INITIAL_STATE= { preSignedUrl: "", expectedThumbnailUrl: "" };

export default function(state = INITIAL_STATE, action={}) {

  switch(action.type){
  case FETCH_PRESIGNED_THUMBNAIL:
    return {...state, preSignedUrl: action.payload.data.preSignedUrl, expectedThumbnailUrl: action.payload.data.expectedThumbnailUrl};
  default:
    return state;
  }
  
}



