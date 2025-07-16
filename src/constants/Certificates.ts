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
    issueDate: '2023-09',
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
    issuer: 'Dicoding',
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
    issuer: 'Dicoding',
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
    name: '',
    issuer: '',
    issueDate: 'November 2024',
    expiryDate: 'November 2027',
    credentialId: 'JLX14J446X72',
    imageUrl: '/assets/certificates/',
    verificationUrl: 'https://www.dicoding.com/certificates/JLX14J446X72',
    description: 'Google Cloud EngineerGoogle Cloud Engineer',
    skills: ['GCP', 'Node.js', 'Express.js', 'Firebase'],
    categories: ['general', 'frontend'],
    featured: false,
    status: 'active'
  {
    id: '8',
    name: '',
    issuer: '',
    issueDate: 'November 2024',
    expiryDate: 'November 2027',
    credentialId: 'JLX14J446X72',
    imageUrl: '/assets/certificates/',
    verificationUrl: 'https://www.dicoding.com/certificates/JLX14J446X72',
    description: 'Google Cloud EngineerGoogle Cloud Engineer',
    skills: ['GCP', 'Node.js', 'Express.js', 'Firebase'],
    categories: ['general', 'frontend'],
    featured: false,
    status: 'active'
  },
  {
    id: '9',
    name: '',
    issuer: '',
    issueDate: 'November 2024',
    expiryDate: 'November 2027',
    credentialId: 'JLX14J446X72',
    imageUrl: '/assets/certificates/',
    verificationUrl: 'https://www.dicoding.com/certificates/JLX14J446X72',
    description: 'Google Cloud EngineerGoogle Cloud Engineer',
    skills: ['GCP', 'Node.js', 'Express.js', 'Firebase'],
    categories: ['general', 'frontend'],
    featured: false,
    status: 'active'
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