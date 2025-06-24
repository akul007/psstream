/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from "@testing-library/react";
import ReviewComment from "./ReviewComment.jsx";
import { Provider } from "react-redux"
import store from "../../../redux/store"

describe("Review Comment", () => {
  test("test", () => {
    render(
      <Provider store={store}>
        <ReviewComment/>
      </Provider>
    );
    expect(screen.getByTestId("comment")).toBeInTheDocument();
  });
});