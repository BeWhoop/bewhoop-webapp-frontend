import React from 'react';
import './PlaceHolder.css';
import Sidebar from './Sidebar';
import Header from './Header';
import { useState } from 'react';

function Placeholder() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="placeholder-container">
      {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
      <div className="placeholder-main">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="placeholder-body">
          <div className="placeholder-box">
            <h1 className="placeholder-title">Coming Soon. Stay Updated!</h1>
            <p className="placeholder-text">Coming Soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Placeholder;
