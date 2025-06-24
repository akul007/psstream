import React, { useEffect, useState } from "react";
import Button from "../../atoms/buttons/CustomButton.jsx"
import Input from "../../atoms/textFields/InputField.jsx"
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/pslogo.jpg"
import { useDispatch, useSelector } from "react-redux";
import { fetchCaptcha } from "../../../redux";
import { setUserInfo } from "../../../redux/index.js";
import  {gapi}  from "gapi-script";
import { signUrl, lockAccountUrl, ssoApi } from "../../../constants/apiConstants.js";
import { Checkbox } from "primereact/checkbox";
import GoogleLogin from "react-google-login";
import { Divider } from "primereact/divider";
import "./LoginForm.css"
export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [failCount, setFailCount] = useState(0);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState();
  const [disableButton, setDisableButton] = useState(false);

  const captchaState = useSelector(state => state.captcha.all);
  const [uniqueId, setUniqueId] = useState(uuid());
  useEffect(() => {
    dispatch(fetchCaptcha(uniqueId))
  }, [uniqueId])
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "444937030113-gp69dkhval1eptuuitslt9ssb88gpvnb.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const [moderatorCheck, setModeratorCheck] = useState(false);
  const [showError, setShowError] = useState(false);
  const responseGoogle = response => {
    let data = {
      "email": response.profileObj.email,
      "code": response.getAuthResponse().id_token
    }
    axios.post(ssoApi, data).then(response => {
      if (response.data.token) {
        dispatch(setUserInfo(response.data));
        setDisableButton(false);
        sessionStorage.setItem("moderatorCheck", false);
        window.location.href = "/home";
      }
    }).catch((error) => {
      setError(true)
      if (error.response.status === 404) {
        setMessage("This email is not registered with the system");
      }
      else {
        setMessage("Error occured. Please try again");
        setDisableButton(false);
      }

    })
  };

  const formik = useFormik({

    initialValues: {
      username: "",
      password: "",
      captcha: "",
      uniqueId: uniqueId
    },

    validate: (data) => {
      let errors = {};
      if (!data.username) {
        errors.username = "Username is required.";
      }
      if (!data.password) {
        errors.password = "Password is required.";
      }
      if (!data.captcha) {
        errors.captcha = "Captcha is required";
      }
      return errors;
    },

    onSubmit: (data) => {
      data.uniqueId = uniqueId;
      setDisableButton(true);
      if (failCount >= 2) {
        // lock account from backend
        return axios
          .put(lockAccountUrl + data.username)
          .then((res) => setMessage(res.data + ", Kindly email at admin@psstreaming.sapient.com to unlock!"))
          .catch((err) => console.log("failed error", err));
      }

      else {
        axios.post(signUrl, data).then(response => {
          if (response.data.token) {
            dispatch(setUserInfo(response.data));
            setDisableButton(false);

            if (moderatorCheck) {

              if (response.data.roles[0] === "ROLE_MODERATOR") {
                navigate("/moderator")
              }
              else if (response.data.roles[0] === "ROLE_USER" || response.data.roles[0] === "ROLE_ADMIN") {
                //show error
                setShowError(true);
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("reduxState");
                dispatch(setUserInfo({}));
              }

            } else {

              if (response.data.roles[0] === "ROLE_ADMIN") {
                navigate("/admin")
              }
              else if (response.data.roles[0] === "ROLE_USER" || response.data.roles[0] === "ROLE_MODERATOR") {
                navigate("/home")
              }

            }

          }
        }).catch((error) => {
          setError(true)
          if (error.response.data.message === "Bad credentials") {
            if (failCount < 2) setDisableButton(false);
            setFailCount(failCount + 1);
          } else if ((error.response.status === 401 || error.response.status === 422) && error.response.data) {
            setMessage(error.response.data);
            setDisableButton(false);
          }
          else {
            setMessage("Error occured. Please try again");
            setDisableButton(false);
          }
          formik.values.captcha="";
          setUniqueId(uuid());
        });
      }

    }
  });

  //The below functions are used in displaying the errors

  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  function getValidationMessage() {
    if (message) {
      return <small className="p-error">{message}</small>
    }
    return failCount < 3 && <small className="p-error">Bad credentials, remaining attempts:{3 - failCount}</small>
  }

  function submitbuttonresult() {
    sessionStorage.setItem("moderatorCheck", moderatorCheck);
    formik.submitForm();
  }


  return (
    <div className="flex align-items-center justify-content-center mt-5">
      <div className="surface-card p-4 shadow-2 border-round lg:w-4 " >
        <div className="formHeader text-center mb-4">
          <img src={logo} alt="PS Stream app" className="h-2 w-2" />
          <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
          <span className="text-600 font-medium line-height-3">Do not have an account?</span>
          <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" href="/signup">Create today!</a>
        </div>
        <form>
          <div >
            <Input id="username" name="username" type="text" className="mb-2 w-full" label="Username" value={formik.values.username} onChange={formik.handleChange} />
            {getFormErrorMessage("username")}
          </div>
          <div>
            <Input id="password" name="password" type="password" className="mb-2 w-full" label="Password" value={formik.values.password} onChange={formik.handleChange} />
            {getFormErrorMessage("password")}
          </div>

          {/* captcha */}

          <div className="flex align-items-center justify-content-between my-2">
            <div className="captch flex align-items-center">
              <img alt="captcha" className="h-2 w-7 border-1  mr-2" src={captchaState} />
              <button type="button" label="refresh"  aria-label="Refresh" onClick={() => { setUniqueId(uuid()) }}>
                <i className="pi pi-refresh" ></i>
              </button>
            </div>

            <div className="w-7">
              <Input id="captcha" name="captcha" type="text" className="w-full text-center" label="Enter Captcha" value={formik.values.captcha} onChange={formik.handleChange} />
              {getFormErrorMessage("captcha")}
            </div>
          </div>

          <div className="my-3">
            <Checkbox inputId="moderatorCheckBox" checked={moderatorCheck} onChange={(e) => setModeratorCheck(e.checked)} />
            <label htmlFor="moderatorCheckBox" className="text-600 ml-2 font-medium line-height-3">Login as Moderator</label>
          </div>

          {error && getValidationMessage()}
          {
          //Shows error when login fails as moderator
            showError && (<div className="errorBox mb-2">
              <small className="p-error">You are not a moderator</small>
            </div>)
          }

          <div>
            <Button label="Submit" type="submit" className="mb-2 w-full" disabled={disableButton} onClickHandler={() => submitbuttonresult()} />
          </div>
        </form>
        
        <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer mb-2" href="/forgotpassword">Forgot password</a>
        <hr />
        <Divider align="center" type="dashed">
          <p className="text-600 ml-2 font-medium line-height-3 ">Or login with </p>
        </Divider>
        <div className="align-items-center justify-content-center flex ml-4 mt-4">
          <div className=" align-items-center justify-content-center mb-2 w-6">

            <GoogleLogin
              clientId="444937030113-gp69dkhval1eptuuitslt9ssb88gpvnb.apps.googleusercontent.com"
              buttonText="Login using google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    </div>
  )

}