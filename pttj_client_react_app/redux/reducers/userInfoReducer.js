import { USER_LOGIN_INFO } from "../actions/types";
const INITIAL_STATE = {
  userInfo:{}
}

export default function(state = INITIAL_STATE,action={}){
  if(action.type===USER_LOGIN_INFO)
  {
    return { ...state, userInfo:action.payload};
  }
  else{
    return state;
  }

}