import * as actionTypes from "../action/actionTypes";

const initialState = {
  selectedRemoteTab: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REMOTE_DASHBOARD:
      return {
        ...state,
        selectedRemoteTab: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
