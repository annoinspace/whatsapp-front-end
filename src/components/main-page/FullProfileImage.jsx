import React from "react"
import { Image } from "react-bootstrap"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { closeFullProfileImageAction } from "../../redux/actions/profileAction"

export default function FullProfileImage({ image }) {
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(closeFullProfileImageAction())
  }
  return (
    <>
      <div id="full-profile-image">
        <AiOutlineCloseCircle id="profile_image-close" onClick={handleClose} />
        <div id="full-profile-image-wrapper">
          <Image src={image} style={{ height: "400px", width: "400px", aspectRatio: "1/1" }} />
        </div>
      </div>
    </>
  )
}
