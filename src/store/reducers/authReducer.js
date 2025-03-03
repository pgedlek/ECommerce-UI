const initialState = {
  user: null,
  userdetails: null,
  address: [],
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        user: action.payload
      };
    case "USER_DETAILS":
      return {
        ...state,
        userdetails: action.payload,
      }
    case "USER_ADDRESS":
      return {
        ...state,
        address: action.payload
      };
    case "LOG_OUT":
      return {
        user: null,
        address: null,
        userdetails: null,
      };
    default:
      return state;
  }
}