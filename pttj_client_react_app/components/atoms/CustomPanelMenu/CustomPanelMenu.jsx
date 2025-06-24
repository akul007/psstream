import React from "react";
import { PanelMenu } from "primereact/panelmenu"
import "./CustomPanelMenu.css"
export default function CustomPanelMenu({model = "items"}){
    
  return(
    <div className="w-full" data-testid="paneltest">
      <PanelMenu model={model}/>
    </div>
    
  )
}