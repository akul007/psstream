import React from "react";
import { render, screen } from "@testing-library/react";
import InlineMessage from "./InlineMessage.jsx";

describe("inline message", () => {
  test("check the props for message component", () => {
      
    render(
      <InlineMessage severity = "error" text = "name is required"/>
    );
    expect(screen.getByText("name is required")).toBeInTheDocument;
    expect(screen.getByRole("alert")).toBeInTheDocument;
  });
});