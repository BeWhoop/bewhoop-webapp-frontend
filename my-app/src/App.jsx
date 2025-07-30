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
            <Route path="/" element={<HosterSignup />} />
            <Route path="/vendor/signup" element={<VendorSignup />} />

            {/* ─── Hoster Routes ─── */}
            
            <Route path="/hoster/setup" element={<HosterSetup />} />
            <Route path="/create-event" element={<HosterProtectedRoute><CreateEvent /></HosterProtectedRoute>} />
            <Route path="/event-tickets" element={<HosterProtectedRoute><EventTickets /></HosterProtectedRoute>} />
            <Route path="/bank-details" element={<HosterProtectedRoute><BankDetails /></HosterProtectedRoute>} />
            <Route path="/hoster/dashboard" element={<HosterProtectedRoute><HosterDashboard /></HosterProtectedRoute>} />
            <Route path="/marketplace" element={<HosterProtectedRoute><VendorMarketplace /></HosterProtectedRoute>} />
            <Route path="/marketplace/profile" element={<HosterProtectedRoute><VenProfile /></HosterProtectedRoute>} />
            <Route path="/event-details" element={<HosterProtectedRoute><EventDetails /></HosterProtectedRoute>} />
            <Route path="/my-events" element={<HosterProtectedRoute><MyEvents /></HosterProtectedRoute>} />
            <Route path="/hoster/profile" element={<HosterProtectedRoute><HosterProfile /></HosterProtectedRoute>} />
            <Route path="/hoster/messages" element={<HosterProtectedRoute><HosterPlaceholder /></HosterProtectedRoute>} />
            <Route path="/hoster/settings" element={<HosterProtectedRoute><HosterPlaceholder /></HosterProtectedRoute>} />

            {/* ─── Vendor Routes ─── */}
            <Route path="/vendor/profile" element={<VendorProfile />} />
            <Route path="/vendor/setup" element={<VendorSetup />} />
            <Route path="/upload-portfolio" element={<UploadPortfolio />} />
            <Route path="/vendor/dashboard" element={<VendorProtectedRoute><VendorDashboard /></VendorProtectedRoute>} />
            <Route path="/vendor/edit-profile" element={<VendorProtectedRoute><EditProfile /></VendorProtectedRoute>} />
            <Route path="/vendor/edit-services" element={<VendorProtectedRoute><EditServices /></VendorProtectedRoute>} />
            <Route path="/vendor/edit-portfolio" element={<VendorProtectedRoute><EditPortfolio /></VendorProtectedRoute>} />
            <Route path="/vendor/messages" element={<VendorProtectedRoute><VendorPlaceholder /></VendorProtectedRoute>} />
            <Route path="/vendor/settings" element={<VendorProtectedRoute><VendorPlaceholder /></VendorProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </VendorProvider>
    </HosterProvider>
  );
}

export default App;
