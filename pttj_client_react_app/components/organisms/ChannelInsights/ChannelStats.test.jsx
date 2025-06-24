import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ChannelStats from "./ChannelStats.jsx";
import React from "react";

import { Provider } from "react-redux"
import store from "../../../redux/store"

describe("<ChannelStats/>",()=>{
  test("main component should be render",() => {
    render(
      <Provider store={store}>
        <ChannelStats/>
      </Provider>
    );
    const mainelement=screen.getByTestId("main");
    expect(mainelement).toBeInTheDocument()
  })

})

