import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import profileReducer from "../reducers/profile"

const persistConfig = {
  key: "root",
  storage: storage
}

const bigReducer = combineReducers({
  loadedProfile: profileReducer,
  showEnlargedProfileImage: profileReducer,
  toggleProfileImageOptionsReducer: profileReducer
})

const persistedReducer = persistReducer(persistConfig, bigReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)
