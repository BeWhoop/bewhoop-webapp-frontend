import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { VendorContext } from '../contexts/VendorContext.jsx';
import '../styles/VendorProfile.css';
import bg from '../assets/bg-pic.png';
import defaultImage from '../assets/UploadPic.png';

function VendorProfile() {
  const [profilePreview, setProfilePreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { vendorData, setVendorData } = useContext(VendorContext);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfilePreview(previewUrl);
      setVendorData((prev) => ({
        ...prev,
        profileImageFile: file,
        profileImage: previewUrl,
      }));
    }
  };

  const handleNext = () => {
    const description = document.querySelector('.vp-description-input').value.trim();

    if (!vendorData.profileImageFile) {
      toast.error('Please upload a profile picture.');
      return;
    }

    if (!description) {
      toast.error('Please enter a short description about your services.');
      return;
    }

    setVendorData((prevData) => ({
      ...prevData,
      description,
    }));

    toast.success('Profile details saved!');
    navigate('/vendor/setup');
  };

  return (
    <div className="vp-vendor-card">
      <div className="vp-left-bg">
        <div className="vp-text-group">
          <h1>Get A Vendor Profile</h1>
          <p>Reference site about Lorem Ipsum, giving information on its origins, as well.</p>
        </div>
      </div>
      <div className="vp-vendor-info">
        <div className="vp-title-group">
          <h1>Let's set things up for you.</h1>
          <p>Share your vision, and we'll help make it real.</p>
        </div>
        {/* Profile Photo */}
        <div className="vp-container">
          <label className="vp-label1">Add Profile Photo</label>
        </div>
        <div className="vp-input-wrapper">
          <div
            className="vp-upload"
            onClick={handleUploadClick}
            style={{ backgroundImage: `url(${profilePreview || defaultImage})` }}
          >
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        {/* Description */}
        <div className="vp-container">
          <label className="vp-label1">Add Description</label>
        </div>
        <div className="vp-input-wrapper">
          <textarea className="vp-description-input" placeholder="Write here..." />
        </div>
        <button className="vp-next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default VendorProfile;