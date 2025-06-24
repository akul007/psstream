import React from "react";
import { render, screen, } from "@testing-library/react";
import ModeratorMenu from "./ModeratorMenu.jsx"

describe("Moderator menu test", () => {

  test("Moderator menu test", () => {
    
    render(
      <ModeratorMenu/>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Offensive Comments")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

});