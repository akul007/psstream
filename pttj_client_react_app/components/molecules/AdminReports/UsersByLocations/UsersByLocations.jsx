import { Chart } from "primereact/chart";
import { fetchUserCountryStats_action, fetchUserStateStats_action } from "../../../../redux";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Dropdown } from "primereact/dropdown";

{
  /*
  This component consists of two graphs and a dropdown where one graph represents the users
  count from different parts of the country.
  Above the first graph, we can see a dropdown there, where you can select a country.
  After selecting a country from the dropdown you will get all the users count from different
  parts of the selected country.
 */
}

export default function UsersByLocations() {
  const statewiseUserData = useSelector(state => {
    return state.userByState.all;
  })
  const countrywiseUserData = useSelector(state => {
    return state.userByCountry.all;
  })
  const[country,setCountry]=useState("");
  const dispatch = useDispatch();
  const countryUserLabels=[];
  const countryUserData=[];
  const stateUserLabels=[];
  const stateUserData=[];
  const[userDropDownItems,setUserDropDownItems] = useState([]);

  const [stateUserChartData,setStateUserChartData] = useState({
    labels: stateUserLabels,
    datasets: [
      {
        data: stateUserData,
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FFA726"
        ],
        hoverBackgroundColor: [
          "#64B5F6",
          "#81C784",
          "#FFB74D"
        ]
      }
    ]
  });

  const [chartUserData,setChartUserData] = useState({
    labels: countryUserLabels,
    datasets: [
      {
        data: countryUserData,
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FFA726"
        ],
        hoverBackgroundColor: [
          "#64B5F6",
          "#81C784",
          "#FFB74D"
        ]
      }
    ]
  });
  

  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#ffffff"
        }
      }
    }
  });

  useEffect(() => {
    dispatch(fetchUserCountryStats_action())
  }, [])

  

  useEffect(() => {
    dispatch(fetchUserStateStats_action(country))
  }, [country])

  useEffect(() => {
    for(let i=0,j=0;i<statewiseUserData.length;i++){
      if(statewiseUserData[i].count!==0){
        stateUserLabels[j]=statewiseUserData[i].name;
        stateUserData[j]=statewiseUserData[i].count;
        j++;
      }
    }
    setStateUserChartData((data)=>{return{...data,labels:stateUserLabels,datasets: [
      {
        data: stateUserData,
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FFA726"
        ],
        hoverBackgroundColor: [
          "#64B5F6",
          "#81C784",
          "#FFB74D"
        ]
      }
    ]}})
  }, [statewiseUserData])

  useEffect(() => {
    for(let i=0,j=0;i<countrywiseUserData.length;i++){
      if(countrywiseUserData[i].count!==0){
        countryUserLabels[j]=countrywiseUserData[i].name;
        countryUserData[j]=countrywiseUserData[i].count;
        const duplicateCountryDropdown = userDropDownItems.some(data => data.value === countrywiseUserData[i].name);
        if( !duplicateCountryDropdown) setUserDropDownItems((data)=>[...data,{label:countrywiseUserData[i].name,value:countrywiseUserData[i].name}])
        j++;
      }
    }
    setChartUserData((data)=>{return{...data,
      labels: countryUserLabels,
      datasets: [
        {
          data: countryUserData,
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726"
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784",
            "#FFB74D"
          ]
        }
      ]}})
  }, [countrywiseUserData])



  return (
    <div className="flex justify-content-around">
      <div className="card flex align-items-center w-full mr-2">
        <h3 className="text-900 text-3x1 font-large mb-3 text-center mt-2">User Statistics by Country</h3> 
        <Chart type="pie" className="w-10 p-2" data={chartUserData} options={lightOptions} />
      </div>
      <div className="card flex align-items-center justify-content-center w-full ml-2">
        <h3 className="text-900 text-3x1 font-large mb-3 text-center mt-2">User Statistics by State</h3>
        <Dropdown value={country} options={userDropDownItems} onChange={(e) => setCountry(e.value)} placeholder="Select a Country"/>
        {country&&<Chart className="w-10 p-2" type="pie" data={stateUserChartData} options={lightOptions}/>}
      </div> 
      
    </div>
  )
}

                 