import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./CustomToggleButton.jsx"

describe("custom button", () => {
  test("calls the onClick callback handler", () => {
    const onChange = jest.fn();
  
    render(
      <Button label = "Confirmation"  onIcon="pi pi-check" offIcon="pi pi-times" className = "h-2rem m-1 w-5rem" checked={true} onChange = {onChange}/>
    );
    expect(screen.getByLabelText("Confirmation")).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
    userEvent.click(screen.getByLabelText("Confirmation"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
  test("calls the onClick callback handler", () => {
    const onChange = jest.fn();
  
    render(
      <Button label = "Confirmation"  onIcon="pi pi-check" offIcon="pi pi-times" className = "h-2rem m-1 w-5rem" onChange = {onChange}/>
    );
    expect(screen.getByLabelText("Confirmation")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
    userEvent.click(screen.getByLabelText("Confirmation"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});