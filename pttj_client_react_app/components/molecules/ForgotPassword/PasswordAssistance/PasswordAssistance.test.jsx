import React from "react";
import { render, screen } from "@testing-library/react";
import PasswordAssistance from "./PasswordAssistance.jsx";
import { Route, BrowserRouter, Routes } from "react-router-dom"


describe("Forgot password", () => {
  test("Password Assistance test ", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element= {<PasswordAssistance />}/>
        </Routes>
      </BrowserRouter>
    );
    expect(screen.getByText("Continue")).toBeInTheDocument();
    expect(screen.getByText("Password Assistance")).toBeInTheDocument();
    expect(screen.getByText("Enter the Email or username associated with your account.")).toBeInTheDocument();
  });

});