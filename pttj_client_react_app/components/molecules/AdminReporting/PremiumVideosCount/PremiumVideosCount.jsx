import axios from "axios";
import React ,{useEffect, useState} from "react";
import {Dropdown} from "primereact/dropdown";
import CustomButton from "../../../atoms/buttons/CustomButton.jsx";
import { channelapi, videoApi } from "../../../../constants/apiConstants";
/*
    Created by  : Sai Aravind.Y
    Description : This component has all channels in the dropdown and search functionality in that dropdown and select
                  particular channel and get the premium videos count in that particular channel

*/
export default function PremiumVideosCount(){
  const allChannels= channelapi+"/channels/all";
  

  const[premiumVideoCountData,setPremiumVideoCountData]=useState({
    channel:"",
    count:0,
    showError:false,
    showResult:false
  })

  let channels=[]
  useEffect(()=>{

    axios.get(allChannels)
      .then((res) => {
        const categories=res.data
        for(let i=0;i<categories.length;i++){
          channels.push({name:categories[i],code:categories[i]})
        }
      })
      .catch((error) => console.log(error));
  });
  
  function submit(){
    const url=videoApi+"/channel/"+premiumVideoCountData.name.name;
    axios.get(url).then(res =>{
      setPremiumVideoCountData({
        channel:"",
        count: res.data,
        showError: false,
        showResult: true
      });
    }).catch(()=>{
      setPremiumVideoCountData({
        channel:"",
        count:0,
        showError: true,
        showResult: false
      });
    })

  }
  function revertBack(){
    setPremiumVideoCountData({
      channel: "",
      count:0,
      showError: false,
      showResult: false})
  }
  return(
    <div className="flex align-items-center justify-content-center mt-5">
      <div className="surface-card p-4 shadow-2 border-round w-6 m-4" >
        <div className="text-center mb-5">
          <div className="text-900 text-3xl font-medium mb-3">Find total premium videos for a channel.</div>
          {
            !premiumVideoCountData.showResult && (<span className="text-900 text-center">Select the channel name from the dropdown below and click search.</span>)
          }
        </div>
        {
          premiumVideoCountData.showResult?
            <div className="text-900 mb-3">
              <div className="text-center text-xl">Total premium videos for this channel : {premiumVideoCountData.count}
              </div>
            </div>
            :<div data-testid = "test-allchannels">
              <Dropdown id="channel" optionLabel="name" filter value={premiumVideoCountData.channel} className = "mb-4 w-full" onChange={(e) => setPremiumVideoCountData({name: e.value})} options={channels} placeholder="Select a Channel" required={true} >
              </Dropdown>
            </div>
        }
        {
          //Shows error when no premium videos for this channel
          premiumVideoCountData.showError && (<div className="errorBox mb-2">
            <small className="p-error">No premium videos in this channel</small>
          </div>)
        }
        <div>
          {
            premiumVideoCountData.showResult?
              <CustomButton id="continue" label="Back" className="mb-2 w-full" onClickHandler={()=> revertBack()} />
              :<CustomButton id="continue" label="Search" className="mb-2 w-full" onClickHandler={()=> submit()} />
          }
        </div>
      </div>
    </div>
  );
}

