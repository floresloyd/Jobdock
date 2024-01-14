{
  /** Home page. This is where you are rerouted once you log in. */
}
import { useState, useEffect, useRef } from "react";
import { signOut, getAuth } from "firebase/auth";
import { userLoginDatabase, jobDataBase } from "../FirebaseClient";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, addDoc } from "firebase/firestore";

function Home() {
  const [jobs, setJobs] = useState([]);
  const history = useNavigate();
  const formRef = useRef(null); // Reference to the form element
  const auth = getAuth();

  // Get the current user's ID
  const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

  // Define the collection reference outside useEffect
  const colRef = collection(jobDataBase, "jobs");

  useEffect(() => {
    if (currentUserId) {
      getDocs(colRef)
        .then((snapshot) => {
          const fetchedJobs = snapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((job) => job.userid === currentUserId); // Filter jobs by current user's ID
          setJobs(fetchedJobs);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [currentUserId, colRef]); // Include colRef in dependencies array

  const handleSignOut = () => {
    signOut(userLoginDatabase)
      .then(() => {
        history("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  function getCurrentUserId() {
    const auth = getAuth();
    const user = auth.currentUser;
    return user ? user.uid : null;
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleAddRole = (e) => {
    e.preventDefault();
    const role = e.target.role.value;
    const employer = e.target.employer.value;
    const postinglink = e.target.postinglink.value;
    const contact = e.target.contact.value;
    const dateapplied = formatDate(new Date());
    const status = e.target.status.value;
    const userid = getCurrentUserId();

    addDoc(colRef, {
      role,
      employer,
      postinglink,
      contact,
      dateapplied,
      status,
      userid,
    })
      .then(() => {
        formRef.current.reset(); // Reset the form fields
        alert("Job Added");
        window.location.reload(); // rerender
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleSignOut}>Sign Out</button>
      <form ref={formRef} onSubmit={handleAddRole}>
        <input name="role" placeholder="Role" required />
        <input name="employer" placeholder="Employer" required />
        <input name="postinglink" placeholder="Posting Link" required />
        <input name="contact" placeholder="Contact" />

        <select name="status" required>
          <option value="" disabled hidden>
            Select Status
          </option>
          <option value="applied">Applied</option>
          <option value="saved">Saved</option>
        </select>

        <button type="submit">Add a Role</button>
      </form>

      <div>
        {jobs.map((job) => (
          <div key={job.id}>
            {/* Render each job */}
            <h2>{job.role}</h2> {/* Changed from job.title to job.role */}
            <p>Employer: {job.employer}</p>
            <p>Contact: {job.contact}</p>
            <p>
              Application Date:{" "}
              {new Date(job.dateapplied.seconds * 1000).toLocaleDateString()}
            </p>
            <p>Status: {job.status}</p>
            <a href={job.postinglink} target="_blank" rel="noopener noreferrer">
              Job Posting
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
