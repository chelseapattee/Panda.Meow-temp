import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

// Use service role key to create users
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupAfterReset() {
  console.log('🔧 Setting up admin user after database reset...\n');
  
  const email = 'admin@portfolio.com';
  const password = 'admin123';
  
  try {
    // Check if user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers.users.find(user => user.email === email);
    
    if (existingUser) {
      console.log('✅ Admin user already exists!');
      console.log('   Email:', email);
      console.log('   User ID:', existingUser.id);
      return true;
    }
    
    // Create the admin user
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true
    });
    
    if (error) {
      console.error('❌ Error creating admin user:', error);
      return false;
    }
    
    console.log('✅ Admin user created successfully!');
    console.log('   Email:', email);
    console.log('   Password:', password);
    console.log('   User ID:', data.user.id);
    
    return true;
  } catch (err) {
    console.error('❌ Failed to setup admin user:', err);
    return false;
  }
}

// Run the setup
setupAfterReset().then(success => {
  console.log('\n🎯 Setup completed!');
  console.log('   You can now login to /admin with:');
  console.log('   Email: admin@portfolio.com');
  console.log('   Password: admin123');
  process.exit(success ? 0 : 1);
});