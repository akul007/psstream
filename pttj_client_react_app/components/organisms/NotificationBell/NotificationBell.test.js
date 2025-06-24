/* eslint-disable react/react-in-jsx-scope */
import { render, screen,fireEvent } from "@testing-library/react";
import NotificationBell from "./NotificationBell.jsx";
import { Provider } from "react-redux"
import store from "../../../redux/store"

describe("NotificationBell", () => {
  test("check the props for NotificationBell component", () => {
    render(
      <Provider store={store}>
        <NotificationBell/>
      </Provider>
    );
    expect(screen.getByTestId("notificationBell")).toBeInTheDocument();
    expect(screen.getByTestId("count")).toBeInTheDocument();
    const button = screen.getByTestId("notificationBell");
    fireEvent.click(button);
    expect(screen.getByTestId("dialogbox")).toBeInTheDocument();
  });
});