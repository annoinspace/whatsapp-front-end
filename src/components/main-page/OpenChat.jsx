import React from "react"
import AddMessage from "./AddMessage"

export default function OpenChat() {
  return (
    <div className="d-flex flex-column h-100">
      <div id="chat-info">chat info</div>
      <div id="chat">chat</div>
      <AddMessage />
    </div>
  )
}
