import { render,screen} from "@testing-library/react"
import React from "react";
import SearchListComponent from "./SearchListComponent.jsx";
import {Provider} from "react-redux";
import store from "../../../redux/store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => (jest.fn())
}));

test("renders OrderList", () => {
  render(
    <Provider store={store}>
      <SearchListComponent></SearchListComponent>
    </Provider>
  );
  expect(screen.getByTestId("ordertest")).toBeInTheDocument();
});
test("renders number of buttons",async() =>  {
  render( 
    <Provider store={store}>
      <SearchListComponent></SearchListComponent>
    </Provider>)
  const linkElements= await screen.findAllByRole("button")
  expect(linkElements).toHaveLength(1);
});