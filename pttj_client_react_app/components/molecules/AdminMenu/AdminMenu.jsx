import CustomPanelMenu from "../../atoms/CustomPanelMenu/CustomPanelMenu.jsx"
import {adminitems} from "../../../constants/adminMenuData";
import React from "react";

//import your required components here and route
{

  /*
    created by  : Sai Aravind.Y
    description : This component returns Admin Menu
    This component renders the AdminMenu which gets AdminMenu-items from constants folder
      and items are passed as an argument to CustomPanelMenu.

  */

}

export default function AdminMenu() {
    
  return (
    <div className="admin-menu">
      <CustomPanelMenu model={adminitems} />
    </div>
  
  )
}

