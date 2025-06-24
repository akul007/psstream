import axios from "axios";
import {loggerDomain} from "../constants/apiConstants";
export default function Logger(feature,message){
  console.log(message)
  let obj={
    "title": "logged",
    "feature" : feature,
    "content" : message
  }
  axios.post(loggerDomain+"/writetolog", obj).then(res => {
    console.log(res);
  }).catch(error => {
    throw(error);
  });
}
