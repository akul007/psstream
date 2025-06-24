import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./CustomButton.jsx"

describe("custom button", () => {
  test("calls the onClick callback handler", () => {
    const onClick = jest.fn();
  
    render(
      <Button label = "Submit" onClickHandler = {onClick}/>
    );
    userEvent.click(screen.getByLabelText("Submit"));
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});