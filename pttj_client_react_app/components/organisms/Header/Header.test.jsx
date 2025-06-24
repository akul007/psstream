import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./Header.jsx";
import React from "react";
import { Provider } from "react-redux"
import store from "../../../redux/store"

describe("<Header/>",()=>{
 
  test("main component should be render",() => {
    render(
      <Provider store={store}>
        <Header/>
      </Provider>);
    const iconselement=screen.getByTestId("main")
    expect(iconselement).toBeInTheDocument()

  })
  test("logo components should  render",()=>{
    render(
      <Provider store={store}>
        <Header/>
      </Provider>);
    const headerlogin=screen.getByTestId("logo")
    expect(headerlogin).toBeInTheDocument();
  })
  
})
