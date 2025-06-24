import React, {useState,useRef } from  "react";
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";
import { BlockUI } from "primereact/blockui";
import axios from "axios";
import PersonalDetailsForm from "../../molecules/PersonalDetailsForm/PersonalDetailsForm.jsx";
import AddressForm from "../../molecules/AddressForm/AddressForm.jsx";
import CredentialsForm from "../../molecules/CredentialsForm/CredentialsForm.jsx";
import "./RegistrationForm.css";
import "../loginForm/LoginForm.css"
import { stepItems,formData } from "../../../constants/formData.js";
import { registerUrl } from "../../../constants/apiConstants.js";
import logo from "../../../assets/images/pslogo.jpg"
import { useNavigate } from "react-router-dom";

export default function RegistrationForm(){
  const navigate = useNavigate();
  const [blocked, setBlocked] = useState(false);
  const toast = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const items = stepItems;
  const [formInfo , setFormInfo] = useState(formData);
  
  function updatePayload(data){
    setFormInfo(data);
    if(activeIndex<2)setActiveIndex(activeIndex+1);
    else submitForm(data);
  }

  function submitForm(data){
    setBlocked(true);
    const payload = {
      "address": {
        "city": data.city,
        "country": data.country,
        "pincode": data.pincode,
        "state": data.state,
        "street": data.street
      },
      "age": 0,
      "email": data.email,
      "gender": data.gender.code,
      "isModerator": data.isModerator,
      "karmaPoints": 3000,
      "name": {
        "firstName": data.firstname,
        "lastName": data.lastname,
        "middleName": data.middlename
      },
      "password": data.password,
      "phoneNo": data.phone,
      "roles": [
        {
          "id": 1,
          "name": "ROLE_USER"
        }
      ],
      "unsuccessfulLoginCount": 0,
      "usFk": 0,
      "username": data.username
    }
    axios.post(registerUrl,payload)
      .then((res) => {
        setBlocked(false);
        showSuccess(res.data);
        setTimeout(()=>{
          navigate("/");
        },1500)
        setFormInfo(formData)})
      .catch((error) => {console.log("payload",payload);setBlocked(false);showError(error.response.data)});
    
  }



  //showSuccess and showError are to show messages in toast after submitting the form
  const showSuccess = (message) => {
    toast.current.show({ severity: "success", summary: "Success", detail: message+" Please login!", life: 3000 });
  }

  const showError = (message) => {
    toast.current.show({ severity: "error", summary: "Error", detail: message, life: 3000 });
  }

  return (
    <div className="form-demo mb-5 my-auto">
      <BlockUI blocked={blocked} fullScreen/>
      <Steps className = "mx-8 my-3 "  model={items} activeIndex={activeIndex}  readOnly={true}/>
      <div className="flex align-items-center justify-content-center">
        <div className="surface-card p-4 shadow-2 border-round lg:w-4">
          <div className="formHeader text-center mb-4">
            <img src={logo} alt="PS Stream app" className="h-2 w-2 mb-2"/>
            <div className="text-900 text-2xl font-medium mb-3">Welcome to PS stream</div>
            <span className="text-600 font-medium line-height-3">Already have an account?</span>
            <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" href="/">Login!</a>
          </div>
          <form className=" border-transparent flex justify-content-center p-fluid  w-full">

            {activeIndex === 0 && <PersonalDetailsForm formData = {formInfo} setPersonalData={(data)=>updatePayload(data)}/>}

            {activeIndex === 1 && <AddressForm formData = {formInfo} backward={()=>setActiveIndex(activeIndex-1)} setAddressData={(data)=>updatePayload(data)}/>}

            {activeIndex >= 2 && <CredentialsForm formData = {formInfo} backward={()=>setActiveIndex(activeIndex-1)} setCredentialsData={(data)=>updatePayload(data)}/>}
                      
          </form>
          <Toast ref={toast} />
        </div>
      </div>

    </div>
  );
}