import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const baseURL = import.meta.env.VITE_WEB_API_BASE_URL;

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching Supabase user:', error);
        return;
      }

      if (user) {
        const { email, user_metadata } = user;
        const { full_name, avatar_url, picture } = user_metadata;

        try {
          const res = await fetch(`${baseURL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email
            })
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data?.message || 'Social login failed');

          localStorage.setItem('token', data.token);
          navigate('/hoster/dashboard');
        } catch (err) {
          console.error(err);
        }
      }
    };

    getUserData();
  }, [navigate]);

  return <p>Logging you in...</p>;
}
