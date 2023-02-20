import React, { useState } from "react"
import { Image } from "react-bootstrap"
import blankImage from "../../assets/blank-profile-picture.png"
import { RiPencilFill } from "react-icons/ri"
import { BsCameraFill } from "react-icons/bs"

export default function MyProfileSettings() {
  const [hoveredImage, setHoveredImage] = useState(false)
  const handleHover = () => {
    setHoveredImage(true)
  }
  const handleLeave = () => {
    setHoveredImage(false)
  }
  return (
    <>
      <div id="profileSettingsImage">
        <div onMouseEnter={handleHover} onMouseLeave={handleLeave} id="my-profile-image-container">
          {hoveredImage === true && (
            <div id="hoveredProfileImage">
              <div className="d-flex flex-column justify-content-between align-items-center w-75">
                <BsCameraFill style={{ fontSize: "30px" }} />
                <div className="text-center">CHANGE PROFILE PHOTO</div>
              </div>
            </div>
          )}
          <Image src={blankImage} id="my-profile-image-large" style={{ height: "200px" }} />
        </div>
      </div>
      <div id="my-profile-your-name" className="p-3 border">
        <div className="profile-section-small-header">your name</div>
        <div className="d-flex justify-content-between align-items-center">
          <div>Aneesah</div>
          <RiPencilFill className="profile-settings-icon" />
        </div>
      </div>
      <div id="name-info" className="p-3">
        This is not your username or pin. This name will be visible to your WhatsApp contacts{" "}
      </div>
      <div id="my-profile-about" className="p-3 border">
        <div className="profile-section-small-header">About</div>
        <div className="d-flex justify-content-between align-items-center">
          <div>This is my bio</div>
          <RiPencilFill className="profile-settings-icon" />
        </div>
      </div>
    </>
  )
}
