import React from "react"
import blankImage from "../../assets/blank-profile-picture.png"

export default function MyProfileSettings() {
  return (
    <>
      <div id="profileSettingsImage">
        <div id="my-profile-image-large" style={{ backgroundImage: `url(${blankImage})` }}></div>
      </div>
      <div id="my-profile-your-name">
        <div>your name</div>
        <div>Aneesah</div>
      </div>
      <div>text</div>
      <div id="my-profile-about">about</div>
    </>
  )
}
