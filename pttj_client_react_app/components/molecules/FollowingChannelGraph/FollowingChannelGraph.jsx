import React, {useEffect,useState} from "react";
import { Chart } from "primereact/chart";
import { useSelector} from "react-redux";
import axios from "axios";
import "./FollowingChannelGraph.css"
import {followingChannelGraphUrl} from "../../../constants/apiConstants.js"

{/*
    Graph of count of channels user is following
    Count is saved every week.
    For creating line chart, we need some basic data for X(date) and Y(count) axis
    along with some variables like color of graph, lables, etc. This is created in basicData.
  */}
export default function FollowingChannelGraph (){
  let [data, setData] = useState([]);
  const currentUserId = useSelector(state=> state.user.userInfo.id);
  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = await axios.get(followingChannelGraphUrl+ currentUserId);
      setData(res.data);
    };
    fetchPosts();
  },[]);
    
  let basicData={
    labels: data?.map((s)=> s.followingChannelDate),
    datasets: [
      {
        label: "Following Channels",
        data: data?.map(s=> s.followingChannelCount),
        borderColor: "#42A5F5",
        tension: .4
      }
    ]
  };
    
  const getLightTheme = () => {
    let basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: .6,
      plugins: {
        legend: {
          labels: {
            color: "#495057"
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#495057"
          },
          grid: {
            color: "#ebedef"
          }
        },
        y: {
          ticks: {
            color: "#495057"
          },
          grid: {
            color: "#ebedef"
          }
        }
      }
    };
    return {
      basicOptions
    }
  }
    
  const basicOptions = getLightTheme();
  return (
    <div className="card followng-channel">
      <h5 data-testid="chartHeader">Following Channels Count</h5>
      <div data-testid="canvasDiv">
        <Chart data-testid="canvasId" type="line" data={basicData} options={basicOptions} />
      </div>
    </div>
  );
}