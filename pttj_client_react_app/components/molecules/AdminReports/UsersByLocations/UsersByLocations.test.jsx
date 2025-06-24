import React from "react";
import { render, screen, } from "@testing-library/react";
import UsersCountByLocations from "./UsersByLocations.jsx";
import { Provider } from "react-redux";
import store from "../../../../redux/store.js";



describe("Users by locations count", () => {



  test("Users by locations count", () => {

  
    render(

      <Provider store={store}><UsersCountByLocations/></Provider>
      

    );

    expect(screen.getByText("User Statistics by Country")).toBeInTheDocument();
    expect(screen.getByText("User Statistics by State")).toBeInTheDocument();


  });



});