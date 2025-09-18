import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Lego Microgrid Demo project data
const legoProject = {
  title: 'Lego Demo',
  description: 'Energy management is abstract in nature, and therefore difficult to conceptualize without an applied demonstration. When our company wanted to demonstrate to potential investors how our software worked beyond screens, we developed a small-scale model using legos to show how our system balances and shares power, as well as integrates community renewables. The challenge was to augment this physical model with a conceptual digital overlay to visualize what was happening within the model.',
  company: 'Iteros',
  technologies: ['Angular', 'TypeScript', 'HTML', 'Angular CLI', 'SCSS', 'D3', 'Adobe Illustrator'],
  responsibilities: [
    'Design',
    'SVG Animation',
    'Frontend Development',
    'User Interface Engineering',
    'Visual Conceptualization'
  ],
  challenges: [
    'Making abstract energy concepts tangible and easy to understand',
    'Creating a digital overlay that synchronized with physical model events',
    'Visually representing complex energy flow concepts',
    'Developing a demonstration system for investor presentations',
    'Designing animations that accurately represented real energy behaviors'
  ],
  solutions: [
    'Built a physical Lego model to demonstrate power sharing and balancing',
    'Created isometric SVG models of physical components',
    'Implemented animations to show energy flows and system states',
    'Synchronized digital overlay with the physical model events',
    'Designed visual changes to reflect concepts like cloudy weather affecting solar generation'
  ],
  categories: [
    'UI Design',
    'UX Design',
    '3D Modeling',
    'Data Visualization',
    'Interactive Demo'
  ],
  outcomes: [
    {
      metric: 'Concept Communication',
      value: 'Highly effective',
      description: 'Successfully demonstrated complex energy concepts to non-technical audiences'
    },
    {
      metric: 'Investor Presentations',
      value: 'Featured',
      description: 'Became a key demonstration tool during investor meetings'
    },
    {
      metric: 'Public Events',
      value: 'Showcased',
      description: 'Featured at the Sun Valley Forum in Idaho during a microgrid lab demonstration'
    }
  ],
  // Using placeholder images for now - replace with actual images
  image_urls: [
    'https://picsum.photos/800/600?random=400', // Main demo overview
    'https://picsum.photos/800/600?random=401'  // SVG animation
  ]
};

// Project sections based on the media items
const projectSections = [
  {
    section_order: 1,
    header: 'Project Overview',
    type: 'image_text',
    images: ['https://picsum.photos/800/600?random=400'],
    captions: ['Lego Microgrid Demo Overview - Overview of the physical Lego model with digital overlay'],
    text_content: 'Energy management concepts are inherently abstract and difficult to conceptualize without applied demonstration. To help potential investors understand how our software worked beyond screens, we developed a small-scale Lego model that demonstrated power sharing, balancing, and community renewable integration with a synchronized digital overlay.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 2,
    header: 'Physical Model Development',
    type: 'images',
    images: [
      'https://picsum.photos/800/600?random=402', // Demo setup
      'https://picsum.photos/800/600?random=403'  // Whiteboard planning
    ],
    captions: [
      'The physical setup of the Lego demonstration',
      'Initial concept planning on whiteboard'
    ],
    text_content: null,
    gif_url: null,
    video_url: null
  },
  {
    section_order: 3,
    header: 'Digital Interface Design',
    type: 'images',
    images: [
      'https://picsum.photos/800/600?random=404', // Digital wireframe
      'https://picsum.photos/800/600?random=405'  // SVG models
    ],
    captions: [
      'Digital mockup of the interface',
      'Refined SVG models of the physical components in isometric view'
    ],
    text_content: null,
    gif_url: null,
    video_url: null
  },
  {
    section_order: 4,
    header: 'Animation & Synchronization',
    type: 'image_text',
    images: ['https://picsum.photos/800/600?random=406'],
    captions: ['Animated SVG components showing energy flow changes'],
    text_content: 'The digital overlay featured synchronized animations that responded to physical model events. Visual changes reflected real energy concepts, such as cloudy weather affecting solar generation, power flows between buildings, and energy storage charging and discharging cycles. The animations helped make abstract energy management concepts tangible and understandable.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 5,
    header: 'Demonstration Impact',
    type: 'image_text',
    images: ['https://picsum.photos/800/600?random=407'],
    captions: ['The microgrid demonstration at the Sun Valley Forum in Idaho'],
    text_content: 'The Lego demonstration became a powerful communication tool that effectively conveyed complex energy management concepts to non-technical audiences. It served as a featured element in investor presentations and was showcased at public events, including the Sun Valley Forum in Idaho during a microgrid lab demonstration.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 6,
    header: 'Technical Implementation',
    type: 'text',
    images: null,
    captions: null,
    text_content: 'The project utilized Angular and TypeScript for the digital interface, D3 for data visualization, and Adobe Illustrator for creating precise isometric SVG models. The challenge was synchronizing the digital overlay with physical model events while maintaining smooth animations that accurately represented real energy behaviors and system states.',
    gif_url: null,
    video_url: null
  }
];

async function addLegoProject() {
  try {
    console.log('🚀 Adding Lego Microgrid Demo project...\n');
    
    // Insert the project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert(legoProject)
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
addLegoProject().then(success => {
  process.exit(success ? 0 : 1);
});