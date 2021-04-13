import {combineReducers} from 'redux'

import registerReducer from './Register/registerReducer'

const rootReducer = combineReducers({
    register: registerReducer,
})

export default rootReducer