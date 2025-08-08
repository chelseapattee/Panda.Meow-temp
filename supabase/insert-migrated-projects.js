// Insert migrated projects into Supabase 'projects' table
// Run with: SUPABASE_URL=... SUPABASE_ANON_KEY=... node supabase/insert-migrated-projects.js

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const MIGRATED_PATH = path.resolve(__dirname, 'migrated-projects.json');
if (!fs.existsSync(MIGRATED_PATH)) {
  console.error('Could not find migrated-projects.json. Please run the migration script and save the output as this file.');
  process.exit(1);
}
const projects = JSON.parse(fs.readFileSync(MIGRATED_PATH, 'utf8'));

(async () => {
  const { data, error } = await supabase.from('projects').upsert(projects, { onConflict: 'id' });
  if (error) {
    console.error('Error inserting projects:', error.message);
    process.exit(1);
  }
  console.log(`Inserted/Upserted ${data.length} projects into Supabase.`);
})(); 