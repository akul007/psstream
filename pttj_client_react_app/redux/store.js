import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import rootReducer from "./rootReducer"
var CryptoJS = require("crypto-js");


const persistedState = sessionStorage.getItem("reduxState") 
  ? JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem("reduxState"), "my-secret-key@123").toString(CryptoJS.enc.Utf8))
  : {}

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
)
store.subscribe(()=>{
  sessionStorage.setItem("reduxState", CryptoJS.AES.encrypt(JSON.stringify(store.getState()),"my-secret-key@123").toString())
})
export default store
