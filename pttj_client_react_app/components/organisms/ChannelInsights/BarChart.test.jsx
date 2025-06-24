import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BarChart from "./BarChart.jsx";
import React from "react";

import { Provider } from "react-redux"
import store from "../../../redux/store"

describe("<BarChart/>",()=>{
  test("main component should be render",() => {
    render(
      <Provider store={store}>
        <BarChart/>
      </Provider>
    );
    const mainelement=screen.getByTestId("barChart");
    expect(mainelement).toBeInTheDocument()
  })
})