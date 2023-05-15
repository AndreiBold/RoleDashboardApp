import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Account() {
  const navigate = useNavigate();

  const user  = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="account-details">
      <h3>
        <FaUserCircle /> My Account Details
      </h3>
      <hr></hr>
      <div className="user-data-section">
        <div className="user-data">
          <span className="user-data-label">Username: </span>
          <span className="user-data-value">{user.name}</span>
        </div>
        <div className="user-data">
          <span className="user-data-label">Email Address: </span>
          <span className="user-data-value">{user.email}</span>
        </div>
        <div className="user-data">
          <span className="user-data-label">Role: </span>
          <span className="user-data-value">{user.role}</span>
        </div>
      </div>
    </div>
  );
}

export default Account;
