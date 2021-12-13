import * as actionTypes from "../action/actionTypes";
import instance from "../../Constants/axiosConstants";

const initialState = {
    is_Back_Pressed: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BACK_PRESSED:
            return {
                ...state,
                is_Back_Pressed: true
            };
        case actionTypes.NEXT_PRESSED:
            return {
                ...state,
                is_Back_Pressed: false
            }
        default:
            return state;
    }
};

export default reducer;
