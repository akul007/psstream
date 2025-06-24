import React from "react";
import { render, screen, } from "@testing-library/react";
import SideBar from "./SideBar.jsx";
describe("User menu test", () => {

  test("User menu test", () => {

    render(
      <SideBar/>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Create channel")).toBeInTheDocument();
    expect(screen.getByText("History")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();

  });

});