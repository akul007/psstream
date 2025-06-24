import { combineReducers } from "redux";
import labelsReducer from "./reducers/labelsReducer";
import globalVideoReducer from "./reducers/globalVideoReducer";
import channelVideoReducer from "./reducers/channelVideoReducer";
import grandeurVideoReducer from "./reducers/grandeurVideoReducer";
import userInfoReducer from "./reducers/userInfoReducer"
import presignedVideoReducer from "./reducers/presignedVideoReducer";
import presignedThumbnailReducer from "./reducers/presignedThumbnailReducer";
import uploadVideoReducer from "./reducers/uploadVideoReducer";
import notificationReducer from "./reducers/notificationReducer"
import userByCountryReducer from "./reducers/userByCountryReducer";
import userByStateReducer from "./reducers/userByStateReducer";
import videoByCountryReducer from "./reducers/videoByCountryReducer";
import videoByStateReducer from "./reducers/videoByStateReducer";
import userProfileReducer from "./reducers/userProfileReducer";
import captchaReducer from "./reducers/captchaReducer";
import searchListReducer from "./reducers/searchListReducer";
import channelListReducer from "./reducers/channelListReducer";
import videoGrandeursListReducer from "./reducers/videoGrandeursListReducer";
import searchdataReducer from "./reducers/searchdataReducer";
import channelIdReducer from "./reducers/channelIdReducer";
import unPublishedVideoReducer from "./reducers/videoPublishedReducer";
import videoReducer from "./reducers/videoReducer";
import commentReducer from "./reducers/commentReducer";
import userChannels from "./reducers/userChannelReducer";
import reportedCommentReducer from "./reducers/reportedCommentReducer";



const rootReducer = combineReducers({
  labels : labelsReducer,
  globalvideos : globalVideoReducer,
  channelvideos : channelVideoReducer,
  grandeurvideos : grandeurVideoReducer,
  user : userInfoReducer,
  preSignedVideoUrl : presignedVideoReducer,
  preSignedThumbnailUrl : presignedThumbnailReducer,
  uploadVideo : uploadVideoReducer,
  notifications: notificationReducer,
  userByCountry : userByCountryReducer,
  userByState : userByStateReducer,
  videoByCountry : videoByCountryReducer,
  videoByState : videoByStateReducer,
  userProfile: userProfileReducer,
  captcha : captchaReducer,
  searchList : searchListReducer,
  channelList : channelListReducer,
  videoGrandeursList : videoGrandeursListReducer,
  searchData : searchdataReducer,
  channelId : channelIdReducer,
  unPublishedVideos:unPublishedVideoReducer,
  videoPlay: videoReducer,
  videoComments:commentReducer,
  userChannels:userChannels,
  reportedComment:reportedCommentReducer
});

export default rootReducer;