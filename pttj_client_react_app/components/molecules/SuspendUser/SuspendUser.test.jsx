import { render, screen } from "@testing-library/react";
import SuspendUser from "./SuspendUser.jsx";
import React from "react";
import axios from "axios";
import { findToBeBlocked } from "../../../constants/apiConstants";

describe("should render component", ()=>{
  test("should render text ", () => {
    render(<SuspendUser />);
    expect(screen.getByText(/Users to be Suspended/i)).toBeInTheDocument();
  });

  test("axios call", async () => {
    axios.get = jest.fn().mockResolvedValue("true");
    render(
      <SuspendUser/>
    )
    expect(axios.get).toHaveBeenCalledWith(`${findToBeBlocked}`);
  });

});