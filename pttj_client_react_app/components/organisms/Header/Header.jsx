import React from "react";
import "./Header.css";
import SearchBar from "../SearchBar/Searchbar.jsx";
import { useSelector} from "react-redux";
import NotificationBell from "../NotificationBell/NotificationBell.jsx";
import logo from "../../../assets/images/pslogo.jpg"
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
/*header component includes 1. FaBars icon it will show when the user will switch his/her screen to
mobile view and side bar will disapear and will acess all its functionality with fabars
2. in Web view left side consist logo or name of product
2. Search Bar
3. three icons i) upload button for uploading the vide ii)SignIn button for the User iii) User profile
for making all the header I took care of contrast ratio and used Ps Brand toolkit for color and font
*/

const Header = () => {
  const isUserLoggedIn = useSelector(state=> state.user.userInfo.id);

  return (
    <>
      {/* <div className="main-nav shadow-1" data-testid="main"> */}
      {/* <div className="logo w-full p-0 ml-4" data-testid="logo">
          <LazyLoadImage src={logo}
            width={60} height={60}
            alt="PS Stream app"
          />
        </div>
        { isUserLoggedIn &&
            <div className="searchdiv">
              <SearchBar/>
            </div>
        }
        {
          isUserLoggedIn &&<NotificationBell userId={isUserLoggedIn}/>
        } */}
      <div data-testid="main"className="main-nav shadow-1 flex justify-content-between p-2 align-content-center">
        <LazyLoadImage src={logo}
          width={60} height={60}
          data-testid="logo"
          alt="PS Stream app"
        />
        { isUserLoggedIn &&
            <div className="searchdiv">
              <SearchBar/>
            </div>
        }
        {
          isUserLoggedIn &&<NotificationBell userId={isUserLoggedIn}/>
        } 
      </div>
        
        
      {/* </div> */}
    </>
  );
};

export default Header;