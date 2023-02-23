import React, { useEffect, useState } from "react"
import "./mainCss.css"
import SingleChatSidebar from "./SingleChatSidebar"
import { ListGroup } from "react-bootstrap"
import { RiTeamFill } from "react-icons/ri"
import { TbCircleDashed } from "react-icons/tb"
import { AiOutlinePlus, AiOutlineArrowLeft } from "react-icons/ai"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import SearchChat from "./SearchChat"
import MyProfileSettings from "./MyProfileSettings"
import OpenChat from "./OpenChat"
import { useSelector, useDispatch } from "react-redux"
import { getAllUsers } from "../../redux/actions/profileAction"

export default function MainPage() {
  const dispatch = useDispatch()
  const [viewProfileSettings, setViewProfileSettings] = useState(false)
  const user = useSelector((state) => state.loadedProfile.currentUser)
  const allUsers = useSelector((state) => state.loadedProfile.allUsers)
  // console.log("all users in main page", allUsers)
  const myProfile = useSelector((state) => state.loadedProfile.currentUser)
  // const profileImage = myProfile.avatar === undefined ? "../../assets/blank-profile-picture.png" : myProfile.avatar
  // console.log("profileImage", profileImage)
  const blankImage = "../../assets/blank-profile-picture.png"

  const profileImage = user.avatar

  const avatar = profileImage ? profileImage : blankImage

  const showMyProfileHandler = () => {
    console.log("profile image clicked")
    setViewProfileSettings(true)
  }
  const setViewProfileSettingsFalse = () => {
    console.log("going back to chats")
    setViewProfileSettings(false)
  }
  useEffect(() => {
    console.log("profile image changed")
    console.log("current user", user)
    console.log("getting all users")
    dispatch(getAllUsers(user))
  }, [profileImage])

  return (
    <div id="main-page-container" className="">
      <div id="green-banner"></div>
      <div id="main-page-wrapper" className="d-flex ">
        <div id="left-side-wrapper">
          {viewProfileSettings === true && (
            <>
              <div id="green-profile-banner">
                <div className="d-flex align-items-center w-100 p-3">
                  <AiOutlineArrowLeft style={{ cursor: "pointer" }} onClick={setViewProfileSettingsFalse} />
                  <h5 className="ml-3">Profile</h5>
                </div>
              </div>
              <MyProfileSettings />
            </>
          )}
          {viewProfileSettings === false && (
            <>
              <div id="my-profile">
                <div className="d-flex justify-content-between align-items-center pr-3 pl-3 pt-2 pb-2">
                  <div
                    onClick={showMyProfileHandler}
                    className="my-profile-image"
                    style={{ backgroundImage: `url(${avatar})` }}
                  ></div>
                  <div className=" d-flex main-icons">
                    <RiTeamFill />
                    <TbCircleDashed />
                    <AiOutlinePlus />
                    <HiOutlineDotsHorizontal />
                  </div>
                </div>
              </div>
              <SearchChat />
              <ListGroup id="all-chats" className="">
                {allUsers && allUsers.map((user) => <SingleChatSidebar key={user._id} user={user} />)}
              </ListGroup>
            </>
          )}
        </div>

        <div id="open-chat" className="border">
          <OpenChat />
        </div>
      </div>
    </div>
  )
}
