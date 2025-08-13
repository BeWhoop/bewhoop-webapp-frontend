import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import '../styles/Signup1.css';
import signupBg from '../assets/Signup-bg.png';
import googleIcon from '../assets/Google-Icon.png';
import fbIcon from '../assets/FB-Icon.png';
import whIcon from '../assets/WH-Icon.png';
import { HosterContext } from '../contexts/HosterContext.jsx';
import TOS from '../additional_components/TOS.jsx';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTOS, setShowTOS] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setHosterData } = useContext(HosterContext);
  const baseURL = import.meta.env.VITE_MOBILE_BASE_URL;
  const navigate = useNavigate();

  const isPasswordValid = (pwd) => {
    const regex = /^.{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      toast.error('Please fill in all fields.');
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
    if (!termsAccepted) {
      toast.error('Please accept terms and conditions.');
      return;
    }

    setIsSubmitting(true);

    setHosterData((prev) => ({
      ...prev,
      fullName,
      email,
      password,
    }));
    toast.success('Successful!');
    navigate('/hoster/setup');
  };

  return (
    <div className="signup1-vendor-card">
      <div className="signup1-left-bg">
        <div className="signup1-text-group">
          <h1>Join as a Event Host</h1>
          <p>Reference site about Lorem Ipsum, giving information on its origins as well.</p>
        </div>
      </div>
      <form className="signup1-vendor-info" onSubmit={handleSubmit}>
        <div className="signup1-title-group">
          <h1>Join as a Event Host</h1>
          <p>Create an account to join as a host</p>
        </div>
        {/* Name Field */}
        <div className="signup1-password-container">
          <label className="signup1-label1">Full Name</label>
        </div>
        <div className="signup1-input-wrapper">
          <input
            type="text"
            className="signup1-simple-input"
            placeholder="Enter your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        {/* Email Field */}
        <div className="signup1-password-container">
          <label className="signup1-label1">Email</label>
        </div>
        <div className="signup1-input-wrapper">
          <input
            type="email"
            className="signup1-simple-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Password Field */}
        <div className="signup1-password-container">
          <label className="signup1-label1" style={{ marginBottom: '1rem' }}>Password</label>
        </div>
        <div className="signup1-input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            className={`signup1-simple-input ${!showPassword ? 'large-dots' : ''}`}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
          <span
            className="signup1-eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>
        {/* Terms and Conditions */}
        <div className="signup1-password-container">
          <label className="signup1-label1">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            <span
              onClick={() => setShowTOS(true)}
              style={{ textDecoration: 'underline', color: '#202224', cursor: 'pointer', marginLeft: '0.5rem' }}
            >
              I accept terms and conditions
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="signup1-next-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </button>
        <div className="signup1-social-icons">
          <span className="signup1-login-text">
            Already Have an Account?{' '}
            <a href="/host/sign-in" style={{ color: '#BE0000' }}>Sign In</a>
          </span>
          
          <div className="signup1-divider-with-text">
            <span className="signup1-line"></span>
            <span className="signup1-or-text">or</span>
            <span className="signup1-line"></span>
          </div>
          <span className="signup1-login-text">Social Apps</span>
          <div className="signup1-social-icons-icons">
            <img src={fbIcon} alt="fb-icon" />
            <img src={googleIcon} alt="google-icon" />
            <img src={whIcon} alt="whatsapp-icon" />
          </div>
          
        </div>
      </form>
      {showTOS && <TOS onClose={() => setShowTOS(false)} />}
    </div>
  );
}

export default Signup;