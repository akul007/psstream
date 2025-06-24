import React, { useEffect, useState } from "react";
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement
)

const BarChart = (props) => {
 
  const [chartData, setChartData] = useState([]);
  
  var apiUrl = props.baseUrl;
  useEffect(() => {
    const fetchUserData = async () => {
      
      axios.get(apiUrl).then((res) => {
       
        setChartData(res.data);
       
      }).catch(
        err => console.log(err)
      );
    }
    fetchUserData();
  }, [])

  let xaxis= ["Week 1", "Week 2", "Week 3", "Week4"] 
  if(props.type==="Weekly") 
    xaxis=["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]


  let datakind= "Number of Subscribers" 
  if(props.kind==="Views") 
    datakind= "Number of Views"

  var data = {
    
    labels: xaxis,
    datasets: [{
      label: datakind,
      data: chartData,
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)"
      ],
      borderWidth: 1
    }]
  }

  var options = {
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontSize: 25,
      }
    }
  }


  return (
    <div data-testid="barChart">

      <Bar
        data={data}
        height={300}
       
        options={options}
      />
    </div>  
  )
}

export default BarChart;
