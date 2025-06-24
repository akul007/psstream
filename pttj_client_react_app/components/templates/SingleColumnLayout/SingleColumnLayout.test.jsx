import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SingleColumnLayout from "./SingleColumnLayout.jsx";
import React from "react";
import { Provider } from "react-redux"
import store from "../../../redux/store"

describe("<SingleColumnLayout/>",()=>{

  test("should render singleCol",() => {
    render(<Provider store={store}>
      <SingleColumnLayout/>
    </Provider>
    );
    const singlecolele=screen.getByTestId("singleCol")
    expect(singlecolele).toBeInTheDocument();
  });
    
})
