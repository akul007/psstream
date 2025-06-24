import { SEARCH_DATA } from "../actions/types";
const INITIAL_STATE = {
  searchData:""
}

export default function(state = INITIAL_STATE,action={}){
  if(action.type===SEARCH_DATA)
  {
    return { ...state, searchData:action.payload};
  }
  else{
    return state;
  }

}