import React, {useState,useEffect} from "react";
import "./ViewUserDetails.css";
import { fetchUserProfile } from "../../../redux/index";
import { useSelector,useDispatch } from "react-redux";
import CustomButton from "../../atoms/buttons/CustomButton.jsx";
import FollowingChannelGraph from "../../molecules/FollowingChannelGraph/FollowingChannelGraph.jsx";
import { Dialog } from "primereact/dialog";
import ProfileSkeleton from "../../../skeletons/ProfileSkeleton.jsx";
{
/*
  created by  : Sai Krishna V
  description : This component returns user profile details
    This component calls an axios get call to using the userId stored 
    in session storage after a user logins as an valid user. 

    This component can be further modified to give the user to submit 
    a request to edit* their profile.
    *(some fields should be edited only after the verification like (email,phone number))
*/
}
const ViewUserDetails = () => {
  const userId = useSelector(state=> state.user.userInfo.id);
  const dispatch = useDispatch();
  const [userData,setUserData] = useState({
    userFirstName : "",
    userLastName : "",
    userPhoneNo : "",
    userEmail : "",
    userKarmaPoints : "",
    userCountry : "",
    userPinCode : "",
    userName : "",
    userModStatus:""
  })
  const [displayFollowingChart, setDisplayFollowingChart] = useState(false);
  const [position, setPosition] = useState("center");
  const dialogFuncMap = {
    "displayFollowingChart": setDisplayFollowingChart
  }

  const onClick = (name) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  }

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  }

  const userProfileData = useSelector(state => {
    return state.userProfile.all;
  })
  useEffect(()=>{
    dispatch(fetchUserProfile(userId));
  },[]);
  useEffect(() => {
    setUserData({
      userFirstName: userProfileData?.name?.firstName,
      userLastName: userProfileData?.name?.lastName,
      userPhoneNo: userProfileData?.phoneNo,
      userEmail:    userProfileData?.email,
      userKarmaPoints: userProfileData?.karmaPoints,
      userCountry: userProfileData?.address?.country,
      userPinCode: userProfileData?.address?.pincode,
      userName: userProfileData?.username,
      userFollowingChannelCount: userProfileData?.followingChannelsCount,
      userModStatus: userProfileData?.isModerator,
    })
  }, [userProfileData])
    

  return(
    <div className="view-user-details text-900">
      {!userData.userFirstName? <ProfileSkeleton className=" shadow-5  border-round w-full lg:w-8 m-2"/> :
        <><div className="surface-card p-4 shadow-5 blue-container flex border-round w-full lg:w-8 m-2">
          <div className="surface-card p-2 shadow-5 border-round w-full m-1">
            <label htmlFor="UserName" className="mr-2">Username</label>
            <h4 id="UserName">{userData.userName}</h4>
          </div>
          <div className="surface-card p-2 shadow-2 border-round w-full m-1">
            <label htmlFor="FullName">Full name</label>
            <h4 id="FullName">{userData.userFirstName + " " + userData.userLastName}</h4>
          </div>
        </div><div className="surface-card p-4 shadow-2 flex border-round w-full lg:w-8 m-2">
          <div className="surface-card p-2 shadow-2 border-round w-full m-1">
            <i className="pi pi-map-marker mr-2"></i>
            <label htmlFor="AddressL1">Address</label>
            <h4 id="Address">{userData.userCountry + ", " + userData.userPinCode}</h4>
          </div>
          <div className="surface-card p-2 shadow-2 border-round w-full m-1">
            <label htmlFor="ModStatus">Moderator Status</label>
            <h4 id="ModStatus">{userData.userModStatus}</h4>
          </div>
        </div><div className="surface-card p-4 shadow-2 flex border-round w-full lg:w-8 m-2">
          <div className="surface-card p-2 shadow-2 border-round w-full m-1">
            <i className="pi pi-phone mr-2"></i>
            <label htmlFor="PhoneNumber">Phone Number</label>
            <h4 id="PhoneNumber">{userData.userPhoneNo}</h4>
          </div>
          <div className="surface-card p-2 shadow-2 border-round w-full m-1">
            <i className="pi pi-envelope mr-2"></i>
            <label htmlFor="Email">Email</label>
            <h4 id="Email">{userData.userEmail}</h4>
          </div>
        </div><div className="surface-card p-4 shadow-2 flex border-round w-full lg:w-8 m-2">
          <div className="surface-card p-2 shadow-2 border-round w-full m-1">
            <label htmlFor="KarmaPoints">Karma points</label>
            <h4 id="KarmaPoints">{userData.userKarmaPoints}</h4>
          </div>
          <div className="surface-card p-2 shadow-2 border-round w-full m-1">
            <i className="video-icon pi pi-video mr-2"></i>
            <label htmlFor="FollowingCount">Following Channels</label>
            <CustomButton className="followingButton p-button-plain p-button-sm h-2rem" onClickHandler={() => onClick("displayFollowingChart")}>Count History</CustomButton>
            <Dialog visible={displayFollowingChart} className="dialog" onHide={() => onHide("displayFollowingChart")}>
              <FollowingChannelGraph />
            </Dialog>
            <h4 id="FollowingCount">{userData.userFollowingChannelCount}</h4>
          </div>
        </div></>}
    </div>
    
  );
}
export default ViewUserDetails