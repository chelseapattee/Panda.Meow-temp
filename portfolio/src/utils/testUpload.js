import { supabase } from './supabase';

// Test function to check storage bucket and upload
export async function testStorage() {
  console.log('Testing storage configuration...');
  
  // Check if bucket exists
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  console.log('Available buckets:', buckets);
  if (bucketsError) {
    console.error('Error listing buckets:', bucketsError);
    return;
  }
  
  // Check if project-images bucket exists
  const projectImagesBucket = buckets.find(bucket => bucket.name === 'project-images');
  if (!projectImagesBucket) {
    console.log('project-images bucket not found. Creating bucket...');
    
    // Create the bucket
    const { data: newBucket, error: createError } = await supabase.storage.createBucket('project-images', {
      public: true,
      fileSizeLimit: 2 * 1024 * 1024, // 2MB
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']
    });
    
    if (createError) {
      console.error('Error creating bucket:', createError);
      return;
    }
    
    console.log('Bucket created successfully:', newBucket);
  } else {
    console.log('project-images bucket exists:', projectImagesBucket);
  }
  
  // Test a simple upload with a small test file
  const testFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
  console.log('Testing upload with test file...');
  
  try {
    const filePath = `test_${Date.now()}.txt`;
    const { data, error } = await supabase.storage
      .from('project-images')
      .upload(filePath, testFile);
    
    if (error) {
      console.error('Upload test failed:', error);
    } else {
      console.log('Upload test successful:', data);
      
      // Clean up test file
      await supabase.storage.from('project-images').remove([filePath]);
      console.log('Test file cleaned up');
    }
  } catch (err) {
    console.error('Upload test error:', err);
  }
}