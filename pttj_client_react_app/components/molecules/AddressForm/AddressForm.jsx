import React from "react";
import { useFormik } from "formik";
import InputText from "../../atoms/textFields/InputField.jsx";
import { classNames } from "primereact/utils";
import CustomButton from "../../atoms/buttons/CustomButton.jsx";


export default function AddressForm({setAddressData,backward,formData}){

  const formik = useFormik({

    initialValues:formData,

    validate: (data) => {
      let errors = {};
      if (!data.country) {
        errors.country = "Country is required.";
      }
      if (!/^[0-9]{6}$/i.test(data.pincode)) {
        errors.pincode = "Invalid pincode. Must be 6 digits";
      }
      return errors;
    },
    onSubmit: (data) => {
      setAddressData(data);
      
    }
  });

  //The below functions are used in displaying the errors

  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };



  return(
    <div className="w-full">
      <div>
        <div className="field my-4">
          <span className="p-float-label">
            <InputText id="street" name="street" value={formik.values.street} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("street")})} />
            <label htmlFor="street" className={classNames({ "p-error": isFormFieldValid("street") })}>Street</label>
          </span>
          {getFormErrorMessage("street")}
        </div>
        <div className="field my-4">
          <span className="p-float-label">
            <InputText id="city" name="city" value={formik.values.city} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("city") })} />
            <label htmlFor="city" className={classNames({ "p-error": isFormFieldValid("city") })}>City</label>
          </span>
          {getFormErrorMessage("city")}
        </div>
        <div className="field my-4">
          <span className="p-float-label" >
            <InputText id="state" name="state" value={formik.values.state} onChange={formik.handleChange}  className={classNames({ "p-invalid": isFormFieldValid("state") })} />
            <label htmlFor="state" className={classNames({ "p-error": isFormFieldValid("state") })}>State</label>
          </span>
          {getFormErrorMessage("state")}
        </div>
        <div className="field my-4">
          <span className="p-float-label">
            <InputText id="country" name="country" value={formik.values.country} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("country") })} />
            <label htmlFor="country" className={classNames({ "p-error": isFormFieldValid("country") })}>Select country*</label>
          </span>
          {getFormErrorMessage("country")}
        </div>
        <div className="field my-4">
          <span className="p-float-label">
            <InputText id="pincode" name="pincode" value={formik.values.pincode} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("pincode") })} />
            <label htmlFor="pincode" className={classNames({ "p-error": isFormFieldValid("pincode") })}>Pincode*</label>
          </span>
          {getFormErrorMessage("pincode")}
        </div>
      </div>
      <div className="flex justify-content-between">
        <CustomButton type="button" label="Back" icon="pi pi-arrow-left" iconPos="left" className=" mr-4 mb-2 w-auto " onClickHandler={()=>backward()} />
        <CustomButton type="button" label="Next" icon="pi pi-arrow-right" iconPos="right" className="ml-4  mb-2 w-auto " onClickHandler={formik.handleSubmit} />
      </div>
    </div>
  )
}