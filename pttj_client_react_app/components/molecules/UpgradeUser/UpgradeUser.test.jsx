import { render, screen } from "@testing-library/react";
import UpgradeUser from "./UpgradeUser.jsx";
import React from "react";
import axios from "axios";
import { findToBeUpgradedUsers } from "../../../constants/apiConstants";

describe("should render component", ()=>{
  test("should render text ", () => {
    render(<UpgradeUser />);
    expect(screen.getByText(/Users to be Upgraded to Moderator/i)).toBeInTheDocument();
  });

  test("axios call", async () => {
    axios.get = jest.fn().mockResolvedValue("true");
    render(
      <UpgradeUser/>
    )
    expect(axios.get).toHaveBeenCalledWith(`${findToBeUpgradedUsers}`+"/0/7");
  });

});