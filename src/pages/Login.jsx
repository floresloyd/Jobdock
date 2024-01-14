import { signInWithEmailAndPassword } from "firebase/auth";
import { userLoginDatabase } from "../FirebaseClient";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1> Sign In </h1>
      <form onSubmit={handleSignIn}>
        <input name="email" placeholder="E-mail" required></input>
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        ></input>
        <button type="submit">LOGIN: Sign In</button>
      </form>
      <button onClick={handleForgotPassword}> Forgot password? </button>
    </div>
  );
}

export default Login;
