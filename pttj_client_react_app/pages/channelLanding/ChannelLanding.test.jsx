import { render,screen} from "@testing-library/react"
import React from "react";
import ChannelLanding from "./ChannelLanding.jsx";
import {Provider} from "react-redux";
import store from "../../redux/store";

test("renders number of buttons",async() =>  {
  render( 
    <Provider store={store}>
      <ChannelLanding></ChannelLanding>
    </Provider>)
  const linkElements= await screen.findAllByRole("button")
  expect(linkElements).toHaveLength(2);    
});
  

test("renders number of buttons",async() =>  {
  render( 
    <Provider store={store}>
      <ChannelLanding></ChannelLanding>
    </Provider>)
  expect(screen.getByTestId("containertest")).toBeInTheDocument();   
});