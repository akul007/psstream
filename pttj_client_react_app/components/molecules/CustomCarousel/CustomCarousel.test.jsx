import { render,screen} from "@testing-library/react"
import React from "react";
import CustomCarousel from "./CustomCarousel.jsx";
import {Provider} from "react-redux";
import store from "../../../redux/store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => (jest.fn())
}));

test("renders Carousel", async() => {
  render(
    <Provider store={store}>
      <CustomCarousel></CustomCarousel>
    </Provider>
  );

  expect(screen.getByTestId("carouseltest")).toBeInTheDocument();
});
