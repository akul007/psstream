import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChannelStats.css";
import BarChart from "./BarChart.jsx";
import { Card } from "primereact/card";
import { weeklySubscribersUrl, dailySubscribersUrl, weeklyViewsUrl, dailyViewsUrl, channelLandingApi } from "../../../constants/apiConstants";

const ChannelStats = (props) => {
  
  const[channel, setChannel]=useState(undefined);
  const channelId = props.channelId;

  useEffect(() => {
    const fetchChannelData = async () => {
      axios.get(channelLandingApi + channelId).then((res) => {
        setChannel(res.data);
      }).catch(
        err => console.log(err)
      );
    }
    fetchChannelData();
  }, [])
  
  return (
    <div data-testid="main">
      {channel?<div>
        <div className="channel-name" >
          <h3>Channel Name: {channel.channelName}</h3>
        </div>
        <div className="productcard" data-testid="WeeklySubs">

          <Card title="Weekly Subscribers In The Last Month">
            <BarChart type="Monthly"
              kind="Subscribers"
              baseUrl={weeklySubscribersUrl+channelId}/>
          </Card>
          
        
        </div>

        <div className="productcard">
          <Card title="Daily Subscribers In The Last Week">
            <BarChart type="Weekly"
              kind="Subscribers"
              baseUrl={dailySubscribersUrl+channelId}/>
          </Card>
        </div>
       

        <div className="productcard">
          <Card title="Weekly Views In The Last Month">
            <BarChart type="Monthly"
              kind="Views"
              baseUrl={weeklyViewsUrl+channelId}/>
          </Card>
        </div>

        <div className="productcard">
          <Card title="Daily Views In The Last Week">
            <BarChart type="Weekly"
              kind="Views"
              baseUrl={dailyViewsUrl+channelId}/>
          </Card>
        </div>

        
      </div>:null}
    </div>
  )
}

export default ChannelStats;
