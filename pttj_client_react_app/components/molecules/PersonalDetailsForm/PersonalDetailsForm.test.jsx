import React from "react";
import { render, screen,fireEvent,waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PersonalDetailsForm from "./PersonalDetailsForm.jsx";

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
  test("checking input fields for the form", async() => {
    const onSubmit = jest.fn();
    render(
      <PersonalDetailsForm setPersonalData = {onSubmit} formData={formData}/>
    );
    expect(screen.getByText("First name*")).toBeInTheDocument();
    expect(screen.getByText("Middle name")).toBeInTheDocument();
    expect(screen.getByText("Last name*")).toBeInTheDocument();
    expect(screen.getByText("Email*")).toBeInTheDocument();
    expect(screen.getByText("Mobile*")).toBeInTheDocument();
    expect(screen.getByText("Select gender*")).toBeInTheDocument();
    userEvent.click(screen.getByLabelText("Next"));
    const error1 = await waitFor(() =>
      screen.getByText("first name is required."),
    );
    const error2 = await waitFor(() =>
      screen.getByText("last name is required."),
    );
    const error3 = await waitFor(() =>
      screen.getByText("please select gender"),
    );
    const error4 = await waitFor(() =>
      screen.getByText("Email is required."),
    );
    const error5 = await waitFor(() =>
      screen.getByText("Invalid mobile number. Must be 10 digits"),
    );
    expect(error1).toBeInTheDocument();
    expect(error2).toBeInTheDocument();
    expect(error3).toBeInTheDocument();
    expect(error4).toBeInTheDocument();
    expect(error5).toBeInTheDocument();
  });
  

  test("checking error input fields for the form", async() => {
    formData = {
      firstname: "sanjay@1",
      middlename: "",
      lastname: "kumar@2",
      username: "",
      email: "sanjay",
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
      <PersonalDetailsForm setPersonalData = {onSubmit} formData={formData}/>
    );
    userEvent.click(screen.getByLabelText("Next"));
    const error1 = await waitFor(() =>
      screen.getByTestId("firstname"),
    );
    const error2 = await waitFor(() =>
      screen.getByTestId("lastname"),
    );
    const error3 = await waitFor(() =>
      screen.getByText("Invalid email address. E.g. example@email.com"),
    );
    
    expect(error1).toBeInTheDocument();
    expect(error2).toBeInTheDocument();
    expect(error3).toBeInTheDocument();
  });

  test("checking submit", async() => {
    formData = {
      firstname: "sanjay",
      middlename: "",
      lastname: "kumar",
      username: "sanjay12",
      email: "sanjay@gmail.com",
      phone:"1122334455",
      password: "",
      retypePassword: "",
      gender: "MALE",
      city:"",
      street:"",
      pincode:"",
      country:"",
      state:"",
      isModerator:"FALSE"
    }
    const onSubmit = jest.fn();
    render(
      <PersonalDetailsForm setPersonalData = {(data)=>onSubmit(data)} formData={formData}/>
    );
    userEvent.click(screen.getByLabelText("Next"));
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

})
