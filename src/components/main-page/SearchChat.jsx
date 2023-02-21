import React from "react"
import { Form } from "react-bootstrap"
// import { BsSearch } from "react-icons/bs"
import { IoReorderThreeOutline } from "react-icons/io5"

export default function SearchChat() {
  return (
    <>
      <Form className="d-flex align-items-center">
        <Form.Control type="search" placeholder="search or start new chat" className="me-2" aria-label="Search" />
        <IoReorderThreeOutline />
      </Form>
    </>
  )
}
