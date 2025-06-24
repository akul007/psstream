import { CHANNEL_ID } from "../actions/types";
const INITIAL_STATE = {
  channelId:0
}

export default function(state = INITIAL_STATE,action={}){
  if(action.type===CHANNEL_ID)
  {
    return { ...state, channelId:action.payload};
  }
  else{
    return state;
  }

}