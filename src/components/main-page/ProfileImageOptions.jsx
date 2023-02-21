import React, { useState } from "react"

import { ListGroup } from "react-bootstrap"

export default function ProfileImageOptions() {
  const [viewProfilePhoto, setViewProfilePhoto] = useState(false)
  const viewPhotoHandler = () => {
    setViewProfilePhoto(true)
  }
  return (
    <>
      {viewProfilePhoto === true && <div>Profile Image Clicked </div>}
      <ListGroup id="profileImageOptions">
        <ListGroup.Item className="p-2 image-options-list-item " onClick={viewPhotoHandler}>
          View Photo
        </ListGroup.Item>
        <ListGroup.Item className="p-2 image-options-list-item ">Take Photo</ListGroup.Item>
        <ListGroup.Item className="p-2 image-options-list-item ">Upload photo</ListGroup.Item>
        <ListGroup.Item className="p-2 image-options-list-item ">Remove Photo</ListGroup.Item>
      </ListGroup>
    </>
  )
}
