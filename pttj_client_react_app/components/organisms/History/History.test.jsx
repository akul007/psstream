import { render,screen} from "@testing-library/react"
import React from "react";
import History from "./History.jsx";
import {Provider} from "react-redux";
import store from "../../../redux/store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => (jest.fn())
}));


test("renders History", async() => {
  render(
    <Provider store={store}>
      <History></History>
    </Provider>
  );

  expect(screen.getByTestId("videotest")).toBeInTheDocument();
});



