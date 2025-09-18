import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const projectId = 'f7a196e9-5b93-4626-9ad0-0ef36c072422';

const testProjectSection = {
  project_id: projectId,
  section_order: 1,
  header: 'Test Section Header',
  type: 'image_text',
  images: [
    'https://picsum.photos/800/600?random=10',
    'https://picsum.photos/800/600?random=11'
  ],
  captions: [
    'First test image caption',
    'Second test image caption'
  ],
  text_content: 'This is a test project section with sample content. This section demonstrates how project details can be displayed with images and text content. The section includes multiple images with captions and descriptive text to showcase the project features and implementation details.',
  gif_url: null,
  video_url: null
};

async function addProjectSection() {
  try {
    console.log(`Adding test project section for project ID: ${projectId}`);
    
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
    
    // Insert the project section
    const { data, error } = await supabase
      .from('project_sections')
      .insert(testProjectSection)
      .select();
    
    if (error) {
      console.error('Error adding project section:', error);
      return false;
    }
    
    console.log('Test project section added successfully:', data[0]);
    return true;
    
  } catch (err) {
    console.error('Failed to add project section:', err);
    return false;
  }
}

// Run the function
addProjectSection().then(success => {
  console.log(success ? 'Project section added successfully!' : 'Failed to add project section.');
  process.exit(success ? 0 : 1);
});