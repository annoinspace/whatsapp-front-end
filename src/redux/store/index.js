import { persistStore, persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import profileReducer from '../reducers/profile';
// import { getProfileInfo } from './actions/profileAction';

const bigReducer = combineReducers({
  loadedProfile: profileReducer,
  showEnlargedProfileImage: profileReducer,
  toggleProfileImageOptionsReducer: profileReducer
})

const persistConfig = {
  key: 'root',
  storage: localStorage,
  whitelist: ["loadedProfile", "accessToken"]
};

const persistedReducer = persistReducer(persistConfig, bigReducer);

export const store = configureStore({
  reducer: persistedReducer, // here there's place for just 1 value!
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store);

