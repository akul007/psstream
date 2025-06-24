import React,{useState,useEffect} from "react"; 
import { channelLandingApi,follow,subscribe  } from "../../constants/apiConstants";
import { TabView, TabPanel } from "primereact/tabview";
import CustomButton from "../../components/atoms/buttons/CustomButton.jsx";
import "./ChannelLanding.css"
import UserChannelLandingAbout from "../../components/organisms/ChannelLanding/UserChannelLandingAbout/UserChannelLandingAbout.jsx";
import axios from "axios";
import RecentlyUploadedSection from "../../components/organisms/ChannelLanding/RecentlyUploadedSection/RecentlyUploadedSection.jsx";
import MostViewedSection from "../../components/organisms/ChannelLanding/MostViewedSection/MostViewedSection.jsx";
import InlineMessage from "../../components/atoms/inlineMessages/InlineMessage.jsx";
import { useSelector } from "react-redux";
{
  /*
  Whenever user searches channel in the search bar, then on clicking on respective channel
  this channel landing page will come 
 */
}
const ChannelLanding = ()=>{

  const[data,setData] = useState({});
  const[followState,setFollowState] = useState() ;
  const[subscribeState,setSubscribeState] = useState(false) ;
  const[error,setError]=useState(false);
  const[success,setSuccess]=useState(false);
 
  useEffect(() => {
    loadUsersData();       //for channel data
    checkFollow();         //for followers
    checkSubscribe();      //for subscribers
  }, []);
  const userId = useSelector(state =>{
    return state.user.userInfo.id;
  })
  const channelId  = useSelector(state =>{
    return state.channelId.channelId;
  })

  //Check if User is subscribed to this channel
  const checkSubscribe = () => {
    return axios.get(`${subscribe}/${userId}/${channelId}`)
      .then((response)=>{
        if((response.data)=="False")
          setSubscribeState(false)
        else
          setSubscribeState(true)
      })
      .catch((err) => console.log(err))
  }

  const subscribeObject = {
    "channelId": channelId,
    "subscribed_date":0,
    "userId": userId
  }

  //On click functionality for subscribe button
  const subscribeClick = async () =>{
    return await axios.post(subscribe , subscribeObject)
      .then(()=>{
        setSubscribeState(!subscribeState) 
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err)
        setError(true);
      })
  }

  //On click functionality for unsubscribe button
  const unsubscribeClick = async () =>{
    return await axios.put(`${subscribe}/${userId}/${channelId}`)
      .then(()=>{
        setSubscribeState(!subscribeState) 
      })
      .catch((err) => {
        console.log(err)
      })
  }


  //Check if User is following this channel
  const checkFollow = () => {
    return axios.get(`${follow}/${userId}/${channelId}`)
      .then((response)=>{
        if((response.data)=="False")
          setFollowState(false)
        else
          setFollowState(true)
      })
      .catch((err) => console.log(err))
  }

  const followObject = {
    "channelId": channelId,
    "followingDate":0,
    "userId": userId
  }

  //On click functionality for follow button
  const followClick = async () =>{
    return await axios.post(follow , followObject)
      .then(()=>{
        setFollowState(!followState) 
      })
      .catch((err) => {
        console.log(err)
      })
        
  }

  //On click functionality for unfollow button
  const unfollowClick = async () =>{
    return await axios.delete(`${follow}/${userId}/${channelId}`)
      .then(()=>{
        setFollowState(!followState) 
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
      
  const loadUsersData = async () =>{
    return axios.get(`${channelLandingApi}${channelId}`)
      .then((response) => {
        
        setData(response.data)
      })
      .catch((err) => console.log(err));
  }; 

  return(
    <div>
      <div data-testid="containertest" className="container1-item flex justify-content-center justify-content-between ">
        <div className="channellogo-item mr-2 flex">
          <img src={data.channelLogo} onError={(e) => e.target.src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"} alt="channel logo" />
          <h2 className="m-2">{data.channelName}</h2>
        </div>
        <div className="flex my-auto">
          <CustomButton onClickHandler={followState ? unfollowClick : followClick} 
            className={followState?"unfollow-item":"follow-item"} label={followState ? "Unfollow" : "Follow"  }>
          </CustomButton> 
          <CustomButton id="subscribe-button" onClickHandler={subscribeState ? unsubscribeClick : subscribeClick} 
            className={subscribeState?"unsubscribe-item":"subscribe-item"} label={subscribeState ? "Unsubscribe" : "Subscribe"  }>
          </CustomButton> 
          <div className="Inline-message">
            {success?(<InlineMessage severity="success" text="You have successfully subscribed to this channel"/>):null}
          </div>
          <div className="Inline-message">
            {error?(<InlineMessage severity="warn" text="You do not have enough Karma Points"/>):null}
          </div>
        </div>
      </div>
      <div className="container2-item flex justify-content-center">
        <div className="card w-full">
          <TabView data-testid="tabpaneltest">
            <TabPanel  className="homecontainer-item" header="Home">
              <div className="recentlyuploadedsection-item">
                <RecentlyUploadedSection/>
              </div>          
              <div className="mostviewedsection-item">
                <MostViewedSection/> 
              </div>
            </TabPanel>
            <TabPanel  header="About">
              <div className="aboutsection-item">
                <UserChannelLandingAbout data={data}/>
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  )
}

export default ChannelLanding;