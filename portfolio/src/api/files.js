import { supabase } from '../utils/supabase';

const BUCKET = 'project-images';

// Upload a file to the bucket (returns public URL)
export async function uploadFile(file, path = null) {
  const filePath = path || `${Date.now()}_${file.name}`;
  const { error } = await supabase.storage.from(BUCKET).upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;
  // Get public URL
  const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
  return { path: filePath, url: publicUrlData.publicUrl };
}

// Delete a file from the bucket
export async function deleteFile(filePath) {
  const { error } = await supabase.storage.from(BUCKET).remove([filePath]);
  if (error) throw error;
  return true;
} 