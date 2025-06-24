import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import AxiosMock from "axios";
import FollowingChannelGraph from "./FollowingChannelGraph.jsx";
import "jest-canvas-mock";
import { Chart } from "primereact/chart";
import * as redux from "react-redux"
jest.mock("axios");
jest.mock("primereact/chart", () => ({
  Chart: () => null
}));
jest.mock("react-redux", () => ({
  useSelector: jest.fn(fn => fn()),
}));
jest.mock("use-resize-observer", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
}));

describe("Following Channel Graph", () => {
  const data = {data:[ [ 22, 2000-2-2 ], [ 21, 2000-2-3 ],[ 32, 2000-2-4 ] ]};

  test("axios call", async() => {
    AxiosMock.get= jest.fn().mockResolvedValue(data);
    const spy = jest.spyOn(redux, "useSelector")
    spy.mockReturnValue({ currentUserId:12039 })
    const { getByTestId } = render(<FollowingChannelGraph/>)
    const Canvas = await waitFor(() =>
      getByTestId("canvasDiv"),
    );
    const { getByText } = render(
      <Chart type="line" />
    );
    const inCanvas = await waitFor(()=> getByText(/Following Channels/i));
    expect(screen.getByTestId("chartHeader")).toBeInTheDocument();
    expect(screen.getByTestId("canvasDiv")).toBeInTheDocument();
    expect(Canvas).toBeInTheDocument();
    expect(inCanvas).toBeInTheDocument();

    expect(AxiosMock.get).toHaveBeenCalledTimes(1);
    expect(Canvas).toBeInTheDocument();
      
  });
});