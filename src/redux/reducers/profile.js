import {
  SET_ACTIVE_CHAT,
  SET_CHATS,
  SET_HISTORY,
  SET_USER_INFO,
  VIEW_PROFILE_IMAGE,
  CLOSE_FULL_PROFILE_IMAGE,
  TOGGLE_PROFILE_IMAGE_OPTIONS,
  SET_PROFILE_PICTURE,
  SET_ABOUT,
  SET_DISPLAYNAME
} from "../actions/profileAction"

const initialState = {
  currentUser: null, //contains current logged in user info object
  activeChat: null, // currently active chat room
  chatList: [], // list of chats user is a part of
  allUsers: [], // object array of all users in DB
  viewProfileImage: false,
  profileImageOptions: false,
  // myProfilePicture: null,
  currentUserTest: {
    _id: "63f5ef074d5ec50434acc64c",
    avatar: false,
    username: "annoinspace",
    email: "anno@gmail.com",
    displayName: "edit name",
    about: "edit bio",
    chats: []
  }
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
    case TOGGLE_PROFILE_IMAGE_OPTIONS:
      return {
        ...state,
        profileImageOptions: action.payload
      }
    case SET_PROFILE_PICTURE:
      return {
        ...state,
        myProfilePicture: action.payload,
        currentUserTest: {
          ...state.currentUserTest,
          avatar: action.payload
        }
      }
    case SET_ABOUT:
      return {
        ...state,
        about: action.payload,
        currentUserTest: {
          ...state.currentUserTest,
          about: action.payload
        }
      }
    case SET_DISPLAYNAME:
      return {
        ...state,
        displayName: action.payload,
        currentUserTest: {
          ...state.currentUserTest,
          displayName: action.payload
        }
      }

    default:
      return state
  }
}

export default profileReducer
