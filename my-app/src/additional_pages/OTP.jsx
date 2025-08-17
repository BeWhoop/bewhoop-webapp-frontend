import './OTP.css';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const baseURL = import.meta.env.VITE_MOBILE_BASE_URL;

function OTP({ onClose }) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');
  const [sessionId, setSessionId] = useState(''); // returned by /send-otp
  const navigate = useNavigate();

  /* ---------- SEND OTP ---------- */
  const handleSendOtp = async () => {
    const phoneRegex = /^\+\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    try {
      const res = await fetch(`${baseURL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phone })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not send OTP');

      setSessionId(data.session_id); // backend returns a short-lived id
      toast.success(`OTP sent to ${phone}`);
      setStep('otp');
    } catch (err) {
      toast.error(err.message);
    }
  };

  /* ---------- RESEND OTP ---------- */
  const handleResendOTP = () => {
    handleSendOtp(); // same endpoint
  };

  /* ---------- VERIFY OTP ---------- */
  const handleVerifyOtp = async () => {
    if (!/^\d{6}$/.test(otp)) {
      toast.error('Enter a valid 6-digit OTP');
      return;
    }

    try {
      const res = await fetch(`${baseURL}/users/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phone, otp, session_id: sessionId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid OTP');

      // verification ok → backend returns JWT token
      localStorage.setItem('token', data.token);
      toast.success('Signed in successfully');
      onClose();                // close modal
      navigate('/');            // or wherever you want
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="otp-overlay">
      <div className="otp-modal">
        <button
          className="otp-close"
          onClick={onClose}
          aria-label="Close OTP modal"
        >
          ✕
        </button>
        {step === 'phone' ? (
          <>
            <h2>Enter your WhatsApp number</h2>
            <input
              className="otp-input"
              type="tel"
              placeholder="+92 333 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-label="Phone number"
            />
            <button className="otp-submit" onClick={handleSendOtp}>
              Send OTP
            </button>
          </>
        ) : (
          <>
            <h2>Please enter OTP password to verify your account</h2>
            <p>A one-time password was sent to {phone}</p>
            <input
              className="otp-input"
              type="text"
              maxLength={6}
              placeholder="••••••"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              aria-label="OTP code"
            />
            <button className="otp-submit" onClick={handleVerifyOtp}>
              Verify OTP
            </button>

            <p style={{marginTop:'2rem',cursor:'pointer'}} onClick={handleResendOTP}>Resend OTP?</p>
          </>
        )}
      </div>
    </div>
  );
}

export default OTP;