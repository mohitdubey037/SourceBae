import * as actionTypes from '../action/Client/actionTypes'

const initialState = {
    projects : {},
    condition : localStorage.getItem('role')
}

const reducer = ((state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PROJECT:
            return {
                ...state,
                projects : action.projectDetails
            }
        default:
            return state;
    }
})

export default reducer