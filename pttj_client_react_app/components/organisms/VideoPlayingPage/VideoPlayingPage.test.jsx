import { render,screen} from "@testing-library/react"
import React from "react";
import {VideoPlayingPage} from "./VideoPlayingPage.jsx";
import {Provider} from "react-redux";
import store from "../../../redux/store";

describe("should render Video Playing Page", () => {
  test("test for video playing component", () => {
    render(
      <Provider store={store}>
        <VideoPlayingPage/>
      </Provider>
    );
    expect(screen.getByTestId("video-details")).toBeInTheDocument();
    expect(screen.getByTestId("video-upper-half")).toBeInTheDocument();
    expect(screen.getByTestId("video-player-details")).toBeInTheDocument();
    expect(screen.getByTestId("video-player")).toBeInTheDocument();
  });
});