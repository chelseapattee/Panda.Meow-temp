import { supabase } from './supabase';

// Migration script to add existing projects to the database
const existingProjects = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Project One',
    description: 'This is a comprehensive project showcasing modern web development practices with React and cutting-edge technologies. The project demonstrates full-stack development capabilities with a focus on user experience and performance optimization.',
    company: 'Tech Corp',
    technologies: ['React', 'JavaScript', 'CSS', 'Node.js'],
    responsibilities: ['Frontend Development', 'UI/UX Design', 'Performance Optimization'],
    challenges: ['Complex state management', 'Cross-browser compatibility', 'Performance under load'],
    solutions: ['Implemented Redux for state management', 'Used progressive enhancement', 'Added caching layers'],
    categories: ['Web Development', 'Frontend'],
    outcomes: [
      { metric: 'Performance', value: '40%', description: 'Improvement in page load speed' },
      { metric: 'User Satisfaction', value: '95%', description: 'Positive user feedback rating' }
    ],
    image_urls: ['https://picsum.photos/800/600?random=1']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    title: 'Project Two',
    description: 'An innovative mobile-first application that revolutionizes how users interact with digital content. Built with modern frameworks and featuring advanced user interface patterns and seamless responsive design.',
    company: 'Digital Solutions Inc',
    technologies: ['React Native', 'TypeScript', 'Redux', 'API Integration'],
    responsibilities: ['Mobile Development', 'API Integration', 'User Testing'],
    challenges: ['Mobile performance optimization', 'Complex animations', 'Offline functionality'],
    solutions: ['Optimized rendering cycles', 'Used hardware acceleration', 'Implemented service workers'],
    categories: ['Mobile Development', 'UX Design'],
    outcomes: [
      { metric: 'Download Rate', value: '300%', description: 'Increase in app downloads' },
      { metric: 'Retention', value: '85%', description: '30-day user retention rate' }
    ],
    image_urls: ['https://picsum.photos/800/600?random=2']
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    title: 'Project Three',
    description: 'A data-driven analytics platform that provides real-time insights and comprehensive reporting capabilities. Features advanced data visualization, custom dashboards, and enterprise-grade security measures.',
    company: 'Analytics Pro',
    technologies: ['Python', 'React', 'D3.js', 'PostgreSQL', 'Docker'],
    responsibilities: ['Full-stack Development', 'Data Visualization', 'System Architecture'],
    challenges: ['Large dataset processing', 'Real-time updates', 'Security compliance'],
    solutions: ['Implemented data streaming', 'Used WebSocket connections', 'Added encryption layers'],
    categories: ['Data Analytics', 'Full-stack'],
    outcomes: [
      { metric: 'Processing Speed', value: '60%', description: 'Faster data processing time' },
      { metric: 'Accuracy', value: '99.9%', description: 'Data accuracy improvement' },
      { metric: 'User Adoption', value: '120%', description: 'Increase in active users' }
    ],
    image_urls: ['https://picsum.photos/800/600?random=3']
  }
];

export async function migrateExistingProjects() {
  try {
    console.log('Starting migration of existing projects...');
    
    // Check if projects already exist to avoid duplicates
    const { data: existingData } = await supabase.from('projects').select('id');
    const existingIds = existingData ? existingData.map(p => p.id) : [];
    
    // Filter out projects that already exist
    const projectsToMigrate = existingProjects.filter(project => !existingIds.includes(project.id));
    
    if (projectsToMigrate.length === 0) {
      console.log('No new projects to migrate. All projects already exist in database.');
      return { success: true, migrated: 0, message: 'No migration needed' };
    }
    
    // Insert projects
    const { data, error } = await supabase
      .from('projects')
      .insert(projectsToMigrate)
      .select();
    
    if (error) {
      console.error('Migration failed:', error);
      return { success: false, error: error.message };
    }
    
    console.log(`Successfully migrated ${projectsToMigrate.length} projects:`, data);
    return { 
      success: true, 
      migrated: projectsToMigrate.length, 
      projects: data,
      message: `Successfully migrated ${projectsToMigrate.length} projects to database`
    };
    
  } catch (err) {
    console.error('Migration error:', err);
    return { success: false, error: err.message };
  }
}

// Helper function to run migration from browser console
export async function runMigration() {
  const result = await migrateExistingProjects();
  console.log('Migration result:', result);
  return result;
}