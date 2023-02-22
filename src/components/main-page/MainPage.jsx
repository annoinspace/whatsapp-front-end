import React, { useEffect, useState } from "react"
import "./mainCss.css"
import SingleChatSidebar from "./SingleChatSidebar"
import { ListGroup } from "react-bootstrap"

import { RiTeamFill } from "react-icons/ri"
import { TbCircleDashed } from "react-icons/tb"
import { AiOutlinePlus, AiOutlineArrowLeft } from "react-icons/ai"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import blankImage from "../../assets/blank-profile-picture.png"
import SearchChat from "./SearchChat"
import MyProfileSettings from "./MyProfileSettings"
import OpenChat from "./OpenChat"
import { useSelector } from "react-redux"

export default function MainPage() {
  const [viewProfileSettings, setViewProfileSettings] = useState(false)
  const myProfile = useSelector((state) => state.loadedProfile.currentUser)
  const profileImage = useSelector((state) => state.loadedProfile.myProfilePicture)
  console.log("profileImage", profileImage)
  const avatar = profileImage ? profileImage : blankImage

  console.log("current user details", myProfile)

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
                <SingleChatSidebar />
                <SingleChatSidebar />
                <SingleChatSidebar />
                <SingleChatSidebar />
                <SingleChatSidebar />
                <SingleChatSidebar />
                <SingleChatSidebar />
                <SingleChatSidebar />
                <SingleChatSidebar />
                <SingleChatSidebar />
                <SingleChatSidebar />
                <SingleChatSidebar />
                <SingleChatSidebar />
                <SingleChatSidebar />
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
