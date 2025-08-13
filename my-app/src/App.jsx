import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HosterProvider } from './hoster/contexts/HosterContext';
import { VendorProvider } from './vendor/contexts/VendorContext';
import { Toaster } from 'react-hot-toast';
import './App.css';

/* ─── Hoster Pages ─── */
import HosterSignup from './hoster/pages/Signup';
import HosterSetup from './hoster/pages/HosterSetup';
import CreateEvent from './hoster/pages/CreateEvent';
import EventTickets from './hoster/pages/EventTickets';
import BankDetails from './hoster/pages/BankDetails';
import HosterDashboard from './hoster/pages/Dashboard';
import VendorMarketplace from './hoster/pages/VendorMarketplace';
import VenProfile from './hoster/pages/VendorProfile';
import EventDetails from './hoster/pages/EventDetails';
import MyEvents from './hoster/pages/MyEvents';
import HosterProfile from './hoster/pages/Profile';
import HosterProtectedRoute from './hoster/additional_components/ProtectedRoute';
import HosterPlaceholder from './hoster/pages/PlaceHolder';

/* ─── Vendor Pages ─── */
import VendorSignup from './vendor/pages/Signup';
import VendorSetup from './vendor/pages/VendorSetup';
import VendorProfile from './vendor/pages/VendorProfile';
import UploadPortfolio from './vendor/pages/UploadPortfolio';
import EditProfile from './vendor/pages/EditProfile';
import EditServices from './vendor/pages/EditServices';
import EditPortfolio from './vendor/pages/EditPortfolio';
import VendorDashboard from './vendor/pages/Dashboard';
import VendorProtectedRoute from './vendor/additional_components/ProtectedRoute';
import VendorPlaceholder from './vendor/additional_components/PlaceHolder';

import ResetPass from './additional_pages/ResetPass';
import VendorLogin from './additional_pages/VendorLogin';
import HostLogin from './additional_pages/HostLogin';

function App() {
  return (
    <HosterProvider>
      <VendorProvider>
        <BrowserRouter>
          <Toaster
            position="top-center"
            toastOptions={{
              success: {
                style: {
                  fontSize: '16px',
                  maxWidth: '500px',
                  padding: '16px 24px',
                },
              },
              error: {
                style: {
                  fontSize: '16px',
                  maxWidth: '500px',
                  padding: '16px 24px',
                  backgroundColor: '#ffefef',
                  color: '#d32f2f',
                },
              },
            }}
          />

          <Routes>
            {/* ─── Public Routes ─── */}
            <Route path="/" element={<VendorLogin />} />
            <Route path="/host/sign-in" element={<HostLogin />} />
            <Route path="/hoster/signup" element={<HosterSignup />} />
            <Route path="/vendor/signup" element={<VendorSignup />} />
            <Route path="/reset-password" element={<ResetPass />} />

            {/* ─── Hoster Routes ─── */}
            
            <Route path="/hoster/setup" element={<HosterSetup />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/hoster/dashboard" element={<HosterDashboard/>} />
            <Route path="/marketplace" element={<VendorMarketplace />} />
            <Route path="/marketplace/profile" element={<VenProfile />} />
            <Route path="/event-details" element={<EventDetails />} />
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/hoster/profile" element={<HosterProfile />} />
            <Route path="/hoster/messages" element={<HosterPlaceholder />} />
            <Route path="/hoster/settings" element={<HosterPlaceholder />} />

            {/* ─── Vendor Routes ─── */}
            <Route path="/vendor/profile" element={<VendorProfile />} />
            <Route path="/vendor/setup" element={<VendorSetup />} />
            <Route path="/upload-portfolio" element={<UploadPortfolio />} />
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/vendor/edit-profile" element={<EditProfile />} />
            <Route path="/vendor/edit-services" element={<EditServices />} />
            <Route path="/vendor/edit-portfolio" element={<EditPortfolio />} />
            <Route path="/vendor/messages" element={<VendorPlaceholder />} />
            <Route path="/vendor/settings" element={<VendorPlaceholder />} />
          </Routes>
        </BrowserRouter>
      </VendorProvider>
    </HosterProvider>
  );
}

export default App;
