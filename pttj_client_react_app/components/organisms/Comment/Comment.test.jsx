/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from "@testing-library/react";
import Comment from "./Comment.jsx";
import { Provider } from "react-redux"
import store from "../../../redux/store"

describe("Comment", () => {
  test("Comment Test", () => {
    render(
      <Provider store={store}>
        <Comment/>
      </Provider>
    );
    expect(screen.getByTestId("commentPage")).toBeInTheDocument();
    expect(screen.getByTestId("commenttoggle")).toBeInTheDocument();
  });
});
describe("Comment", () => {
  test("Add Comment Button Test", () => {
    render(
      <Provider store={store}>
        <Comment/>
      </Provider>
    );
    expect(screen.getByTestId("addComment")).toBeInTheDocument();
  });
});