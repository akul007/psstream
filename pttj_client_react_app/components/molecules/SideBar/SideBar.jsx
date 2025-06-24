import React from "react";
import CustomPanelMenu from "../../atoms/CustomPanelMenu/CustomPanelMenu.jsx"
import { items } from "../../../constants/userMenuItems";


const SideBar = () => {
  return (
    <CustomPanelMenu model={items} />
  )
}
export default SideBar;

