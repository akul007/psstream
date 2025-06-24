import React from "react";
import { render, screen } from "@testing-library/react";
import CustomDataTable from "./CustomDataTable.jsx";

test("renders learn react link", () => {
  render(<CustomDataTable/>);
  expect(screen.getByTestId("dataTable")).toBeInTheDocument();
});