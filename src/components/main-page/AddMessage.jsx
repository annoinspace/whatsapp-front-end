import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { BsEmojiSmile } from "react-icons/bs";
import { GrAttachment, GrMicrophone } from "react-icons/gr";

export default function AddMessage() {
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    setSentMessages([...sentMessages, message]);
    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    console.log("all messages", sentMessages);
  }, [sentMessages]);

  return (
    <div id="add-message">
      <div className="d-flex justify-content-around align-items-top border">
        <BsEmojiSmile />

        <GrAttachment />
        <div>
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              id="message-type-field"
              type="text"
              value={message}
              onChange={handleChange}
              placeholder="Type a message"
              aria-label="Message"
            />
          </Form>
        </div>
        <GrMicrophone />
      </div>
    </div>
  );
}
