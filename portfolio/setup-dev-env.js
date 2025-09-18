import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDevelopmentEnvironment() {
  console.log('🚀 Setting up development environment...\n');
  
  // Create admin user
  console.log('👤 Creating admin user...');
  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'admin@portfolio.com',
      password: 'admin123',
      email_confirm: true
    });
    
    if (error && !error.message.includes('already registered')) {
      console.error('❌ Error creating admin user:', error);
    } else if (error && error.message.includes('already registered')) {
      console.log('✅ Admin user already exists');
    } else {
      console.log('✅ Admin user created successfully');
      console.log('   Email: admin@portfolio.com');
      console.log('   Password: admin123');
    }
  } catch (err) {
    console.error('❌ Failed to create admin user:', err.message);
  }
  
  console.log('\n📊 Development environment setup complete!');
  console.log('\n📝 Available test data:');
  console.log('   • 3 sample projects with full details');
  console.log('   • Project sections with images and content');
  console.log('   • Admin user for testing admin panel');
  console.log('\n🔧 To reset database and preserve data: supabase db reset');
  console.log('   (Your test projects and sections will automatically be restored)\n');
  
  return true;
}

// Run setup
setupDevelopmentEnvironment().then(() => {
  process.exit(0);
}).catch(err => {
  console.error('Setup failed:', err);
  process.exit(1);
});