import React,{useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/organisms/loginForm/LoginForm.jsx";
import RegistrationForm from "./components/organisms/RegistrationForm/RegistrationForm.jsx";
import PasswordAssistance from "./components/molecules/ForgotPassword/PasswordAssistance/PasswordAssistance.jsx";
import VerificationPage from "./components/molecules/ForgotPassword/VerificationPage/VerificationPage.jsx"
import PasswordReset from "./components/molecules/ForgotPassword/PasswordReset/PasswordReset.jsx";
import TwoColumnLayout from "./components/templates/TwoColumnLayout/TwoColumnLayout.jsx";
import {useDispatch} from "react-redux";
import {fetchCMSLabelsData} from "./redux/actions/fetchCMSdata_action"
import UserHome from "./components/organisms/UserHome/UserHome.jsx";
import ProtectedRoute from "./components/ParentRoute/ProtectedRoute.jsx";
import ViewUserDetails from "./components/molecules/ViewUserDetails/ViewUserDetails.jsx";
import Logged from "./components/ParentRoute/Logged.jsx";
import Error from "./components/atoms/Error/Error.jsx";
import History from "./components/organisms/History/History.jsx";
import FollowingChannelGraph from "./components/molecules/FollowingChannelGraph/FollowingChannelGraph.jsx";
import VideoUploadForm from "./components/organisms/VideoUploadForm/VideoUploadForm.jsx";
import UsersByLocations from "./components/molecules/AdminReports/UsersByLocations/UsersByLocations.jsx"
import VideosByLocations from "./components/molecules/AdminReports/VideosByLocations/VideosByLocations.jsx"
import CategoryChannelCount from "./components/molecules/AdminReporting/CategoryChannelCount/CategoryChannelCount.jsx";
import PremiumVideosCount from "./components/molecules/AdminReporting/PremiumVideosCount/PremiumVideosCount.jsx";
import SuspendedAccount from "./components/molecules/AdminReporting/SuspendedAccountCount/SuspendedAccount.jsx"
import UserDetails from "./components/organisms/UserDetails/UserDetails.jsx"
import ChannelCreationForm from "./components/organisms/ChannelCreationForm/ChannelCreationForm.jsx"
import ChannelLanding from "./pages/channelLanding/ChannelLanding.jsx";
import SearchListComponent from "./components/organisms/SearchListComponent/SearchListComponent.jsx";
import UnlockUser from "./components/molecules/UnlockUser/UnlockUser.jsx";
import UpgradeUser from "./components/molecules/UpgradeUser/UpgradeUser.jsx";
import SuspendUser from "./components/molecules/SuspendUser/SuspendUser.jsx";
import ChannelStats from "./components/organisms/ChannelInsights/ChannelStats.jsx"
import ChannelOwnerLanding from "./pages/channelOwnerLanding/ChannelOwnerLanding.jsx";
import EditUserDetails from "./components/molecules/EditUserDetails/EditUserDetails.jsx";
import ModeratorHome from "./components/organisms/ModeratorHome/ModeratorHome.jsx";
import ViewVideoModerator from "./components/organisms/ViewVideoModerator/ViewVideoModerator.jsx";
import { VideoPlayingPage } from "./components/organisms/VideoPlayingPage/VideoPlayingPage.jsx";
import { ChannelOwnerList } from "./pages/ChannelOwnerList/ChannelOwnerList.jsx";
import ReviewComment from "./components/organisms/ReviewComment/ReviewComment.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCMSLabelsData())
  }, [])


  return (
    <React.Fragment>
      <BrowserRouter>
        <TwoColumnLayout>
          <Routes>
            <Route path = "/" element = {<Logged><LoginForm/></Logged>}/>
            <Route path = "/signup" element = {<RegistrationForm/>}/>
            <Route path = "/forgotpassword" element = {<PasswordAssistance/>}/>
            <Route path = "/VerificationPage" element = {<VerificationPage/>}/>
            <Route path="/PasswordReset" element = {<PasswordReset/>}/>
            <Route path = "/home" element = {<ProtectedRoute><UserHome/></ProtectedRoute>}/>
            <Route path = "/admin" element = {<ProtectedRoute><UserDetails/></ProtectedRoute>}/>
            <Route path = "/usersbylocations" element = {<ProtectedRoute><UsersByLocations/></ProtectedRoute>}/>
            <Route path = "/videosbylocations" element = {<ProtectedRoute><VideosByLocations/></ProtectedRoute>}/>
            <Route path=  "/ViewUserDetails" element= {<ProtectedRoute><ViewUserDetails/></ProtectedRoute>}/>
            <Route path = "/viewAllUsers" element = {<ProtectedRoute><UserDetails/></ProtectedRoute>}/>
            <Route path = "/createChannel" element = {<ProtectedRoute><ChannelCreationForm/></ProtectedRoute>}/>
            <Route path = "/categorychannelcount" element = {<ProtectedRoute><CategoryChannelCount/></ProtectedRoute>} />
            <Route path = "/premiumvideoscountperchannel" element = {<ProtectedRoute><PremiumVideosCount/></ProtectedRoute>}/>
            <Route path = "/suspendedaccounts" element = {<ProtectedRoute><SuspendedAccount/></ProtectedRoute>}/>
            <Route path="*" element={<Error />} />
            <Route path = "/moderator" element = {<ProtectedRoute><ModeratorHome/></ProtectedRoute>}/>
            <Route path = "/history" element = {<ProtectedRoute><History/></ProtectedRoute>} />
            <Route path = "/chart" element = {<ProtectedRoute><FollowingChannelGraph /></ProtectedRoute>}/>
            <Route path = "/videoUpload" element = {<ProtectedRoute><VideoUploadForm/></ProtectedRoute>} />
            <Route path="/channelLanding" element = {<ProtectedRoute><ChannelLanding/></ProtectedRoute>} />
            <Route path = "/searchList" element = {<ProtectedRoute><SearchListComponent/></ProtectedRoute>}/>
            <Route path = "/unlockUsers" element = {<ProtectedRoute><UnlockUser/></ProtectedRoute>}/>
            <Route path = "/upgradeUsers" element = {<ProtectedRoute><UpgradeUser/></ProtectedRoute>}/>
            <Route path = "/suspendingUsers" element = {<ProtectedRoute><SuspendUser/></ProtectedRoute>}/>
            <Route path= "/channelInsights" element={<ProtectedRoute><ChannelStats/></ProtectedRoute>}/>
            <Route path = "/suspendingUsers" element = {<ProtectedRoute><SuspendUser/></ProtectedRoute>}/>
            <Route path = "/channelOwnerLanding" element = {<ProtectedRoute><ChannelOwnerLanding/></ProtectedRoute>}/>
            <Route path = "/EditUserDetails" element = {<ProtectedRoute><EditUserDetails/></ProtectedRoute>}/>
            <Route path = "/ChannelOwnerList" element = {<ProtectedRoute><ChannelOwnerList/></ProtectedRoute>}/>
            <Route path = "/moderatorVideoPage/:videoId" element={<ProtectedRoute><ViewVideoModerator/></ProtectedRoute>} />
            <Route path = "/videoPlayingPage/:videoId" element={<ProtectedRoute><VideoPlayingPage/></ProtectedRoute>} />
            <Route path = "/offensiveComments" element = {<ProtectedRoute><ReviewComment/></ProtectedRoute>}/>
          </Routes>
        </TwoColumnLayout>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;