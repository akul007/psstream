import React, {useState} from "react";
import "../ForgotPassword.css"
import axios from "axios";
import {setGlobalState, useGlobalState} from "../../../../context/GlobalState";
import CustomButton from "../../../atoms/buttons/CustomButton.jsx";
import InputField from "../../../atoms/textFields/InputField.jsx";
import {passwordResetURL} from "../../../../constants/apiConstants";
import logo from "../../../../assets/images/pslogo.jpg"
import { useNavigate } from "react-router-dom";


{
  /*
  created by  : Shubham Nimesh
  description : On this page user will be able to set new password.
  */

}

export default function PasswordReset(){
  const navigate = useNavigate();
  const [data,setData]=useState({
    password:"",
    confirmPassword:"",
    showPasswordMismatch:false,
    showSuccess:false,
    showServerError:false,
    loading:false
  })
  
  
  const username=useGlobalState("username");
  function handle(e){
    const newData={...data};
    newData[e.target.id]=e.target.value;
    setData(newData);
  }
  

  function submit(){
    setData({...data,loading:true});
    if(data.password===data.confirmPassword){
      axios.post(passwordResetURL,{password: data.password,userName:username[0]}).then(() =>{
        setData({
          password: "",
          confirmPassword: "",
          showSuccess:true,
          showPasswordMismatch:false,
          showServerError:false,
          loading: false
        })
        setTimeout(()=>{
          navigate("/");
        },1500)
        setGlobalState("username","")
        setGlobalState("globalOTP","")
      }).catch(()=>{
        setData({
          password: "",
          confirmPassword: "",
          showSuccess:false,
          showPasswordMismatch:false,
          showServerError:true,
          loading: false
        })
      })
      
    }else{
      setData({
        password: "",
        confirmPassword: "",
        showSuccess:false,
        showPasswordMismatch:true,
        showServerError:false,
        loading: false
      })
    }
  }

  return(
    <div className="flex align-items-center justify-content-center h-100hv mt-5">
      <div className="surface-card p-4 shadow-2 border-round w-full lg:w-4 m-8" >
        <div className="text-center mb-3">
          <img src={logo} alt="PS Stream app" className="h-2 w-2 mb-2"/>
          <div className="text-900 text-3xl font-medium mb-3">Set New Password.</div>
        </div>
        <div>
          <InputField id="password" value={data.password} type="password" className = "mb-2 w-full" onChange={(e)=>handle(e)} required={true} label="Enter Password"/>
        </div>
        <div>
          <InputField id="confirmPassword" type="password" label="Enter Password again"value={data.confirmPassword} className = "mb-2 w-full" onChange={(e)=>handle(e)} required={true} />
        </div>
        {
          //Password mismatch error
          data.showPasswordMismatch && (<div className="errorBox mb-2">
            <small className="p-error">Password Mismatch!!</small>
          </div>)
        }
        {
          //Internal server error
          data.showServerError && (<div className="errorBox mb-2">
            <small className="p-error">Internal server error! Please try again later</small>
          </div>)
        }
        {
          //Success notification
          data.showSuccess && (<div className="errorBox mb-2">
            <small className="text-600 font-small line-height-3">Password updated successfully.Please <a className="font-medium no-underline text-blue-500 cursor-pointer"href="/">login</a></small>
          </div>)
        }

        <div>
          <CustomButton label="Submit" className="mb-2 w-full" onClickHandler={()=> submit()} >
            {
              //Adds a spinner when processing
              data.loading && (<div className="spinner-border " role="status"/>)
            }
          </CustomButton>
          <CustomButton label="Back" icon="pi pi-arrow-left" iconPos="left" className="p-button-text" onClickHandler={()=>window.location.href = "/"}/>
        </div>
      </div>
    </div>
  );
}