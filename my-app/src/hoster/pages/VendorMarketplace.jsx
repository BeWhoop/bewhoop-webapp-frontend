import React, { useEffect, useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import toast from 'react-hot-toast';
import Sidebar from '../additional_components/Sidebar';
import Header from '../additional_components/Header';
import VendorCard from '../additional_components/VendorCard.jsx';
import '../styles/VendorMarketplace.css';
import placeholderImage from '../assets/placeholder-image.png';
import VendorSkeleton from "../additional_components/VendorSkeleton.jsx";

const baseURL = import.meta.env.VITE_WEB_API_BASE_URL;


const VendorMarketplace = () => {
  const [vendors, setVendors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchVendors = async (query = '') => {
    try {
      
      setLoading(true);
      const token = localStorage.getItem('token');
      const queryString = `?query=${encodeURIComponent(query.trim() || 'islamabad')}`;

      const response = await fetch(`${baseURL}/onboarding/search${queryString}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setVendors(result.vendors || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      toast.error('Failed to fetch vendors');
    }
  };

  const debouncedFetchVendors = useCallback(debounce(fetchVendors, 500), []);

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedFetchVendors(value);
  };

  return (
    <div className="vendor-dashboard-container">
      {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
      <div className="vendor-main-content">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="vendor-scrollable">
          <div className="vendor-wrapper">
            <div className="vendor-topbar">
              <h2 className="vendor-heading">Vendor Marketplace</h2>
              <div className="vendor-search-container">
                <Search className="vendor-search-icon" size={18} />
                <input
                  type="text"
                  placeholder="Search by vendor name or city"
                  className="vendor-search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            {loading ? (
              <VendorSkeleton count={6} />
            ) : (
              <div className="vendor-grid">
                {vendors.map((vendor, i) => (
                  <VendorCard
                    key={i}
                    vendor={{
                      name: vendor.full_name,
                      role: vendor.services?.join(', ') || 'N/A',
                      location: vendor.city || 'Unknown',
                      priceRange: vendor.budget_range || 'N/A',
                      tags: vendor.services || [],
                    }}
                    image={placeholderImage}
                    onClick={() =>
                      navigate('/marketplace/profile', {
                        state: { vendor, image: placeholderImage }
                      })
                    }
                  />
                ))}
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default VendorMarketplace;