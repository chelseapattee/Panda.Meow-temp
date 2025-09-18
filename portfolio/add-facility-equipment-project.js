import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Facility Equipment Configuration project data
const facilityProject = {
  title: 'Facility Equipment Configuration',
  description: 'This project focused on creating an efficient system for administrators to set up facility management systems. The challenge was to create a flow that allows an administrator to set up required properties and determine what fields are configurable, resulting in equipment definitions that site managers can use to expedite installation without sacrificing flexibility.',
  company: 'Iteros',
  technologies: ['Angular', 'TypeScript', 'Node.js', 'HTML', 'SCSS', 'Sketch'],
  responsibilities: [
    'Information Architecture',
    'User Experience Design',
    'Wireframing',
    'Storyboarding',
    'Interface Design',
    'Software Development'
  ],
  challenges: [
    'Determining minimum required information to start using the software',
    'Balancing standardization with flexibility for different sites',
    'Creating a consistent equipment setup process across multiple facilities',
    'Designing a system that works for chains with similar equipment across locations',
    'Developing a clear administrator workflow for equipment definition and configuration'
  ],
  solutions: [
    'Collaborated with full development team to create a comprehensive flow diagram',
    'Developed a library of equipment definitions for reuse across facilities',
    'Implemented configurable property settings with administrator control',
    'Created an intuitive interface for equipment setup and management',
    'Designed a system that balances standardization with site-specific customization'
  ],
  categories: [
    'Information Architecture',
    'UX Design',
    'Interaction Design',
    'User Research',
    'Visual Design'
  ],
  outcomes: [
    {
      metric: 'Setup Efficiency',
      value: 'Significantly improved',
      description: 'Streamlined the process of configuring equipment across multiple sites'
    },
    {
      metric: 'Consistency',
      value: 'Enhanced',
      description: 'Ensured consistent equipment installation across all facilities under a single customer'
    },
    {
      metric: 'Administrator Control',
      value: 'Customizable',
      description: 'Gave administrators precise control over which properties could be modified at the site level'
    }
  ],
  // Using placeholder images for now - replace with actual images
  image_urls: [
    'https://picsum.photos/800/600?random=200', // Main flow diagram
    'https://picsum.photos/800/600?random=201'  // Equipment setup interface
  ]
};

// Project sections based on the media items
const projectSections = [
  {
    section_order: 1,
    header: 'Project Overview',
    type: 'image_text',
    images: ['https://picsum.photos/800/600?random=200'],
    captions: ['Equipment Configuration Flow Diagram - Process flow for equipment configuration'],
    text_content: 'The Facility Equipment Configuration project aimed to revolutionize how administrators set up and manage facility equipment across multiple sites. By creating a system that allows for standardized equipment definitions while maintaining flexibility for site-specific needs, we enabled faster deployment and more consistent installations.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 2,
    header: 'Design Process & Flow Development',
    type: 'images',
    images: [
      'https://picsum.photos/800/600?random=202', // Flow v1
      'https://picsum.photos/800/600?random=203'  // Flow v2
    ],
    captions: [
      'First iteration of the equipment configuration flow',
      'Second iteration with refined user pathways'
    ],
    text_content: null,
    gif_url: null,
    video_url: null
  },
  {
    section_order: 3,
    header: 'Information Architecture Challenge',
    type: 'text',
    images: null,
    captions: null,
    text_content: 'The core challenge was determining the minimum required information needed to start using the software effectively. We had to balance the need for comprehensive equipment data with the desire for quick setup. Through user research and iterative design, we identified the critical data points and created a progressive disclosure system that allowed administrators to add detail as needed without being overwhelmed initially.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 4,
    header: 'Equipment Definition System',
    type: 'image_text',
    images: ['https://picsum.photos/800/600?random=204'],
    captions: ['Implementation showing details of a new equipment definition'],
    text_content: 'The equipment definition system became the cornerstone of our solution. Administrators could create master equipment definitions that served as templates, specifying which properties were required and which could be customized at the site level. This approach provided consistency across facilities while allowing for necessary flexibility.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 5,
    header: 'Implementation & User Workflow',
    type: 'image_text',
    images: [
      'https://picsum.photos/800/600?random=205', // Add equipment demo
      'https://picsum.photos/800/600?random=206'  // Equipment details view
    ],
    captions: [
      'Adding equipment using a pre-defined template',
      'Viewing and managing equipment details after addition'
    ],
    text_content: 'The final implementation featured an intuitive workflow where site managers could quickly add equipment using pre-defined templates. The system automatically inherited properties from the equipment definition, while still allowing for site-specific customizations where permitted by the administrator. This dramatically reduced setup time and errors.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 6,
    header: 'Key Outcomes & Impact',
    type: 'text',
    images: null,
    captions: null,
    text_content: 'The Facility Equipment Configuration system successfully streamlined equipment setup across multiple sites, ensuring consistency while maintaining necessary flexibility. Administrator control over configurable properties meant that corporate standards could be enforced while still allowing for site-specific needs. The library of reusable equipment definitions significantly reduced setup time for new facilities, particularly benefiting chains with similar equipment across locations.',
    gif_url: null,
    video_url: null
  }
];

async function addFacilityEquipmentProject() {
  try {
    console.log('🚀 Adding Facility Equipment Configuration project...\n');
    
    // Insert the project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert(facilityProject)
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
addFacilityEquipmentProject().then(success => {
  process.exit(success ? 0 : 1);
});