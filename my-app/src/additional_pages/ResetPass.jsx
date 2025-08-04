import './ResetPass.css';
import bgpic from '../vendor/assets/bg-pic.png';
import fbIcon from '../vendor/assets/FB-icon.png';
import googleIcon from '../vendor/assets/Google-Icon.png';
import whIcon from '../vendor/assets/WH-Icon.png';
import { useState, useEffect } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';

function ResetPass() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [token, setToken] = useState('');
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token'); // Confirm if 'token' or 'token_hash'
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      setHasToken(true);
    } else {
      toast.error('Invalid or missing token. Please request a new reset link.');
    }
  }, []);

  const isPasswordValid = (pwd) => {
    const regex = /^.{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (!isPasswordValid(password)) {
      toast.error('Password must be at least 8 characters atleast');
      return;
    }

    try {
      
      const baseURL = import.meta.env.VITE_MOBILE_BASE_URL;

      const response = await fetch(`${baseURL}/users/email-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || data?.error || 'Something went wrong!');
      }
      toast.success('Password reset successfully!');
    } catch (err) {
      toast.error('Failed to reset password.');
    } 
  };

  if (!hasToken) {
    return (
        
        <div>
          <p style={{ textAlign: 'center', marginTop: '50px', color: '#d32f2f' }}>
            Invalid reset link. <a href="/forgot-password">Request a new one</a>.
          </p>
        </div>
    );
  }

  return (
    <div className="reset-vendor-card">
      <div className="reset-left-bg" style={{ backgroundImage: `url(${bgpic})` }}>
        <div className="reset-text-group">
          <h1>Reset your password</h1>
          <p>Reference site about Lorem Ipsum, giving information on its origins as well.</p>
        </div>
      </div>

      <form className="reset-vendor-info" onSubmit={handleSubmit}>
        <div className="reset-title-group">
          <h1>Reset Your Password</h1>
          <p>Create a new password to secure your account.</p>
        </div>

        {/* Password Field */}
        <div className="reset-password-container">
          <label className="reset-label1">Password</label>
        </div>
        <div className="reset-input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            className={`reset-simple-input ${!showPassword ? 'large-dots' : ''}`}
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
          <span className="reset-eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>

        {/* Confirm Password Field */}
        <div className="reset-password-container">
          <label className="reset-label1">Confirm Password</label>
        </div>
        <div className="reset-input-wrapper">
          <input
            type={showConfirm ? 'text' : 'password'}
            className={`reset-simple-input ${!showConfirm ? 'large-dots' : ''}`}
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={6}
            required
          />
          <span className="reset-eye-icon" onClick={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>

        <button type="submit" className="reset-next-button" >
          Reset Your Password
        </button>

        <div className="reset-social-icons">
          <div className="reset-divider-with-text">
            <span className="reset-line"></span>
            <span className="reset-or-text">or</span>
            <span className="reset-line"></span>
          </div>
          <span className="reset-login-text">Social Apps</span>
          <div className="reset-social-icons-icons">
            <img src={fbIcon} alt="fb-icon" />
            <img src={googleIcon} alt="google-icon" />
            <img src={whIcon} alt="whatsapp-icon" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ResetPass;