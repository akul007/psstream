import React from "react";
import { render, screen } from "@testing-library/react";
import ChannelCreationForm from "../ChannelCreationForm/ChannelCreationForm.jsx";
import {Provider} from "react-redux";
import store from "../../../redux/store";

describe("Channel creation form", () => {
  test("checking text on the form", () => {
    render(
      <Provider store={store}>
        <ChannelCreationForm/>
      </Provider>
    );
    expect(screen.getByText("Channel creation form")).toBeInTheDocument();
    expect(screen.getByText("Enter details")).toBeInTheDocument();
  });

  test("render channelname input", () => {
    render(
      <Provider store={store}>
        <ChannelCreationForm/>
      </Provider>
    );
    expect(screen.getByTestId("channelname-input")).toBeInTheDocument();
  });

  test("render channel description input", () => {
    render(
      <Provider store={store}>
        <ChannelCreationForm/>
      </Provider>);
    expect(screen.getByTestId("description-input")).toBeInTheDocument();
  });

  test("render karmapoint input", () => {
    render(
      <Provider store={store}>
        <ChannelCreationForm/>
      </Provider>
    );
    expect(screen.getByTestId("karmapoint-input")).toBeInTheDocument();
  });
  test("renders number of buttons",async() =>  {
    render(
      <Provider store={store}>
        <ChannelCreationForm/>
      </Provider>)
    const linkElements= await screen.findAllByRole("button")
    expect(linkElements).toHaveLength(4);  
  });
  test("render form", () => {
    render(
      <Provider store={store}>
        <ChannelCreationForm/>
      </Provider>
    );
    expect(screen.getByTestId("formtest")).toBeInTheDocument();
  });
  
})

