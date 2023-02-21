import {
  SET_ACTIVE_CHAT,
  SET_CHATS,
  SET_HISTORY,
  SET_USER_INFO,
  VIEW_PROFILE_IMAGE,
  CLOSE_FULL_PROFILE_IMAGE
} from "../actions/profileAction"

const initialState = {
  currentUser: null, //contains current logged in user info object
  activeChat: null, // currently active chat room
  chatList: [], // list of chats user is a part of
  allUsers: [],
  viewProfileImage: false // object array of all users in DB
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        currentUser: action.payload
      }
    case SET_ACTIVE_CHAT:
      return {
        ...state,
        activeChat: action.payload
      }
    case SET_CHATS:
      return {
        ...state,
        chatList: action.payload
      }
    case VIEW_PROFILE_IMAGE:
      return {
        ...state,
        viewProfileImage: action.payload
      }
    case CLOSE_FULL_PROFILE_IMAGE:
      return {
        ...state,
        viewProfileImage: action.payload
      }

    default:
      return state
  }
}

export default profileReducer
