import "./Navbar.css"; // Import the CSS file for styling
import { signOut } from "firebase/auth";
import { userLoginDatabase } from "../FirebaseClient";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const reroute = useNavigate();

  // Log out
  const handleSignOut = () => {
    signOut(userLoginDatabase)
      .then(() => {
        reroute("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <a href="/home" className="nav-item">
          Home
        </a>
        <a href="/stats" className="nav-item">
          Statistics
        </a>
      </div>
      <button className="signout-btn" onClick={handleSignOut}>
        {" "}
        Sign Out
      </button>
    </nav>
  );
}

export default Navbar;
