import { supabase } from '../utils/supabase';
import fs from 'fs';
import path from 'path';

/**
 * Updates the seed.sql file with current database projects
 * This ensures new projects added via admin persist across resets
 */
export async function updateSeedFile() {
  try {
    // Fetch all projects from database
    const { data: projects, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at');
    
    if (projectError) {
      console.error('Error fetching projects:', projectError);
      return { success: false, error: projectError.message };
    }
    
    // Fetch all project sections
    const { data: sections, error: sectionsError } = await supabase
      .from('project_sections')
      .select('*')
      .order('project_id, section_order');
    
    if (sectionsError) {
      console.error('Error fetching sections:', sectionsError);
      return { success: false, error: sectionsError.message };
    }
    
    // Generate SQL content
    const sqlContent = generateSeedSQL(projects, sections);
    
    // Write to seed file
    const seedFilePath = path.join(process.cwd(), '..', 'supabase', 'seed.sql');
    
    // Note: In a browser environment, we can't directly write to files
    // Instead, we'll return the SQL content for the user to save manually
    // or use a backend endpoint to handle file writing
    
    return {
      success: true,
      sqlContent,
      projectCount: projects.length,
      sectionCount: sections.length,
      message: 'Seed SQL generated successfully'
    };
    
  } catch (err) {
    console.error('Error updating seed file:', err);
    return { success: false, error: err.message };
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
  ${formatArray(section.images)},
  ${formatArray(section.captions)},
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