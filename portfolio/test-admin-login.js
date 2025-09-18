import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testLogin() {
  console.log('Testing admin login...');
  
  const email = 'admin@portfolio.com';
  const password = 'admin123';
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('❌ Login failed:', error);
      return false;
    }
    
    console.log('✅ Login successful!');
    console.log('User ID:', data.user.id);
    console.log('Email:', data.user.email);
    
    return true;
  } catch (err) {
    console.error('❌ Login error:', err);
    return false;
  }
}

// Run the test
testLogin().then(success => {
  console.log(success ? 'Test completed successfully.' : 'Test failed.');
  process.exit(success ? 0 : 1);
});