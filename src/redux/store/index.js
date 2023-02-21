import { configureStore, combineReducers } from "@reduxjs/toolkit"
import profileReducer from "../reducers/profile.js"

const mainReducer = combineReducers({
  loadedProfile: profileReducer,
  showEnlargedProfileImage: profileReducer
})

const store = configureStore({
  reducer: mainReducer
})

export default store
