import React, { useState, useEffect } from "react"
import AddMessage from "./AddMessage"
import { useSelector, useDispatch } from "react-redux"
import blankImage from "../../assets/blank-profile-picture.png"
import { Form } from "react-bootstrap"
import { BsEmojiSmile } from "react-icons/bs"
import { GrAttachment, GrMicrophone } from "react-icons/gr"
import { io } from "socket.io-client"
import { createChat, loadChat, setOnlineUsers } from "../../redux/actions/profileAction"
// import { handleSocketConnect } from "../../socket"

const socket = io(process.env.REACT_APP_BE_URL, { transports: ["websocket"] })
export default function OpenChat() {
  const dispatch = useDispatch()
  const [participant, setParticipant] = useState(null)
  const user = useSelector((state) => state.loadedProfile.currentUser)
  const currentChatParticipant = useSelector((state) => state.loadedProfile.currentChatParticipant)
  const activeChat = useSelector((state) => state.loadedProfile.activeChat)

  const [message, setMessage] = useState("")
  const [sentMessages, setSentMessages] = useState([])
  const [hasLoadedChat, setHasLoadedChat] = useState(false)
  const [socketId, setSocketId] = useState(null)
  const [currentChatId, setCurrentChatId] = useState(null)

  useEffect(() => {
    socket.on("welcome", (welcomeMessage) => {
      console.log("welcome message top", welcomeMessage)
    })
  }, [])

  const handleSocketConnect = (socket, currentUser, attemptedRecipients, setNewMessages, dispatch) => {
    socket.on("welcome", (welcomeMessage) => {
      console.log("----welcome message in handle socket---", welcomeMessage)
    })
    socket.on("socketId", (socketId) => {
      console.log("Received socket ID:", socketId)
      setSocketId(socketId)
    })
    console.log("-----------------Socket connected--------------", socketId)

    const userDetailsObject = {
      userName: user.username,
      _id: user._id
    }
    console.log("User connected")
    socket.emit("connectReceiveInfo", userDetailsObject)

    socket.on("signedIn", (OnlineUsers) => {
      console.log("SIGNED IN")
      dispatch({ type: "Set_Users_Online", payload: OnlineUsers })
      console.log("chat check stage")
      const attemptedRecipients = [user._id, currentChatParticipant._id]

      socket.emit("checkChats", attemptedRecipients)
      socket.on("errorCheckingChats", (error) => {
        console.log("Error checking chats:", error)
      })

      socket.on("existingChat", (chatId) => {
        console.log("Chat existing")
        console.log("existing chat id----------->", chatId)
        setCurrentChatId(chatId)
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
    })
  }

  const setNewMessages = (newMessages) => {
    setSentMessages(newMessages)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(message)
    setSentMessages([...sentMessages, message])

    const newMessage = {
      sender: user._id,
      content: {
        text: message
      },
      timestamp: new Date().toLocaleString("en-UK")
    }

    socket.emit("sendMessage", { message: newMessage })
    console.log("new message sending...", newMessage)
    setMessage("")
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }
  useEffect(() => {
    console.log("all messages", sentMessages)
  }, [sentMessages])

  useEffect(() => {
    if (currentChatParticipant !== null) {
      console.log("setting the current participant")

      setParticipant(currentChatParticipant)
      console.log(participant)
      if (participant) {
        const userDetailsObject = { username: participant.username, _id: participant._id }
        socket.emit("connectReceiveInfo", userDetailsObject)
        const attemptedRecipients = [user._id, currentChatParticipant._id]
        socket.emit("checkChats", attemptedRecipients)
        console.log("--------sending the 2 user id's---------")
      }
    }
  }, [currentChatParticipant, participant])

  // now here we have the code for the socket handling

  useEffect(() => {
    if (!hasLoadedChat) {
      if (activeChat !== null) {
        console.log("loading active chat")
        dispatch(loadChat(activeChat._id))
        setHasLoadedChat(true)
        socket.emit("openChat", currentChatId)
      } else if (participant !== null) {
        console.log("creating new chat")
        const newChatId = dispatch(createChat([participant._id]))
        dispatch(loadChat(newChatId))
        setHasLoadedChat(true)
      }
    }
  }, [activeChat, participant, hasLoadedChat, dispatch])

  useEffect(() => {
    setHasLoadedChat(false)
    if (currentChatParticipant !== null) {
      console.log("setting the current participant")
      setParticipant(currentChatParticipant)
    }
  }, [currentChatParticipant])

  useEffect(() => {
    console.log("all messages", sentMessages)
  }, [sentMessages])

  useEffect(() => {
    console.log("connecting socket")
    const socket = io(process.env.REACT_APP_BE_URL)
    if (activeChat !== null) {
      handleSocketConnect(socket, user, activeChat.participants, setNewMessages, dispatch)
    } else if (participant !== null) {
      handleSocketConnect(socket, user, [participant._id], setNewMessages, dispatch)
    }
    return () => {
      console.log("disconnecting socket")
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    console.log("-------logging the online users -------")
    socket.on("NewConnection", (OnlineUsers) => {
      console.log("Online Users from BE ----->", OnlineUsers)
      dispatch(setOnlineUsers(OnlineUsers))
    })
  }, [dispatch])

  return (
    <div className="d-flex flex-column h-100">
      <div id="chat-info">
        {participant !== null && participant.avatar ? (
          <>
            <div
              className="user-profile-image"
              style={{ backgroundImage: `url(${participant.avatar})`, border: "1px solid white" }}
            ></div>
            {participant.displayName && <div>{participant.displayName}</div>}
            {!participant.displayName && <div>{participant.username}</div>}
          </>
        ) : (
          <>
            <div
              className="user-profile-image"
              style={{ backgroundImage: `url(${blankImage})`, border: "1px solid white" }}
            ></div>
            {participant && participant.displayName && <div>{participant.displayName}</div>}
            {participant && !participant.displayName && <div>{participant.username}</div>}
          </>
        )}
      </div>

      <div id="chat">
  {sentMessages.map((msg, index) => (
    <div key={index} style={{backgroundColor: "lightgreen", borderBottom: "2px solid black"}}>{msg} <span style={{opacity: .7}}>{"from"}</span> <strong>{user.username}</strong> <br></br><span>{new Date().toLocaleTimeString("en-uk")}</span></div>
  ))}
</div>

      <div id="add-message">
        <div className="d-flex justify-content-around align-items-top border">
          <BsEmojiSmile />

          <GrAttachment />
          <div>
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                id="message-type-field"
                type="text"
                value={message}
                onChange={handleChange}
                placeholder="Type a message"
                aria-label="Message"
              />
            </Form>
          </div>
          <GrMicrophone />
        </div>
      </div>
    </div>
  )
}
