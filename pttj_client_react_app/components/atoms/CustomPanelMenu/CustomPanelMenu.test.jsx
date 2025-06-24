import React from "react";
import { render, screen } from "@testing-library/react";
import CustomPanelMenu from "./CustomPanelMenu.jsx";
import {Provider} from "react-redux";
import store from "../../../redux/store";
import {adminitems} from "../../../constants/adminMenuData";

test("render channelname input", () => {
  render(
    <Provider store={store}>
      <CustomPanelMenu model = {adminitems}/>
    </Provider>
  );
  expect(screen.getByTestId("paneltest")).toBeInTheDocument();
});