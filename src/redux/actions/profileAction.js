export const SET_USER_INFO = "SET_USER_INFO"
export const SET_CHATS = "SET_CHATS"
export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT"
export const SET_HISTORY = "SET_HISTORY"
export const NEW_MESSAGE = "NEW_MESSAGE"
export const VIEW_PROFILE_IMAGE = "VIEW_PROFILE_IMAGE"
export const CLOSE_FULL_PROFILE_IMAGE = "CLOSE_FULL_PROFILE_IMAGE"
export const TOGGLE_PROFILE_IMAGE_OPTIONS = "TOGGLE_PROFILE_IMAGE_OPTIONS"
export const SET_PROFILE_PICTURE = "SET_PROFILE_PICTURE"
export const SET_ABOUT = "SET_ABOUT"
export const SET_DISPLAYNAME = "SET_DISPLAYNAME"
export const LOG_OUT_USER = "LOG_OUT_USER"

export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN"
const baseEndpoint = process.env.REACT_APP_BE_URL

export const setAccessToken = (accessToken) => ({
  type: SET_ACCESS_TOKEN,
  payload: accessToken
})

export const getAccessToken = (loggingInAuthor) => {
  return async (dispatch) => {
    const options = {
      method: "POST",
      body: JSON.stringify(loggingInAuthor),
      headers: {
        "Content-Type": "application/json"
      }
    }
    console.log("options", options)
    try {
      console.log("---------inside the getAccessToken action----------")
      const response = await fetch(baseEndpoint + "/users/login", options)
      if (response.ok) {
        console.log("response", response)
        const tokens = await response.json()
        const accessToken = await tokens.accessToken
        console.log("dispatching accessToken", accessToken)

        if (accessToken) {
          dispatch({
            type: SET_ACCESS_TOKEN,
            payload: accessToken
          })
          localStorage.setItem("accessToken", accessToken)
          try {
            const opts = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken
              }
            }
            const userResponse = await fetch(baseEndpoint + "/users/me", opts)
            if (userResponse.ok) {
              const user = await userResponse.json()
              console.log("response of /users/me user", user)
              dispatch({
                type: SET_USER_INFO,
                payload: user
              })
            } else {
              console.log("error getting the user")
            }
          } catch (error) {
            console.log("error in trycatch", error)
          }
        } else {
          console.log("access token not created")
        }
      } else {
        console.log("-------error with getting a response ----------")
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    try {
      dispatch({
        type: LOG_OUT_USER,
        payload: null
      })
      localStorage.removeItem("accessToken")
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
export const setProfilePicture = (payload) => {
  console.log("logging the profile picture change")
  return {
    type: "SET_PROFILE_PICTURE",
    payload: payload
  }
}

export const changeAbout = (about) => {
  console.log("logging the about change", about)
  return {
    type: "SET_ABOUT",
    payload: about
  }
}
// export const changeDisplayName = (displayName) => {
//   console.log("logging the displayName change", displayName)
//   return {
//     type: "SET_DISPLAYNAME",
//     payload: displayName
//   }
// }

export const changeDisplayName = (displayName) => {
  console.log("displayName", displayName)
  return async (dispatch) => {
    const options = {
      method: "PUT",
      body: JSON.stringify({ displayName: displayName }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    }
    try {
      console.log("options", options)
      const response = await fetch(baseEndpoint + "/users/me", options)
      if (response.ok) {
        console.log(response)
        dispatch({
          type: "SET_DISPLAYNAME",
          payload: displayName
        })
        console.log("displayName Changed successfully ")
      } else {
        console.log("there was an error in changing the display name")
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// export const sendImageToBackend = (formData) => {
//   const accessToken = localStorage.getItem("accessToken")
//   console.log("backend recieved image")
//   return async (dispatch) => {
//     const options = {
//       method: "POST",
//       body: formData,
//       headers: {
//         "Content-Type": `multipart/form-data; boundary=XXX`,
//         Authorization: "Bearer " + accessToken
//       }
//     }
//     try {
//       const response = await fetch(baseEndpoint + "/users/me/avatar", options)
//       if (response.ok) console.log("----------response", response)
//       else {
//         console.log("----error occured with fetching----")
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

export const sendImageToBackend = (formData) => {
  const accessToken = localStorage.getItem("accessToken")
  return async (dispatch) => {
    if (!formData) {
      console.log("No file uploaded in frontend")
      return
    }

    const options = {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": `multipart/form-data; boundary=XXX`,
        Authorization: "Bearer " + accessToken
      }
    }

    try {
      console.log("logging in the try catch send image action")
      const response = await fetch(baseEndpoint + "/users/me/avatar", options)
      if (response.ok) console.log("----------response", response)
      else {
        console.log("----error occured with fetching----")
      }
    } catch (error) {
      console.log(error)
    }
  }
}
