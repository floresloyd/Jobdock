import { signInWithEmailAndPassword } from "firebase/auth";
import { userLoginDatabase } from "../FirebaseClient";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file
import logo from "../assets/jobdock-logo.png";

function Login() {
  const reroute = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault(); // This prevents the default form submission behavior. Does not refresh the page
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(userLoginDatabase, email, password)
      .then((data) => {
        console.log("Login Success");
        console.log(data, "authData");

        reroute("/home"); // Make sure this route is defined in your router
      })
      .catch((error) => {
        console.error(error.message);
        // Here, you would handle the error, e.g., display a login error message to the user
      });
  };

  const handleForgotPassword = () => {
    reroute("/forgot");
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="logo-section">
          <div className="logo">
            <img className="logo-image" src={logo} alt="JobDock Logo" />
          </div>
          <p className="tagline">
            No need to venture out into rough waters to keep track of all those
            job applications. With JobDock, <br />
            anchor all you r applications to one place⚓
          </p>
        </div>
        <div className="form-section">
          <h1>Welcome to JobDock!</h1>
          <form onSubmit={handleSignIn}>
            <input name="email" type="email" placeholder="email" required />
            <input
              name="password"
              type="password"
              placeholder="password"
              required
            />
            <div className="form-footer">
              <button type="submit" className="signin-content-button">
                Sign In
              </button>
              <button type="button" onClick={() => reroute("/register")}>
                Register
              </button>
              <button type="button" onClick={handleForgotPassword}>
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
