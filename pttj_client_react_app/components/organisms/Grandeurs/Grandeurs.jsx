import React, { useState }  from "react";
import {Card} from "primereact/card"
import { grandeurs } from "../../../constants/grandeurs.js";
import ToggleButton  from "../../atoms/buttons/GrandeursButton.jsx";
import CustomButton from "../../atoms/buttons/CustomButton.jsx";
import {useSelector} from "react-redux";
import axios from "axios";
import { gradeursApi } from "../../../constants/apiConstants.js";

/*
created by  : Sanjay Kumar G
description : this component is for categories that user can select after first login.
              props contain "close" which is a callback function used in Dialog component present in UserHome.jsx

*/
 
export default function Grandeurs({close}){
  const [categories,setCategories] = useState([...grandeurs]);
  const userId = useSelector(state=> state.user.userInfo.id)
  function submitGradeurs(){
    const payload = {
      "anime": categories[0].checked,
      "appDevelopment": categories[1].checked,
      "architecture": categories[2].checked,
      "art": categories[3].checked,
      "artificialIntelligence": categories[4].checked,
      "computerProgramming": categories[5].checked,
      "dance": categories[6].checked,
      "dataScience": categories[7].checked,
      "devops": categories[8].checked,
      "educational": categories[9].checked,
      "entertainment": categories[10].checked,
      "fashion": categories[11].checked,
      "grandeurId": userId,
      "graphicDesign": categories[12].checked,
      "health": categories[13].checked,
      "machineLearning": categories[14].checked,
      "music": categories[15].checked,
      "photography": categories[16].checked,
      "science": categories[17].checked,
      "sports": categories[18].checked,
      "technology": categories[19].checked,
      "user": {
        "userId": userId
      },
      "webDevelopment": categories[20].checked,
      "wildLife": categories[21].checked
    }
    axios.post(gradeursApi,payload)
      .then(res=>console.log("gradeursApi",res))
      .catch(err=>console.log("error granders",err));
    close();
  }

  function footer(){
    return(
      <div data-testid="buttontest">
        <CustomButton label="Skip" icon="pi pi-times" className="p-button-secondary mr-2" onClickHandler={()=>submitGradeurs()}/>
        <CustomButton label="Save" icon="pi pi-check" onClickHandler={()=>submitGradeurs()}/>
      </div>
    )
  } 

  function updateCategories(e,ind){
    setCategories(categories.map((category,index)=>{
      if(index!==ind)return category;
      return {...category, checked:e.target.value}
    }))
  }
  return(
    <Card className="bg-cyan-800 flex justify-content-center w-full " footer={footer}>
      {
        categories.map((category,index)=>{
          return <ToggleButton className="m-2"key={index} offLabel={category.label} onLabel={category.label} checked={category.checked} onChange={(e)=>updateCategories(e,index)}/>
        })
      }
    </Card>
  )
} 