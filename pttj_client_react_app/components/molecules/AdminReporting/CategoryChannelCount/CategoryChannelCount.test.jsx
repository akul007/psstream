import React from "react";
import { render,screen, waitFor, } from "@testing-library/react";
import CategoryChannelCount from "./CategoryChannelCount.jsx"
import axios from "axios";
import { allChannelCategories } from "../../../../constants/apiConstants.js";


describe("Category channel count", () => {
  test("Category channel text", () => {
    render(

      <CategoryChannelCount/>

    );
    expect(screen.getByText("Find channel count based on category")).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
  });
  test("axios call", async() => {
    const response = { "data":[
      "ART","DANCE","MUSIC"
    ]};
  
    axios.get= jest.fn().mockResolvedValue(response);
    
    const { getAllByTestId } = render(
  
      <CategoryChannelCount/>
            
    )
    const Values = await waitFor(() =>
      getAllByTestId("test-category").length);
    expect(Values).toBe(1);
    expect(axios.get).toHaveBeenCalledWith(allChannelCategories);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });


});