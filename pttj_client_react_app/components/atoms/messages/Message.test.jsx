import React from "react";
import { render, screen } from "@testing-library/react";
import Message from "./Message.jsx";

describe("message", () => {
  test("check the props for message component", () => {
      
    render(
      <Message severity = "success" summary = "Uploaded" detail = "Successfully uploaded the content" sticky = "true"/>
    );
    expect(screen.getByText("Uploaded")).toBeInTheDocument;
    expect(screen.getByText("Successfully uploaded the content")).toBeInTheDocument;
  });
});