import { createChat, loadChat } from "../redux/actions/profileAction"

// export const socket = io(process.env.REACT_APP_BE_URL, {
//   transports: ["websocket"],
// });

export const handleSocketConnect = (socket, currentUser, attemptedRecipients, setNewMessages, dispatch) => {
  const userDetailsObject = {
    username: currentUser.username,
    _id: currentUser._id
  }

  console.log("User connected")

  socket.emit("connectReceiveInfo", userDetailsObject)

  socket.on("signedIn", (OnlineUsers) => {
    console.log("SIGNED IN")
    dispatch({ type: "Set_Users_Online", payload: OnlineUsers })

    console.log("chat check stage")

    socket.emit("checkChats", attemptedRecipients)

    socket.on("errorCheckingChats", (error) => {
      console.log("Error checking chats:", error)
    })

    socket.on("existingChat", (chatId) => {
      console.log("Chat existing")
      // LOAD CHAT WITH HTTP REQUEST

      dispatch(loadChat(chatId))
      console.log("Chat ID:", chatId)

      socket.emit("openChat", chatId)
    })

    socket.on("noExistingChat", (chats) => {
      console.log("No chat existing")
      // CREATE CHAT WITH HTTP REQUEST

      const newChatId = dispatch(createChat(attemptedRecipients))

      socket.emit("openChat", newChatId)
    })

    socket.on("newMessage", (receivedMessage) => {
      setNewMessages((newMessages) => [...newMessages, receivedMessage.message])

      //   dispatch(loadChat(activeChat._id));

      console.log("DID ME sentMessage")
    })
    socket.on("newConnection", (onlineUsersList) => {
      dispatch({ type: "SET_ONLINE_USERS", payload: onlineUsersList })
    })
  })
}
