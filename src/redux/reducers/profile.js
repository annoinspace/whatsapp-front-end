import {
  SET_ACTIVE_CHAT,
  SET_CHATS,
  SET_HISTORY,
  SET_USER_INFO,
  VIEW_PROFILE_IMAGE,
  CLOSE_FULL_PROFILE_IMAGE,
  TOGGLE_PROFILE_IMAGE_OPTIONS,
  SET_ACCESS_TOKEN
} from "../actions/profileAction"

const initialState = {
  accessToken: null,
  currentUser: null, //contains current logged in user info object
  activeChat: null, // currently active chat room
  chatList: [], // list of chats user is a part of
  allUsers: [], // object array of all users in DB
  viewProfileImage: false,
  profileImageOptions: false
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN: // add a new case to handle setting the accessToken
      return {
        ...state,
        accessToken: action.payload
      }
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
    case TOGGLE_PROFILE_IMAGE_OPTIONS:
      return {
        ...state,
        profileImageOptions: action.payload
      }

    default:
      return state
  }
}

export default profileReducer
