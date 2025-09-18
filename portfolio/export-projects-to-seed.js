import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Export all projects and sections from database to SQL for seed file
 * This lets you preserve projects added through the admin interface
 */
async function exportProjectsToSeed() {
  try {
    console.log('📊 Exporting projects from database...\n');
    
    // Fetch all projects
    const { data: projects, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at');
    
    if (projectError) {
      console.error('❌ Error fetching projects:', projectError);
      return false;
    }
    
    // Fetch all project sections
    const { data: sections, error: sectionsError } = await supabase
      .from('project_sections')
      .select('*')
      .order('project_id, section_order');
    
    if (sectionsError) {
      console.error('❌ Error fetching project sections:', sectionsError);
      return false;
    }
    
    console.log(`✅ Found ${projects.length} projects and ${sections.length} sections\n`);
    
    // Generate SQL
    const projectsSQL = generateProjectsSQL(projects);
    const sectionsSQL = generateSectionsSQL(sections);
    
    const fullSQL = `-- Seed data for portfolio development
-- This file runs automatically after migrations during db reset
-- Generated on ${new Date().toISOString()}

${projectsSQL}

${sectionsSQL}`;
    
    console.log('📝 Generated SQL for supabase/seed.sql:\n');
    console.log('=' .repeat(80));
    console.log(fullSQL);
    console.log('=' .repeat(80));
    
    console.log('\n📋 Next Steps:');
    console.log('1. Copy the SQL above');
    console.log('2. Replace the contents of supabase/seed.sql with this SQL');
    console.log('3. Run: supabase db reset');
    console.log('4. All your current projects will now persist across resets!\n');
    
    return true;
    
  } catch (err) {
    console.error('❌ Export failed:', err);
    return false;
  }
}

function generateProjectsSQL(projects) {
  if (projects.length === 0) return '-- No projects found';
  
  const projectInserts = projects.map(project => {
    const escapeString = (str) => str ? `'${str.replace(/'/g, "''")}'` : 'NULL';
    const formatArray = (arr) => {
      if (!arr || arr.length === 0) return 'ARRAY[]::text[]';
      return `ARRAY[${arr.map(item => `'${item.replace(/'/g, "''")}'`).join(', ')}]`;
    };
    
    return `(
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
)`;
  }).join(',\n');
  
  return `-- Insert projects
INSERT INTO projects (id, title, description, company, technologies, responsibilities, challenges, solutions, categories, outcomes, image_urls) VALUES 
${projectInserts};`;
}

function generateSectionsSQL(sections) {
  if (sections.length === 0) return '-- No project sections found';
  
  const sectionInserts = sections.map(section => {
    const escapeString = (str) => str ? `'${str.replace(/'/g, "''")}'` : 'NULL';
    const formatArray = (arr) => {
      if (!arr || arr.length === 0) return 'NULL';
      return `ARRAY[${arr.map(item => `'${item.replace(/'/g, "''")}'`).join(', ')}]`;
    };
    
    return `(
  '${section.project_id}',
  ${section.section_order},
  ${escapeString(section.header)},
  '${section.type}',
  ${formatArray(section.images)},
  ${formatArray(section.captions)},
  ${escapeString(section.text_content)},
  ${escapeString(section.gif_url)},
  ${escapeString(section.video_url)}
)`;
  }).join(',\n');
  
  return `-- Insert project sections
INSERT INTO project_sections (project_id, section_order, header, type, images, captions, text_content, gif_url, video_url) VALUES 
${sectionInserts};`;
}

// Run the export
exportProjectsToSeed().then(success => {
  process.exit(success ? 0 : 1);
});