import React, { useState, useEffect } from "react"
import AddMessage from "./AddMessage"
import { useSelector, useDispatch } from "react-redux"
import blankImage from "../../assets/blank-profile-picture.png"

export default function OpenChat() {
  const [participant, setParticipant] = useState(null)

  const currentChatParticipant = useSelector((state) => state.loadedProfile.currentChatParticipant)

  useEffect(() => {
    if (currentChatParticipant !== null) {
      console.log("setting the current participant")

      setParticipant(currentChatParticipant)
      console.log(participant)
    }
  }, [currentChatParticipant, participant])

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
      <div id="chat">chat</div>
      <AddMessage />
    </div>
  )
}
