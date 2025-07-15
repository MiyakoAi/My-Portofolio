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

export const skillCategories: SkillCategory[] = [
  {
    name: 'Backend Development',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 80, category: 'runtime', yearsOfExperience: 1 },
      { name: 'Express.js', level: 70, category: 'framework', yearsOfExperience: 1 },
      { name: 'Python', level: 40, category: 'language', yearsOfExperience: 1 },
      { name: 'MongoDB', level: 50, category: 'database', yearsOfExperience: 1 },
      { name: 'Redis', level: 30, category: 'caching', yearsOfExperience: 1 }
    ]
  },
  {
    name: 'Frontend Development',
    icon: '📚',
    skills: [
      { name: 'JavaScript', level: 80, category: 'language', yearsOfExperience: 1 },
      { name: 'TypeScript', level: 5, category: 'language', yearsOfExperience: 1 },
      { name: 'React', level: 5, category: 'framework', yearsOfExperience: 1 },
      { name: 'Tailwind CSS', level: 10, category: 'styling', yearsOfExperience: 1 },
      { name: 'HTML/CSS', level: 95, category: 'markup', yearsOfExperience: 1 }
    ]
  },
  {
    name: 'DevOps & Tools',
    icon: '🔧',
    skills: [
      { name: 'Docker', level: 50, category: 'containerization', yearsOfExperience: 1 },
      { name: 'Git', level: 85, category: 'version-control', yearsOfExperience: 1 },
      { name: 'Linux', level: 40, category: 'os', yearsOfExperience: 1 },
      { name: 'GCP', level: 50, category: 'cloud', yearsOfExperience: 1 },
      { name: 'MySQL', level: 70, category: 'database', yearsOfExperience: 1 },
      { name: 'Postman', level: 70, category: 'api-testing', yearsOfExperience: 1 }
    ]
  },
  {
    name: 'Other Skills',
    icon: '💡',
    skills: [
      { name: 'Communication', level: 25, category: 'self' },
      { name: 'Team Work', level: 20, category: 'self' },
      { name: 'Solving Problem', level: 70, category: 'self' },
      { name: 'Network', level: 20, category: 'self' }
    ]
  }
];