import React from "react";
import { InputTextarea } from "primereact/inputtextarea";



export default function CustomInputTextArea(type = "text", maxLength = "number", value = "text", className, onChange,rows = "number", cols = "number"){
  return(
    <InputTextarea type={type} maxLength={maxLength} value = {value} className = {className} onChange={()=>{onChange()}} rows={rows} cols={cols}/>
  )
}

