import React,{useState,useEffect } from "react";
import { Card } from "primereact/card";
import {fetchUserChannels} from "../../redux"
import {useSelector, useDispatch} from "react-redux"
import ChannelOwnerLanding from "../channelOwnerLanding/ChannelOwnerLanding.jsx";
import { setChannelId } from "../../redux/actions/channelId_action";
import "./ChannelOwnerList.css"

export const ChannelOwnerList = ()=>{
  const dispatch = useDispatch();
  const userId = useSelector(state=> state.user.userInfo.id);
  const channels = useSelector(state=> state.userChannels.channels);
  const [channelId,setChannel] =useState(null);
  
  useEffect(()=>{
    dispatch(fetchUserChannels(userId));
  },[])
  return (
    <div data-testid="containertest">
      { Object.keys(channels).length === 0 ? <div> You have not created any channels</div> : 
        <div className="flex">
          {
            channels.map((channel,index)=>{
              return <Card key={index} className=" mr-2 flex"  onClick={()=>{dispatch(setChannelId(channel.channelId));setChannel(channel.channelId)}}>
                <div className="flex align-content-center">
                  <div className="channellogo-item m-2">
                    <img className="mb-2 " src={channel.channelLogo} onError={(e) => e.target.src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"} alt="" />
                  </div>
                  <span className="overflow-hidden my-auto mr-2">{channel.channelName}</span>
                </div>
              </Card>
            })
          }
        </div>
      }
      {channelId &&  <ChannelOwnerLanding channelId={channelId}/>}
    </div>
  )

      
}