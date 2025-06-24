import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputText from "./InputField.jsx";

describe("InputText", () => {
  test("check the props for InputText component", () => {
    const onChange = jest.fn();
    render(
      <InputText value="ABC" label = "Name" onChange = {onChange}/>
    );
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument;
    fireEvent.change(screen.getByDisplayValue("ABC"),{
      target: {value : "Sanjay"}
    })
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});