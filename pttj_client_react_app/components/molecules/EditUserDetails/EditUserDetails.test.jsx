import React from "react";
import { render,screen} from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import EditUserDetails from "./EditUserDetails.jsx";

describe("Edit User Details", () => {

  test("View Edit User Details test", () => {
    render(
      <Provider store={store}>
        <EditUserDetails/>
      </Provider>
    );
    expect(screen.getByText("Edit Your Profile")).toBeInTheDocument();
    expect(screen.getByText("First Name*")).toBeInTheDocument();
    expect(screen.getByText("Middle Name")).toBeInTheDocument();
    expect(screen.getByText("Last Name*")).toBeInTheDocument();
    expect(screen.getByText("Street")).toBeInTheDocument();
    expect(screen.getByText("City")).toBeInTheDocument();
    expect(screen.getByText("State")).toBeInTheDocument();
    expect(screen.getByText("Country*")).toBeInTheDocument();
    expect(screen.getByText("Pin Code*")).toBeInTheDocument();
  });
  test("renders user", async() => {
    render(
      <Provider store={store}>
        <EditUserDetails></EditUserDetails>
      </Provider>
    );
    expect(screen.getByTestId("usertest")).toBeInTheDocument();
  });
  test("renders number of buttons",async() =>  {
    render( 
      <Provider store={store}>
        <EditUserDetails></EditUserDetails>
      </Provider>)
    const linkElements= await screen.findAllByRole("button")
    expect(linkElements).toHaveLength(1);
  });
  
});