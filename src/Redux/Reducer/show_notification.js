import * as actionTypes from "../action/actionTypes";

const initialState = {
  show_notification: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_NOTIFICATION:
      return {
        ...state,
        show_notification: !state.show_notification
      };
    default:
      return state;
  }
};

export default reducer;
