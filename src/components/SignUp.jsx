import { useState } from "react";
import { Alert, Button, Col, Form, Row, Spinner, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  return (
    <>
      <div
        className="w-50"
        style={{
            float: "left",
          height: "56vh",
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/whatsapp-promo.webp)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          opacity: ".7",
          borderRadius: "10px",
          boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.1)",
        }}
      ></div>
      <div className="w-50" style={{ float: "right" }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Create an account</h2>
          <Form>
            <Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formGridEmail" className="mt-2">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formGridPassword" className="mt-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formGridPassword" className="my-2">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repeat Password"
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            {loading && (
              <Spinner animation="border" role="status"></Spinner>
            )}
            {!loading && errorOccurred && (
              <Alert variant="danger">
                Error occurred when creating profile!
              </Alert>
            )}
            {!loading && !errorOccurred && postSuccess && (
              <Alert variant="success">
                Profile created!
              </Alert>
            )}
            <Button className="mt-2" variant="secondary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
