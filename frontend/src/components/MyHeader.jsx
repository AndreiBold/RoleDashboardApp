import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function MyHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const header = (
    <div className="header">
      {user ? (
        <ul>
          <li className="nav-item mr-3">
            <Link to="/" className="nav-link text-white">
              Roles Dashboard
            </Link>
          </li>

          <li className="nav-item mr-3">
            <Link to="/account" className="nav-link text-white">
              Account
            </Link>
          </li>
          <li>
            <span>{`Welcome ${user.name}!`}</span>
          </li>
          <li>
            <button className="btn btn-xs" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/login">
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li>
            <Link to="/register">
              <FaUser /> Register
            </Link>
          </li>
        </ul>
      )}
    </div>
  );

  return (
    <nav className="navbar navbar-expand-md navbar-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {header}
      </div>
    </nav>
  );
}

export default MyHeader;
