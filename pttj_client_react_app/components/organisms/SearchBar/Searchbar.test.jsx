import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchBar from "./Searchbar.jsx";
import React from "react";
import { Provider } from "react-redux";
import store from "../../../redux/store.js";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => (jest.fn())
}));

test("searchbar",() => {
  render(
    <Provider store={store}>
      <SearchBar/>
    </Provider>
  );
  const searchelement=screen.getByTestId("form")
  expect(searchelement).toBeInTheDocument()
});

test("button",()=>{
  render( <Provider store={store}>
    <SearchBar/>
  </Provider>)
  expect(screen.getByRole("button")).toBeInTheDocument();
})

