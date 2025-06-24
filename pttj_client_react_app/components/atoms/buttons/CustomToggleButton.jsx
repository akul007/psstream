import React from "react";
import { ToggleButton } from "primereact/togglebutton";

{
/*
created by  : Sanjay Kumar G
description : 
    props should be label  and onClick callback function
    className should be provided in the props
    
*/
  
}
{/* <ToggleButton className = "h-2rem m-1 w-5rem" checked={checked} onChange={(e) => setChecked(e.target.value)} onIcon="pi pi-check" offIcon="pi pi-times"  aria-label="Confirmation" /> */}

export default function CustomToggleButton({ onIcon="", offIcon="", label , className, onChange,checked=false}){
    
  return(
    <ToggleButton  onIcon = {onIcon} offIcon = {offIcon} aria-label={label} className = {className} checked={checked} onChange={(e)=>onChange(e)}/>
  )
}