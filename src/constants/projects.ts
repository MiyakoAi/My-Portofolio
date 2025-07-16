export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  categories: ('web' | 'api' | 'mobile' | 'tool' | 'other')[];
  status: 'completed' | 'in-progress' | 'planning';
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  imageUrls?: string[];
  startDate: string;
  endDate?: string;
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Forum Community',
    description: 'anonimous forum community real time end-to-end encrypted',
    longDescription: ' - ',
    technologies: ['Node.js', 'Express', 'Socket', 'Mongodb', 'JWT'],
    categories: ['api'],
    status: 'in-progress',
    featured: true,
    // githubUrl: 'https://github.com/MiyakoAi/ecommerce-api',
    startDate: '2024-01',
    endDate: '2024-06',
    highlights: [
      'Microservices architecture dengan Docker',
      'Redis caching untuk performance optimization',
      'JWT authentication dan authorization',
      'Real-time notifications dengan WebSocket',
      'Comprehensive API documentation dengan Swagger'
    ]
  },
  {
    id: '2',
    title: 'Library App',

    description: 'Lecture assignment for the Software Engineering Component course',
    longDescription: 'Building Backend from app library.',
    technologies: ['Node.js', 'MySQL', 'Express'],
    categories: ['api', 'web'],
    status: 'completed',
    featured: false,
    githubUrl: 'https://github.com/MiyakoAi/backend-library_app',
    liveUrl: 'https://library-apps-plum.vercel.app/',
    startDate: '2024-03',
    endDate: '2024-08',
    highlights: [
      'Real-time collaboration dengan Socket.io',
      'Drag-and-drop task management',
      'File upload dan sharing system',
      'Advanced reporting dashboard',
      'Role-based access control'
    ]
  },
  {
    id: '3',
    title: 'Mently',
    imageUrls: ['/assets/projects/1737340417551_Page_01.png',
            '/assets/projects/1737340417551_Page_02.png', 
            '/assets/projects/1737340417551_Page_03.png', 
            '/assets/projects/1737340417551_Page_04.png', 
            '/assets/projects/1737340417551_Page_05.png', 
            '/assets/projects/1737340417551_Page_06.png', 
            '/assets/projects/1737340417551_Page_07.png', 
            '/assets/projects/1737340417551_Page_08.png', 
            '/assets/projects/1737340417551_Page_09.png', 
            '/assets/projects/1737340417551_Page_10.png'
          ],
    description: 'Mental Health App',
    longDescription: 'Bangkit Academy 2024 is a digital talent development program led by Google, GoTo, Tokopedia, and Traveloka, with a focus on the Cloud Computing learning path. The program includes more than 900 hours of intensive training, covering technical skills such as Google Cloud Platform, DevOps, and cloud infrastructure management, as well as soft skills development such as critical thinking, time management, and personal branding, designed to prepare superior technology talents in Indonesia.',
    technologies: ['Express', 'MySQL', 'Docker', 'GCP', 'Git'],
    categories: ['api'],
    status: 'completed',
    featured: false,
    githubUrl: 'https://github.com/C242-PS230-Mently/Cloud-Computing',
    startDate: 'Sep 2024',
    endDate: 'Jan 2025',
    highlights: [
      'End-to-end message encryption',
      'Multiple chat rooms support',
      'File dan image sharing',
      'Online status indicators',
      'Message history dan search'
    ]
  }
];

export const projectCategories = [
  { id: 'all', name: 'All Projects', icon: '' },
  { id: 'web', name: 'Web Apps', icon: '' },
  { id: 'api', name: 'APIs', icon: '' },
  { id: 'mobile', name: 'Mobile', icon: '' },
  { id: 'tool', name: 'Tools', icon: '' },
  { id: 'other', name: 'Others', icon: '' }
];