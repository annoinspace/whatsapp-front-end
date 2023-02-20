import React from "react"
import "./mainCss.css"
import SingleChatSidebar from "./SingleChatSidebar"
import { ListGroup } from "react-bootstrap"

import SearchChat from "./SearchChat"
import MyProfile from "./MyProfile"

export default function MainPage() {
  return (
    <div id="main-page-container" className="">
      <div id="green-banner"></div>
      <div id="main-page-wrapper" className="d-flex ">
        <div id="left-side-wrapper">
          <div id="my-profile">
            <MyProfile />
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
        </div>

        <div id="open-chat" className="border">
          openchat
        </div>
      </div>
    </div>
  )
}
