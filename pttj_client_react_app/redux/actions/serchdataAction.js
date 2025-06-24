import { SEARCH_DATA } from "./types";

export function setSearchData(enterData){
  return {
    type: SEARCH_DATA,
    payload : enterData,
  }
}