import { sendPasswordResetEmail } from "firebase/auth";
import { userLoginDatabase } from "../FirebaseClient";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const reroute = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    sendPasswordResetEmail(userLoginDatabase, email)
      .then(() => {
        alert("Check your email for the password reset link");
        reroute("/");
      })
      .catch((err) => {
        console.error("Password reset error:", err);
        alert(err.message); // Displaying a more user-friendly error message
      });
  };

  return (
    <div>
      <h1> Forgot Password </h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input name="email" />
        <button> Reset </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
