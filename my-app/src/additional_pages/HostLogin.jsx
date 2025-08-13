import { supabase } from '../supabaseClient.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import './Login.css';
import bgpic from '../vendor/assets/bg-pic.png';
import fbIcon from '../vendor/assets/FB-Icon.png';
import googleIcon from '../vendor/assets/Google-Icon.png';
import whIcon from '../vendor/assets/WH-Icon.png';

const baseURL = import.meta.env.VITE_WEB_API_BASE_URL;

function HostLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleOAuthLogin = async (provider) => {
    try {
      // Step 1: Request OAuth login URL from backend
      const res = await fetch(`${baseURL}/vendors/${provider}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`Failed to get ${provider} login URL`);
      const data = await res.json();
      // Step 2: Redirect browser to provider login page
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error('No login URL returned.');
      }
    } catch (err) {
      console.error(err);
      toast.error(`Unable to initiate ${provider} login`);
    }
  };

  // Step 3: Detect token in URL after redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      (async () => {
        try {
          const res = await fetch(`${baseURL}/onboarding/oauth/callback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data?.message || 'OAuth callback failed');
          localStorage.setItem('token', data.token);
          toast.success('Login successful!');
          navigate('/hoster/dashboard');
        } catch (err) {
          toast.error('OAuth login failed');
        }
      })();
    }
  }, []);

  const isPasswordValid = (pwd) => {
    const regex = /^.{8,}$/;
    return regex.test(pwd);
  };

  const handleForgotPass = async () => {
    if (!email) {
      toast.error('Please enter your email first');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      toast.error('Please enter a valid Email.');
      return;
    }
    try {
      const response = await fetch(`${baseURL}/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error();
      }
      toast.success('Password reset link sent to your email!');
      setEmail('');
    } catch (error) {
      toast.error('Error sending reset link. Please try again later.');
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in both email and password.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      toast.error('Please enter a valid email.');
      return;
    }
    if (!isPasswordValid(password)) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }
    setIsSubmitting(true);
    const loadingToast = toast.loading('Logging in...');
    try {
      const response = await fetch(`${baseURL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || data?.error || 'Something went wrong!');
      }
      if (data.status === 'success' && data.token) {
        localStorage.setItem('token', data.token);
        toast.success('Login successful!');
        toast.dismiss(loadingToast);
        navigate('/hoster/dashboard');
      } else {
        throw new Error('Login failed.');
      }
    } catch (err) {
      toast.error('Failed to login.');
      toast.dismiss(loadingToast);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-vendor-card">
      <div className="login-left-bg">
        <div className="login-text-group">
          <h1>Sign In to Your Account</h1>
          <p>Reference site about Lorem Ipsum, giving information on its origins as well.</p>
        </div>
      </div>
      <form className="login-vendor-info" onSubmit={handleSubmit}>
        <div className="login-title-group">
          <h1>Sign In As A Host</h1>
          <p>Sign in right now to manage your profile and services.</p>
        </div>
        {/* Email Field */}
        <div className="login-password-container">
          <label className="login-label1">Email</label>
        </div>
        <div className="login-input-wrapper">
          <input
            type="email"
            className="login-simple-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Password Field */}
        <div className="login-password-container">
          <label className="login-label1" style={{ marginBottom: '1rem' }}>
            Password
          </label>
          <label
            className="login-label2"
            onClick={handleForgotPass}
            style={{ cursor: 'pointer' }}
          >
            Forgot Password?
          </label>
        </div>
        <div className="login-input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            className={`login-simple-input ${!showPassword ? 'large-dots' : ''}`}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
          <span
            className="login-eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>
        <button
          type="submit"
          className="login-next-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Sign In'}
        </button>
        <div className="login-social-icons">
          <div className="login-vertical-text-group">
            <span className="login-login-text">
              Not a host?{' '}
              <a href="/" style={{ color: '#BE0000' }}>
                Vendor Sign in
              </a>
            </span>
            <span className="login-vertical-divider"></span>
            <span className="login-login-text">
              First time here?{' '}
              <a href="/hoster/signup" style={{ color: '#BE0000' }}>
                Join as Host
              </a>
            </span>
          </div>
          <div className="login-divider-with-text">
            <span className="login-line"></span>
            <span className="login-or-text">or</span>
            <span className="login-line"></span>
          </div>
          <div className="login-social-icons-icons">
            <img
              src={fbIcon}
              alt="fb-icon"
              style={{ cursor: 'pointer' }}
              onClick={() => handleOAuthLogin('facebook')}
            />
            <img
              src={googleIcon}
              alt="google-icon"
              style={{ cursor: 'pointer' }}
              onClick={() => handleOAuthLogin('google')}
            />
            <img src={whIcon} alt="whatsapp-icon" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default HostLogin;