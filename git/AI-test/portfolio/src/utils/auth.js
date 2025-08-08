// Simple authentication utility for admin interface

import { supabase } from './supabase';

const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'admin123';
const AUTH_KEY = 'admin_authenticated';

export function checkPassword(password) {
  return password === ADMIN_PASSWORD;
}

export function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function login() {
  localStorage.setItem(AUTH_KEY, 'true');
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

// Sign in with email and password
export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

// Sign out the current user
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true;
}

// Get the current session (user info, tokens, etc.)
export function getSession() {
  return supabase.auth.getSession();
}

// Listen for auth state changes (login/logout)
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
} 