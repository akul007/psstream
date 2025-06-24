import React,{useState} from "react";
import "../ForgotPassword.css"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {setGlobalState, useGlobalState} from "../../../../context/GlobalState";
import InputField from "../../../atoms/textFields/InputField.jsx";
import CustomButton from "../../../atoms/buttons/CustomButton.jsx";
import {otpUrl} from "../../../../constants/apiConstants";
import logo from "../../../../assets/images/pslogo.jpg"

//On this page user will enter their OTP for verification
export default function VerificationPage(){
  const navigate=useNavigate();
  const[data,setData]=useState({
    otp:"",
    showError:false
  })

  function handleChange(e){
    setData({...data,otp:e.target.value})
  }

  const GlobalOTP=useGlobalState("globalOTP");
  const username=useGlobalState("username");
  function submit(){
    if(GlobalOTP[0].toString() === data.otp.toString()){
      navigate("../PasswordReset")
    }else{
      setData({showError:true,otp:""});
    }
  }

  function getNewOTP(){
    axios.get(`${otpUrl}${username[0]}`).then(res =>{
      setGlobalState("globalOTP",res.data);
    }).catch(()=>{
      setData({showError:true});
    })
    setData({otp:""});
  }


  return(
    <div className="flex align-items-center justify-content-center h-100hv mt-5">
      <div className="surface-card p-4 shadow-2 border-round w-full lg:w-4 m-8" >
        <div className="text-center mb-3">
          <img src={logo} alt="PS Stream app" className="h-2 w-2 mb-2"/>
          <div className="text-900 text-3xl font-medium mb-3">Verification Required</div>
          <span className="text-600 font-medium line-height-3"> To continue complete this verification step. We have sent you the OTP on your registered email and mobile number.</span>
        </div>
        <div>
          <InputField id="otp"  type="text" className = "mb-2 w-full" onChange={(e)=>handleChange(e)} required={true} label="Enter OTP"/>
        </div>
        {
          //Shows error when user id is not found
          data.showError && (<div className="errorBox mb-2">
            <small className="p-error">Wrong OTP!! Cannot Proceed</small>
          </div>)
        }

        <div>
          <CustomButton label="Verify" className="mb-2 w-full" onClickHandler={()=> submit()} >
            {
              //Adds a spinner when processing
              data.loading && (<div className="spinner-border " role="status"/>)
            }
          </CustomButton>
        </div>
        <div className="flex justify-content-center">
          <CustomButton className="mb-2 w-4" onClickHandler={()=>getNewOTP()} label="Resend OTP?"/>
        </div>
        <CustomButton label="Back" icon="pi pi-arrow-left" iconPos="left" className="p-button-text" onClickHandler={()=>window.location.href = "/"}/>
      </div>
      
    </div>
  
  );
}