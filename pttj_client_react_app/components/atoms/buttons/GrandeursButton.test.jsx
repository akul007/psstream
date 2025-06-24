import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./GrandeursButton.jsx"

describe("custom button", () => {
  test("calls the onClick callback handler", () => {
    const onChange = jest.fn();
  
    render(
      <Button onLabel = "Yes" offLabel = "No" key={1} className = "h-2rem m-1 w-5rem" checked={true} onChange = {onChange}/>
    );
    expect(screen.getByText("Yes")).toBeInTheDocument();
    userEvent.click(screen.getByText("Yes"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
  test("calls the onClick callback handler", () => {
    const onChange = jest.fn();
  
    render(
      <Button onLabel = "Yes" offLabel = "No" key={1} className = "h-2rem m-1 w-5rem" onChange = {onChange}/>
    );
    expect(screen.getByText("No")).toBeInTheDocument();
    userEvent.click(screen.getByText("No"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });


});