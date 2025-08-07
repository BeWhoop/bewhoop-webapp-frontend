import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../additional_components/Sidebar';
import Header from '../additional_components/Header';
import '../styles/EventDetails.css';
import toast from 'react-hot-toast';

const EventDetails = () => {
  const { state } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const event = state?.event;
  const navigate = useNavigate();

  if (!event) {
    toast.error('No event data found!');
    return (
      <div className="event-details-wrapper">
        {isSidebarOpen && <Sidebar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}
        <div className="event-main">
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
          <div className="event-content">
            <p>No event data found.</p>
          </div>
        </div>
      </div>
    );
  }

  const { title, description, location, event_type, created_at, categories, attendee_count, media } = event;

  return (
    <div className="event-details-wrapper">
      {isSidebarOpen && <Sidebar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}
      <div className="event-main">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
        <div className="event-content">
          <button onClick={() => navigate(-1)} className="back-button">← Back</button>

          <h1 className="event-title">{title}</h1>

          <div className="event-meta">
            <div className="event-meta-item"><strong>Description:</strong> {description || 'No description provided.'}</div>
            <div className="event-meta-item"><strong>Location:</strong> {location}</div>
            <div className="event-meta-item"><strong>Type:</strong> {event_type}</div>
            <div className="event-meta-item"><strong>Categories:</strong> {categories?.length ? categories.join(', ') : 'N/A'}</div>
            <div className="event-meta-item"><strong>Attendees:</strong> {attendee_count ?? 0}</div>
            <div className="event-meta-item"><strong>Created At:</strong> {new Date(created_at).toLocaleString()}</div>
          </div>

          <h3 className="media-heading">Media Gallery</h3>
          <div className="media-gallery">
            {media?.length > 0 ? (
              media.map((url, i) => <img key={i} src={url} alt={`event-media-${i}`} className="media-item" />)
            ) : (
              <p className="no-media">No media available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;