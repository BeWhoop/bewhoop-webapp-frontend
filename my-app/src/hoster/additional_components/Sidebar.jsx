import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/BeWhoopLogo.png';
import { useContext } from 'react';
import { HosterContext } from '../contexts/HosterContext';
import {
  FaExpand,
  FaCalendarDays,
  FaCalendarPlus,
  FaMessage,
  FaStreetView,
  FaRegUser,
  FaGears,
  FaUnlock,
} from 'react-icons/fa6';
import './Sidebar.css';
import toast from 'react-hot-toast'; // ✅ Import toast

function Sidebar() {
  const { setHosterData } = useContext(HosterContext);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  const handleLogout = () => {
    const toastId = toast.loading('Logging out...'); // ✅ Toast loading

    setTimeout(() => {
      // Clear context
      setHosterData({});
      // Remove token
      localStorage.removeItem('token');
      // Success message
      toast.success('Logged out successfully.', { id: toastId });
      // Redirect to home/login
      navigate('/');
    }, 1200); // Simulated logout delay
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="Company Logo" />
      </div>

      <div className="nav-links">
        <ul>
          <li
            className={`nav-item ${isActive('/hoster/dashboard') ? 'active' : ''}`}
            onClick={() => navigate('/hoster/dashboard')}
          >
            <FaExpand className="nav-icon" />
            <a>Dashboard</a>
          </li>

          <hr className="sidebar-divider" />

          <li
            className={`nav-item ${isActive('/my-events') ? 'active' : ''}`}
            onClick={() => navigate('/my-events')}
          >
            <FaCalendarDays className="nav-icon" />
            <a>My Events</a>
          </li>

          <li
            className={`nav-item ${
              isActive('/create-event') ||
              isActive('/event-tickets') ||
              isActive('/bank-details')
                ? 'active'
                : ''
            }`}
            onClick={() => navigate('/create-event')}
          >
            <FaCalendarPlus className="nav-icon" />
            <a>New Event</a>
          </li>

          <li
            className={`nav-item ${isActive('/hoster/messages') ? 'active' : ''}`}
            onClick={() => navigate('/hoster/messages')}
          >
            <FaMessage className="nav-icon" />
            <a>Messages</a>
          </li>

          <hr className="sidebar-divider" />

          <li
            className={`nav-item ${isActive('/marketplace') ? 'active' : ''}`}
            onClick={() => navigate('/marketplace')}
          >
            <FaStreetView className="nav-icon" />
            <a>Vendors</a>
          </li>

          <hr className="sidebar-divider" />

          <li
            className={`nav-item ${isActive('/hoster/profile') ? 'active' : ''}`}
            onClick={() => navigate('/hoster/profile')}
          >
            <FaRegUser className="nav-icon" />
            <a>My Profile</a>
          </li>

          <li
            className={`nav-item ${isActive('/hoster/settings') ? 'active' : ''}`}
            onClick={() => navigate('/hoster/settings')}
          >
            <FaGears className="nav-icon" />
            <a>Settings</a>
          </li>

          {/* Fixed: call handleLogout onClick */}
          <li className="nav-item" onClick={handleLogout}>
            <FaUnlock className="nav-icon" />
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
