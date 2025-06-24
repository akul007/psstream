import { InputText } from "primereact/inputtext";
import axios from "axios";
import React,{useState} from "react";
import { registerUrl } from "../../../../constants/apiConstants";
import CustomButton from "../../../atoms/buttons/CustomButton.jsx";
/*
    Created by  : Sai Aravind.Y
    Description : This component return the number of suspended accounts of users over a specified time range in which the
                  From-date and To-date should be given as input in the form and click continue.

*/
export default function SuspendedAccount(){

  const[suspendedCountData,setSuspendedCountData]=useState({
    fromDate:"",
    toDate:"",
    count:0,
    showError:false,
    showResult:false,
    showServerError:false
  })
  
  function handle(e){
    const newData={...suspendedCountData};
    newData[e.target.id]=e.target.value;
    setSuspendedCountData(newData);
  }
  function submit(){
    const url=registerUrl+"/from/"+suspendedCountData.fromDate+"/to/"+suspendedCountData.toDate;
    if(suspendedCountData.fromDate > suspendedCountData.toDate){
      setSuspendedCountData({
        fromDate:"",
        toDate: "",
        count: 0,
        showError:true,
        showResult: false,
        showServerError: false
      })
    }else{
      axios.get(url).then(res =>{
        setSuspendedCountData({
          count: res.data,
          showError:false,
          showResult: true,
          showServerError: false
        })
      }).catch(()=>{
        setSuspendedCountData({
          fromDate:"",
          toDate: "",
          count: 0,
          showError:false,
          showResult: false,
          showServerError: true
        })
      })
    }
  }

  function revertBack(){
    setSuspendedCountData({
      fromDate: "",
      toDate: "",
      count: 0,
      showError: false,
      showResult: false
    })
  }

  return(
    
    <div className="flex align-items-center justify-content-center h-100hv mt-5" data-testid="suspendtest">
      <div className="surface-card p-4 shadow-2 border-round w-5 m-5">
        <div className="text-center mb-5">
          <div className="text-900 text-3x1 font-medium mb-3">Number of Suspended Users over a given time range</div>
        </div>
        {
          suspendedCountData.showResult?
            <div className="text-900 text-3x1 font-large mb-3 text-center">Total accounts suspended in this range are : {suspendedCountData.count}</div>
            :
            <div>
              <div className="text-600 text-2x1 font-medium">From Date:</div>
              <InputText id="fromDate" value={suspendedCountData.fromDate} className="mb-2 w-full" onChange={(e) => handle(e)} type="date" required autoComplete="off" />
              <div className="text-600 text-2x1 font-medium">To Date:</div>
              <InputText id="toDate" value={suspendedCountData.toDate} className="mb-2 w-full" onChange={(e) => handle(e)} type="date" required autoComplete="off" />
            </div>
        }

        {
          suspendedCountData.showError && (<div className="errorBox mb-2">
            <small className="p-error">From date cannot be after To date!!!!</small>
          </div>)
        }

        {
          suspendedCountData.showServerError && (<div className="errorBox mb-2">
            <small className="p-error">There is some error while fetching data from database, please try again later!</small>
          </div>)
        }
        <div>
          {
            suspendedCountData.showResult?
              <CustomButton id="continue" label="Back" className="mb-2 mt-1 w-full" onClickHandler={() => revertBack()}/>:
              <CustomButton id="continue" label="Search" className="mb-2 mt-1 w-full" onClickHandler={() => submit()}>
                {

                  suspendedCountData.loading && (<div className="spinner-border " role="status" />)
                }
              </CustomButton>
          }
        </div>
      </div>
    </div>
    
  );
}

