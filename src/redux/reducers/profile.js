import {
    SET_ACTIVE_CHAT,
    SET_CHATS,
    SET_HISTORY,
    SET_USER_INFO,
  } from "../actions/profileActions";
  
  const initialState = {
    currentUser: null, //contains current logged in user info object
    activeChat: null, // currently active chat room
    chatList: [], // list of chats user is a part of
    allUsers: [] // object array of all users in DB
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER_INFO:
        return {
          ...state,
          currentUser: action.payload,
        };
      case SET_ACTIVE_CHAT:
        return {
          ...state,
          activeChat: action.payload,
        };
      case SET_CHATS:
        return {
          ...state,
          chatList: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default profileReducer;