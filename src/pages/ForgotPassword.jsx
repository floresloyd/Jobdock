import { sendPasswordResetEmail } from "firebase/auth";
import { userLoginDatabase } from "../FirebaseClient";
import { useNavigate } from "react-router-dom";
import './ForgotPassword.css'

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
    <div className="forgot-password-container">
    <button className="back-button" onClick={() => reroute(-1)}>⬅</button>
      <div className="forgot-password-content">
        <h1>Find your JobDock account</h1>
        <p>Please enter the email address associated with your account, 
           and we will send you a link to reset your password.</p>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="email" required />
          <button type="submit">Reset</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
