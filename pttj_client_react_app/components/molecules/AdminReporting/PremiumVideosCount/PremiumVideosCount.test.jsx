import React from "react";
import { render, screen,waitFor } from "@testing-library/react";
import PremiumVideosCount from "./PremiumVideosCount.jsx";
import axios from "axios";
import { channelapi } from "../../../../constants/apiConstants.js";


describe("PremiumVideosCount", () => {
  test("Premium Videos text", () => {
    render(

      <PremiumVideosCount/>

    );
    expect(screen.getByText("Find total premium videos for a channel.")).toBeInTheDocument();
    expect(screen.getByText("Select the channel name from the dropdown below and click search.")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });
  
  test("axios call", async() => {
    const response = { "data":[
      "Tseries","Sony Music","ZEE"
    ]};
  
    axios.get= jest.fn().mockResolvedValue(response);
    
    const { getAllByTestId } = render(
  
      <PremiumVideosCount/>
            
    )
    const Values = await waitFor(() =>
      getAllByTestId("test-allchannels").length);
    expect(Values).toBe(1);
    expect(axios.get).toHaveBeenCalledWith(channelapi+"/channels/all");
    expect(axios.get).toHaveBeenCalledTimes(1);
  });


});