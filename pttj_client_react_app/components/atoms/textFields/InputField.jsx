import React from "react";
import { InputText } from "primereact/inputtext";
 
{
  /*
  created by : Sanjay Kumar G
  description : this is a normal text fiels generally used in forms
                props: label, defaultValue, onChange();
                defaultValue if there are any or else just provide empty string ""
                onChange() is a callback function
  */

}

export default function InputField({id, type = "text",disabled=false, className, label, value, onChange, required = false, autoComplete = "off" }){

  return(
    <InputText id = {id} type={type} className={className} disabled={disabled} placeholder={label} value = {value}  onChange = {e => onChange(e)} required={required} autoComplete = {autoComplete}/>
  )
}
