export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string; 
  imageUrl?: string;
  verificationUrl?: string;
  description?: string; 
  skills?: string[];
  categories: ('backend' | 'frontend' | 'devops' | 'cloud' | 'general')[];
  featured: boolean;
  expiryDate?: string;
  status: 'active' | 'expired' | 'lifetime';
}

export const certificates: Certificate[] = [
  {
    id: '1',
    name: 'Certificate Lazy Programmer',
    issuer: 'IMPHNEN',
    issueDate: 'July 2025',
    credentialId: 'xxx-xxx-xxx',
    imageUrl: '/assets/certificates/imphnenSertificated.jpg',
    description: 'Just FUN!!!.',
    categories: ['general'],
    featured: true,
    status: 'lifetime',
  },
  {
    id: '2',
    name: 'Bangkit 2024 Batch 2 Certificate',
    issuer: 'Bangkit led by Google, Goto, and Traveloka',
    issueDate: 'Jan 2025',
    credentialId: 'BA24/GRAD/XXIV-01/C272B4KY0010',
    imageUrl: 'assets/certificates/BangkitSertificate.png',
    description: 'Graduated as a Cloud Computing cohort.',
    skills: ['Node.js', 'Express.js', 'JavaScript', 'GCP', 'Docker', 'REST APIs', 'team work', 'Problem Solving'],
    categories: ['backend', 'cloud', 'devops'],
    featured: true,
    status: 'lifetime'
  },
  {
    id: '3',
    name: 'Mahasiswa Peserta MSIB Batch 7',
    issuer: 'Kampus Merdeka',
    issueDate: 'Jan 2025',
    credentialId: '9923529/13020220166',
    imageUrl: 'assets/certificates/kampusMerdeka.png',
    description: 'Graduation certificates for students who participated in the independent campus program batch 7',
    categories: ['general'],
    featured: true,
    status: 'lifetime'
  },
  {
    id: '4',
    name: 'Google Cloud Badges',
    issuer: 'Google',
    issueDate: 'January 2025',
    credentialId: '61429caf-d854-42c7-b05c-44befd4a31c3',
    imageUrl: '/assets/certificates/GoogleBagde.png',
    verificationUrl: 'https://www.cloudskillsboost.google/public_profiles/61429caf-d854-42c7-b05c-44befd4a31c3',
    description: 'Demonstrates expertise in containerization, Docker orchestration, and container security practices.',
    skills: ['GCP','Docker', 'Microservices', 'DevOps'],
    categories: ['devops', 'cloud'],
    featured: true,
    status: 'active'
  },
  {
    id: '5',
    name: 'Learn Machine Learning Implementation with Google Cloud',
    issuer: 'Dicoding Indonesia',
    issueDate: 'December 2024',
    expiryDate: 'December 2027',
    credentialId: 'EYX4JNLNRZDL',
    imageUrl: '/assets/certificates/Belajar-Penerapan-Machine-dengan-Google-Cloud_Page_1.png',
    verificationUrl: 'https://www.dicoding.com/certificates/EYX4JNLNRZDL4',
    description: 'Machine Learning Implementation with Google Cloud',
    skills: ['GCP', 'Performance Tuning'],
    categories: ['backend'],
    featured: false,
    status: 'active'
  },
  {
    id: '6',
    name: 'Becoming a Google Cloud Engineer',
    issuer: 'Dicoding Indonesia',
    issueDate: 'November 2024',
    expiryDate: 'November 2027',
    credentialId: 'JLX14J446X72',
    imageUrl: '/assets/certificates/MenjadiGoogleEnjiner_Page_1.png',
    verificationUrl: 'https://www.dicoding.com/certificates/JLX14J446X72',
    description: 'Google Cloud EngineerGoogle Cloud Engineer',
    skills: ['GCP', 'Node.js', 'Express.js', 'Firebase'],
    categories: ['general', 'frontend'],
    featured: false,
    status: 'active'
  },
  {
    id: '7',
    name: 'Learn AI Basics',
    issuer: 'Dicoding Indonesia',
    issueDate: 'November 2024',
    expiryDate: 'November 2027',
    credentialId: 'GRX547Q9VP0M',
    imageUrl: '/assets/certificates/belajaraidasar_Page_1.png',
    verificationUrl: 'https://www.dicoding.com/certificates/GRX547Q9VP0M',
    description: 'Learning Fundalmentar for Ai',
    skills: ['Python', 'Machine Learning', 'AI Basics'],
    categories: ['backend', 'devops'],
    featured: false,
    status: 'active'
  },
  {
    id: '8',
    name: 'Learn JavaScript Programming Basics',
    issuer: 'Dicoding Indonesia',
    issueDate: 'November 2024',
    expiryDate: 'November 2027',
    credentialId: 'NVP74JQ9GPR0',
    imageUrl: '/assets/certificates/jsdasar_Page_1.png',
    verificationUrl: 'https://www.dicoding.com/certificates/NVP74JQ9GPR0',
    description: 'Learning JavaScript Programming Basics',
    skills: ['JavaScript', 'Programming Basics'],
    categories: ['backend', 'frontend'],
    featured: false,
    status: 'active'
  },
  {
    id: '9',
    name: 'Learn to Build Back-End Applications for Beginners with Google Cloud',
    issuer: 'Dicoding Indonesia',
    issueDate: 'November 2024',
    expiryDate: 'November 2027',
    credentialId: '2VX34V4VQZYQ',
    imageUrl: '/assets/certificates/membuataplikasibackend_Page_1.png',
    verificationUrl: 'https://www.dicoding.com/certificates/2VX34V4VQZYQ',
    description: 'Learning to Build Back-End Applications for Beginners with Google Cloud',
    skills: ['GCP', 'Node.js', 'Express.js', 'Firebase'],
    categories: ['backend', 'cloud', 'devops'],
    featured: false,
    status: 'active'
  },
  {
    id: '10',
    name: 'Getting Started with Programming Basics to Become a Software Developer',
    issuer: 'Dicoding Indonesia',
    issueDate: 'September 2024',
    expiryDate: 'September 2027',
    credentialId: '1OP8W3Q0LXQK',
    imageUrl: '/assets/certificates/menjadisoftwaredeveloper_Page_1.png',
    verificationUrl: 'https://www.dicoding.com/certificates/1OP8W3Q0LXQK',
    description: 'Learning how to become a software developer',
    skills: ['Programming Basics', 'Problem Solving', 'Software Development'],
    categories: ['backend', 'frontend'],
    featured: false,
    status: 'active'
  },
  {
    id: '11',
    name: 'Introduction to Programming Logic (Programming Logic 101)',
    issuer: 'Dicoding Indonesia',
    issueDate: 'September 2024',
    expiryDate: 'September 2027',
    credentialId: 'KEXLY4G10ZG2',
    imageUrl: '/assets/certificates/logic101_Page_1.png',
    verificationUrl: 'https://www.dicoding.com/certificates/KEXLY4G10ZG2',
    description: 'Learning the basics of programming logic',
    skills: ['Programming Basics', 'Problem Solving','logic'],
    categories: ['general'],
    featured: false,
    status: 'active'
  },
  {
    id: '12',
    name: 'Learn Git Basics with GitHub',
    issuer: 'Dicoding Indonesia',
    issueDate: 'September 2024',
    expiryDate: 'September 2027',
    credentialId: '4EXG7Y57GPRL',
    imageUrl: '/assets/certificates/belajargit_Page_1.png',
    verificationUrl: 'https://www.dicoding.com/certificates/4EXG7Y57GPRL',
    description: 'Learning Git Basics with GitHub',
    skills: ['Git', 'Version Control', 'Collaboration'],
    categories: ['devops'],
    featured: false,
    status: 'active'
  },
  {
    id: '13',
    name: 'Learn Web Programming Basics',
    issuer: 'Dicoding Indonesia',
    issueDate: 'September 2024',
    expiryDate: 'September 2027',
    credentialId: '53XEQLG3YXRN',
    imageUrl: '/assets/certificates/balajarWeb_Page_1.png',
    verificationUrl: 'https://www.dicoding.com/certificates/53XEQLG3YXRN',
    description: 'Learning Web Programming Basics',
    skills: ['HTML', 'CSS', 'JavaScript'],
    categories: ['frontend'],
    featured: false,
    status: 'active'
  },
  {
    id: '14',
    name: 'A Practical Introduction to Cloud Computing',
    issuer: 'EC-Council',
    issueDate: 'June 2024',
    // expiryDate: 'September 2027',
    credentialId: 'b001f157-1769-4d29-8401-35f0c28a23d5',
    imageUrl: '/assets/certificates/balajarWeb_Page_1.png',
    verificationUrl: 'hhttps://codered.eccouncil.org/certificate/b001f157-1769-4d29-8401-35f0c28a23d5?logged=true',
    description: 'A Practical Introduction to Cloud Computing',
    skills: ['Cloud Computing', 'Virtualization', 'Cloud Services'],
    categories: ['cloud'],
    featured: false,
    status: 'active'
  },
  {
    id: '15',
    name: 'Android Bug Bounty Hunting: Hunt Like a Rat',
    issuer: 'EC-Council',
    issueDate: 'June 2024',
    // expiryDate: 'September 2027',
    credentialId: '2d78e57e-6b5a-45c8-89b2-ebcba492ec57',
    imageUrl: '/assets/certificates/AndroidBug.png',
    verificationUrl: 'https://learn.eccouncil.org/certificate/2d78e57e-6b5a-45c8-89b2-ebcba492ec57?logged=false',
    description: 'Android Bug Bounty Hunting: Hunt Like a Rat',
    skills: ['Android Security', 'Bug Bounty Hunting', 'Mobile Security'],
    categories: ['general'],
    featured: false,
    status: 'active'
  },
  {
    id: '16',
    name: 'Digital Forensics Essentials (DFE)',
    issuer: 'EC-Council',
    issueDate: 'June 2024',
    // expiryDate: 'September 2027',
    credentialId: '2c51e4ce-7126-4127-a538-1337f5a4d2b5',
    imageUrl: '/assets/certificates/DFE.png',
    verificationUrl: 'https://learn.eccouncil.org/certificate/2c51e4ce-7126-4127-a538-1337f5a4d2b5?logged=false',
    description: 'Digital Forensics Essentials (DFE)',
    skills: ['Digital Forensics', 'Incident Response', 'Data Recovery'],
    categories: ['general'],
    featured: false,
    status: 'active'
  },
  {
    id: '17',
    name: 'Introduction to Dark Web, Anonymity, and Cryptocurrency',
    issuer: 'EC-Council',
    issueDate: 'June 2024',
    // expiryDate: 'September 2027',
    credentialId: 'b0ed357a-d763-4365-8e35-2214b0e4d09a',
    imageUrl: '/assets/certificates/Cryptocurrency.png',
    verificationUrl: 'https://learn.eccouncil.org/certificate/b0ed357a-d763-4365-8e35-2214b0e4d09a?logged=false',
    description: 'Introduction to Dark Web, Anonymity, and Cryptocurrency',
    skills: ['Dark Web', 'Anonymity', 'Cryptocurrency'],
    categories: ['general'],
    featured: false,
    status: 'active'
  },
  {
    id: '18',
    name: 'Network Defense Essentials (NDE)',
    issuer: 'EC-Council',
    issueDate: 'June 2024',
    // expiryDate: 'September 2027',
    credentialId: '2d44119a-9b9e-4b7d-9e99-4c9c42037091',
    imageUrl: '/assets/certificates/NDE.png',
    verificationUrl: 'https://learn.eccouncil.org/certificate/2d44119a-9b9e-4b7d-9e99-4c9c42037091?logged=false',
    description: 'Network Defense Essentials (NDE)',
    skills: ['Network Security', 'Intrusion Detection', 'Firewall Management'],
    categories: ['general'],
    featured: false,
    status: 'active'
  },
  {
    id: '19',
    name: 'Certification of Completeion English Course',
    issuer: 'Master of English Course',
    issueDate: 'December 2021',
    imageUrl: '/assets/certificates/english.jpeg',
    description: 'Successfully completed a course in English for Beginner A1 Majene - West Sulawesi',
    skills: ['Network Security', 'Intrusion Detection', 'Firewall Management'],
    categories: ['general'],
    featured: false,
    status: 'lifetime'
  },
];

export const certificateCategories = [
  { id: 'all', name: 'All Certificates', icon: '', count: certificates.length },
  { id: 'backend', name: 'Backend', icon: '', count: certificates.filter(c => c.categories.includes('backend')).length },
  { id: 'cloud', name: 'Cloud', icon: '', count: certificates.filter(c => c.categories.includes('cloud')).length },
  { id: 'devops', name: 'DevOps', icon: '', count: certificates.filter(c => c.categories.includes('devops')).length },
  { id: 'frontend', name: 'Frontend', icon: '', count: certificates.filter(c => c.categories.includes('frontend')).length },
  { id: 'general', name: 'General', icon: '', count: certificates.filter(c => c.categories.includes('general')).length }
];

export const getCertificateStats = () => {
  const total = certificates.length;
  const featured = certificates.filter(c => c.featured).length;
  const active = certificates.filter(c => c.status === 'active').length;
  const lifetime = certificates.filter(c => c.status === 'lifetime').length;
  
  return { total, featured, active, lifetime };
};