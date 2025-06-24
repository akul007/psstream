import { render,screen} from "@testing-library/react"
import React from "react";
import Post from "./Post.jsx";
import {Provider} from "react-redux";
import store from "../../../redux/store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => (jest.fn())
}));

test("renders Post", async() => {
  render(
    <Provider store={store}>
      <Post></Post>
    </Provider>
  );

  expect(screen.getByTestId("dataviewtest")).toBeInTheDocument();
});
