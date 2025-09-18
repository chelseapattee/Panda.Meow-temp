import { supabase } from './supabase';

// Test function to verify storage is working
export async function testStorageConnection() {
  console.log('Testing storage connection...');
  
  // Test 1: List buckets
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    if (error) {
      console.error('Error listing buckets:', error);
      return false;
    }
    console.log('Available buckets:', buckets);
    
    // Test 2: Check if project-images bucket exists
    const projectBucket = buckets.find(bucket => bucket.name === 'project-images');
    if (!projectBucket) {
      console.error('project-images bucket not found');
      return false;
    }
    console.log('project-images bucket found:', projectBucket);
    
    // Test 3: Try to create a simple test file
    const testContent = 'test upload';
    const testFile = new File([testContent], 'test.txt', { type: 'text/plain' });
    const testPath = `test_${Date.now()}.txt`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(testPath, testFile);
      
    if (uploadError) {
      console.error('Test upload failed:', uploadError);
      return false;
    }
    
    console.log('Test upload successful:', uploadData);
    
    // Test 4: Get public URL
    const { data: urlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(testPath);
    console.log('Public URL:', urlData.publicUrl);
    
    // Test 5: Clean up test file
    const { error: deleteError } = await supabase.storage
      .from('project-images')
      .remove([testPath]);
      
    if (deleteError) {
      console.warn('Failed to delete test file:', deleteError);
    } else {
      console.log('Test file cleaned up successfully');
    }
    
    return true;
  } catch (err) {
    console.error('Storage test error:', err);
    return false;
  }
}

// Call from browser console: import('./utils/testStorage.js').then(m => m.testStorageConnection())