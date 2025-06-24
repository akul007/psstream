import React,{useState,useEffect} from "react"; 
import { channelLandingApi } from "../../constants/apiConstants.js";
import { TabView, TabPanel } from "primereact/tabview";
import "./ChannelOwnerLanding.css"
import UserChannelLandingAbout from "../../components/organisms/ChannelLanding/UserChannelLandingAbout/UserChannelLandingAbout.jsx";
import axios from "axios";
import RecentlyUploadedSection from "../../components/organisms/ChannelLanding/RecentlyUploadedSection/RecentlyUploadedSection.jsx";
import MostViewedSection from "../../components/organisms/ChannelLanding/MostViewedSection/MostViewedSection.jsx";
import VideoUploadForm from "../../components/organisms/VideoUploadForm/VideoUploadForm.jsx";
import ChannelStats from "../../components/organisms/ChannelInsights/ChannelStats.jsx";

// import VideoUploadForm from "../../components/organisms/VideoUploadForm/VideoUploadForm.jsx";
{
  /*
  Whenever user searches channel in the search bar, then on clicking on respective channel
  this channel landing page will come 
 */
}
const ChannelOwnerLanding = ({channelId})=>{

  const[data,setData] = useState({});
  useEffect(() => {
    axios.get(`${channelLandingApi}${channelId}`)
      .then((response) => {
        setData(response.data)
      })
      .catch((err) => console.log(err)); 
    
  }, [channelId]);





  return(
    <>
      <div data-testid="containertest" className="container1-item flex justify-content-center justify-content-between mt-4">
        <div className="channellogo-item mr-2 flex">
          <img src={data.channelLogo} onError={(e) => e.target.src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"} alt="channel logo" />
          <h2 className="m-2">{data.channelName}</h2>
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
            <TabPanel  header="Upload">
              <div className="aboutsection-item">
                <VideoUploadForm channel={channelId}></VideoUploadForm>
              </div>
            </TabPanel>
            <TabPanel  header="Insights">
              <div className="aboutsection-item">
                <ChannelStats channelId={channelId}></ChannelStats>
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </>
  )
}

export default ChannelOwnerLanding;