import CustomPanelMenu from "../../atoms/CustomPanelMenu/CustomPanelMenu.jsx";
import {moderatorItems} from "../../../constants/moderatorMenuData";
import React from "react";



//import your required components here.
{
  /*
    created by  : Vamsi M, Sai Krishna V
    description : This component returns user moderator menu
      This component gets moderator items from constants folder
      and renders the menu based on the user preference to 
      login as moderator if they are approved by admin.
  */
}

export default function ModeratorMenu() {
    
  return (
    <div className="Moderatormenu">
      <CustomPanelMenu model={moderatorItems} style={{width: "16rem"}}/>
    </div>
  )
}