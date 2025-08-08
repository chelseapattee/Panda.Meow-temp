// Migration script: Upload images to Supabase Storage and prepare project data
// Run with: SUPABASE_URL=... SUPABASE_ANON_KEY=... node supabase/migration-script.js

const path = require('path');
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const projectsModule = require(path.resolve(__dirname, '../portfolio/src/data/projects.js'));
const projects = Array.isArray(projectsModule.default) ? projectsModule.default : projectsModule;

const IMAGES_BASE = path.resolve(__dirname, '../portfolio/src/images');
const BUCKET = 'project-images';

async function uploadImage(imageKey) {
  const imagePath = path.join(IMAGES_BASE, imageKey);
  if (!fs.existsSync(imagePath)) {
    console.warn(`Image not found: ${imagePath}`);
    return null;
  }
  const fileBuffer = fs.readFileSync(imagePath);
  const fileName = imageKey;
  const { error } = await supabase.storage.from(BUCKET).upload(fileName, fileBuffer, {
    cacheControl: '3600',
    upsert: true,
    contentType: getMimeType(fileName),
  });
  if (error) {
    console.error(`Failed to upload ${fileName}:`, error.message);
    return null;
  }
  const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
  return publicUrlData.publicUrl;
}

function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.svg') return 'image/svg+xml';
  return 'application/octet-stream';
}

(async () => {
  const migrated = [];
  for (const proj of projects) {
    let image_urls = [];
    let imageKeys = [];
    // Try both .jpg and .png for each project
    const base = path.join(IMAGES_BASE, proj.id.toString());
    let found = false;
    for (const ext of ['jpg', 'png']) {
      const fileName = `cover.${ext}`;
      const filePath = path.join(base, fileName);
      if (fs.existsSync(filePath)) {
        imageKeys.push(`${proj.id}/cover.${ext}`);
        const url = await uploadImage(`${proj.id}/cover.${ext}`);
        if (url) image_urls.push(url);
        found = true;
        break; // Only use the first found
      }
    }
    migrated.push({
      id: proj.id,
      title: proj.title,
      description: proj.description,
      technologies: proj.technologies || [],
      responsibilities: proj.responsibilities || [],
      challenges: proj.challenges || [],
      solutions: proj.solutions || [],
      categories: proj.categories || [],
      outcomes: proj.outcomes || [],
      image_urls,
      imageKeys,
    });
  }
  console.log('Fully migrated projects:');
  console.log(JSON.stringify(migrated, null, 2));
})(); 