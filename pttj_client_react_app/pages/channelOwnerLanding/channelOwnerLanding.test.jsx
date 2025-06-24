import { render,screen} from "@testing-library/react"
import React from "react";
import ChannelLanding from "./ChannelOwnerLanding.jsx";
import {Provider} from "react-redux";
import store from "../../redux/store"
;
describe("View Channel Owner landing", () => {

  test("renders channel owner landing",async() =>  {
    render( 
      <Provider store={store}>
        <ChannelLanding></ChannelLanding>
      </Provider>) 
  });
    
  
  test("renders channel owner landing",async() =>  {
    render( 
      <Provider store={store}>
        <ChannelLanding></ChannelLanding>
      </Provider>)
    expect(screen.getByTestId("containertest")).toBeInTheDocument();   
  });
  
});
