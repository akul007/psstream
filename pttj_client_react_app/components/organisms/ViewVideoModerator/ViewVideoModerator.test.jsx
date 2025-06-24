import { render,screen} from "@testing-library/react"
import React from "react";
import {Provider} from "react-redux";
import store from "../../../redux/store";
import ViewVideoModerator from "./ViewVideoModerator.jsx";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => (jest.fn())
}));


test("renders video tag", () => {
  render(
    <Provider store={store}>
      <ViewVideoModerator/>
    </Provider>
  );
  expect(screen.getByTestId("videotestid")).toBeInTheDocument();
});
test("renders text container", () => {
  render(
    <Provider store={store}>
      <ViewVideoModerator/>
    </Provider>
  );
  expect(screen.getByTestId("videotestid")).toBeInTheDocument();
});

test("renders number of buttons",async() =>  {
  render( 
    <Provider store={store}>
      <ViewVideoModerator/>
    </Provider>)
  const linkElements= await screen.findAllByRole("button")
  expect(linkElements).toHaveLength(4);    
});