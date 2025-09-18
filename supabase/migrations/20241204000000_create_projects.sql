-- Projects table
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  company text,
  technologies text[] not null,
  responsibilities text[] not null,
  challenges text[] not null,
  solutions text[] not null,
  categories text[] not null,
  outcomes jsonb not null, -- array of objects: [{metric, value, description}]
  image_urls text[] not null, -- cover/hero images
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

-- Project detail sections table
create table if not exists project_sections (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  section_order integer not null, -- for ordering sections
  header text, -- optional
  type text not null, -- 'images', 'image_text', 'gif', 'video', 'text'
  images text[], -- array of image URLs (for 'images', 'image_text', etc.)
  captions text[], -- array of captions (optional, matches images)
  text_content text, -- for text or image+text
  gif_url text, -- for gif sections
  video_url text, -- for video sections
  created_at timestamp with time zone default timezone('utc', now())
);