import { USER_LOGIN_INFO } from "./types";

export function setUserInfo(userInfo){
  return {
    type: USER_LOGIN_INFO,
    payload : userInfo,
  }
}