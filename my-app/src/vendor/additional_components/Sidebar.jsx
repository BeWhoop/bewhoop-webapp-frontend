import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import logo from '../assets/BeWhoopLogo.png';
import { FaEdit } from "react-icons/fa";
import {
  FaMessage,
  FaRegUser,
  FaGears,
  FaUnlock,
  FaXmark
} from 'react-icons/fa6'; 
import './Sidebar.css';

function Sidebar({ toggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isActive = (path) => currentPath === path;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const loadingToast = toast.loading('Logging out...');

    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // optional
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay
      toast.success('Logged out successfully.');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Logout failed.');
    } finally {
      toast.dismiss(loadingToast);
      setIsLoggingOut(false);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <button onClick={toggleSidebar} className="sidebar-close">
          <FaXmark size={24} />
        </button>
        <div className="logo">
          <img src={logo} alt="Company Logo" />
        </div>
      </div>

      <div className="nav-links">
        <ul>

          <li className={`nav-item ${isActive('/vendor/edit-portfolio') || isActive('/vendor/edit-profile') || isActive('/vendor/edit-services') ? 'active' : ''}`} onClick={() => navigate('/vendor/edit-profile')}>
            <FaEdit className="nav-icon" />
            <a>Edit Profile</a>
          </li>

          <li className={`nav-item ${isActive('/vendor/messages') ? 'active' : ''}`} onClick={() => navigate('/vendor/messages')}>
            <FaMessage className="nav-icon" />
            <a>Messages</a>
          </li>

          <hr className="sidebar-divider" />

          <li className={`nav-item ${isActive('/vendor/dashboard') ? 'active' : ''}`} onClick={() => navigate('/vendor/dashboard')}>
            <FaRegUser className="nav-icon" />
            <a>My Profile</a>
          </li>

          <li className={`nav-item ${isActive('/vendor/settings') ? 'active' : ''}`} onClick={() => navigate('/vendor/settings')}>
            <FaGears className="nav-icon" />
            <a>Settings</a>
          </li>

          <li
            className={`nav-item ${isLoggingOut ? 'disabled' : ''}`}
            onClick={isLoggingOut ? null : handleLogout}
            style={{ cursor: isLoggingOut ? 'not-allowed' : 'pointer', opacity: isLoggingOut ? 0.5 : 1 }}
          >
            <FaUnlock className="nav-icon" />
            <a>{isLoggingOut ? 'Logging out...' : 'Logout'}</a>
          </li>
          
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
