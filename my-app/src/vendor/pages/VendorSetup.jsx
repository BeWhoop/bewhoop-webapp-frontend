import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../styles/VendorSetup.css';
import karaokeBg from '../assets/Karaoke.png';
import { VendorContext } from '../contexts/VendorContext.jsx';

const baseURL = import.meta.env.VITE_WEB_API_BASE_URL;

function VendorSetup() {
  const [eventInput, setEventInput] = useState('');
  const [events, setEvents] = useState([]);
  const [availableEvents, setAvailableEvents] = useState([
    'Photography',
    'Catering',
    'Videography',
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { vendorData, setVendorData } = useContext(VendorContext);
  const navigate = useNavigate();

  const handleAddEvent = (e) => {
    if (e.key === ',' && eventInput.trim() !== '') {
      e.preventDefault();
      const trimmed = eventInput.trim();
      if (!events.includes(trimmed)) {
        setEvents([...events, trimmed]);
      }
      setEventInput('');
    }
  };

  const removeEvent = (index) => {
    const removed = events[index];
    setEvents(events.filter((_, i) => i !== index));
    if (['Photography', 'Catering', 'Videography'].includes(removed)) {
      setAvailableEvents((prev) => [...prev, removed]);
    }
  };

  const addAvailableEvent = (name) => {
    if (!events.includes(name)) {
      setEvents([...events, name]);
      setAvailableEvents((prev) => prev.filter((ev) => ev !== name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const city = form.city.value;
    const mapLink = form.mapLink.value.trim();
    const minPrice = form.minPrice.value;
    const maxPrice = form.maxPrice.value;
    const budgetRange = `$${minPrice}-$${maxPrice}`;

    if (events.length === 0) {
      toast.error('Please add at least one service.');
      return;
    }

    setVendorData((prev) => ({
      ...prev,
      services: events,
      mapLink,
      minPrice,
      maxPrice,
      location: city,
    }));

    setIsSubmitting(true);
    const loadingToast = toast.loading('Registering vendor...');

    try {
      const res = await fetch(`${baseURL}/onboarding/vendors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: vendorData.fullName,
          email: vendorData.email,
          phone: vendorData.phone || '0000000000',
          services: events,
          budgetRange,
          city,
          socialProof: '',
          password: vendorData.password,
        }),
      });

      const result = await res.json();

      if (result.status === 'success') {
        if (result.token) {
          localStorage.setItem('token', result.token);
          toast.success('Vendor registered successfully.');
          toast.dismiss(loadingToast);
          navigate('/upload-portfolio');
        }
      } else {
        toast.error(result.error || 'Registration failed.');
        toast.dismiss(loadingToast);
        if (/(already exists|duplicate|already in use)/i.test(result.error)) {
          toast.error('Redirecting to login...');
          setTimeout(() => navigate('/vendor/signup'), 3000);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
      toast.dismiss(loadingToast);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="vendorsetup-vendor-card">
      <div className="vendorsetup-left-bg">
        <div className="vendorsetup-text-group">
          <h1>Get A Vendor Profile</h1>
          <p>Reference site about Lorem Ipsum, giving information on its origins.</p>
        </div>
      </div>
      <form className="vendorsetup-vendor-info" onSubmit={handleSubmit}>
        <div className="vendorsetup-title-group">
          <h1>Complete Your Vendor Setup</h1>
          <p>Add your services and details to get started.</p>
        </div>
        {/* Services Input */}
        <div className="vendorsetup-container">
          <label className="vendorsetup-label1">What type of services do you provide?</label>
        </div>
        <div className="vendorsetup-input-wrapper">
          <div className="vendorsetup-text-container">
            <input
              className="vendorsetup-events"
              placeholder="Type and press , to add services"
              value={eventInput}
              onChange={(e) => setEventInput(e.target.value)}
              onKeyDown={handleAddEvent}
              required={events.length === 0}
            />
            <div className="vendorsetup-eventsAdded">
              {events.map((ev, i) => (
                <span key={i} className="vendorsetup-event-chip">
                  {ev}
                  <button
                    type="button"
                    className="vendorsetup-remove-btn"
                    onClick={() => removeEvent(i)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="vendorsetup-available-events">
            {availableEvents.map((ev, i) => (
              <span
                key={i}
                className="vendorsetup-add-chip"
                onClick={() => addAvailableEvent(ev)}
              >
                {ev} +
              </span>
            ))}
          </div>
        </div>
        {/* Location Input */}
        <div className="vendorsetup-container">
          <label className="vendorsetup-label1">Your Location</label>
        </div>
        <div className="vendorsetup-input-wrapper">
          <select
            name="city"
            className="vendorsetup-select-input"
            required
            defaultValue=""
          >
            <option value="" disabled>Select city</option>
            <option>Islamabad</option>
            <option>Lahore</option>
            <option>Karachi</option>
            <option>Peshawar</option>
            <option>Quetta</option>
          </select>
        </div>
        {/* Map Link Input */}
        <div className="vendorsetup-container">
          <label className="vendorsetup-label1">Google Maps Link</label>
        </div>
        <div className="vendorsetup-input-wrapper">
          <input
            name="mapLink"
            className="vendorsetup-simple-input"
            type="url"
            placeholder="Google Maps link"
            required
          />
        </div>
        {/* Price Range Input */}
        <div className="vendorsetup-container">
          <label className="vendorsetup-label1">Price Range</label>
        </div>
        <div className="vendorsetup-input-wrapper">
          <div className="vendorsetup-price-range">
            <input
              name="minPrice"
              className="vendorsetup-input-range"
              placeholder="Minimum"
              type="number"
              min="0"
              required
            />
            <input
              name="maxPrice"
              className="vendorsetup-input-range"
              placeholder="Maximum"
              type="number"
              min="0"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="vendorsetup-next-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Next'}
        </button>
      </form>
    </div>
  );
}

export default VendorSetup;