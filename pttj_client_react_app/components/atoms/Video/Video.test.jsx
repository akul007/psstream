import { render, screen } from "@testing-library/react";
import React from "react";
import Video from "./Video.jsx";

describe("the video player", () => {
  test("renders video element", () => {
    render(
      <Video />
    );
    expect(screen.getByTestId("the-video-player")).toBeInTheDocument();
  })

});