-- Seed data for portfolio development
-- This file runs automatically after migrations during db reset
-- Generated on 2025-09-14T18:23:01.711Z

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
);