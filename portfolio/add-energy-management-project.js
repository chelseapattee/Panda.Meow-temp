import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Energy Management Platform project data
const energyProject = {
  title: 'Energy Management Platform',
  description: 'At Iteros, we developed an equipment-agnostic energy management system that allows for the creation of equipment definitions from which new equipment inherits properties. This enables consistent configuration in a fraction of the time compared to proprietary manufacturer software. The challenge was to create a modular interface that adapts to each facility\'s unique configuration of assets without having to set up a custom dashboard for every customer.',
  company: 'Iteros',
  technologies: ['Angular', 'TypeScript', 'Node.js', 'HTML', 'SCSS', 'Sketch'],
  responsibilities: [
    'User Research',
    'Wireframing',
    'Visual Design',
    'Frontend Development',
    'Information Architecture',
    'User Experience Design',
    'Interface Design'
  ],
  challenges: [
    'Creating a system adaptable to diverse facility configurations',
    'Designing for multiple user types with different goals',
    'Developing a scalable interface for monitoring hundreds or thousands of sites',
    'Identifying and displaying the most relevant metrics for different site types',
    'Building a modular system that automatically adapts to available assets'
  ],
  solutions: [
    'Developed detailed user personas to guide feature development',
    'Created a widget-based system adaptable to different site types',
    'Designed health indicators based on key performance metrics',
    'Implemented a hierarchical navigation system for portfolios and sites',
    'Developed site-type specific views (Monitoring, Consumer, Prosumer, Microgrid, etc.)'
  ],
  categories: [
    'Frontend Development',
    'Data Visualization',
    'UI Design',
    'UX Design',
    'Information Architecture'
  ],
  outcomes: [
    {
      metric: 'Configuration Efficiency',
      value: 'Significantly improved',
      description: 'Reduced setup time through inheritance-based equipment definitions'
    },
    {
      metric: 'Monitoring Capability',
      value: 'Comprehensive',
      description: 'Created scalable system capable of monitoring thousands of sites'
    },
    {
      metric: 'User Satisfaction',
      value: 'Enhanced',
      description: 'Tailored interfaces for different user types based on specific goals'
    }
  ],
  // Using placeholder images for now - replace with actual images
  image_urls: [
    'https://picsum.photos/800/600?random=100', // Main platform overview
    'https://picsum.photos/800/600?random=101'  // Dashboard view
  ]
};

// Project sections based on the media items
const projectSections = [
  {
    section_order: 1,
    header: 'Project Overview',
    type: 'image_text',
    images: ['https://picsum.photos/800/600?random=100'],
    captions: ['Energy Management Platform Overview - Main view of the platform dashboard'],
    text_content: 'The Energy Management Platform was designed to provide a comprehensive, equipment-agnostic solution for energy monitoring and management. The interface adapts to each facility\'s unique configuration, eliminating the need for custom dashboards for every customer.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 2,
    header: 'User Research & Personas',
    type: 'images',
    images: [
      'https://picsum.photos/800/600?random=102', // User goals
      'https://picsum.photos/800/600?random=103'  // Personas
    ],
    captions: [
      'Analysis of different user types and their goals',
      'Detailed personas developed to guide design decisions'
    ],
    text_content: null,
    gif_url: null,
    video_url: null
  },
  {
    section_order: 3,
    header: 'Design Process',
    type: 'image_text',
    images: [
      'https://picsum.photos/800/600?random=104', // Before/First iteration
      'https://picsum.photos/800/600?random=105'  // Wireframes
    ],
    captions: [
      'Initial dashboard design for monitoring site',
      'Early design concepts and wireframes for the platform'
    ],
    text_content: 'The design process began with understanding user needs and iterating on dashboard concepts. We moved from basic monitoring displays to a sophisticated widget-based system that could adapt to different facility types and user requirements.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 4,
    header: 'Widget System & Modular Interface',
    type: 'image_text',
    images: ['https://picsum.photos/800/600?random=106'],
    captions: ['Modular widgets designed for different site types'],
    text_content: 'The widget system was a key innovation, allowing the interface to automatically adapt based on available assets and facility type. Each widget was designed to display relevant metrics for specific equipment types, ensuring users see the most important information for their context.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 5,
    header: 'Portfolio & Site Management',
    type: 'images',
    images: [
      'https://picsum.photos/800/600?random=107', // Portfolio overview
      'https://picsum.photos/800/600?random=108', // Site detail
      'https://picsum.photos/800/600?random=109'  // Health monitoring
    ],
    captions: [
      'High-level view of multiple sites in portfolio',
      'Detailed information for a specific site',
      'Interface showing site health based on power usage and cost'
    ],
    text_content: null,
    gif_url: null,
    video_url: null
  },
  {
    section_order: 6,
    header: 'Key Outcomes',
    type: 'text',
    images: null,
    captions: null,
    text_content: 'The Energy Management Platform successfully reduced configuration time through inheritance-based equipment definitions, created a scalable system capable of monitoring thousands of sites, and enhanced user satisfaction by tailoring interfaces to different user types based on their specific goals. The modular approach allowed for rapid deployment across diverse facility types without custom development.',
    gif_url: null,
    video_url: null
  }
];

async function addEnergyManagementProject() {
  try {
    console.log('🚀 Adding Energy Management Platform project...\n');
    
    // Insert the project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert(energyProject)
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
addEnergyManagementProject().then(success => {
  process.exit(success ? 0 : 1);
});