import { supabase } from '../utils/supabase';

// Get all sections for a specific project
export async function getProjectSections(projectId) {
  const { data, error } = await supabase
    .from('project_sections')
    .select('*')
    .eq('project_id', projectId)
    .order('section_order', { ascending: true });

  if (error) {
    console.error('Error fetching project sections:', error);
    throw error;
  }

  return data || [];
}

// Get a specific project section by ID
export async function getProjectSectionById(sectionId) {
  const { data, error } = await supabase
    .from('project_sections')
    .select('*')
    .eq('id', sectionId)
    .single();

  if (error) {
    console.error('Error fetching project section:', error);
    throw error;
  }

  return data;
}

// Create a new project section
export async function createProjectSection(sectionData) {
  const { data, error } = await supabase
    .from('project_sections')
    .insert(sectionData)
    .select()
    .single();

  if (error) {
    console.error('Error creating project section:', error);
    throw error;
  }

  return data;
}

// Update a project section
export async function updateProjectSection(sectionId, sectionData) {
  const { data, error } = await supabase
    .from('project_sections')
    .update(sectionData)
    .eq('id', sectionId)
    .select()
    .single();

  if (error) {
    console.error('Error updating project section:', error);
    throw error;
  }

  return data;
}

// Delete a project section
export async function deleteProjectSection(sectionId) {
  const { error } = await supabase
    .from('project_sections')
    .delete()
    .eq('id', sectionId);

  if (error) {
    console.error('Error deleting project section:', error);
    throw error;
  }

  return true;
}