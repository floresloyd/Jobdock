import { createUserWithEmailAndPassword } from "firebase/auth";
import { userLoginDatabase } from "../FirebaseClient";
import { useNavigate } from "react-router-dom";

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
    <div>
      {/* Registration and Login */}
      <h1> Sign Up </h1>
      <form onSubmit={(e) => handleRegister(e)}>
        <input name="email" placeholder="E-mail"></input>
        <input name="password" type="password" placeholder="Password"></input>
        <button> Sign up</button>
      </form>
    </div>
  );
}

export default Register;
