import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TwoColumnLayout from "./TwoColumnLayout.jsx";
import React from "react";
import { Provider } from "react-redux"
import store from "../../../redux/store"

describe("<TwoColumnLayout/>",()=>{

  test("should render twoCol",() => {
    render(<Provider store={store}>
      <TwoColumnLayout/>
    </Provider>
    );
    const headelement=screen.getByTestId("twoCol")
    expect(headelement).toBeInTheDocument()
  });

  test("should render innerBlock",()=>{
    render(<Provider store={store}>
      <TwoColumnLayout/>
    </Provider>)
    const colele=screen.getByTestId("innerBlock")
    expect(colele).toBeInTheDocument()
  })
  test("should render col2",()=>{
    render(<Provider store={store}>
      <TwoColumnLayout/>
    </Provider>)
    const colele=screen.getByTestId("col2")
    expect(colele).toBeInTheDocument()
  })
    
})

