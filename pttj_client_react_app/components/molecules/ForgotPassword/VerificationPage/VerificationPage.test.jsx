import React from "react";
import { render, screen } from "@testing-library/react";
import VerificationPage from "./VerificationPage.jsx";
import { Route, BrowserRouter, Routes } from "react-router-dom"


describe("Forgot password", () => {


  test("Verification Page test ", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element= {<VerificationPage />}/>
        </Routes>
      </BrowserRouter>

    );
    expect(screen.getByText("Verify")).toBeInTheDocument();
    expect(screen.getByText("Verification Required")).toBeInTheDocument();
    expect(screen.getByText("To continue complete this verification step. We have sent you the OTP on your registered email and mobile number.")).toBeInTheDocument();
  });


});