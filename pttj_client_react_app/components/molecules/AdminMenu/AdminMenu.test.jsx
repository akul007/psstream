import React from "react";
import { render, screen, } from "@testing-library/react";
import AdminMenu from "./AdminMenu.jsx";



describe("Admin menu test", () => {



  test("Admin menu test", () => {

   

    render(

      <AdminMenu/>

    );


    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Moderator Requests")).toBeInTheDocument();
    expect(screen.getByText("Suspend Users")).toBeInTheDocument();
    expect(screen.getByText("Unlock Users")).toBeInTheDocument();
    expect(screen.getByText("Reports")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();

  });



});