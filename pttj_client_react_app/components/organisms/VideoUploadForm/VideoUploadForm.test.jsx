import React from "react";
import { render, screen } from "@testing-library/react";
import VideoUploadForm from "./VideoUploadForm.jsx";
import { Provider } from "react-redux";
import store from "../../../redux/store";
// import configureStore from 'redux-mock-store';

describe("video upload form", () => {
  test("checking the text written in component", () => {
  
    render(
      <Provider store={store}>
        <VideoUploadForm props={{id: 1}} />
      </Provider>
    );
    expect(screen.getByText("Upload Video")).toBeInTheDocument();
    expect(screen.getByText("Image should be in 16:9 aspect ratio")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Karma Point")).toBeInTheDocument();
  });
  test("render Video Upload Form on screen", () => {
    render(
      <Provider store={store}>
        <VideoUploadForm></VideoUploadForm>
      </Provider>
    );
    expect(screen.getByText("Video upload form")).toBeInTheDocument();
  });
  test("renders thumbnail", async() => {
    render(
      <Provider store={store}>
        <VideoUploadForm></VideoUploadForm>
      </Provider>
    );
    expect(screen.getByTestId("thumbnail-upload-input")).toBeInTheDocument();
  });
  test("renders videoupload", async() => {
    render(
      <Provider store={store}>
        <VideoUploadForm></VideoUploadForm>
      </Provider>
    );
    expect(screen.getByTestId("video-upload-input")).toBeInTheDocument();
  });
  

});