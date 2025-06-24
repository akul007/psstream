import React from "react";
import { render, screen,fireEvent } from "@testing-library/react";
import AddressForm from "./AddressForm.jsx"
import {formData} from "../../../constants/formData.js"


describe("personal details form", () => {
  test("checking input fields for the form", () => {
  
    render(
      <AddressForm formData={formData}/>
    );
    expect(screen.getBy)
    expect(screen.getByText("Street")).toBeInTheDocument();
    expect(screen.getByText("City")).toBeInTheDocument();
    expect(screen.getByText("State")).toBeInTheDocument();
    expect(screen.getByText("Select country*")).toBeInTheDocument();
    expect(screen.getByText("Pincode*")).toBeInTheDocument();
  });
})
