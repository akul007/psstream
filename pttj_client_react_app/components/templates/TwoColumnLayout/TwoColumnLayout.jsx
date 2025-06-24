import React from "react";
import Header from "../../organisms/Header/Header.jsx";
import Footer from "../../organisms/Footer/Footer.jsx";
import SideBar from "../../molecules/SideBar/SideBar.jsx";
import { useSelector} from "react-redux"
import CustomPanelMenu from "../../atoms/CustomPanelMenu/CustomPanelMenu.jsx";
import { adminitems } from "../../../constants/adminMenuData.js";
import { moderatorItems } from "../../../constants/moderatorMenuData.js";
import "./TwoColumnLayout.css"

const TwoColumnLayout = ({children}) => {
  const userInfo = useSelector(state=>{return state.user.userInfo.id ? state.user.userInfo.roles[0] : null});
  const moderatorCheck = sessionStorage.getItem("moderatorCheck");
  
  return (
    <div data-testid="twoCol">
      {userInfo && <Header/>}
      <div className=" layout min-h-screen" data-testid="innerBlock">

        {(userInfo === "ROLE_USER" || userInfo === "ROLE_MODERATOR") && moderatorCheck ==="false"&& <div className="card sidebar" data-testid="col1"><SideBar/> </div>}
        {userInfo === "ROLE_ADMIN" && <div data-testid="col1" className="w-2 card"><CustomPanelMenu model={adminitems}/> </div>}
        {userInfo === "ROLE_MODERATOR" && moderatorCheck === "true" &&<div data-testid="col1" className="w-2 card"><CustomPanelMenu  model={moderatorItems}/> </div>}

        <div data-testid="col2" className={userInfo ? "children" : "w-screen"}>{children}</div>
        
      </div>
      {userInfo && <Footer/>}
    </div>
  )
}
export default TwoColumnLayout;
