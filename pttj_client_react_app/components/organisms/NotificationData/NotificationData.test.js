/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from "@testing-library/react";
import NotificationData from "./NotificationData.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
const data = [{ "notificationId": 11, "notificationMessage": "Added New Video", "fromChannelId": 1, "notificationTime": "2022-08-24T10:53:44.245812", "channelId": 1, "channelName": "Tseries", "channelTag": "MUSIC", "channelLogo": "https://upload.wikimedia.org/wikipedia/commons/7/7d/T-series-logo.svg", "description": "Music channel new videos", "videoId": 24, "thumbnailUrl": "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg", "videoTitle": "Welcome to my channel this video ", "duration": { "hours": 1, "minutes": 40, "seconds": 30 }, "seen": true }];

describe("NotificationData", () => {
  test("check the props for NotificationData component", () => {
    render(
      <BrowserRouter>

        <Routes>

          <Route path="*" element= {<NotificationData notifications={data} />}/>

        </Routes>

      </BrowserRouter>
    );
    expect(screen.getByText("MUSIC")).toBeInTheDocument();
  });
});
jest.mock("axios"); // This overwrites axios methods with jest Mock
describe("getResource", () => {
  test("with success", async() => {
    const url = "http://localhost:6060/user/v1.0/notification/1";
    const data = [{ "notificationId": 11, "notificationMessage": "Added New Video", "fromChannelId": 1, "notificationTime": "2022-08-24T10:53:44.245812", "channelId": 1, "channelName": "Tseries", "channelTag": "MUSIC", "channelLogo": "https://upload.wikimedia.org/wikipedia/commons/7/7d/T-series-logo.svg", "description": "Music channel new videos", "videoId": 24, "thumbnailUrl": "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg", "videoTitle": "Welcome to my channel this video ", "duration": { "hours": 1, "minutes": 40, "seconds": 30 }, "seen": true }];

    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(axios.get(url)).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(url);
  });
});