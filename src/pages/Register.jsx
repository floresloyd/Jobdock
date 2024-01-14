import { createUserWithEmailAndPassword } from "firebase/auth";
import { userLoginDatabase } from "../FirebaseClient";
import { useNavigate } from "react-router-dom";
import './Register.css'

function Register() {
  // Redirect to home
  const reroute = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Passowrd must be at least 6 characters
    // Valid email must occur
    // email already in use
    createUserWithEmailAndPassword(userLoginDatabase, email, password).then(
      (data) => {
        console.log(data, "authData");
        // If we login succesfully, we can login
        reroute("/");
      }
    );
  };

  return (
    <div className="register-container">
        <button className="back-button" onClick={() => reroute(-1)}>⬅</button>
      <div className="register-content">
        <h1>Sign Up for JobDock!</h1>
        <form onSubmit={handleRegister}>
          <input name="email" type="email" placeholder="email" required />
          <input name="password" type="password" placeholder="password" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
