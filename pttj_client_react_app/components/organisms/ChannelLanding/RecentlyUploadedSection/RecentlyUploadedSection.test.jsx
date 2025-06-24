import React from "react";
import { render,screen} from "@testing-library/react";
import {Provider} from "react-redux";
import store from "../../../../redux/store";
import RecentlyUploadedSection from "./RecentlyUploadedSection.jsx";

test("renders Carousel", () => {
  render(
    <Provider store={store}>
      <RecentlyUploadedSection/>
    </Provider>
  );
  expect(screen.getByTestId("test")).toBeInTheDocument();
});