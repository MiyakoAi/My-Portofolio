export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  logoUrl?: string;
}

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Assistant IT Manager',
    company: 'Galesong.',
    location: 'On Site',
    startDate: 'Jun 2024',
    // endDate: 'Jul 2024',
    current: true,
    description: 'Internship Participants.',
    logoUrl: '/company-logos/galesongLogo.png', // Company logo
    responsibilities: [
      'develop internal systems',
      'helpig employees',
    ],
    technologies: ['Html', 'CSS'],
    achievements: [
      '-',
    ]
  },
  {
    id: '2',
    title: 'Cloud Computing Cohort',
    company: 'Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka.',
    location: 'Remote',
    startDate: 'Sep 2024',
    endDate: 'Jan 2025',
    current: false,
    description: 'Developed RESTful APIs and integrated to mobile.',
    logoUrl: '/company-logos/bangkitLogo.png', 
    responsibilities: [
      'Build and maintain REST APIs using Node.js and Express',
      'Integrate Ai Models into backend services',
      'Database design and optimization',
      'Implement authentication and authorization systems',
      'Write comprehensive API documentation'
    ],
    technologies: ['Node.js', 'Express.js', 'MySQL', 'Docker', 'GCP', 'Git'],
    achievements: [
      'complete the project on time',
    ]
  },
];