import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Monitoring Lobby View project data
const lobbyProject = {
  title: 'Monitoring Lobby View',
  description: 'Businesses want to put their energy efforts on display and need a type of view that is not only high-level, but also engaging. The challenge was to create a lobby view dashboard that is consistent with a business\' branding and relevant to their location.',
  company: 'CleanSpark',
  technologies: ['SCALA', 'Play Framework', 'HTML', 'SCSS', 'Gulp.js', 'Photoshop'],
  responsibilities: [
    'Front-End Development',
    'User Experience Design',
    'Visual Design',
    'Wireframing',
    'Interface Design'
  ],
  challenges: [
    'Creating visually engaging energy displays for public areas',
    'Ensuring consistency with client branding',
    'Developing displays relevant to each client\'s specific location',
    'Balancing customization with implementation efficiency'
  ],
  solutions: [
    'Developed a flexible template-based design system',
    'Created a standardized \'New Client Request Form\' for streamlined implementation',
    'Balanced customized appearance with reusable components',
    'Designed an efficient process for business development team to generate proposals'
  ],
  categories: [
    'Data Visualization',
    'UI Design',
    'UX Design',
    'Process Optimization'
  ],
  outcomes: [
    {
      metric: 'Implementation Efficiency',
      value: 'Significantly improved',
      description: 'Streamlined process allowed for much faster client implementations'
    },
    {
      metric: 'Business Development',
      value: 'Enhanced',
      description: 'Quick turnaround time for new client proposals'
    },
    {
      metric: 'Client Satisfaction',
      value: 'High',
      description: 'Clients received personalized-looking displays that matched their branding'
    }
  ],
  // Using placeholder images for now - replace with actual images
  image_urls: [
    'https://picsum.photos/800/600?random=500', // Main lobby dashboard
    'https://picsum.photos/800/600?random=501'  // Client examples
  ]
};

// Project sections based on the media items
const projectSections = [
  {
    section_order: 1,
    header: 'Project Overview',
    type: 'image_text',
    images: ['https://picsum.photos/800/600?random=500'],
    captions: ['Lobby Dashboard Overview - Main dashboard view for energy monitoring'],
    text_content: 'Businesses wanted to showcase their energy efforts in public spaces through engaging, high-level displays. The challenge was creating lobby view dashboards that maintained consistency with each business\'s branding while remaining relevant to their specific location and energy initiatives.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 2,
    header: 'Design Evolution',
    type: 'images',
    images: [
      'https://picsum.photos/800/600?random=502', // Original design
      'https://picsum.photos/800/600?random=503'  // Redesigned dashboard
    ],
    captions: [
      'The original dashboard design',
      'The improved dashboard design'
    ],
    text_content: null,
    gif_url: null,
    video_url: null
  },
  {
    section_order: 3,
    header: 'Process Optimization',
    type: 'image_text',
    images: ['https://picsum.photos/800/600?random=504'],
    captions: ['Client Request Form - Form created to streamline the dashboard creation process'],
    text_content: 'To address the challenge of balancing customization with implementation efficiency, I developed a standardized \'New Client Request Form\' that streamlined the entire process. This form allowed the business development team to quickly gather requirements and generate proposals while ensuring each client received a personalized dashboard experience.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 4,
    header: 'Template-Based Design System',
    type: 'text',
    images: null,
    captions: null,
    text_content: 'The solution involved creating a flexible template-based design system that balanced customized appearance with reusable components. This approach allowed for rapid deployment of client-specific dashboards while maintaining consistent quality and reducing development time.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 5,
    header: 'Client Implementation Examples',
    type: 'image_text',
    images: ['https://picsum.photos/800/600?random=505'],
    captions: ['Multiple Dashboard Examples - Various client dashboard implementations'],
    text_content: 'The template system enabled creation of multiple client-specific implementations, each reflecting the unique branding and location-specific energy data of different businesses. The standardized process significantly improved implementation efficiency while maintaining high client satisfaction.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 6,
    header: 'Key Outcomes',
    type: 'text',
    images: null,
    captions: null,
    text_content: 'The project successfully streamlined the client implementation process, allowing for much faster turnaround times and enhanced business development capabilities. Clients received personalized-looking displays that perfectly matched their branding requirements while showcasing their energy initiatives effectively in public spaces.',
    gif_url: null,
    video_url: null
  }
];

async function addLobbyProject() {
  try {
    console.log('🚀 Adding Monitoring Lobby View project...\n');
    
    // Insert the project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert(lobbyProject)
      .select()
      .single();
    
    if (projectError) {
      console.error('❌ Error adding project:', projectError);
      return false;
    }
    
    console.log('✅ Project added successfully!');
    console.log(`   ID: ${project.id}`);
    console.log(`   Title: ${project.title}`);
    console.log(`   Company: ${project.company}`);
    
    // Add project sections
    const sectionsWithProjectId = projectSections.map(section => ({
      ...section,
      project_id: project.id
    }));
    
    const { data: sections, error: sectionsError } = await supabase
      .from('project_sections')
      .insert(sectionsWithProjectId)
      .select();
    
    if (sectionsError) {
      console.error('❌ Error adding project sections:', sectionsError);
      return false;
    }
    
    console.log(`\n✅ Added ${sections.length} project sections:`);
    sections.forEach((section, index) => {
      console.log(`   ${index + 1}. ${section.header || `Section ${section.section_order}`}`);
    });
    
    console.log('\n📝 Next Steps:');
    console.log('1. Replace placeholder images with actual project images');
    console.log('2. Run: npm run update-seed (to make it persistent)');
    console.log('3. Visit the project at: /projects/' + project.id);
    console.log('\n💡 To update images:');
    console.log('   - Upload images via admin panel');
    console.log('   - Or update image_urls in the database');
    
    return true;
    
  } catch (err) {
    console.error('❌ Failed to add project:', err);
    return false;
  }
}

// Run the function
addLobbyProject().then(success => {
  process.exit(success ? 0 : 1);
});