import { render,screen} from "@testing-library/react"
import React from "react";
import Home from "./Home.jsx";
import {Provider} from "react-redux";
import store from "../../../redux/store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => (jest.fn())
}));


test("renders Home", async() => {
  render(
    <Provider store={store}>
      <Home></Home>
    </Provider>
  );

  expect(screen.getByTestId("hometest")).toBeInTheDocument();
});
