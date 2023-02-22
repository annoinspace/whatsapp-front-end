import React, { useState } from "react"
import { Button, Image } from "react-bootstrap"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import defaultImage from "../../assets/blank-profile-picture.png"

const Test = () => {
  const [profileImage, setProfileImage] = useState(defaultImage)
  const [src, selectFile] = useState(null)
  const [image, setImage] = useState(null)
  const [result, setResult] = useState(null)
  const [crop, setCrop] = useState({ aspect: 1 })
  const handleFileChange = (e) => {
    selectFile(URL.createObjectURL(e.target.files[0]))
  }

  function getCroppedImg() {
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
    setResult(base64Image)
    setProfileImage(base64Image)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          profile image
          <Image src={profileImage} style={{ height: "200px", width: "200px", border: "2px solid green" }} />
        </div>
        <div className="col-4">
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        {src && (
          <div className="col-6">
            <ReactCrop src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop} />
            <Button variant="danger" onClick={getCroppedImg}>
              crop
            </Button>
          </div>
        )}
        {result && (
          <div className="col-4">
            cropped image
            <Image src={result} className="img-fluid" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Test
