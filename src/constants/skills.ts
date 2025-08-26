export interface Skill {
  name: string;
  level: number; // 1-100
  category: string;
  icon?: string;
  description?: string;
  yearsOfExperience?: number;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

// All skills data in one place
export const allSkills: Skill[] = [
  // Languages
  { name: 'HTML', level: 95, category: 'markup', yearsOfExperience: 1 },
  { name: 'JavaScript', level: 80, category: 'language', yearsOfExperience: 1 },
  { name: 'CSS', level: 70, category: 'markup styling', yearsOfExperience: 1 },
  { name: 'TypeScript', level: 40, category: 'language', yearsOfExperience: 1 },
  { name: 'Python', level: 40, category: 'language', yearsOfExperience: 1 },
  { name: 'C++', level: 40, category: 'language', yearsOfExperience: 1 },
  { name: 'PHP', level: 25, category: 'language', yearsOfExperience: 1 },
  
  // Frameworks & Libraries
  { name: 'Node.js', level: 80, category: 'runtime', yearsOfExperience: 1 },
  { name: 'Express.js', level: 70, category: 'framework', yearsOfExperience: 1 },
  { name: 'React', level: 5, category: 'framework styling', yearsOfExperience: 1 },
  { name: 'Tailwind CSS', level: 10, category: 'styling', yearsOfExperience: 1 },
  { name: 'Bootstrap', level: 10, category: 'styling', yearsOfExperience: 1 },
  { name: 'jQuery', level: 15, category: 'framework', yearsOfExperience: 1 },
  
  // Databases
  { name: 'MySQL', level: 70, category: 'database', yearsOfExperience: 1 },
  { name: 'MongoDB', level: 50, category: 'database', yearsOfExperience: 1 },
  { name: 'PostgreSQL', level: 35, category: 'database', yearsOfExperience: 1 },
  { name: 'Firebase', level: 30, category: 'database', yearsOfExperience: 1 },
  { name: 'Redis', level: 30, category: 'caching', yearsOfExperience: 1 },
  
  // Tools & DevOps
  { name: 'Git', level: 85, category: 'version-control', yearsOfExperience: 1 },
  { name: 'Postman', level: 70, category: 'api-testing', yearsOfExperience: 1 },
  { name: 'Docker', level: 50, category: 'containerization', yearsOfExperience: 1 },
  { name: 'GCP', level: 50, category: 'cloud', yearsOfExperience: 1 },
  { name: 'Linux', level: 40, category: 'os', yearsOfExperience: 1 },
  { name: 'n8n', level: 40, category: 'automation', yearsOfExperience: 1 },
  { name: 'Nginx', level: 35, category: 'web-server', yearsOfExperience: 1 },
  
  // Office & Productivity
  { name: 'Microsoft Word', level: 90, category: 'office', yearsOfExperience: 3 },
  { name: 'Microsoft PowerPoint', level: 80, category: 'office', yearsOfExperience: 3 },
  { name: 'Canva', level: 70, category: 'design', yearsOfExperience: 2 },
  { name: 'Figma', level: 60, category: 'design', yearsOfExperience: 1 },
  { name: 'Adobe Lightroom', level: 45, category: 'design', yearsOfExperience: 1 },
  { name: 'Adobe Photoshop', level: 35, category: 'design', yearsOfExperience: 2 },
  { name: 'Microsoft Excel', level: 30, category: 'office', yearsOfExperience: 3 },
  
  // Soft Skills
  { name: 'Solving Problem', level: 70, category: 'soft-skill' },
  { name: 'Communication', level: 25, category: 'soft-skill' },
  { name: 'Team Work', level: 20, category: 'soft-skill' },
  { name: 'Network', level: 20, category: 'soft-skill' }
];

// Helper function to filter skills by categories
export const getSkillsByCategories = (categories: string[]): Skill[] => {
  return allSkills.filter(skill => categories.includes(skill.category));
};

// Helper function to create skill categories dynamically
export const createSkillCategories = (categoryConfig: { name: string; icon: string; categories: string[] }[]): SkillCategory[] => {
  return categoryConfig.map(config => ({
    name: config.name,
    icon: config.icon,
    skills: getSkillsByCategories(config.categories)
  }));
};

// Skills page categories (original structure)
export const skillCategories: SkillCategory[] = createSkillCategories([
  {
    name: 'Backend Development',
    icon: '',
    categories: ['runtime', 'language', 'framework', 'database', 'caching']
  },
  {
    name: 'Frontend Development',
    icon: '',
    categories: ['markup', 'styling', 'markup styling', 'framework styling']
  },
  {
    name: 'DevOps & Tools',
    icon: '',
    categories: ['version-control', 'api-testing', 'cloud', 'containerization', 'os', 'automation', 'web-server']
  },
  {
    name: 'Soft Skills',
    icon: '',
    categories: ['soft-skill']
  }
]);

// About page categories (custom structure)
export const aboutSkillCategories: SkillCategory[] = createSkillCategories([
  {
    name: 'Language',
    icon: '',
    categories: ['language', 'markup', 'markup styling']
  },
  {
    name: 'Framework & Library',
    icon: '',
    categories: ['runtime', 'framework', 'styling']
  },
  {
    name: 'Database',
    icon: '',
    categories: ['database', 'caching']
  },
  {
    name: 'DevOps & Tools',
    icon: '',
    categories: ['version-control', 'api-testing', 'containerization', 'cloud', 'os', 'web-server', 'automation']
  },
  {
    name: 'Soft Skills',
    icon: '',
    categories: ['soft-skill']
  },
  {
    name: 'Other Skills',
    icon: '',
    categories: ['office', 'design']
  }
]);