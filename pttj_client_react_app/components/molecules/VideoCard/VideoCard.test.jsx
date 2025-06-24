import { render,screen} from "@testing-library/react"
import React from "react";
import {VideoCard} from "./VideoCard.jsx";
import {Provider} from "react-redux";
import store from "../../../redux/store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => (jest.fn())
}));

test("renders dataview", async() => {
  render(
    <Provider store={store}>
      <VideoCard></VideoCard>
    </Provider>
  );

  expect(screen.getByTestId("dataviewtest")).toBeInTheDocument();
});
