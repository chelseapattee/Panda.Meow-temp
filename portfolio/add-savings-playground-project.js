import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Savings Playground project data
const savingsProject = {
  title: 'Savings Playground',
  description: 'When a customer wants to know how to optimally reduce their energy consumption or overall energy costs, many factors need to be considered. Companies that provide these types of reports spend a lot of time sending an engineer to collect data, then manually entering this data and tweaking parameters to arrive at potential options. Our company wanted to streamline this process and account for everything down to tax credits to provide a highly accurate report.',
  company: 'CleanSpark',
  technologies: ['AngularJS', 'HTML', 'SCSS', 'Gulp.js', 'Sketch', 'Whiteboarding'],
  responsibilities: [
    'Front-End Development',
    'Information Architecture',
    'User Experience Design',
    'Interaction Design',
    'Wireframe Prototyping',
    'Multi-platform Interface Design'
  ],
  challenges: [
    'Converting a complex MATLAB tool into user-friendly interfaces',
    'Creating versions for multiple platforms (tablet, mobile, web, lead generator)',
    'Simplifying complex financial and energy data for various user types',
    'Organizing a complex multi-step process into a coherent flow',
    'Managing conditional inputs and dependent configuration options'
  ],
  solutions: [
    'Conducted detailed workflow analysis with the engineer who created the original tool',
    'Used physical card sorting to re-organize interface components',
    'Created a four-step process to simplify the perceived complexity',
    'Implemented modal popups for complex configuration options',
    'Developed responsive designs for various platforms (tablet, mobile, web)',
    'Created a simplified one-page lead generator for sales teams'
  ],
  categories: [
    'Information Architecture',
    'UX Design',
    'UI Design',
    'Wireframing',
    'Responsive Design'
  ],
  outcomes: [
    {
      metric: 'Engineer Efficiency',
      value: 'Significantly improved',
      description: 'Streamlined on-site data collection process'
    },
    {
      metric: 'Tool Adoption',
      value: 'Multi-platform',
      description: 'Successfully deployed across tablet, mobile, and web platforms'
    },
    {
      metric: 'Internal Usage',
      value: 'Company-wide',
      description: 'Tool became a standard internal resource with potential as a licensed revenue stream'
    }
  ],
  // Using placeholder images for now - replace with actual images
  image_urls: [
    'https://picsum.photos/800/600?random=600', // Main tool overview
    'https://picsum.photos/800/600?random=601'  // Multi-platform versions
  ]
};

// Project sections based on the media items
const projectSections = [
  {
    section_order: 1,
    header: 'Project Overview',
    type: 'image_text',
    images: ['https://picsum.photos/800/600?random=600'],
    captions: ['Savings Playground Overview - Main view of the energy savings calculation tool'],
    text_content: 'The Savings Playground project transformed a complex MATLAB tool into user-friendly interfaces for calculating optimal energy cost reduction strategies. The challenge involved streamlining a process that previously required engineers to manually collect data and tweak parameters, accounting for everything from energy consumption to tax credits for highly accurate reports.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 2,
    header: 'Original Tool Analysis',
    type: 'images',
    images: [
      'https://picsum.photos/800/600?random=602', // Original MATLAB tool
      'https://picsum.photos/800/600?random=603'  // Brainstorming session
    ],
    captions: [
      'The original MATLAB tool used for calculations',
      'Process of breaking down the tool into components for reorganization'
    ],
    text_content: null,
    gif_url: null,
    video_url: null
  },
  {
    section_order: 3,
    header: 'Information Architecture Process',
    type: 'text',
    images: null,
    captions: null,
    text_content: 'I conducted detailed workflow analysis with the engineer who created the original MATLAB tool, then used physical card sorting to re-organize interface components. This process revealed opportunities to simplify the perceived complexity by creating a structured four-step process that made the tool more accessible to various user types.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 4,
    header: 'Design Development',
    type: 'images',
    images: [
      'https://picsum.photos/800/600?random=604', // Low-fidelity wireframe
      'https://picsum.photos/800/600?random=605', // High-fidelity wireframe
      'https://picsum.photos/800/600?random=606'  // Options modal
    ],
    captions: [
      'Initial wireframe showing reorganized process flow',
      'Detailed wireframe with interface elements',
      'Modal design for managing complex configuration options'
    ],
    text_content: null,
    gif_url: null,
    video_url: null
  },
  {
    section_order: 5,
    header: 'Multi-Platform Implementation',
    type: 'images',
    images: [
      'https://picsum.photos/800/600?random=607', // Partner desktop version
      'https://picsum.photos/800/600?random=608', // Lead generator
      'https://picsum.photos/800/600?random=609', // Tablet version
      'https://picsum.photos/800/600?random=610'  // Mobile version
    ],
    captions: [
      'Desktop version themed for a partnering solar company',
      'Simplified lead generator version requested by the sales team',
      'iPad version for engineers to use while surveying on site',
      'Android mobile version of the tool'
    ],
    text_content: null,
    gif_url: null,
    video_url: null
  },
  {
    section_order: 6,
    header: 'Impact & Results',
    type: 'text',
    images: null,
    captions: null,
    text_content: 'The Savings Playground significantly improved engineer efficiency by streamlining the on-site data collection process. The tool was successfully deployed across tablet, mobile, and web platforms, becoming a company-wide standard internal resource with potential as a licensed revenue stream. The multi-platform approach ensured accessibility for various use cases and user types.',
    gif_url: null,
    video_url: null
  }
];

async function addSavingsProject() {
  try {
    console.log('🚀 Adding Savings Playground project...\n');
    
    // Insert the project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert(savingsProject)
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
addSavingsProject().then(success => {
  process.exit(success ? 0 : 1);
});