import React ,{useEffect, useState} from "react";
import axios from "axios";
import {Dropdown} from "primereact/dropdown";
import CustomButton from "../../../atoms/buttons/CustomButton.jsx";
import { allChannelCategories, getCategoryCount } from "../../../../constants/apiConstants";

/*
    Created by  : Sai Aravind.Y
    Description : This component has a dropdown menu of consisting of different categories of channels and onclicking search
    it will return number of channels available in that particular category.

*/

export default function CategoryChannelCount(){
  const[categoryChannelCountData,setCategoryChannelCountData]=useState({
    category:{},
    count:0,
    showResult:false
  })

  let categories=[]
  useEffect(()=>{
    axios.get(allChannelCategories)
      .then((res) => {
        
        const categoriesTemporary=res.data

        for (const item of categoriesTemporary) {
          categories.push({name:item,code:item})
        }
        
      })
      .catch(() => console.log("Server error"));
  });

  let url=getCategoryCount;
  function submit(){
    url=url+categoryChannelCountData.category.name;
    axios.get(url).then(res =>{
      setCategoryChannelCountData({
        category: {},
        count: res.data,
        showResult: true
      });
    }).catch(()=>{
      setCategoryChannelCountData({
        category: {},
        count: 0,
        showResult: false
      });
    })
  }

  function revertBack(){
    setCategoryChannelCountData({
      category: "",
      count:0,
      showResult: false
    })
  }

  return(
  
    <div className="flex align-items-center justify-content-center  mt-5">
      <div className="surface-card p-4 shadow-2 border-round w-5 h-4 m-4" >
        <div className="text-center mb-5">
          <div className="text-900 text-2xl font-small mb-3">Find channel count based on category</div>
        </div>
        {
          categoryChannelCountData.showResult?

            <div className="text-700 text-3xl font-small mb-3 " data-testid = "testcategorycount">
              <h5 className="text-center mb-4">Total channels in this category are:  {categoryChannelCountData.count}
              </h5>
            </div>
            :
            <div data-testid = "test-category">
              <Dropdown id="category"  optionLabel="name"  value={categoryChannelCountData.category} className = "mb-4 w-full" onChange={(e) => setCategoryChannelCountData({category: e.value})} options={categories} placeholder="Select a Category" required={true} />
            </div>
        }
        {
          categoryChannelCountData.showResult?
            <CustomButton id="continue" label="Back" className="mb-2 w-full mt-1.5" onClickHandler={()=> revertBack()} />
            :
            <CustomButton id="continue" label="Continue" className="mb-2 w-full mt-1.5" onClickHandler={()=> submit()} />

        }
      </div>
    </div>
  );
}

