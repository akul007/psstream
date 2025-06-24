import React from "react";
import { Message } from "primereact/message";

{
/*
created by  : Sanjay Kumar G
description : use this inline message in form textfields when a validation is required
                props contain severity,text
                severity can only be 'successs' , 'info' , 'warn', 'error'
*/
    
}
export default function InlineMessage(props){

  return (
    <Message severity={props.severity} text={props.text} /> 
  )
}
