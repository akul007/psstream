import { render,screen} from "@testing-library/react"
import React from "react";
import UserHome from "./UserHome.jsx";
import {Provider} from "react-redux";
import store from "../../../redux/store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => (jest.fn())
}));

test("renders UserHome", async() => {
  render(
    <Provider store={store}>
      <UserHome></UserHome>
    </Provider>
  );

  expect(screen.getByTestId("test")).toBeInTheDocument();
});

