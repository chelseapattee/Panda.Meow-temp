import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ServiceNow Platform Integration project data
const serviceNowProject = {
  title: 'Platform Integration Leadership: IoT Capabilities Across ServiceNow Ecosystem',
  description: 'Led comprehensive platform integration strategy transforming Connected Operations from standalone IoT product into ecosystem-enhancing capability across ServiceNow\'s product portfolio. Partnered with Design & Experience Organization and multiple product teams to create seamless integration enhancing CSM, FSM, and ITAM without disrupting existing workflows.',
  company: 'ServiceNow',
  technologies: ['ServiceNow Platform APIs', 'Component Library Architecture', 'Design System Integration', 'Multi-Product Integration', 'CSM/FSM/ITAM Platforms', 'RESTful API Design', 'UI Component Standardization'],
  responsibilities: [
    'Cross-product integration strategy spanning Connected Operations, CSM, FSM, and ITAM teams',
    'Design & Experience Organization partnership on reusable IoT component development',
    'API-first integration architecture enabling seamless platform enhancement',
    'Customer experience consistency across enhanced ServiceNow products',
    'Technical architecture alignment for IoT capability integration',
    'Go-to-market coordination ensuring \'Better Together\' value proposition',
    'Performance optimization maintaining platform speed and reliability',
    'Component library development for reusable IoT visualization elements'
  ],
  challenges: [
    'Integrating new IoT capabilities across established products without workflow disruption',
    'Coordinating multiple product organizations with different roadmaps and priorities',
    'Maintaining ServiceNow design system consistency while adding innovative IoT features',
    'Ensuring integration performance didn\'t impact existing product functionality',
    'Creating cohesive customer experience across multiple enhanced products',
    'Managing technical dependencies across complex platform architecture',
    'Balancing innovation with platform stability and customer satisfaction'
  ],
  solutions: [
    'Developed progressive integration approach with phased IoT capability rollout',
    'Established regular cross-product planning sessions and dependency management',
    'Created reusable IoT components adopted into ServiceNow enterprise design system',
    'Implemented comprehensive performance monitoring and optimization protocols',
    'Designed API-first integration minimizing disruption to existing workflows',
    'Built systematic testing frameworks ensuring integration quality and reliability',
    'Created customer communication strategy positioning enhancements as natural evolution'
  ],
  categories: [
    'Platform Integration',
    'Design System Leadership',
    'Cross-Product Coordination',
    'API Architecture',
    'Customer Experience',
    'Component Development'
  ],
  outcomes: [
    {
      metric: 'Product Enhancement',
      value: '3 major products',
      description: 'Successfully enhanced CSM, FSM, and ITAM with integrated IoT capabilities'
    },
    {
      metric: 'Design System Adoption',
      value: 'Multiple components',
      description: 'IoT visualization components adopted into ServiceNow\'s enterprise design system'
    },
    {
      metric: 'Performance Preservation',
      value: '99.9%+ uptime',
      description: 'Maintained platform performance standards while adding new capabilities'
    },
    {
      metric: 'Customer Experience',
      value: 'Zero workflow disruption',
      description: 'Enhanced products without requiring customer retraining or process changes'
    },
    {
      metric: 'Integration Success',
      value: 'Seamless connectivity',
      description: 'API-first architecture enabling smooth integration across ServiceNow platform'
    },
    {
      metric: 'Cross-Team Coordination',
      value: '45+ contributors',
      description: 'Successfully coordinated integration across multiple product organizations'
    }
  ],
  // Using placeholder images for now - replace with actual images
  image_urls: [
    'https://picsum.photos/800/600?random=700', // Platform integration architecture
    'https://picsum.photos/800/600?random=701'  // Design system components
  ]
};

// Project sections based on the media items
const projectSections = [
  {
    section_order: 1,
    header: 'Project Overview',
    type: 'image_text',
    images: ['https://picsum.photos/800/600?random=700'],
    captions: ['ServiceNow Platform Integration Architecture - IoT capabilities seamlessly integrated across CSM, FSM, and ITAM products'],
    text_content: 'Led comprehensive platform integration strategy transforming Connected Operations from a standalone IoT product into ecosystem-enhancing capabilities across ServiceNow\'s product portfolio. The initiative required partnering with the Design & Experience Organization and multiple product teams to create seamless integration that enhanced CSM, FSM, and ITAM without disrupting existing customer workflows.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 2,
    header: 'Cross-Product Integration Strategy',
    type: 'text',
    images: null,
    captions: null,
    text_content: 'The integration strategy spanned multiple product organizations with different roadmaps and priorities. I established regular cross-product planning sessions and dependency management processes to ensure coordinated development. The approach balanced innovation with platform stability while maintaining ServiceNow design system consistency across all enhanced products.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 3,
    header: 'Design System Leadership',
    type: 'image_text',
    images: ['https://picsum.photos/800/600?random=702'],
    captions: ['Design System Component Library - Reusable IoT visualization components adopted into ServiceNow design system'],
    text_content: 'Partnered with the Design & Experience Organization to develop reusable IoT components that were adopted into ServiceNow\'s enterprise design system. This collaboration ensured consistent user experience across all enhanced products while providing scalable visualization elements for IoT data integration.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 4,
    header: 'API-First Architecture',
    type: 'text',
    images: null,
    captions: null,
    text_content: 'Designed an API-first integration architecture that enabled seamless platform enhancement while minimizing disruption to existing workflows. This approach allowed IoT capabilities to be integrated across Connected Operations, CSM, FSM, and ITAM platforms while maintaining the high performance standards and reliability that ServiceNow customers expect.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 5,
    header: 'Enhanced Product Workflows',
    type: 'image_text',
    images: ['https://picsum.photos/800/600?random=703'],
    captions: ['Enhanced Product Workflows - IoT data seamlessly integrated into existing CSM, FSM, and ITAM workflows'],
    text_content: 'The integration successfully enhanced three major ServiceNow products with IoT capabilities while preserving 99.9%+ uptime and ensuring zero workflow disruption for customers. The seamless connectivity enabled by the API-first architecture meant customers experienced enhanced functionality as a natural platform evolution rather than disruptive changes.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 6,
    header: 'Key Achievements & Impact',
    type: 'text',
    images: null,
    captions: null,
    text_content: 'Successfully coordinated integration across 45+ contributors from multiple product organizations, resulting in IoT visualization components being adopted into ServiceNow\'s enterprise design system. The project maintained platform performance standards while adding innovative capabilities, creating a \'Better Together\' value proposition that enhanced customer experience without requiring retraining or process changes.',
    gif_url: null,
    video_url: null
  }
];

async function addServiceNowProject() {
  try {
    console.log('🚀 Adding ServiceNow Platform Integration project...\n');
    
    // Insert the project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert(serviceNowProject)
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
addServiceNowProject().then(success => {
  process.exit(success ? 0 : 1);
});