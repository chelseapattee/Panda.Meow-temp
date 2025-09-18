-- Create an enum type for project section types
CREATE TYPE project_section_type AS ENUM ('text', 'images', 'image_text', 'gif', 'video');

-- Update the project_sections table to use the enum type
ALTER TABLE project_sections 
ALTER COLUMN type TYPE project_section_type 
USING type::project_section_type;