import React from "react";
import { render, screen, } from "@testing-library/react";
import SuspendedAccount from "./SuspendedAccount.jsx";

test("Suspended Account test", () => { 
  render(
    <SuspendedAccount/>
  );
  expect(screen.getByText("Number of Suspended Users over a given time range")).toBeInTheDocument();
  expect(screen.getByText("Search")).toBeInTheDocument();
});

test("renders Suspend", () => {
  render(
    <SuspendedAccount/>
  );
  expect(screen.getByTestId("suspendtest")).toBeInTheDocument();
});

test("renders number of buttons",async() =>  {
  render( 
   
    <SuspendedAccount></SuspendedAccount>
  );
  const linkElements= await screen.findAllByRole("button")
  expect(linkElements).toHaveLength(1);
});



