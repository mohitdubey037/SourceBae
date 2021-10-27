import * as actionTypes from "../action/actionTypes";

const initialState = 0;

const reducer = (state = initialState, action) => {
  console.log("in dispatch")
  switch (action?.type) {
    case actionTypes.NOTIFICATION:
      return state + action.notification;
    default:
      return state;
  }
};

export default reducer;
