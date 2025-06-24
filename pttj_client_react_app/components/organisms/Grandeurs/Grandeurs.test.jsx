import React from "react";
import { render, screen } from "@testing-library/react";
import Grandeurs from "./Grandeurs.jsx";
import {Provider} from "react-redux";
import store from "../../../redux/store";

describe("grandeurs", () => {

  test("test number of buttons rendered", async() => {
    const close = jest.fn();
    render(<Provider store={store}><Grandeurs close={close}/></Provider>)
    const linkElements= await screen.findAllByRole("button")
    expect(linkElements).toHaveLength(24);    
  });
  test("render channelname input", () => {
    render(
      <Provider store={store}>
        <Grandeurs></Grandeurs>
      </Provider>
    );
    expect(screen.getByTestId("buttontest")).toBeInTheDocument();
  });
 

});