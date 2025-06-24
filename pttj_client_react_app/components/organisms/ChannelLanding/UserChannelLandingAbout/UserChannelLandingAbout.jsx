import React from "react";
import "./UserChannelLandingAbout.css"
{
/*
this portion will come on about section of channel landing page. It will give description and stats of
a particular channel
*/ 
}
const UserChannelLandingAbout = ({data})=>{

  return(
    <div className="about-items">
      <div className="description-items aboutcontainer-item">
        <div className="para-items">
          <h3>Description</h3>
          <p>{data?.description}</p>
        </div>
      </div>
      <div className="stats-items aboutcontainer-item">
        <h3>Stats</h3>
        <ul className="list-item">
          <li>Total Subscriber : {data?.subscribersCount}</li>
          <li>Total Follower : {data?.followersCount}</li>
        </ul>
        <h5>Karmapoints: {data?.karmaPoints}</h5>
      </div>
    </div>
  )
}

export default UserChannelLandingAbout;