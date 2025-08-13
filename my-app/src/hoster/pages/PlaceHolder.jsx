import React from 'react';
import '../styles/PlaceHolder.css';
import Sidebar from '../additional_components/Sidebar';
import Header from '../additional_components/Header';
import { useState } from 'react';

function Placeholder() {
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
};

  return (
    <div className="dashboard-container">
{isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
      <div className="main-content">
<Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="scrollable">
          <div className="placeholder-box">
            <h1>Coming Soon, Stay Updated!</h1>
            <p>Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Placeholder;
