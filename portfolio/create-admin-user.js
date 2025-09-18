import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

// Use service role key to create users
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  console.log('Creating admin user...');
  
  const email = 'admin@portfolio.com';
  const password = 'admin123';
  
  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true
    });
    
    if (error) {
      console.error('Error creating user:', error);
      return false;
    }
    
    console.log('Admin user created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('User ID:', data.user.id);
    
    return true;
  } catch (err) {
    console.error('Failed to create admin user:', err);
    return false;
  }
}

// Run the function
createAdminUser().then(success => {
  console.log(success ? 'User creation completed.' : 'User creation failed.');
  process.exit(success ? 0 : 1);
});