import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Image } from "react-bootstrap"
import blankImage from "../../assets/blank-profile-picture.png"
import { RiPencilFill } from "react-icons/ri"
import { BsCameraFill } from "react-icons/bs"
import ProfileImageOptions from "./ProfileImageOptions"
import FullProfileImage from "./FullProfileImage"
import { changeAbout, changeDisplayName, toggleProfileImageOptions } from "../../redux/actions/profileAction"

export default function MyProfileSettings() {
  const dispatch = useDispatch()
  const [hoveredImage, setHoveredImage] = useState(false)
  // const profileImage = useSelector((state) => state.loadedProfile.myProfilePicture)
  const user = useSelector((state) => state.loadedProfile.currentUser)
  const profileImage = user.avatar

  const showFullScreenProfileImage = useSelector((state) => state.showEnlargedProfileImage.viewProfileImage)
  const showOptions = useSelector((state) => state.toggleProfileImageOptionsReducer.profileImageOptions)
  const [editingAbout, setEditingAbout] = useState(false)
  const [about, setAbout] = useState(user.about)
  const [isEditingDisplayName, setIsEditingDisplayName] = useState(false)
  const [displayName, setDisplayName] = useState(user.displayName)

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
  const handleAboutEdit = () => {
    setEditingAbout(true)
  }

  const handleAboutChange = (e) => {
    setAbout(e.target.value)
  }

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value)
  }

  const handleAboutSave = () => {
    setEditingAbout(false)
    console.log("about saved", about)
    dispatch(changeAbout(about))
    // Update the about field in the state or send it to the server
  }

  const handledisplayNameSave = () => {
    setIsEditingDisplayName(false)
    console.log("display name saved", displayName)
    dispatch(changeDisplayName(displayName))
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
        {isEditingDisplayName ? (
          <div className="d-flex justify-content-between align-items-center">
            <input type="text" value={displayName} onChange={handleDisplayNameChange} />
            <button onClick={handledisplayNameSave}>Save</button>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <div>{displayName}</div>
            <RiPencilFill className="profile-settings-icon" onClick={() => setIsEditingDisplayName(true)} />
          </div>
        )}
      </div>

      <div id="name-info" className="p-3">
        This is not your DisplayName or pin. This name will be visible to your WhatsApp contacts{" "}
      </div>
      <div id="my-profile-about" className="p-3 border">
        <div className="profile-section-small-header">About</div>
        {editingAbout ? (
          <div className="d-flex justify-content-between align-items-center">
            <input value={about} onChange={handleAboutChange} />
            <button onClick={handleAboutSave}>Save</button>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <div>{about}</div>
            <RiPencilFill className="profile-settings-icon" onClick={handleAboutEdit} />
          </div>
        )}
      </div>
    </>
  )
}
