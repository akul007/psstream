import React from "react";
import { render, screen } from "@testing-library/react";
import ModalComponent from "./ModalComponent.jsx";


test("render text details on screen", () => {render( <ModalComponent/>);
  expect(screen.getByText("Details")).toBeInTheDocument();
});

test("render the dialog box", () => {render(<ModalComponent />)
  expect(screen.getByTestId("dialogtest")).toBeInTheDocument();
})