import React,{useEffect, useState} from "react";
import { VideoCard } from "../../molecules/VideoCard";
import { useSelector,useDispatch } from "react-redux";
import { fetchGlobalVideos } from "../../../redux";
import { fetchChannelVideos } from "../../../redux";
import { fetchGrandeurVideos } from "../../../redux";
import { Dialog } from "primereact/dialog";
import Grandeurs from "../Grandeurs/Grandeurs.jsx";
import { gradeursApi } from "../../../constants/apiConstants.js";
import "./UserHome.css"
import axios from "axios";

/**
 * 
 * This component consists of all components to be displayed on the content part of the user home page. 
 * For now, we are displaying the Video recommendations grid.
 * In future, we can also add a side bar and some other options such as sorting and filters for video 
 * in this component.
 */

export default function UserHome(){
  const userId = useSelector(state=> state.user.userInfo.id);
  const [visible,setVisible] = useState(true);
  const dispatch = useDispatch();
  const [emptyGlobalVideos] = useState("loading");
  const [emptyChannelVideos] = useState("loading");
  const [emptyGrandeurVideos] = useState("loading");
  
  useEffect(() => {
    axios.get(gradeursApi+userId)
      .then(res=>{setVisible(res.data)})
      .catch(err=>console.log(err));
    dispatch(fetchGlobalVideos(userId));
    dispatch(fetchChannelVideos(userId));
    dispatch(fetchGrandeurVideos(userId))
  }, [userId])

  const globalvideos = useSelector(state => {
    return state.globalvideos.all;
  })

  const channelvideos = useSelector(state => {
    return state.channelvideos.all;
  })

  const grandeurvideos = useSelector(state => {
    return state.grandeurvideos.all;
  })

  return(
    <div data-testid="test">
      <Dialog  header="Tell us what you&apos;re interested in" draggable={false} visible={!visible} breakpoints={{"960px": "75vw", "640px": "100vw"}} onHide={()=>setVisible(true)} style={{ width: "50vw",padding:"0px" }} >
        <Grandeurs close={()=>setVisible(true)}/>
      </Dialog>
      <div className="recommendations">
        <VideoCard videos = {globalvideos} emptyMessage= {emptyGlobalVideos} title = {"Global Trending videos"}/>
        {channelvideos.length != 0? <VideoCard videos = {channelvideos} emptyMessage= {emptyChannelVideos} title = {"Videos based on your subscriptions"}/> : null }
        {grandeurvideos.length != 0? <VideoCard videos = {grandeurvideos} emptyMessage= {emptyGrandeurVideos} title = {"Videos based on your granduer preferences"}/> : null }
      </div>
    </div>
  )
}




