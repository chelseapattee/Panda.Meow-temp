import { supabase } from '../utils/supabase';

const BUCKET = 'project-images';

// Upload a file to the bucket (returns public URL)
export async function uploadFile(file, path = null) {
  // Sanitize filename: remove spaces, special characters, and keep only safe characters
  const sanitizedName = file.name
    .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace unsafe characters with underscore
    .replace(/_{2,}/g, '_') // Replace multiple underscores with single underscore
    .replace(/^_+|_+$/g, ''); // Remove leading/trailing underscores
  
  const filePath = path || `${Date.now()}_${sanitizedName}`;
  
  console.log(`Uploading file: ${file.name} to sanitized path: ${filePath}`);
  const { data, error } = await supabase.storage.from(BUCKET).upload(filePath, file, {
    cacheControl: '3600',
    upsert: true, // Allow overwrite if file exists
  });
  
  if (error) {
    console.error('Upload error:', error);
    throw new Error(`Upload failed: ${error.message}`);
  }
  
  // Get public URL
  const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
  console.log('Upload successful, public URL:', publicUrlData.publicUrl);
  return { path: filePath, url: publicUrlData.publicUrl };
}

// Delete a file from the bucket
export async function deleteFile(filePath) {
  const { error } = await supabase.storage.from(BUCKET).remove([filePath]);
  if (error) throw error;
  return true;
} 