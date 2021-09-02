import {combineReducers} from 'redux'

import registerReducer from './Register/register.reducer'

const rootReducer = combineReducers({
    register: registerReducer,
})

export default rootReducer