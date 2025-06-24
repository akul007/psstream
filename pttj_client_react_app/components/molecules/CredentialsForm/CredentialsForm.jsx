import React,{useState} from "react";
import { useFormik } from "formik";
import InputText from "../../atoms/textFields/InputField.jsx";
import ToggleButton from "../../atoms/buttons/CustomToggleButton.jsx"
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import CustomButton from "../../atoms/buttons/CustomButton.jsx";


export default function CredentialsForm({setCredentialsData,backward,formData}){
  const [checked, setChecked] = useState(false);

  const formik = useFormik({

    initialValues: formData,

    validate: (data) => {
      let errors = {};
      if(data.password!==data.retypePassword){
        errors.retypePassword = "password is not matching"
      }
      if (!data.username) {
        errors.username = "Username is required";
      }
      if (!data.password) {
        errors.password = "Password is required.";
      }
      return errors;
    },
    onSubmit: (data) => {
      if(checked)data = {...data,isModerator:"PENDING"};
      setCredentialsData(data);
    }
  });

  //The below functions are used in displaying the errors

  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return(
    <div className="w-full">
      <div>
        <div className="field my-4">
          <span className="p-float-label">
            <InputText id="username" name="username" value={formik.values.username} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("username")})} />
            <label htmlFor="username" className={classNames({ "p-error": isFormFieldValid("username") })}>Username*</label>
          </span>
          {getFormErrorMessage("username")}
        </div>
        <div className="field my-4">
          <span className="p-float-label">
            <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask className={classNames({ "p-invalid": isFormFieldValid("password") })} header={passwordHeader} footer={passwordFooter} />
            <label htmlFor="password" className={classNames({ "p-error": isFormFieldValid("password") })}>Password*</label>
          </span>
          {getFormErrorMessage("password")}
        </div>
          
        <div className="field mt-4">
          <span className="p-float-label">
            <Password id="retypePassword" name="retypePassword" value={formik.values.retypePassword} onChange={formik.handleChange} toggleMask className={classNames({ "p-invalid": isFormFieldValid("retypePassword") })}  />
            <label htmlFor="retypePassword" className={classNames({ "p-error": isFormFieldValid("retypePassword") })}>Retype Password*</label>
          </span>
          {getFormErrorMessage("retypePassword")}
        </div>
        <div className="flex align-items-center my-4">
          <span className="text-600 mr-2 font-medium line-height-3">Do you want to be a moderator?</span>
          <ToggleButton className = "h-2rem m-1 w-5rem" checked={checked} onChange={(e) => setChecked(e.target.value)} onIcon="pi pi-check" offIcon="pi pi-times"  aria-label="Confirmation" />
        </div>
      </div>
      <div className="flex justify-content-between">
        <CustomButton type="button" label="Back" icon="pi pi-arrow-left" iconPos="left" className="mr-4 mb-2 w-auto " onClickHandler={()=>backward()} />
        <CustomButton type="button" label="Submit" className="ml-4 mb-2 w-auto " onClickHandler={formik.handleSubmit} />
      </div>
    </div>
  )
}