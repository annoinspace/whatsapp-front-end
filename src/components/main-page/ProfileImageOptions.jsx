import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { ListGroup } from "react-bootstrap"
import { showFullProfileImageAction } from "../../redux/actions/profileAction"

export default function ProfileImageOptions() {
  const dispatch = useDispatch()

  const viewPhotoHandler = () => {
    dispatch(showFullProfileImageAction())
  }
  return (
    <>
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
