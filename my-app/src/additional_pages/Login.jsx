import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import './Login.css';
import bgpic from '../vendor/assets/bg-pic.png';
import fbIcon from '../vendor/assets/FB-Icon.png';
import googleIcon from '../vendor/assets/Google-Icon.png';
import whIcon from '../vendor/assets/WH-Icon.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const isPasswordValid = (pwd) => {
    const regex = /^.{8,}$/;
    return regex.test(pwd);
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
      const response = await fetch(`${baseURL}/login`, {
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
        navigate('/vendor/dashboard');
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
      <div className="login-left-bg" style={{ backgroundImage: `url(${bgpic})` }}>
        <div className="login-text-group">
          <h1>Sign In to Your Account</h1>
          <p>Reference site about Lorem Ipsum, giving information on its origins as well.</p>
        </div>
      </div>
      <form className="login-vendor-info" onSubmit={handleSubmit}>
        <div className="login-title-group">
          <h1>Sign In to Your Account</h1>
          <p>Sign in to manage your profile and services.</p>
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
          <label className="login-label1">Password</label>
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
          <span className="login-login-text">
            Don't Have An Account? Sign Up as {' '}
            <a href="/vendor/signup" style={{color:'#BE0000'}}>Vendor</a>{' '}/{' '}<a href="/hoster/signup" style={{color:'#BE0000'}}>Host</a>
          </span>
          <div className="login-divider-with-text">
            <span className="login-line"></span>
            <span className="login-or-text">or</span>
            <span className="login-line"></span>
          </div>
          <span className="login-login-text">Social Apps</span>
          <div className="login-social-icons-icons">
            <img src={fbIcon} alt="fb-icon" />
            <img src={googleIcon} alt="google-icon" />
            <img src={whIcon} alt="whatsapp-icon" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;