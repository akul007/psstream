import React from "react";
import { render,screen} from "@testing-library/react";
import {Provider} from "react-redux";
import store from "../../../../redux/store";
import MostViewedSection from "./MostViewedSection.jsx";

test("renders Carousel", () => {
  render(
    <Provider store={store}>
      <MostViewedSection/>
    </Provider>
  );
  expect(screen.getByTestId("test")).toBeInTheDocument();
});