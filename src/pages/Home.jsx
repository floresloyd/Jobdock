/* eslint-disable no-unused-vars */
{
  /** Home page. This is where you are rerouted once you log in. */
}

import { useState, useEffect, useRef } from "react";
import { getAuth } from "firebase/auth";
import { jobDataBase } from "../FirebaseClient";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import JobCard from "../components/JobCard";
import './Home.css'

function Home() {
  const [jobs, setJobs] = useState([]); // Used to hold all jobs in the database
  const formRef = useRef(null); // Reference to the form element
  const auth = getAuth(); // used to access current logged in user

  // Get the current user's ID
  const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

  // Define the collection reference outside useEffect
  const colRef = collection(jobDataBase, "jobs");

  // Keeps track of current jobs of the user
  useEffect(() => {
    if (currentUserId) {
      // Create a query against the collection.
      const queryRef = query(colRef, where("userid", "==", currentUserId)); // Fixed 'new query' to 'query'

      getDocs(queryRef)
        .then((snapshot) => {
          const fetchedJobs = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setJobs(fetchedJobs);
        })
        .catch((err) => {
          console.error("Error fetching documents:", err);
        });
    }
  }, [currentUserId]); // Removed colRef from dependencies array since it's no longer directly used

  // Function to access user id
  function getCurrentUserId() {
    const auth = getAuth();
    const user = auth.currentUser;
    return user ? user.uid : null;
  }

  // Format date into database format
  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Add role button
  const handleAddRole = (e) => {
    e.preventDefault();
    const role = e.target.role.value;
    const employer = e.target.employer.value;
    const postinglink = e.target.postinglink.value;
    const contact = e.target.contact.value;
    const dateapplied = formatDate(new Date());
    const status = e.target.status.value;
    const userid = getCurrentUserId();

    // Add entry to the database
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
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="home-container">
      <div className="controls">
        <button className="button-popup" onClick={() => {alert('Add job')}}>Add Job</button>
        <button className="sort-btn" onClick={() => {alert("Sort")}}>Sort by</button>
        <div className="search-sort">
          <input type="text" name="search" placeholder="Search" className="search-box" />
          <button className="search-btn" onClick={() => {alert("Search")}}>Search</button>
        </div>
      </div>

      <div className="job-cards-container">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            role={job.role}
            employer={job.employer}
            dateapplied={job.dateapplied}
            status={job.status}
            contact={job.contact}
            postinglink={job.postinglink}
          />
        ))}
      </div>
    </div>
  );
}


export default Home;
