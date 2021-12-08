import React, { useState } from "react";
import { Form } from "reactstrap";
import { GoogleLogin } from "react-google-login";
import LoginAPI from "../APIService/LoginAPI";
import { useHistory } from "react-router-dom";
import BackdropEffect from "./Backdrop";
import cookie from "react-cookies";
import { CLIENT_ID } from "./constants";
function AuthForm(props) {
  const [action, setAction] = useState(false);
  const history = useHistory();
  const [backdrop, setBackdrop] = useState(false);
  const responseGoogle = async (response) => {
    setAction(true);
    const {
      profileObj: { name, imageUrl: avatar, email, googleId },
    } = response;
    const data = {
      googleId: googleId,
      name: name,
      avatar: avatar,
      email: email,
    };
    setBackdrop(true);
    const loginResponse = await LoginAPI.loginGoogle(data);
    if (loginResponse.statusText === "OK") {
      setBackdrop(false);
      cookie.save("user", loginResponse, { path: "/" });
      history.push("/");
    }
  };
  return (
    <Form>
      <div className="text-center pb-4">
        <div className="m-r">
          <GoogleLogin
            clientId={CLIENT_ID}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                className="login-with-google-btn"
                id="googleButton"
              >
                Sign in with Google
              </button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
      <BackdropEffect openBackdrop={backdrop} />
    </Form>
  );
}
export default AuthForm;
