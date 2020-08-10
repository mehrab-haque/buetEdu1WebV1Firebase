import loggedReducer from './loggedReducer'
import {combineReducers} from 'redux'

const allReducers=combineReducers({
  isLogged:loggedReducer
})

export default allReducers
