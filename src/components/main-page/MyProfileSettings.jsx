import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Image } from "react-bootstrap"
import blankImage from "../../assets/blank-profile-picture.png"
import { RiPencilFill } from "react-icons/ri"
import { BsCameraFill } from "react-icons/bs"
import ProfileImageOptions from "./ProfileImageOptions"
import FullProfileImage from "./FullProfileImage"
import { toggleProfileImageOptions } from "../../redux/actions/profileAction"

export default function MyProfileSettings() {
  const dispatch = useDispatch()
  const [hoveredImage, setHoveredImage] = useState(false)
  const profileImage = useSelector((state) => state.loadedProfile.myProfilePicture)
  const showFullScreenProfileImage = useSelector((state) => state.showEnlargedProfileImage.viewProfileImage)
  const showOptions = useSelector((state) => state.toggleProfileImageOptionsReducer.profileImageOptions)

  const handleHover = (e) => {
    setHoveredImage(true)
  }
  const handleLeave = (e) => {
    if (!showOptions && e.target.id !== "my-profile-image-container") {
      setHoveredImage(false)
    } else {
      setHoveredImage(true)
    }
  }

  const handleHoveredClick = () => {
    setHoveredImage(true)
    dispatch(toggleProfileImageOptions(true))
  }
  useEffect(() => {
    if (showFullScreenProfileImage === true) {
      console.log("show image is true")
      dispatch(toggleProfileImageOptions(false))
      setHoveredImage(false)
    }
  }, [showOptions, showFullScreenProfileImage, hoveredImage])

  const avatar = profileImage ? profileImage : blankImage

  return (
    <>
      {showFullScreenProfileImage === true && <FullProfileImage avatar={avatar} />}

      <div id="profileSettingsImage">
        <div onMouseEnter={handleHover} onMouseLeave={handleLeave} id="my-profile-image-container">
          {hoveredImage === true && (
            <div id="hoveredProfileImage" onClick={handleHoveredClick}>
              <div className="d-flex flex-column justify-content-between align-items-center w-75">
                <BsCameraFill style={{ fontSize: "30px" }} />
                <div className="text-center">CHANGE PROFILE PHOTO</div>
              </div>
            </div>
          )}
          <Image src={avatar} id="my-profile-image-large" style={{ height: "200px" }} />
        </div>
        {showOptions === true && <ProfileImageOptions avatar={avatar} />}
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
