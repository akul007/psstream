import React, { useState, useEffect, useRef } from "react";
import { SelectButton } from "primereact/selectbutton";
import axios from "axios";
import { useSelector } from "react-redux";
import { likeDislikeResponseUrl } from "../../../constants/apiConstants";
import { Toast } from "primereact/toast";

/*
* Emojis component expects a parameter videoId
* of the video for which we want to show Like and Dislike button
* After clicking on Like/Dislike, it updates the user's response on backend
*/

export const Emojis = ({incLikes, decLikes}) => {
  
  const video = useSelector(state => state.videoPlay.video);
  const userId = useSelector(state=> state.user.userInfo.id);
  const [response, setResponse] = useState({});
  const [value, setValue] = useState(null);
  const toast = useRef(null);

  useEffect(() =>{
    populateResponse();
  }, []);

  const populateResponse = async () =>{
    return await axios
      .get(`${likeDislikeResponseUrl}/${userId}/${video?.videoId}`)
      .then((res) => {
        setResponse(res.data)
        if(res.data !== "not reviewed"){
          if(res.data.type === "LIKE"){
            setValue("like");
          } else {
            setValue("dislike");
          }
        } else {
          setValue(null);
        } 
      })
      .catch(err=> console.log(err));
  };

 
  const justifyOptions = [
    {icon: "pi pi-thumbs-up", value: "like"},
    {icon: "pi pi-thumbs-down", value: "dislike"}
  ];

  const handleChange = (e) =>{
    
    let data = {...response};

    data.videoId = video.videoId;
    data.userId = userId;

    if(e.value === "like"){
      data.type = "LIKE";
    
      incLikes();

      axios.post(`${likeDislikeResponseUrl}/`, data)
        .then((response)=>{
          setResponse(response.res.data)
          toast.current.show({severity:"info", summary: "You liked this video", detail:"", life: 1000})})
        .catch(err=> console.log(err))
      
    } 
    else if(e.value === "dislike") {
      data.type = "DISLIKE";

      if(value === "like"){
        decLikes();
      }

      axios.post(`${likeDislikeResponseUrl}/`, data)
        .then((response)=>{
          setResponse(response.res.data)
          toast.current.show({severity:"info", summary: "You disliked this video", detail:"", life: 1000})})
        .catch(err=> console.log(err))
      
    } 


    if(e.value === null){

      if(value === "like"){
        decLikes();
      }
      
      axios.delete(`${likeDislikeResponseUrl}/${userId}/${video.videoId}`)
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err));
    }
    setValue(e.value);
    
  }

  const justifyTemplate = (option) => {
    return <i className={option.icon}></i>;
  }

  return (
    <div data-testid="like-dislike">
      <Toast ref={toast} />
      <div className="card" >
        <SelectButton className="p-button-outlined" value={value} options={justifyOptions} onChange={(e) => handleChange(e)} itemTemplate={justifyTemplate} optionLabel="value" />
      </div>
    </div>
  );
}
                 