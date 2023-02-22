export const SET_USER_INFO = "SET_USER_INFO"
export const SET_CHATS = "SET_CHATS"
export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT"
export const SET_HISTORY = "SET_HISTORY"
export const NEW_MESSAGE = "NEW_MESSAGE"
export const VIEW_PROFILE_IMAGE = "VIEW_PROFILE_IMAGE"
export const CLOSE_FULL_PROFILE_IMAGE = "CLOSE_FULL_PROFILE_IMAGE"
export const TOGGLE_PROFILE_IMAGE_OPTIONS = "TOGGLE_PROFILE_IMAGE_OPTIONS"

export const getProfileInfo = (config, setLoading, setError) => {
  return async (dispatch, getState) => {
    try {
      const url = process.env.REACT_APP_BE_URL + "/users/me"
      const response = await fetch(url, config)

      if (response.ok) {
        const tokens = await response.json()

        localStorage.setItem("accessToken", tokens.accessToken)
        localStorage.setItem("refreshToken", tokens.refreshToken)

        dispatch({
          type: SET_USER_INFO,
          payload: tokens.user
        })
      } else {
        setError(true)
      }
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }
}

export const logoutUser = (user) => {
  return async (dispatch, getState) => {
    try {
      const config = {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        })
      }

      const url = process.env.REACT_APP_BE_URL + "/users/me"

      const response = await fetch(url, config)

      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")

      dispatch({
        type: SET_USER_INFO,
        payload: null
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getUserChats = (chatId) => {
  return async (dispatch, getState) => {
    try {
      const config = {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        })
      }

      const url = process.env.REACT_APP_BE_URL + "/chats"

      const response = await fetch(url, config)

      if (response.ok) {
        const chats = await response.json()

        dispatch({
          type: SET_CHATS,
          payload: chats
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const loadChat = (chatId) => {
  return async (dispatch, getState) => {
    try {
      const config = {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        })
      }

      const url = process.env.REACT_APP_BE_URL + "/chats/" + chatId

      const response = await fetch(url, config)

      if (response.ok) {
        const chat = await response.json()

        dispatch({
          type: SET_ACTIVE_CHAT,
          payload: chat
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const createChat = (participants) => {
  return async (dispatch, getState) => {
    try {
      const config = {
        method: "POST",
        body: JSON.stringify(participants),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        })
      }

      const url = process.env.REACT_APP_BE_URL + "/chats"

      const response = await fetch(url, config)

      if (response.ok) {
        const chat = await response.json()

        dispatch({
          type: SET_ACTIVE_CHAT,
          payload: chat
        })

        return chat._id
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const showFullProfileImageAction = () => {
  return {
    type: "VIEW_PROFILE_IMAGE",
    payload: true
  }
}
export const closeFullProfileImageAction = () => {
  return {
    type: "CLOSE_FULL_PROFILE_IMAGE",
    payload: false
  }
}

export const toggleProfileImageOptions = (boolean) => {
  return {
    type: "TOGGLE_PROFILE_IMAGE_OPTIONS",
    payload: boolean
  }
}
