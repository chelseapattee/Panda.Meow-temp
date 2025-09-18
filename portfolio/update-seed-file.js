import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Updates the seed.sql file with all current database projects
 * Run this after adding projects via admin to make them permanent
 */
async function updateSeedFile() {
  try {
    console.log('🔄 Updating seed.sql file with current database contents...\n');
    
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
      console.error('❌ Error fetching sections:', sectionsError);
      return false;
    }
    
    console.log(`📊 Found ${projects.length} projects and ${sections.length} sections\n`);
    
    // Generate SQL content
    const sqlContent = generateSeedSQL(projects, sections);
    
    // Write to seed file
    const seedFilePath = path.join(__dirname, '..', 'supabase', 'seed.sql');
    
    // Backup existing seed file
    try {
      const backupPath = path.join(__dirname, '..', 'supabase', `seed.backup.${Date.now()}.sql`);
      const existingContent = await fs.readFile(seedFilePath, 'utf8');
      await fs.writeFile(backupPath, existingContent);
      console.log(`📁 Backed up existing seed file to: ${path.basename(backupPath)}`);
    } catch (err) {
      console.log('📝 No existing seed file to backup, creating new one');
    }
    
    // Write new seed file
    await fs.writeFile(seedFilePath, sqlContent);
    console.log(`✅ Successfully updated seed.sql with ${projects.length} projects!`);
    
    // List project titles
    console.log('\n📋 Projects in seed file:');
    projects.forEach((project, index) => {
      console.log(`   ${index + 1}. ${project.title} (${project.company || 'No company'})`);
    });
    
    console.log('\n🎯 Next Steps:');
    console.log('1. Review the updated seed.sql file');
    console.log('2. Test with: supabase db reset');
    console.log('3. Your projects will now persist across resets!\n');
    
    return true;
    
  } catch (err) {
    console.error('❌ Error updating seed file:', err);
    return false;
  }
}

function generateSeedSQL(projects, sections) {
  const escapeString = (str) => str ? `'${str.replace(/'/g, "''")}'` : 'NULL';
  const formatArray = (arr) => {
    if (!arr || arr.length === 0) return 'ARRAY[]::text[]';
    return `ARRAY[${arr.map(item => `'${item.replace(/'/g, "''")}'`).join(', ')}]`;
  };
  
  // Generate projects SQL
  const projectInserts = projects.map(project => `(
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
)`).join(',\n');
  
  // Generate sections SQL
  const sectionInserts = sections.length > 0 ? sections.map(section => `(
  '${section.project_id}',
  ${section.section_order},
  ${escapeString(section.header)},
  '${section.type}',
  ${section.images ? formatArray(section.images) : 'NULL'},
  ${section.captions ? formatArray(section.captions) : 'NULL'},
  ${escapeString(section.text_content)},
  ${escapeString(section.gif_url)},
  ${escapeString(section.video_url)}
)`).join(',\n') : '';
  
  return `-- Seed data for portfolio development
-- This file runs automatically after migrations during db reset
-- Generated on ${new Date().toISOString()}
-- Projects: ${projects.length}, Sections: ${sections.length}

-- Insert projects
INSERT INTO projects (id, title, description, company, technologies, responsibilities, challenges, solutions, categories, outcomes, image_urls) VALUES 
${projectInserts};

${sections.length > 0 ? `-- Insert project sections
INSERT INTO project_sections (project_id, section_order, header, type, images, captions, text_content, gif_url, video_url) VALUES 
${sectionInserts};` : '-- No project sections found'}`;
}

// Run the update
updateSeedFile().then(success => {
  process.exit(success ? 0 : 1);
});