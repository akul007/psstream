import { render, screen } from "@testing-library/react";
import UnlockUser from "./UnlockUser.jsx";
import React from "react";
import axios from "axios";
import { findLockedUsers } from "../../../constants/apiConstants";

describe("should render component", ()=>{
  test("should render text ", () => {

    render(<UnlockUser />);

    expect(screen.getByText(/Users to be Unlocked/i)).toBeInTheDocument();
  });

  test("axios call", async () => {
  
    axios.get = jest.fn().mockResolvedValue("true");
    render(
      <UnlockUser/>
    )
    expect(axios.get).toHaveBeenCalledWith(`${findLockedUsers}`+"/0/7");
  });
});