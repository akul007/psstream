import React from "react";
import "primeicons/primeicons.css";
import "../Error/error.css"
import {  errorMessage, oppsMessage, pageNotFoundMessage, sorryMessage } from "../../../constants/labelConstant";
/* 
  ErrorStatus -> tell about the status of error response..
  and it will be define in App.js which will be set when we face any error..
  ErrorCode -> error response status..
  Also "Error" useState will be defined in App.js which will be set to "true" when we get error 
  during Api fetch and if error is true the this component will be rendered..
*/

export default function Error({errorStatus}){
  return(
    <>
      <div data-testid="errortestid" className="container">
        <i className="pi pi-exclamation-triangle" id="icon-item" ></i>
        <h2 className="oops-item">{oppsMessage}</h2>
        {errorStatus==="ERR_NETWORK" ? <h2 className="sorry-item">{sorryMessage}</h2>:<h2 className="sorry-item">{pageNotFoundMessage}</h2>}  
        <p className="para-item">
          {errorMessage}
        </p>
      </div>
    </>
  );
}