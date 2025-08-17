import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true, // Required for OAuth redirects
  },
});

// Function to initiate Google OAuth login
export async function loginInWithGoogle(redirectTo) {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        scopes: 'email profile',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

// Function to log out
export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    localStorage.removeItem('token'); 
    if (error) {
      throw new Error(error.message);
    }
    return { error: null };
  } catch (error) {
    return { error };
  }
}