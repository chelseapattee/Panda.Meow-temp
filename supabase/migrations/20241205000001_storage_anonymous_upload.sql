-- Drop existing policies that require authentication
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

-- Allow anonymous users to upload images (for admin panel)
CREATE POLICY "Anonymous users can upload images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'project-images');

-- Allow anonymous users to update images (for admin panel)
CREATE POLICY "Anonymous users can update images" ON storage.objects
FOR UPDATE USING (bucket_id = 'project-images');

-- Allow anonymous users to delete images (for admin panel)
CREATE POLICY "Anonymous users can delete images" ON storage.objects
FOR DELETE USING (bucket_id = 'project-images');