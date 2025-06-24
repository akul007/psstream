import { Chart } from "primereact/chart";
import { fetchVideoCountryStats_action, fetchVideoStateStats_action } from "../../../../redux";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Dropdown } from "primereact/dropdown";

{
  /*
  This component consists of two graphs and a dropdown where one graph represents the videos
  count from different parts of the country.
  Above the first graph, we can see a dropdown there, where you can select a country.
  After selecting a country from the dropdown you will get all the videos count from different
  parts of the selected country.
 */
}

export default function VideosByLocations() {
  const stateData = useSelector(state => {
    return state.videoByState.all;
  })
  const countryData = useSelector(state => {
    return state.videoByCountry.all;
  })
  const[country,setCountry]=useState("");
  const dispatch = useDispatch();
  const clabels=[];
  const cdata=[];
  const slabels=[];
  const sdata=[];
  const[dropDownItems,setDropDownItems] = useState([]);

  const [stateChartData,setStateChartData] = useState({
    labels: slabels,
    datasets: [
      {
        data: sdata,
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

  const [chartData,setChartData] = useState({
    labels: clabels,
    datasets: [
      {
        data: cdata,
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
          color: "#495057"
        }
      }
    }
  });

  useEffect(() => {
    dispatch(fetchVideoCountryStats_action())
  }, [])

  

  useEffect(() => {
    dispatch(fetchVideoStateStats_action(country))
  }, [country])

  useEffect(() => {
    for(let i=0,j=0;i<stateData.length;i++){
      if(stateData[i].count!==0){
        slabels[j]=stateData[i].name;
        sdata[j]=stateData[i].count;
        j++;
      }
    }
    setStateChartData((data)=>{return{...data,labels:slabels,datasets: [
      {
        data: sdata,
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
  }, [stateData])

  useEffect(() => {
    for(let i=0,j=0;i<countryData.length;i++){
      if(countryData[i].count!==0){
        clabels[j]=countryData[i].name;
        cdata[j]=countryData[i].count;
        const duplicateDropdown = dropDownItems.some(data => data.value === countryData[i].name);
        if( !duplicateDropdown) setDropDownItems((data)=>[...data,{label:countryData[i].name,value:countryData[i].name}])
        j++;
      }
    }
    setChartData((data)=>{return{...data,
      labels: clabels,
      datasets: [
        {
          data: cdata,
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
  }, [countryData])



  return (
    <div className="flex justify-content-center">
      <div className="card flex align-items-center w-full mr-2">
        <h3 className="text-900 text-3x1 font-large mb-3 text-center mt-2">Video Statistics by Country</h3>
        <Chart type="pie" className="w-10 p-2" data={chartData} options={lightOptions}/>
      </div>
      <div className="card flex align-items-center justify-content-center w-full ml-2">
        <h3 className="text-900 text-3x1 font-large mb-3 text-center mt-2">Video Statistics by State</h3>
        <Dropdown value={country} options={dropDownItems} onChange={(e) => setCountry(e.value)} placeholder="Select a Country"/>
        {country&&<Chart type="pie" className="w-10 p-2" data={stateChartData} options={lightOptions}/>}
      </div>
      
    </div>
  )
}

                 