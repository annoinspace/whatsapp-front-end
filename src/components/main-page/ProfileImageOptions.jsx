import React, { useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import { ListGroup, Image, Modal, Button } from "react-bootstrap"
import "react-image-crop/dist/ReactCrop.css"
import ReactCrop from "react-image-crop"
import {
  sendImageToBackend,
  setProfilePicture,
  showFullProfileImageAction,
  toggleProfileImageOptions
} from "../../redux/actions/profileAction"

export default function ProfileImageOptions({ avatar }) {
  const [profileImage, setProfileImage] = useState(avatar)
  const [result, setResult] = useState(null)
  const [src, selectFile] = useState(null)
  const [image, setImage] = useState(null)
  const [crop, setCrop] = useState({ aspect: 1 })
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  const dispatch = useDispatch()

  const handleFileChange = (e) => {
    selectFile(URL.createObjectURL(e.target.files[0]))
    setShow(true)
  }

  // function getCroppedImg() {
  //   const canvas = document.createElement("canvas")
  //   const scaleX = image.naturalWidth / image.width
  //   const scaleY = image.naturalHeight / image.height
  //   canvas.width = crop.width
  //   canvas.height = crop.height
  //   const ctx = canvas.getContext("2d")
  //   ctx.drawImage(
  //     image,
  //     crop.x * scaleX,
  //     crop.y * scaleY,
  //     crop.width * scaleX,
  //     crop.height * scaleY,
  //     0,
  //     0,
  //     crop.width,
  //     crop.height
  //   )
  //   const base64Image = canvas.toDataURL("image/jpeg")
  //   // console.log("base64Image", base64Image)
  //   // const url = URL.createObjectURL(dataURItoBlob(base64Image))
  //   // console.log("url", url)
  //   const blob = dataURItoBlob(base64Image)
  //   const formData = new FormData()
  //   if (formData) {
  //     formData.append("file", blob, "image.jpeg")

  //     console.log("formData", formData)
  //     setResult(formData)
  //     setProfileImage(base64Image)
  //     setShow(false)
  //     dispatch(sendImageToBackend(formData))
  //   } else {
  //     console.log("error creating form data")
  //   }
  // }
  function cropImg() {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas")
      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height
      canvas.width = crop.width
      canvas.height = crop.height
      const ctx = canvas.getContext("2d")
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      )
      const base64Image = canvas.toDataURL("image/jpeg")
      const blob = dataURItoBlob(base64Image)
      const formData = new FormData()
      formData.append("file", blob, "image.jpeg")

      setResult(formData)
      setProfileImage(base64Image)
      setShow(false)

      // Return the Promise
      resolve(formData)
    })
  }

  async function getCroppedImg() {
    console.log("getting cropped img")
    const formData = await cropImg()
    if (formData) {
      console.log("formData", formData)
      dispatch(sendImageToBackend(formData))
    }
  }

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1])
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ab], { type: "image/jpeg" })
  }

  const viewPhotoHandler = () => {
    dispatch(showFullProfileImageAction())
  }

  const removePhotoHandler = () => {
    dispatch(setProfilePicture(null))
    dispatch(toggleProfileImageOptions(false))
  }
  useEffect(() => {
    if (result !== null) {
      dispatch(toggleProfileImageOptions(false))
      // console.log("profileImage", profileImage)
      dispatch(setProfilePicture(profileImage))
      // console.log("profileImage result", result)
    }
  }, [result, dispatch])

  return (
    <>
      <ListGroup id="profileImageOptions">
        <ListGroup.Item className="p-2 image-options-list-item " onClick={viewPhotoHandler}>
          View Photo
        </ListGroup.Item>
        <ListGroup.Item className="p-2 image-options-list-item ">Take Photo</ListGroup.Item>
        <ListGroup.Item className="p-2 image-options-list-item ">
          <input id="fileInput" style={{ display: "none" }} type="file" accept="image/*" onChange={handleFileChange} />
          <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
            Upload photo
          </label>
        </ListGroup.Item>

        <ListGroup.Item className="p-2 image-options-list-item" onClick={removePhotoHandler}>
          Remove Photo
        </ListGroup.Item>
      </ListGroup>
      {result && (
        <Image
          src={profileImage}
          style={{ height: "50px", width: "50px", paddingBottom: "0", border: "1px solid red" }}
        />
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactCrop src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop}></ReactCrop>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={getCroppedImg}>
            Crop
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
