const initialState = {
  loading: true,
  data: [],
  error: "",
  unseen:0,
}
  
const notificationReducer = (state = initialState, action={}) => {
  switch (action.type) {
  case "FETCH_NOTIFICATIONS":
    return {
      loading: false,
      data: action.payload,
      error: action.err,
      unseen: action.unseen
    }
  case "SET_SEEN":
    return{
      ...state,
      unseen:0,
      error:action.err
    }
  default: return state
  }
}
  
export default notificationReducer;