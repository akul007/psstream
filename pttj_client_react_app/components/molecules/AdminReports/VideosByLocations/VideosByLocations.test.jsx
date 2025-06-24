import React from "react";
import { render, screen, } from "@testing-library/react";
import VideosCountByLocations from "./VideosByLocations.jsx";
import { Provider } from "react-redux";
import store from "../../../../redux/store.js";



describe("Videos by locations count", () => {



  test("Videos by locations count", () => {

   

    render(

      <Provider store={store}><VideosCountByLocations/></Provider>
      

    );


    
    expect(screen.getByText("Video Statistics by State")).toBeInTheDocument();
    expect(screen.getByText("Video Statistics by Country")).toBeInTheDocument();


  });



});