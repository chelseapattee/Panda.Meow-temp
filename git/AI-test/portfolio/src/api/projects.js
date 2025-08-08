import { supabase } from '../utils/supabase';

// Get all projects
export async function getProjects() {
  const { data, error } = await supabase.from('projects').select('*');
  if (error) throw error;
  return data;
}

// Get a single project by id
export async function getProjectById(id) {
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

// Create a new project
export async function createProject(project) {
  const { data, error } = await supabase.from('projects').insert([project]).select().single();
  if (error) throw error;
  return data;
}

// Update a project
export async function updateProject(id, updates) {
  const { data, error } = await supabase.from('projects').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

// Delete a project
export async function deleteProject(id) {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
  return true;
}
