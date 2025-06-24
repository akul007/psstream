import {createGlobalState} from "react-hooks-global-state";

const {setGlobalState,useGlobalState} =createGlobalState({
  globalOTP:"",
  username:"",
});

export {useGlobalState,setGlobalState}
