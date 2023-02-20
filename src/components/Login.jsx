import { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = ({ setLoggedIn, loggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  return (
    <>
      <div
        className="w-50"
        style={{
            float: "left",
          height: "54vh",
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
          <h2 className="my-4">Login</h2>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="my-4" controlId="formBasicPassword">
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

          {loading && <Spinner animation="border" role="status"></Spinner>}
          {!loading && errorOccurred && (
            <Alert variant="danger">Error logging in, try again!</Alert>
          )}
          {!loading && !errorOccurred && postSuccess && (
            <Alert variant="success">Login successful!</Alert>
          )}

          <Button variant="secondary" type="submit" className="my-4">
          Login <img src={process.env.PUBLIC_URL + '/images/whatsapp.png'} alt="whatsapp" style={{height:"24px", width: "24px"}}/>
          </Button>
          <div className="mt-4">
            <Link to="/" className="text-dark">
              ...or create an account!
            </Link>
          </div>
        </Form>
        </div>
      </div>
    </>
  );
};

export default Login;