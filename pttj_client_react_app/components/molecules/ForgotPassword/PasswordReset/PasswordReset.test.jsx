import React from "react";
import { render, screen } from "@testing-library/react";
import PasswordReset from "./PasswordReset.jsx";
import { BrowserRouter} from "react-router-dom";

describe("Forgot password", () => {

  test("Password reset test ", () => {
    render(
      <BrowserRouter>
        <PasswordReset />
      </BrowserRouter>
    );
    expect(screen.getByText("Set New Password.")).toBeInTheDocument();
  });

});