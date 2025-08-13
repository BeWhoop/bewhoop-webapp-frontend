import notificationIcon from '../assets/Notifications.png';
import flag from '../assets/Flag.png';
import defaultImage from '../assets/UploadPic.png';
import './Header.css';
import { useContext } from 'react';
import { VendorContext } from '../contexts/VendorContext.jsx';
import { FaBars } from "react-icons/fa";

function Header({ toggleSidebar, isSidebarOpen }) {
  const { vendorData } = useContext(VendorContext);

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
        <img
          src={defaultImage}
          alt="User"
          className="user-photo"
        />
        <span className="user-name">
          {vendorData.firstName || 'John'} {vendorData.lastName || 'Doe'}
        </span>
      </div>
    </header>
  );
}

export default Header;
