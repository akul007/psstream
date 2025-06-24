import React from "react";
import { render, screen } from "@testing-library/react";
import ViewUserDetails from "./ViewUserDetails.jsx";
import { Provider } from "react-redux";
import store from "../../../redux/store";
describe("View User Details", () => {

  test("View User Details test", async() => {
    
    render(
      <Provider store={store}>
        <ViewUserDetails/>
      </Provider>
    );
    setTimeout(()=>{
      expect(screen.getByText("Username")).toBeInTheDocument();
      expect(screen.getByText("Full name")).toBeInTheDocument();
      expect(screen.getByText("Address")).toBeInTheDocument();
      expect(screen.getByText("Karma points")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Phone Number")).toBeInTheDocument();
      expect(screen.getByText("Following Channels")).toBeInTheDocument();
    },5000)
    
  });

});