import notificationIcon from '../assets/Notifications.png';
import flag from '../assets/Flag.png';
import defaultImage from '../assets/UploadPic.png';
import './Header.css';
import { useContext } from 'react';
import { HosterContext } from '../contexts/HosterContext.jsx';
import { FaBars } from "react-icons/fa";

function Header({ toggleSidebar, isSidebarOpen }) {
  const { hosterData } = useContext(HosterContext);

  const getProfileImage = () => {
    if (hosterData?.profilePhoto) {
      return URL.createObjectURL(hosterData.profilePhoto);
    }
    return defaultImage;
  };
  
  return (
    <header className="header">
      {!isSidebarOpen && (
        <button onClick={toggleSidebar} className="sidebar-toggle">
          <FaBars size={22} />
        </button>
      )}

      {/*not implemented yet in backend
      
      <input
        type="text"
        className="search-input"
        placeholder="Q   Search..."
      />
      */}

      <div className="user-info">
        <img src={getProfileImage()}
          alt="User"
          className="user-photo"
        />
        <span className="user-name">
          {hosterData.firstName || 'John'} {hosterData.lastName || 'Doe'}
        </span>
      </div>
    </header>
  );
}

export default Header;
