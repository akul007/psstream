import React from "react";
import { useFormik } from "formik";
import InputText from "../../atoms/textFields/InputField.jsx";
import {Dropdown} from "primereact/dropdown";
import { genders } from "../../../constants/formData.js";
import { classNames } from "primereact/utils";
import CustomButton from "../../atoms/buttons/CustomButton.jsx";


export default function PersonalDetailsForm({setPersonalData,formData}){
  const formik = useFormik({
    initialValues: formData,

    validate: (data) => {
      let errors = {};
      if (!data.firstname) {
        errors.firstname = "first name is required.";
      }
      else if (!/^[A-Za-z]+$/i.test(data.firstname)) {
        errors.firstname = "Special characters are not permitted";
      }
      
      if (!data.lastname) {
        errors.lastname = "last name is required.";
      }
      else if (!/^[A-Za-z]+$/i.test(data.lastname)) {
        errors.lastname = "Special characters are not permitted";
      }
      
      if (!data.gender) {
        errors.gender = "please select gender";
      }

      if (!data.email) {
        errors.email = "Email is required.";
      }
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = "Invalid email address. E.g. example@email.com";
      }
      if (!/^[0-9]{10}$/i.test(data.phone)) {
        errors.phone = "Invalid mobile number. Must be 10 digits";
      }
      return errors;
    },
    onSubmit: (data) => {
      setPersonalData(data);
    }
  });

  //The below functions are used in displaying the errors

  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small data-testid={name} className="p-error">{formik.errors[name]}</small>;
  };

  return(
    <div className="w-full">
      <div>
        <div className="field my-4">
          <span className="p-float-label">
            <InputText data-testid="firstname" id="firstname" name="firstname" value={formik.values.firstname} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("fistname")})} />
            <label htmlFor="firstname" className={classNames({ "p-error": isFormFieldValid("firstname") })}>First name*</label>
          </span>
          {getFormErrorMessage("firstname")}
        </div>
        <div className="field my-4">
          <span className="p-float-label">
            <InputText id="middlename" name="middlename" value={formik.values.middlename} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("middlename") })} />
            <label htmlFor="middlename" className={classNames({ "p-error": isFormFieldValid("middlename") })}>Middle name</label>
          </span>
        </div>
        <div className="field my-4">
          <span className="p-float-label" >
            <InputText id="lastname" name="lastname" value={formik.values.lastname} onChange={formik.handleChange}  className={classNames({ "p-invalid": isFormFieldValid("lastname") })} />
            <label htmlFor="lastname" className={classNames({ "p-error": isFormFieldValid("lastname") })}>Last name*</label>
          </span>
          {getFormErrorMessage("lastname")}
        </div>
        <div className="field my-4">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-envelope" />
            <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("email") })} />
            <label htmlFor="email" className={classNames({ "p-error": isFormFieldValid("email") })}>Email*</label>
          </span>
          {getFormErrorMessage("email")}
        </div>
        <div className="field my-4">
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-phone" />
            <InputText id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("phone") })} />
            <label htmlFor="phone" className={classNames({ "p-error": isFormFieldValid("phone") })}>Mobile*</label>
          </span>
          {getFormErrorMessage("phone")}
        </div>
        
        <div className="field my-4">
          <span className="p-float-label">
            <Dropdown id="gender" name="gender" value={formik.values.gender} onChange={formik.handleChange} options={genders} optionLabel="name" className={classNames({ "p-error": isFormFieldValid("gender") })}/>
            <label htmlFor="gender" className={classNames({ "p-error": isFormFieldValid("gender") })}>Select gender*</label>
          </span>
          {getFormErrorMessage("gender")}
        </div>
      </div>
      <div className="flex justify-content-between">
        <CustomButton type="button" label="Next" icon="pi pi-arrow-right" iconPos="right" className="next mr-4 my-2 w-auto " onClickHandler={formik.handleSubmit} />
      </div>
    </div>
  )
}