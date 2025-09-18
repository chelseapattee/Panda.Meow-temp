-- Seed data for portfolio development
-- This file runs automatically after migrations during db reset
-- Generated on 2025-09-15T14:54:16.779Z
-- Projects: 6, Sections: 13

-- Insert projects
INSERT INTO projects (id, title, description, company, technologies, responsibilities, challenges, solutions, categories, outcomes, image_urls) VALUES 
(
  '550e8400-e29b-41d4-a716-446655440001',
  'Project One',
  'This is a comprehensive project showcasing modern web development practices with React and cutting-edge technologies. The project demonstrates full-stack development capabilities with a focus on user experience and performance optimization.',
  'Tech Corp',
  ARRAY['React', 'JavaScript', 'CSS', 'Node.js'],
  ARRAY['Frontend Development', 'UI/UX Design', 'Performance Optimization'],
  ARRAY['Complex state management', 'Cross-browser compatibility', 'Performance under load'],
  ARRAY['Implemented Redux for state management', 'Used progressive enhancement', 'Added caching layers'],
  ARRAY['Web Development', 'Frontend'],
  '[{"value":"40%","metric":"Performance","description":"Improvement in page load speed"},{"value":"95%","metric":"User Satisfaction","description":"Positive user feedback rating"}]'::jsonb,
  ARRAY['https://picsum.photos/800/600?random=1']
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  'Project Two',
  'An innovative mobile-first application that revolutionizes how users interact with digital content. Built with modern frameworks and featuring advanced user interface patterns and seamless responsive design.',
  'Digital Solutions Inc',
  ARRAY['React Native', 'TypeScript', 'Redux', 'API Integration'],
  ARRAY['Mobile Development', 'API Integration', 'User Testing'],
  ARRAY['Mobile performance optimization', 'Complex animations', 'Offline functionality'],
  ARRAY['Optimized rendering cycles', 'Used hardware acceleration', 'Implemented service workers'],
  ARRAY['Mobile Development', 'UX Design'],
  '[{"value":"300%","metric":"Download Rate","description":"Increase in app downloads"},{"value":"85%","metric":"Retention","description":"30-day user retention rate"}]'::jsonb,
  ARRAY['https://picsum.photos/800/600?random=2']
),
(
  '550e8400-e29b-41d4-a716-446655440003',
  'Project Three',
  'A data-driven analytics platform that provides real-time insights and comprehensive reporting capabilities. Features advanced data visualization, custom dashboards, and enterprise-grade security measures.',
  'Analytics Pro',
  ARRAY['Python', 'React', 'D3.js', 'PostgreSQL', 'Docker'],
  ARRAY['Full-stack Development', 'Data Visualization', 'System Architecture'],
  ARRAY['Large dataset processing', 'Real-time updates', 'Security compliance'],
  ARRAY['Implemented data streaming', 'Used WebSocket connections', 'Added encryption layers'],
  ARRAY['Data Analytics', 'Full-stack'],
  '[{"value":"60%","metric":"Processing Speed","description":"Faster data processing time"},{"value":"99.9%","metric":"Accuracy","description":"Data accuracy improvement"},{"value":"120%","metric":"User Adoption","description":"Increase in active users"}]'::jsonb,
  ARRAY['https://picsum.photos/800/600?random=3']
),
(
  'af515421-51d5-4d40-8488-91785078290a',
  'Test Project',
  'this is a description',
  'Acme Corp',
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY[]::text[],
  '[]'::jsonb,
  ARRAY['http://127.0.0.1:54321/storage/v1/object/public/project-images/1757872146002_Screenshot_2025-05-08_at_9.45.31_AM.png']
),
(
  'e628e5a7-1a1b-41e6-886b-94c43c2e3273',
  'My Portfolio Website',
  'A modern, responsive portfolio website built with React and Supabase. Features dynamic content management, project showcases, and admin panel for easy updates.',
  'Personal Project',
  ARRAY['React', 'Supabase', 'SCSS', 'JavaScript'],
  ARRAY['Full-stack Development', 'UI/UX Design', 'Content Strategy'],
  ARRAY['Database Design', 'Admin Panel UX', 'Responsive Design'],
  ARRAY['Used Supabase for backend', 'Created intuitive admin interface', 'Mobile-first approach'],
  ARRAY['Web Development', 'Personal'],
  '[{"value":"< 2s","metric":"Load Time","description":"Fast loading performance"},{"value":"AA","metric":"Accessibility","description":"WCAG compliance achieved"}]'::jsonb,
  ARRAY['https://your-image-url.com/screenshot.png']
),
(
  'feed8469-e2bc-4fc6-b207-9781bd15527d',
  'Energy Management Platform',
  'At Iteros, we developed an equipment-agnostic energy management system that allows for the creation of equipment definitions from which new equipment inherits properties. This enables consistent configuration in a fraction of the time compared to proprietary manufacturer software. The challenge was to create a modular interface that adapts to each facility''s unique configuration of assets without having to set up a custom dashboard for every customer.',
  'Iteros',
  ARRAY['Angular', 'TypeScript', 'Node.js', 'HTML', 'SCSS', 'Sketch'],
  ARRAY['User Research', 'Wireframing', 'Visual Design', 'Frontend Development', 'Information Architecture', 'User Experience Design', 'Interface Design'],
  ARRAY['Creating a system adaptable to diverse facility configurations', 'Designing for multiple user types with different goals', 'Developing a scalable interface for monitoring hundreds or thousands of sites', 'Identifying and displaying the most relevant metrics for different site types', 'Building a modular system that automatically adapts to available assets'],
  ARRAY['Developed detailed user personas to guide feature development', 'Created a widget-based system adaptable to different site types', 'Designed health indicators based on key performance metrics', 'Implemented a hierarchical navigation system for portfolios and sites', 'Developed site-type specific views (Monitoring, Consumer, Prosumer, Microgrid, etc.)'],
  ARRAY['Frontend Development', 'Data Visualization', 'UI Design', 'UX Design', 'Information Architecture'],
  '[{"value":"Significantly improved","metric":"Configuration Efficiency","description":"Reduced setup time through inheritance-based equipment definitions"},{"value":"Comprehensive","metric":"Monitoring Capability","description":"Created scalable system capable of monitoring thousands of sites"},{"value":"Enhanced","metric":"User Satisfaction","description":"Tailored interfaces for different user types based on specific goals"}]'::jsonb,
  ARRAY['https://picsum.photos/800/600?random=100', 'https://picsum.photos/800/600?random=101']
);

-- Insert project sections
INSERT INTO project_sections (project_id, section_order, header, type, images, captions, text_content, gif_url, video_url) VALUES 
(
  '550e8400-e29b-41d4-a716-446655440001',
  1,
  'Project Images',
  'images',
  ARRAY['https://picsum.photos/800/600?random=20', 'https://picsum.photos/800/600?random=21'],
  ARRAY['Main interface screenshot', 'Mobile responsive design'],
  NULL,
  NULL,
  NULL
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  2,
  'Technical Implementation',
  'image_text',
  ARRAY['https://picsum.photos/800/600?random=22'],
  ARRAY['Architecture diagram'],
  'The technical implementation focuses on modern React patterns with TypeScript for type safety. We implemented a modular architecture that allows for easy scaling and maintenance. The component structure follows atomic design principles, ensuring reusability and consistency across the application.',
  NULL,
  NULL
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  3,
  'Performance Metrics',
  'text',
  NULL,
  NULL,
  'After implementing the optimizations, we achieved significant performance improvements. Load time decreased by 40%, user satisfaction increased to 95%, and the application now handles 3x more concurrent users. These metrics were measured over a 3-month period with consistent monitoring.',
  NULL,
  NULL
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  1,
  'Mobile Interface Design',
  'image_text',
  ARRAY['https://picsum.photos/800/600?random=30', 'https://picsum.photos/800/600?random=31'],
  ARRAY['Home screen design', 'Navigation flow'],
  'The mobile interface was designed with a mobile-first approach, ensuring optimal user experience across all device sizes. We implemented intuitive gesture-based navigation and smooth animations to create a seamless user journey.',
  NULL,
  NULL
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  2,
  'User Testing Results',
  'text',
  NULL,
  NULL,
  'Extensive user testing revealed key insights that shaped the final product. We conducted usability sessions with 50+ users across different demographics, leading to significant improvements in navigation patterns and content hierarchy. The iterative testing process resulted in a 300% increase in user engagement.',
  NULL,
  NULL
),
(
  '550e8400-e29b-41d4-a716-446655440003',
  1,
  'Dashboard Overview',
  'images',
  ARRAY['https://picsum.photos/800/600?random=40', 'https://picsum.photos/800/600?random=41', 'https://picsum.photos/800/600?random=42'],
  ARRAY['Main dashboard', 'Analytics view', 'Reporting interface'],
  NULL,
  NULL,
  NULL
),
(
  '550e8400-e29b-41d4-a716-446655440003',
  2,
  'Data Visualization Features',
  'image_text',
  ARRAY['https://picsum.photos/800/600?random=43'],
  ARRAY['Interactive charts and graphs'],
  'Advanced data visualization capabilities allow users to explore complex datasets through interactive charts, real-time updates, and customizable dashboards. The platform supports multiple chart types including heat maps, scatter plots, and time-series visualizations with drill-down functionality.',
  NULL,
  NULL
),
(
  'feed8469-e2bc-4fc6-b207-9781bd15527d',
  1,
  'Project Overview',
  'image_text',
  ARRAY['https://picsum.photos/800/600?random=100'],
  ARRAY['Energy Management Platform Overview - Main view of the platform dashboard'],
  'The Energy Management Platform was designed to provide a comprehensive, equipment-agnostic solution for energy monitoring and management. The interface adapts to each facility''s unique configuration, eliminating the need for custom dashboards for every customer.',
  NULL,
  NULL
),
(
  'feed8469-e2bc-4fc6-b207-9781bd15527d',
  2,
  'User Research & Personas',
  'images',
  ARRAY['https://picsum.photos/800/600?random=102', 'https://picsum.photos/800/600?random=103'],
  ARRAY['Analysis of different user types and their goals', 'Detailed personas developed to guide design decisions'],
  NULL,
  NULL,
  NULL
),
(
  'feed8469-e2bc-4fc6-b207-9781bd15527d',
  3,
  'Design Process',
  'image_text',
  ARRAY['https://picsum.photos/800/600?random=104', 'https://picsum.photos/800/600?random=105'],
  ARRAY['Initial dashboard design for monitoring site', 'Early design concepts and wireframes for the platform'],
  'The design process began with understanding user needs and iterating on dashboard concepts. We moved from basic monitoring displays to a sophisticated widget-based system that could adapt to different facility types and user requirements.',
  NULL,
  NULL
),
(
  'feed8469-e2bc-4fc6-b207-9781bd15527d',
  4,
  'Widget System & Modular Interface',
  'image_text',
  ARRAY['https://picsum.photos/800/600?random=106'],
  ARRAY['Modular widgets designed for different site types'],
  'The widget system was a key innovation, allowing the interface to automatically adapt based on available assets and facility type. Each widget was designed to display relevant metrics for specific equipment types, ensuring users see the most important information for their context.',
  NULL,
  NULL
),
(
  'feed8469-e2bc-4fc6-b207-9781bd15527d',
  5,
  'Portfolio & Site Management',
  'images',
  ARRAY['https://picsum.photos/800/600?random=107', 'https://picsum.photos/800/600?random=108', 'https://picsum.photos/800/600?random=109'],
  ARRAY['High-level view of multiple sites in portfolio', 'Detailed information for a specific site', 'Interface showing site health based on power usage and cost'],
  NULL,
  NULL,
  NULL
),
(
  'feed8469-e2bc-4fc6-b207-9781bd15527d',
  6,
  'Key Outcomes',
  'text',
  NULL,
  NULL,
  'The Energy Management Platform successfully reduced configuration time through inheritance-based equipment definitions, created a scalable system capable of monitoring thousands of sites, and enhanced user satisfaction by tailoring interfaces to different user types based on their specific goals. The modular approach allowed for rapid deployment across diverse facility types without custom development.',
  NULL,
  NULL
);