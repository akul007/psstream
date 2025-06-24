import { render, screen } from "@testing-library/react";
import React from "react";
import {Emojis} from "./Emojis.jsx";
import { Provider } from "react-redux"
import store from "../../../redux/store"


test("emoji test by test id",()=> {
  render(
    <Provider store={store}>
      <Emojis/>
    </Provider>
  );
  expect(screen.getByTestId("like-dislike")).toBeInTheDocument();
})
test("renders number of buttons",async() =>  {
  render( 
    <Provider store={store}>
      <Emojis></Emojis>
    </Provider>)
  const linkElements= await screen.findAllByRole("button")
  expect(linkElements).toHaveLength(2);
});

