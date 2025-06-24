import { CHANNEL_ID } from "./types";

export function setChannelId(channelId){
  return {
    type: CHANNEL_ID,
    payload : channelId,
  }
}