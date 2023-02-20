import React from "react"
import blankImage from "../../assets/blank-profile-picture.png"
import { RiTeamFill } from "react-icons/ri"
import { TbCircleDashed } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"
import { HiOutlineDotsHorizontal } from "react-icons/hi"

export default function MyProfile() {
  return (
    <div className="d-flex justify-content-between align-items-center pr-3 pl-3 pt-2 pb-2">
      <div className="my-profile-image" style={{ backgroundImage: `url(${blankImage})` }}></div>
      <div className=" d-flex gap">
        <RiTeamFill />
        <TbCircleDashed />
        <AiOutlinePlus />
        <HiOutlineDotsHorizontal />
      </div>
    </div>
  )
}
