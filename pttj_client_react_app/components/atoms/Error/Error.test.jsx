import React from "react";
import { render, screen } from "@testing-library/react";
import { errorMessage, oppsMessage, pageNotFoundMessage } from "../../../constants/labelConstant";
import Error from "./Error.jsx";

test("renders learn react link", () => {
  render(<Error/>);
  expect(screen.getByText(oppsMessage)).toBeInTheDocument();
  expect(screen.getByText(pageNotFoundMessage)).toBeInTheDocument();
  expect(screen.getByText(errorMessage)).toBeInTheDocument();
});
test("render error component",()=>{
  render(<Error/>);
  expect(screen.getByTestId("errortestid")).toBeInTheDocument();
})