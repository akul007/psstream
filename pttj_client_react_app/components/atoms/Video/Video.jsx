import React from "react";
import "./Video.css";

const Video = ({ width, height, url, onEndHandler, errorHandler }) => {
  return(
    <video width={width} height={height} controls autoPlay muted controlsList="nodownload" data-testid="the-video-player" onEnded={onEndHandler} onError={errorHandler}>
      <source src={url} type="video/mp4"/>
      <track default kind="captions" srcLang="en" src={url} />
    </video>
  );
}
export default Video