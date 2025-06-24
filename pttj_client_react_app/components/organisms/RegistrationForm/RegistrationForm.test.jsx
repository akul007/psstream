import React from "react";
import { render, screen} from "@testing-library/react";
import RegistrationForm from "./RegistrationForm.jsx"
import { BrowserRouter} from "react-router-dom";


describe("registration form", () => {
  test("checking the text written in component", () => {
  
    render(
      <BrowserRouter>
        <RegistrationForm/>
      </BrowserRouter>
      
    );
    expect(screen.getByText("Welcome to PS stream")).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(screen.getByText("Login!")).toBeInTheDocument();
  });

});