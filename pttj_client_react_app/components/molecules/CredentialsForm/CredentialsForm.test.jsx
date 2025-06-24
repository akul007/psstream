import React from "react";
import { render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CredentialsForm from "./CredentialsForm.jsx"


describe("personal details form", () => {
  let formData = {
    firstname: "",
    middlename: "",
    lastname: "",
    username: "",
    email: "",
    phone:"",
    password: "",
    retypePassword: "",
    gender: "",
    city:"",
    street:"",
    pincode:"",
    country:"",
    state:"",
    isModerator:"FALSE"
  }
  const onBack = jest.fn();
  test("checking errors and input fields for the form", async() => {
    const onSubmit = jest.fn();

    render(
      <CredentialsForm setPersonalData = {onSubmit} backward={onBack} formData={formData}/>
    );
    expect(screen.getByText("Username*")).toBeInTheDocument();
    expect(screen.getByText("Password*")).toBeInTheDocument();
    expect(screen.getByText("Retype Password*")).toBeInTheDocument();
    expect(screen.getByText("Do you want to be a moderator?")).toBeInTheDocument();
    userEvent.click(screen.getByLabelText("Submit"));
    const error1 = await waitFor(() =>
      screen.getByText("Username is required"),
    );
    const error2 = await waitFor(() =>
      screen.getByText("Password is required."),
    );
  
    expect(error1).toBeInTheDocument();
    expect(error2).toBeInTheDocument();
    
  });
  
  test("checking errors and input fields for the form", async() => {
    formData = {
      firstname: "",
      middlename: "",
      lastname: "",
      username: "",
      email: "",
      phone:"",
      password: "",
      retypePassword: "",
      gender: "",
      city:"",
      street:"",
      pincode:"",
      country:"",
      state:"",
      isModerator:"FALSE"
    }
    const onSubmit = jest.fn();
    render(
      <CredentialsForm setPersonalData = {onSubmit} backward={onBack}  formData={formData}/>
    );
    expect(screen.getByText("Username*")).toBeInTheDocument();
    expect(screen.getByText("Password*")).toBeInTheDocument();
    expect(screen.getByText("Retype Password*")).toBeInTheDocument();
    expect(screen.getByText("Do you want to be a moderator?")).toBeInTheDocument();
    userEvent.click(screen.getByLabelText("Submit"));
    const error1 = await waitFor(() =>
      screen.getByText("Username is required"),
    );
    const error2 = await waitFor(() =>
      screen.getByText("Password is required."),
    );
  
    expect(error1).toBeInTheDocument();
    expect(error2).toBeInTheDocument();
    userEvent.click(screen.getByText("No"));
    const toggle = await waitFor(() =>
      screen.getByText("Yes"),
    );
    expect(toggle).toBeInTheDocument();

    userEvent.click(screen.getByLabelText("Back"));
    expect(onBack).toHaveBeenCalledTimes(1);
    
  });


  test("checking password match", async() => {
    formData = {
      firstname: "",
      middlename: "",
      lastname: "",
      username: "",
      email: "",
      phone:"",
      password: "sanjay",
      retypePassword: "sanja",
      gender: "",
      city:"",
      street:"",
      pincode:"",
      country:"",
      state:"",
      isModerator:"FALSE"
    }
    const onSubmit = jest.fn();
    render(
      <CredentialsForm setPersonalData = {onSubmit} backward={onBack}  formData={formData}/>
    );
    expect(screen.getByText("Username*")).toBeInTheDocument();
    expect(screen.getByText("Password*")).toBeInTheDocument();
    expect(screen.getByText("Retype Password*")).toBeInTheDocument();
    expect(screen.getByText("Do you want to be a moderator?")).toBeInTheDocument();
    userEvent.click(screen.getByLabelText("Submit"));
    const error1 = await waitFor(() =>
      screen.getByText("password is not matching"),
    );
    
    expect(error1).toBeInTheDocument();
    
  });
  test("submit form", async() => {
    formData = {
      firstname: "",
      middlename: "",
      lastname: "",
      username: "sanjay2252",
      email: "",
      phone:"",
      password: "sanjay",
      retypePassword: "sanjay",
      gender: "",
      city:"",
      street:"",
      pincode:"",
      country:"",
      state:"",
      isModerator:"FALSE"
    }
    const onSubmit = jest.fn();
    render(
      <CredentialsForm setPersonalData = {onSubmit} backward={onBack}  formData={formData}/>
    );
    expect(screen.getByText("Username*")).toBeInTheDocument();
    expect(screen.getByText("Password*")).toBeInTheDocument();
    expect(screen.getByText("Retype Password*")).toBeInTheDocument();
    expect(screen.getByText("Do you want to be a moderator?")).toBeInTheDocument();
    userEvent.click(screen.getByLabelText("Submit"));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledTimes(0)
    );
    
    
  });

})
