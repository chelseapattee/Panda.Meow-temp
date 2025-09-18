import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Add a project that will persist across database resets
 * To make it persistent: manually add it to supabase/seed.sql after creation
 */
async function addPersistentProject(projectData) {
  try {
    console.log(`🆕 Adding new project: ${projectData.title}`);
    
    // Insert the project
    const { data, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single();
    
    if (error) {
      console.error('❌ Error adding project:', error);
      return null;
    }
    
    console.log('✅ Project added successfully!');
    console.log('📋 Project Details:');
    console.log(`   ID: ${data.id}`);
    console.log(`   Title: ${data.title}`);
    console.log(`   Company: ${data.company || 'Not specified'}`);
    console.log(`   Technologies: ${data.technologies.join(', ')}`);
    
    // Generate SQL for seed file
    console.log('\n📝 To make this project persist across database resets,');
    console.log('   add this SQL to supabase/seed.sql:\n');
    
    const sqlInsert = generateSQLInsert(data);
    console.log(sqlInsert);
    
    return data;
    
  } catch (err) {
    console.error('❌ Failed to add project:', err);
    return null;
  }
}

function generateSQLInsert(project) {
  const escapeString = (str) => str ? `'${str.replace(/'/g, "''")}'` : 'NULL';
  const formatArray = (arr) => arr && arr.length > 0 ? `ARRAY[${arr.map(item => `'${item.replace(/'/g, "''")}'`).join(', ')}]` : 'ARRAY[]::text[]';
  
  return `-- Add this to supabase/seed.sql to persist across resets:
INSERT INTO projects (id, title, description, company, technologies, responsibilities, challenges, solutions, categories, outcomes, image_urls) VALUES 
(
  '${project.id}',
  ${escapeString(project.title)},
  ${escapeString(project.description)},
  ${escapeString(project.company)},
  ${formatArray(project.technologies)},
  ${formatArray(project.responsibilities)},
  ${formatArray(project.challenges)},
  ${formatArray(project.solutions)},
  ${formatArray(project.categories)},
  '${JSON.stringify(project.outcomes)}'::jsonb,
  ${formatArray(project.image_urls)}
);`;
}

// Example usage - uncomment and modify as needed:
/*
const exampleProject = {
  title: 'My Portfolio Website',
  description: 'A modern, responsive portfolio website built with React and Supabase. Features dynamic content management, project showcases, and admin panel for easy updates.',
  company: 'Personal Project',
  technologies: ['React', 'Supabase', 'SCSS', 'JavaScript'],
  responsibilities: ['Full-stack Development', 'UI/UX Design', 'Content Strategy'],
  challenges: ['Database Design', 'Admin Panel UX', 'Responsive Design'],
  solutions: ['Used Supabase for backend', 'Created intuitive admin interface', 'Mobile-first approach'],
  categories: ['Web Development', 'Personal'],
  outcomes: [
    { metric: 'Load Time', value: '< 2s', description: 'Fast loading performance' },
    { metric: 'Accessibility', value: 'AA', description: 'WCAG compliance achieved' }
  ],
  image_urls: ['https://your-image-url.com/screenshot.png']
};

// Uncomment to add the project:
// addPersistentProject(exampleProject);
*/

// Example usage - uncomment and modify as needed:

const exampleProject = {
  title: 'My Portfolio Website',
  description: 'A modern, responsive portfolio website built with React and Supabase. Features dynamic content management, project showcases, and admin panel for easy updates.',
  company: 'Personal Project',
  technologies: ['React', 'Supabase', 'SCSS', 'JavaScript'],
  responsibilities: ['Full-stack Development', 'UI/UX Design', 'Content Strategy'],
  challenges: ['Database Design', 'Admin Panel UX', 'Responsive Design'],
  solutions: ['Used Supabase for backend', 'Created intuitive admin interface', 'Mobile-first approach'],
  categories: ['Web Development', 'Personal'],
  outcomes: [
    { metric: 'Load Time', value: '< 2s', description: 'Fast loading performance' },
    { metric: 'Accessibility', value: 'AA', description: 'WCAG compliance achieved' }
  ],
  image_urls: ['https://your-image-url.com/screenshot.png']
};

// Uncomment to add the project:
addPersistentProject(exampleProject);


console.log('📚 How to use this script:');
console.log('1. Modify the exampleProject object above with your project details');
console.log('2. Uncomment the last line: addPersistentProject(exampleProject);');
console.log('3. Run: node add-persistent-project.js');
console.log('4. Copy the generated SQL to supabase/seed.sql');
console.log('5. Your project will now persist across database resets!\n');

export { addPersistentProject };