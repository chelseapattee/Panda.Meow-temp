import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// HiveWatch Monetization Strategy project data
const hiveWatchProject = {
  title: 'Product-Led Growth & Monetization Strategy: Revenue Through Customer Success',
  description: 'Led comprehensive monetization and growth strategy transforming HiveWatch from early-stage customer acquisition to sustainable revenue growth. Achieved 65% increase in user engagement and subscription revenue through strategic premium feature development, pricing optimization, and customer success correlation analysis.',
  company: 'HiveWatch',
  technologies: ['Analytics Platforms', 'A/B Testing Frameworks', 'Usage Tracking Systems', 'Guard Tours Mobile App', 'Twilio 911 Integration', 'Advanced Reporting', 'Customer Success Metrics', 'Revenue Analytics'],
  responsibilities: [
    'Monetization strategy framework development and value-based pricing optimization',
    'Premium feature portfolio design including Guard Tours and Emergency 911 integration',
    'Cross-functional revenue operations coordination across product, sales, and customer success',
    'Customer success analytics and expansion opportunity identification',
    'A/B testing and experimentation for feature adoption and pricing optimization',
    'Usage analytics implementation tracking customer engagement and value realization',
    'Sales enablement and competitive positioning for premium feature upselling',
    'Customer lifecycle management and retention optimization strategies'
  ],
  challenges: [
    'Developing monetization strategies without compromising customer satisfaction or platform value',
    'Creating premium features that enhance rather than complicate existing security workflows',
    'Balancing customer success with revenue growth across diverse enterprise customer segments',
    'Establishing data-driven pricing models in competitive physical security market',
    'Coordinating monetization initiatives across product, sales, and customer success teams',
    'Measuring and optimizing customer lifetime value and expansion revenue opportunities',
    'Differentiating premium capabilities against traditional PSIM vendors and emerging competitors'
  ],
  solutions: [
    'Developed value-based pricing framework correlated with customer operational improvement',
    'Created premium features solving specific customer pain points with clear ROI demonstration',
    'Implemented comprehensive customer success analytics tracking engagement and satisfaction',
    'Established systematic A/B testing for feature presentation and pricing optimization',
    'Built cross-functional revenue operations ensuring alignment across customer-facing teams',
    'Designed customer expansion methodology using usage data and success correlation',
    'Created competitive differentiation through unique capabilities unavailable in traditional platforms'
  ],
  categories: [
    'Product-Led Growth',
    'Monetization Strategy',
    'Revenue Operations',
    'Customer Success',
    'Premium Features',
    'Data-Driven Optimization'
  ],
  outcomes: [
    {
      metric: 'User Engagement Growth',
      value: '65% increase',
      description: 'Sustained growth in customer platform usage through strategic feature development'
    },
    {
      metric: 'Subscription Revenue Growth',
      value: '65% increase',
      description: 'Direct revenue increase through premium feature upselling and customer expansion'
    },
    {
      metric: 'Premium Feature Adoption',
      value: '70% improvement',
      description: 'Enhanced customer adoption of premium capabilities including Guard Tours and e911'
    },
    {
      metric: 'Customer Lifetime Value',
      value: '85% increase',
      description: 'Improved retention and expansion revenue through value-driven feature development'
    },
    {
      metric: 'Upsell Success Rate',
      value: '75%',
      description: 'High conversion from core platform to premium feature adoption'
    },
    {
      metric: 'Customer ROI',
      value: 'Average 300%',
      description: 'Quantified value realization through premium feature adoption and operational improvement'
    }
  ],
  // Using placeholder images for now - replace with actual images
  image_urls: [
    'https://picsum.photos/800/600?random=300', // Monetization framework
    'https://picsum.photos/800/600?random=301'  // Revenue analytics
  ]
};

// Project sections based on the media items
const projectSections = [
  {
    section_order: 1,
    header: 'Project Overview',
    type: 'image_text',
    images: ['https://picsum.photos/800/600?random=300'],
    captions: ['Product-Led Growth Monetization Framework - Value-driven pricing and premium feature development supporting customer success'],
    text_content: 'Led comprehensive monetization and growth strategy at HiveWatch, transforming the company from early-stage customer acquisition to sustainable revenue growth. Through strategic premium feature development, pricing optimization, and customer success correlation analysis, achieved significant improvements in user engagement and subscription revenue.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 2,
    header: 'Premium Feature Portfolio Development',
    type: 'image_text',
    images: ['https://picsum.photos/800/600?random=302'],
    captions: ['Premium Feature Portfolio - Guard Tours, Emergency 911, and Advanced Analytics driving customer expansion'],
    text_content: 'Designed and developed a comprehensive premium feature portfolio including Guard Tours mobile app functionality, Twilio 911 integration, and advanced reporting capabilities. Each feature was designed to solve specific customer pain points while demonstrating clear ROI and value realization.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 3,
    header: 'Monetization Strategy Framework',
    type: 'text',
    images: null,
    captions: null,
    text_content: 'Developed a value-based pricing framework directly correlated with customer operational improvement. This approach ensured that monetization strategies enhanced rather than compromised customer satisfaction, creating a sustainable growth model that balanced revenue objectives with customer success across diverse enterprise segments.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 4,
    header: 'Data-Driven Optimization',
    type: 'image_text',
    images: ['https://picsum.photos/800/600?random=303'],
    captions: ['Revenue Growth Analytics - Customer success correlation and expansion revenue tracking dashboard'],
    text_content: 'Implemented comprehensive customer success analytics and systematic A/B testing frameworks to optimize feature adoption and pricing strategies. The data-driven approach enabled precise measurement of customer lifetime value, expansion revenue opportunities, and competitive differentiation against traditional PSIM vendors.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 5,
    header: 'Cross-Functional Revenue Operations',
    type: 'text',
    images: null,
    captions: null,
    text_content: 'Built cross-functional revenue operations ensuring alignment across product, sales, and customer success teams. This coordination was essential for successful monetization initiatives, enabling seamless customer expansion methodology and effective sales enablement for premium feature upselling.',
    gif_url: null,
    video_url: null
  },
  {
    section_order: 6,
    header: 'Key Outcomes & Impact',
    type: 'text',
    images: null,
    captions: null,
    text_content: 'Achieved remarkable results including 65% increases in both user engagement and subscription revenue, 70% improvement in premium feature adoption, 85% increase in customer lifetime value, and 75% upsell success rate. Customer ROI averaged 300% through premium feature adoption and operational improvements, validating the value-driven monetization approach.',
    gif_url: null,
    video_url: null
  }
];

async function addHiveWatchProject() {
  try {
    console.log('🚀 Adding HiveWatch Monetization Strategy project...\n');
    
    // Insert the project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert(hiveWatchProject)
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
    
    console.log(`\n✅ Added ${sections.length} project sections:`)
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
addHiveWatchProject().then(success => {
  process.exit(success ? 0 : 1);
});