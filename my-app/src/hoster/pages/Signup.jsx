import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup1.css';
import signup from '../assets/Signup-bg.png';
import googleIcon from '../assets/Google-Icon.png';
import fbIcon from '../assets/FB-Icon.png';
import whIcon from '../assets/WH-Icon.png';
import { HosterContext } from '../contexts/HosterContext.jsx';
import TOS from '../additional_components/TOS.jsx';
import toast from 'react-hot-toast';

const Signup = () => {
  const [realPassword, setRealPassword] = useState('');
  const [maskedPassword, setMaskedPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTOS, setShowTOS] = useState(false);
  const [email, setEmail] = useState('');
  const { setHosterData } = useContext(HosterContext);
  const navigate = useNavigate();

  const handlePassChange = async () => {
    if (!email) {
      toast.error('Please enter your email first');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      toast.error('Please enter a valid Email.');
      return;
    }


    try{
      const baseURL = import.meta.env.VITE_MOBILE_BASE_URL;
      const response = await fetch(`${baseURL}/users/password-reset-email`, {
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
    }
    catch (error) {
      toast.error('Error sending reset link. Please try again later.');
      return;
    }

  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    if (input.length > maskedPassword.length) {
      const newChar = input[input.length - 1];
      setRealPassword((prev) => prev + newChar);
    } else {
      setRealPassword((prev) => prev.slice(0, -1));
    }
    setMaskedPassword('●'.repeat(input.length));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();

    if (fullName.length < 3) {
      toast.error('Please enter a valid Full Name.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      toast.error('Please enter a valid Email.');
      return;
    }

    if (realPassword.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    if (!termsAccepted) {
      toast.error('You must accept the terms and conditions.');
      return;
    }

    setHosterData((prev) => ({
      ...prev,
      fullName,
      email,
      password: realPassword,
    }));

    toast.success('Success saving information...');
    navigate('/hoster/setup');
  };

  return (
    <div className="signup1-vendor-card">
      <div className="signup1-left-bg" style={{ backgroundImage: `url(${signup})` }}>
        <div className="signup1-text-group">
          <h1>Connect with Hosts</h1>
          <p>Reference site about Lorem Ipsum, giving information on its origins, as well.</p>
        </div>
      </div>

      <form className="signup1-vendor-info" onSubmit={handleSubmit}>
        <div className="signup1-title-group">
          <h1>Join as an Event Host</h1>
          <p>Create an account to join as a host</p>
        </div>

        <label className="signup1-label1">Full Name</label>
        <input
          name="fullName"
          className="signup1-simple-input"
          placeholder="Example: Henna Adam"

        />

        <label className="signup1-label1">Email</label>
        <input
          name="email"
          type="email"
          className="signup1-simple-input"
          placeholder="Henna_Adam@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="signup1-password-container">
          <label className="signup1-label1">Password</label>
          <label className="signup1-label2" onClick={handlePassChange} style={{ cursor: 'pointer' }}>Forgot Password?</label>
        </div>

        <input
          type="text"
          className="signup1-simple-input"
          placeholder="● ● ● ● ● ●"
          value={maskedPassword}
          onChange={handlePasswordChange}
          minLength={6}
        />

        <label className="signup1-label3">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <a
            onClick={() => setShowTOS(true)}
            style={{ textDecoration: 'underline', color: 'black', cursor: 'pointer' }}
          >
            I accept terms and conditions
          </a>
        </label>

        <button type="submit" className="signup1-next-button">
          SignUp
        </button>

        <label className="signup1-label4" onClick={() => navigate('/')}>
          Already Have An Account? <span>Sign In</span>
          <br />
        </label>

        <div className="signup1-social-icons">
          <div className="signup1-divider-with-text">
            <span className="signup1-line"></span>
            <span className="signup1-or-text">or</span>
            <span className="signup1-line"></span>
          </div>

          <span className="signup1-login-text">Login with Social Apps</span>

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
};

export default Signup;
