import React from "react";
import { render, screen} from "@testing-library/react";
import InputTextArea from "./InputTextArea.jsx";
describe("InputTextArea", () => {
  test("check the props for InputTextArea component", () => {

    render(
      <InputTextArea type="text" maxLength="150"  className = {"className"} value="text" rows={5} cols={30} />
    );
    expect(screen.getByText("text")).toBeInTheDocument;
  });
});