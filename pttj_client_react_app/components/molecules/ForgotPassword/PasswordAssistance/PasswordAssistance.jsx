import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {setGlobalState} from "../../../../context/GlobalState";
import InputField from "../../../atoms/textFields/InputField.jsx";
import {otpUrl} from "../../../../constants/apiConstants";
import CustomButton from "../../../atoms/buttons/CustomButton.jsx";
import logo from "../../../../assets/images/pslogo.jpg"
{
  /*
  created by  : Shubham Nimesh
  description : This component asks user for their user ID and then sends OTP on email of user
                On successful verification,the page is redirected to Verification Page
  */

}

export default function PasswordAssistance(){
  
  const navigate=useNavigate();
  const[data,setData]=useState({
    username:"",
    showError:false,
    loading:false
  })

  function handle(e){
    const newData={...data};
    newData[e.target.id]=e.target.value;
    setData(newData);
  }

  function submit(){
    setData({...data,loading:true});
    axios.get(`${otpUrl}${data.username}`).then(res =>{
      setData({...data,loading:false});
      setGlobalState("globalOTP",res.data);
      setGlobalState("username",data.username);
      setData({username:""});
      navigate("../VerificationPage")
    }).catch(()=>{
      setData({...data,loading:false});
      setData({showError:true});
    })
  }


  return(
    <div className="flex align-items-center justify-content-center h-100hv mt-5">
      <div className="surface-card p-4 shadow-2 border-round w-full lg:w-4 m-8" >
        <div className="text-center mb-3">
          <img src={logo} alt="PS Stream app" className="h-2 w-2 mb-2"/>
          <div className="text-900 text-3xl font-medium mb-3">Password Assistance</div>
          <span className="text-600 font-medium line-height-3"> Enter the Email or username associated with your account.</span>
        </div>
        <div>
          <InputField id="username"  type="text" className = "mb-2 w-full" onChange={(e)=>handle(e)} required={true} label="Username"/>
        </div>
        {
          //Shows error when user id is not found
          data.showError && (<div className="errorBox mb-2">
            <small className="p-error">Username is not found</small>
          </div>)
        }

        <div>
          <CustomButton id="continue" label="Continue" className="mb-2 w-full" onClickHandler={()=> submit()} >
            {
              //Adds a spinner when processing
              data.loading && (<div className="spinner-border " role="status"/>)
            }
          </CustomButton>
        </div>
        <CustomButton label="Back" icon="pi pi-arrow-left" iconPos="left" className="p-button-text" onClickHandler={()=>window.location.href = "/"} />
      </div>
    </div>
  );
}

