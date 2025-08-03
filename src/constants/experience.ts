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
    startDate: 'June 2024',
    endDate: 'July 2024',
    current: false,
    description: 'Internship Participants.',
    logoUrl: '/company-logos/galesongLogo.png',
    responsibilities: [
      'develop internal systems',
      'helpig employees',
    ],
    technologies: ['JQuery', "Solving Problem", "Team Work"],
    achievements: [
      'gain new experience in the company',
    ]
  },
  {
    id: '2',
    title: 'Cloud Computing Cohort',
    company: 'Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka.',
    location: 'Remote',
    startDate: 'September 2024',
    endDate: 'January 2025',
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
    technologies: ['Node.js', 'Express.js', 'MySQL', 'Docker', 'GCP', 'Git', "Solving Problem", "Team Work", "Communication"],
    achievements: [
      'complete the project on time',
    ]
  },
];