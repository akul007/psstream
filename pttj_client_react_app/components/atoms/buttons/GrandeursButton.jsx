import React from "react";
import { ToggleButton } from "primereact/togglebutton";

{
/*
created by  : Sanjay Kumar G
description : 
    props should be label  and onchange callback function
    className should be provided in the props
    
*/
  
}
{/* className="m-2"key={index} offLabel={category.label} onLabel={category.label} checked={category.checked} onChange={(e)=>updateCategories(e,index) */}

export default function CustomToggleButton({ offLabel, onLabel, key , className, onChange,checked=false}){
    
  return(
    <ToggleButton  onLabel = {onLabel} offLabel = {offLabel} key={key} className = {className} checked={checked} onChange={(e)=>onChange(e)}/>
  )
}