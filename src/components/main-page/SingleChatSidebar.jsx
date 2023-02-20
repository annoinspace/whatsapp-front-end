import React from "react"
import { ListGroup } from "react-bootstrap"
import blankImage from "../../assets/blank-profile-picture.png"

export default function SingleChatSidebar() {
  return (
    <ListGroup.Item className="d-flex minimised-chat list-group-item ">
      <div className="user-profile-image" style={{ backgroundImage: `url(${blankImage})` }}></div>
      <div className="w-100 ml-2 border-bottom">
        <div className="d-flex w-100 justify-content-between ">
          <div>Asdren J.</div>
          <div className="gray-text">07:24</div>
        </div>
        <div className="gray-text truncate ">hello hello hello hello hello ...........................</div>
      </div>
    </ListGroup.Item>
  )
}
