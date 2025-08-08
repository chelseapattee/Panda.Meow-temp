// Project data structure now stores image references (keys/IDs) instead of raw image URLs.
// Example: imageKeys: ['proj1/cover.jpg', 'proj1/extra1.png']
const projects = [
  {
    id: '1',
    title: 'Project One',
    imageKeys: ['1/cover.png'],
    description: 'Description for Project One.'
  },
  {
    id: '2',
    title: 'Project Two',
    imageKeys: ['2/cover.png'],
    description: 'Description for Project Two.'
  },
  {
    id: '3',
    title: 'Project Three',
    imageKeys: ['3/cover.jpg'],
    description: 'Description for Project Three.'
  },
  // Add more projects as needed
];

// Project data utility for admin interface (localStorage fallback)

const STORAGE_KEY = 'portfolio_projects';

// Migration utility: convert old 'image' field to 'imageKeys' array
function migrateProjectsFormat(projects) {
  return projects.map((proj) => {
    if (proj.image && !proj.imageKeys) {
      // Extract file extension from URL or default to jpg
      const extMatch = proj.image.match(/\.([a-zA-Z0-9]+)(\?|$)/);
      const ext = extMatch ? extMatch[1] : 'jpg';
      return {
        ...proj,
        imageKeys: [`${proj.id}/cover.${ext}`],
        image: undefined,
      };
    }
    return proj;
  });
}

export function getProjects() {
  const stored = localStorage.getItem(STORAGE_KEY);
  let projectsArr = [];
  if (stored) {
    try {
      projectsArr = JSON.parse(stored);
    } catch {
      projectsArr = [];
    }
  } else {
    // Fallback to default (imported) projects if localStorage is empty
    try {
      // eslint-disable-next-line global-require
      const defaultProjects = require('./projects.json');
      projectsArr = Array.isArray(defaultProjects) ? defaultProjects : [];
    } catch {
      projectsArr = [];
    }
  }
  // Run migration if needed
  projectsArr = migrateProjectsFormat(projectsArr);
  return projectsArr;
}

export function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export default projects;
