import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Use the first project ID from our migrated projects
const projectId = '550e8400-e29b-41d4-a716-446655440001';

const testProjectSections = [
  {
    project_id: projectId,
    section_order: 1,
    header: 'Project Images',
    type: 'images', // Enum value
    images: [
      'https://picsum.photos/800/600?random=20',
      'https://picsum.photos/800/600?random=21'
    ],
    captions: [
      'Main interface screenshot',
      'Mobile responsive design'
    ],
    text_content: null,
    gif_url: null,
    video_url: null
  },
  {
    project_id: projectId,
    section_order: 2,
    header: 'Technical Implementation',
    type: 'image_text', // Enum value
    images: [
      'https://picsum.photos/800/600?random=22'
    ],
    captions: [
      'Architecture diagram'
    ],
    text_content: 'The technical implementation focuses on modern React patterns with TypeScript for type safety. We implemented a modular architecture that allows for easy scaling and maintenance. The component structure follows atomic design principles, ensuring reusability and consistency across the application.',
    gif_url: null,
    video_url: null
  },
  {
    project_id: projectId,
    section_order: 3,
    header: 'Performance Metrics',
    type: 'text', // Enum value
    images: null,
    captions: null,
    text_content: 'After implementing the optimizations, we achieved significant performance improvements. Load time decreased by 40%, user satisfaction increased to 95%, and the application now handles 3x more concurrent users. These metrics were measured over a 3-month period with consistent monitoring.',
    gif_url: null,
    video_url: null
  }
];

async function addProjectSectionsWithEnum() {
  try {
    console.log(`Adding test project sections for project ID: ${projectId}`);
    
    // First verify the project exists
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id, title')
      .eq('id', projectId)
      .single();
    
    if (projectError) {
      console.error('Project not found:', projectError);
      return false;
    }
    
    console.log(`Found project: ${project.title}`);
    
    // Insert the project sections
    const { data, error } = await supabase
      .from('project_sections')
      .insert(testProjectSections)
      .select();
    
    if (error) {
      console.error('Error adding project sections:', error);
      return false;
    }
    
    console.log(`Successfully added ${data.length} project sections:`);
    data.forEach((section, index) => {
      console.log(`${index + 1}. ${section.header} (type: ${section.type})`);
    });
    
    return true;
    
  } catch (err) {
    console.error('Failed to add project sections:', err);
    return false;
  }
}

// Test invalid enum value
async function testInvalidEnumValue() {
  console.log('\nTesting invalid enum value...');
  try {
    const { data, error } = await supabase
      .from('project_sections')
      .insert({
        project_id: projectId,
        section_order: 99,
        header: 'Invalid Type Test',
        type: 'invalid_type', // This should fail
        text_content: 'This should not work',
      })
      .select();
    
    if (error) {
      console.log('✅ Enum constraint working - invalid type rejected:', error.message);
      return true;
    } else {
      console.log('❌ Enum constraint failed - invalid type was accepted');
      return false;
    }
  } catch (err) {
    console.log('✅ Enum constraint working - invalid type rejected:', err.message);
    return true;
  }
}

// Run the functions
addProjectSectionsWithEnum().then(async (success) => {
  if (success) {
    await testInvalidEnumValue();
  }
  console.log(success ? '\nProject sections setup completed!' : '\nFailed to setup project sections.');
  process.exit(success ? 0 : 1);
});