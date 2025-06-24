import { render,screen} from "@testing-library/react"
import React from "react";
import UserDetails from "./UserDetails.jsx";
import {Provider} from "react-redux";
import store from "../../../redux/store";

test("renders UserDetails customeData table tag", async() => {
  render(
    <Provider store={store}>
      <UserDetails></UserDetails>
    </Provider>
  );

  expect(screen.getByTestId("dataTable")).toBeInTheDocument();
});

test("renders number of buttons",async() =>  {
  render( 
    <Provider store={store}>
      <UserDetails></UserDetails>
    </Provider>)
  const linkElements= await screen.findAllByRole("button")
  expect(linkElements).toHaveLength(10);
});

test("render text User details on screen", () => {
  render(
    <Provider store={store}>
      <UserDetails></UserDetails>
    </Provider>
  );
  expect(screen.getByText("User Details")).toBeInTheDocument();
});
