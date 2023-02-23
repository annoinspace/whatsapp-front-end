import React from "react"
import { ListGroup } from "react-bootstrap"
import blankImage from "../../assets/blank-profile-picture.png"
import { useDispatch } from "react-redux"
import { setCurrentChatParticipant } from "../../redux/actions/profileAction"

export default function SingleChatSidebar({ user }) {
  const dispatch = useDispatch()
  const setCurrentChat = () => {
    console.log({ user })
    dispatch(setCurrentChatParticipant(user))
  }
  // console.log("user in sidebar chat component", user)
  // console.log("user in sidebar chat component", user.username)
  const avatar = user.avatar ? user.avatar : blankImage
  return (
    <>
      <ListGroup.Item className="d-flex minimised-chat list-group-item pb-0" onClick={setCurrentChat}>
        <div className="d-flex flex-column w-100">
          <div className="d-flex flex-row  w-100">
            <div className="user-profile-image" style={{ backgroundImage: `url(${avatar})` }}></div>
            <div className="w-100 ml-2 ">
              <div className="d-flex w-100 justify-content-between ">
                <div>{user.displayName ? user.displayName : user.username}</div>
                <div className="gray-text">07:24</div>
              </div>
              <div className="gray-text truncate ">hello hello hi hello hello hi hello hello </div>
            </div>
          </div>
          <div className="side-chat-border"> </div>
        </div>
      </ListGroup.Item>
    </>
  )
}
