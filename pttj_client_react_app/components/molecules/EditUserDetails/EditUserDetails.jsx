import React, {useRef,useEffect} from "react";
import { useFormik } from "formik";
import { fetchUserProfile } from "../../../redux/index";
import InputText from "../../atoms/textFields/InputField.jsx";
import { classNames } from "primereact/utils";
import CustomButton from "../../atoms/buttons/CustomButton.jsx";
import { useSelector ,useDispatch } from "react-redux";
import axios from "axios";
import {registerUrl} from "../../../constants/apiConstants";
import { Toast } from "primereact/toast";

export default function EditUserDetails(){
  const toast = useRef(null);
  const userId = useSelector(state=> state.user.userInfo.id);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchUserProfile(userId));
  },[userId]);
  const userProfileData = useSelector(state => {
    return state.userProfile.all;
  })

  const formik = useFormik({
    initialValues: {
      userId: userProfileData?.userId,
      username: userProfileData?.username,
      firstName: userProfileData?.name?.firstName,
      middleName: userProfileData?.name?.middleName,
      lastName: userProfileData?.name?.lastName,
      password: userProfileData?.password,  
      street: userProfileData?.address?.street,
      state: userProfileData?.address?.state,
      country: userProfileData?.address?.country,
      city: userProfileData?.address?.city,
      pincode: userProfileData?.address?.pincode,
      phoneNo: userProfileData?.phoneNo,
      email: userProfileData?.email
    },
    validate: (data) => {
      let errors = {};
      if (!data.firstName) {
        errors.firstName = "first name will be required.";
      }
      else if (!/^[A-Za-z]+$/i.test(data.firstName)) {
        errors.firstName = "Special characters cannot be present in name";
      }
      
      if (!data.lastName) {
        errors.lastName = "last name will be required.";
      }
      else if (!/^[A-Za-z]+$/i.test(data.lastName)) {
        errors.lastName = "Special characters cannot be present in name";
      }
      if (!data.country) {
        errors.country = "Country is required.";
      }
      if (!/^[0-9]{6}$/i.test(data.pincode)) {
        errors.pincode = "Invalid pincode. Must be 6 digits";
      }
      return errors;
    },
    onSubmit: (data) => {
      
      const payload = {
        "address": {
          "city": data.city,
          "country": data.country,
          "pincode": data.pincode,
          "state": data.state,
          "street": data.street
        },
        "age": userProfileData?.age,
        "blocked": userProfileData?.blocked,
        "countOffensiveComments": userProfileData?.countOffensiveComments,
        "countOffensiveVideos": userProfileData?.countOffensiveVideos,
        "email": userProfileData?.email,
        "followingChannelsCount": userProfileData?.followingChannelsCount,
        "gender": userProfileData?.gender,
        "isModerator": userProfileData?.isModerator,
        "karmaPoints": userProfileData?.karmaPoints,
        "locked": userProfileData?.locked,
        "name": {
          "firstName": data.firstName,
          "lastName": data.lastName,
          "middleName": data.middleName
        },
        "password": userProfileData?.password,
        "passwordUpdatedOn": userProfileData?.passwordUpdatedOn,
        "phoneNo": userProfileData?.phoneNo,
        "roles": [
          {
            "id": userProfileData?.roles[0]?.id,
            "name": userProfileData?.roles[0]?.name
          }
        ],
        "suspended": userProfileData?.suspended,
        "tobeBlocked": userProfileData?.tobeBlocked,
        "unsuccessfulLoginCount": userProfileData?.unsuccessfulLoginCount,
        "usFk": userProfileData?.usFk,
        "userId": userProfileData?.userId,
        "username": userProfileData?.username
      }
      console.log(payload)
      axios.put(registerUrl , payload).then(() => {
        showSuccess();
      }).catch((err)=>{console.log(err);showError()});
      
    }
  });
  const showSuccess = () => {
    toast.current.show({ severity: "success", summary: "Success", detail: " Update Successful !", life: 3000 });
  }

  const showError = () => {
    toast.current.show({ severity: "error", summary: "Error", detail: "Update failed. Try again !", life: 3000 });
  }
  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  return(
    <div className="flex align-items-center justify-content-center" data-testid="usertest">
      <div className="surface-card shadow-2 border-round w-5 m-4">
        <div className="text-center ">
          <div className="text-900 text-3xl font-medium mb-3">Edit Your Profile</div>
        </div>
        <form className=" border-transparent flex justify-content-center p-fluid  w-full">
          <div className="w-full">
            <div>
              <div className="field m-4">
                <span className="p-float-label">
                  <InputText id="firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("fistname")})} />
                  <label htmlFor="firstName" className={classNames({ "p-error": isFormFieldValid("firstName") })}>First Name*</label>
                </span>
                {getFormErrorMessage("firstName")}
              </div>
              <div className="field m-4">
                <span className="p-float-label">
                  <InputText id="middleName" name="middleName" value={formik.values.middleName} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("middleName") })} />
                  <label htmlFor="middleName" className={classNames({ "p-error": isFormFieldValid("middleName") })}>Middle Name</label>
                </span>
              </div>
              <div className="field m-4">
                <span className="p-float-label" >
                  <InputText id="lastName" name="lastName" value={formik.values.lastName} onChange={formik.handleChange}  className={classNames({ "p-invalid": isFormFieldValid("lastName") })} />
                  <label htmlFor="lastName" className={classNames({ "p-error": isFormFieldValid("lastName") })}>Last Name*</label>
                </span>
                {getFormErrorMessage("lastName")}
              </div>

              <div className="field m-4">
                <span className="p-float-label">
                  <InputText id="street" name="street" value={formik.values.street} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("street")})} />
                  <label htmlFor="street" className={classNames({ "p-error": isFormFieldValid("street") })}>Street</label>
                </span>
                {getFormErrorMessage("street")}
              </div>
              <div className="field m-4">
                <span className="p-float-label">
                  <InputText id="city" name="city" value={formik.values.city} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("city") })} />
                  <label htmlFor="city" className={classNames({ "p-error": isFormFieldValid("city") })}>City</label>
                </span>
                {getFormErrorMessage("city")}
              </div>
              <div className="field m-4">
                <span className="p-float-label" >
                  <InputText id="state" name="state" value={formik.values.state} onChange={formik.handleChange}  className={classNames({ "p-invalid": isFormFieldValid("state") })} />
                  <label htmlFor="state" className={classNames({ "p-error": isFormFieldValid("state") })}>State</label>
                </span>
                {getFormErrorMessage("state")}
              </div>
              <div className="field m-4">
                <span className="p-float-label">
                  <InputText id="country" name="country" value={formik.values.country} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("country") })} />
                  <label htmlFor="country" className={classNames({ "p-error": isFormFieldValid("country") })}>Country*</label>
                </span>
                {getFormErrorMessage("country")}
              </div>
              <div className="field m-4">
                <span className="p-float-label">
                  <InputText id="pincode" name="pincode" value={formik.values.pincode} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("pincode") })} />
                  <label htmlFor="pincode" className={classNames({ "p-error": isFormFieldValid("pincode") })}>Pin Code*</label>
                </span>
                {getFormErrorMessage("pincode")}
              </div>
        
            </div>
            <div className="flex justify-content-between">
              <CustomButton type="button" label="Save" className="next ml-4 mr-4 mb-2 w-auto " onClickHandler={formik.handleSubmit} />
            </div>
            <Toast ref={toast} />
          </div>
        </form>
      </div>
    </div>
  )
}
