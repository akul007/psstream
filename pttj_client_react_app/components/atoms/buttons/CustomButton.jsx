import React from "react";
import { Button } from "primereact/button";

{
/*
created by  : Sanjay Kumar G
description : this is a button with severity 
    props should be label  and onClick callback function
    className should be provided in the props
    className can be empty , "p-button-secondary","p-button-success","p-button-info","p-button-warning", "p-button-danger","p-button-help"
*/
  
}


export default function CustomButton({type = "button",disabled = false, icon, iconPos = "left",label, className, onClickHandler,children}){
    
  return(
    <Button type={type} disabled = {disabled} icon = {icon} iconPos = {iconPos} label={label} className = {className} onClick={()=>onClickHandler()}>
      {children}
    </Button>
  )
}