/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import "./JobEntry.css";

function JobEntry({
  contact,
  dateapplied,
  employer,
  postinglink,
  role,
  status,
}) {
  const handleExpand = () => {
    alert("Expand Functionality");
  };

  return (
    <div className="job-entry">
      <div>{role}</div>
      <div>{employer}</div>
      <div>Date Applied: {dateapplied}</div>
      <div>Status: {status}</div>
      <div>Contact: {contact}</div>
      <div className="button-container">
        <button
          onClick={() => (window.location.href = postinglink)}
          className="btn"
        >
          Application Link
        </button>
        <button onClick={handleExpand} className="btn">
          Expand
        </button>
      </div>
    </div>
  );
}

JobEntry.propTypes = {
  contact: PropTypes.string, // Assuming contact is a string
  dateapplied: PropTypes.string, // Assuming dateapplied is a string
  employert: PropTypes.string, // Assuming employert is a string
  postinglink: PropTypes.string, // Assuming postinglink is a string (URL)
  role: PropTypes.string, // Assuming role is a string
  status: PropTypes.string, // Assuming status is a string
  userid: PropTypes.string, // Assuming userid is a string
  employer: PropTypes.string,
};

export default JobEntry;
