import { render,screen} from "@testing-library/react"
import React from "react";
import {ChannelOwnerList} from "./ChannelOwnerList.jsx";
import {Provider} from "react-redux";
import store from "../../redux/store"

describe("View Channels", () => {

  test("renders all channels",async() =>  {
    render( 
      <Provider store={store}>
        <ChannelOwnerList></ChannelOwnerList>
      </Provider>) 
  });
  test("renders all channels",async() =>  {
    render( 
      <Provider store={store}>
        <ChannelOwnerList></ChannelOwnerList>
      </Provider>) 
    expect(screen.getByTestId("containertest")).toBeInTheDocument();   
  });
    
});
