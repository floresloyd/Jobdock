import PropTypes from "prop-types";
import "./JobCard.css"; // Make sure to import the CSS file

function JobCard({
  contact,
  dateapplied,
  employer,
  postinglink,
  role,
  status,
}) {
  const handleExpand = () => {
    alert("Expand Functionality ");
  };

  return (
    <div className="job-card">
      <h2>{role}</h2>
      <p>{employer}</p>
      <p>Date Applied: {dateapplied}</p>
      <p>Status: {status}</p>
      <p>Contact: {contact}</p>
      <div className="buttons">
        <a
          href={postinglink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          Application Link
        </a>
        <button className="btn" onClick={handleExpand}>
          Expand
        </button>
      </div>
    </div>
  );
}

JobCard.propTypes = {
  contact: PropTypes.string, // Assuming contact is a string
  dateapplied: PropTypes.string, // Assuming dateapplied is a string
  employert: PropTypes.string, // Assuming employert is a string
  postinglink: PropTypes.string, // Assuming postinglink is a string (URL)
  role: PropTypes.string, // Assuming role is a string
  status: PropTypes.string, // Assuming status is a string
  userid: PropTypes.string, // Assuming userid is a string
  employer: PropTypes.string,
};

export default JobCard;
