export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string; // Optional
  imageUrl?: string;
  verificationUrl?: string;
  description?: string; // Optional
  skills?: string[]; // Optional
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
    issueDate: 'Jul 2025',
    credentialId: 'xxx-xxx-xxx',
    imageUrl: '/assets/certificates/imphnenSertificated.jpg',
    verificationUrl: 'https://www.credly.com/badges/aws-saa-2024-001',
    description: 'Just FUN!!!.',
    skills: ['JavaScript', 'Python', 'React', 'Automation'],
    categories: ['cloud', 'general'],
    featured: true,
    expiryDate: '2027-03',
    status: 'active'
  },
  {
    id: '2',
    name: 'Bangkit 2024 Batch 2 Certificate',
    issuer: 'Bangkit led by Google, Goto, and Traveloka',
    issueDate: 'Jan 2025',
    credentialId: 'BA24/GRAD/XXIV-01/C272B4KY0010',
    imageUrl: '/assets/certificates/imphnenSertificated.jpg',
    verificationUrl: 'https://openjsf.org/certification/nodejs-dev-456',
    description: 'Graduated as a Cloud Computing cohort.',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JavaScript', 'GCP', 'Docker', 'team work', 'Problem Solving'],
    categories: ['backend'],
    featured: true,
    status: 'lifetime'
  },
  {
    id: '3',
    name: 'Mahasiswa Peserta MSIB Batch 7',
    issuer: 'Kampus Merdeka.',
    issueDate: 'Jan 2025',
    credentialId: '9923529/13020220166',
    imageUrl: '/assets/certificates/imphnenSertificated.jpg',
    verificationUrl: 'https://university.mongodb.com/certification/developer/789',
    // description: 'Tidak ada deskripsi', // Optional - bisa di-comment atau dihapus
    // skills: [], // Optional - bisa di-comment atau dihapus
    categories: ['general'],
    featured: true,
    status: 'lifetime'
  },
  {
    id: '4',
    name: 'Docker Certified Associate',
    issuer: 'Docker Inc.',
    issueDate: '2023-09',
    credentialId: 'DCA-2023-321',
    imageUrl: '/assets/certificates/docker-cert.jpg',
    verificationUrl: 'https://success.docker.com/certification/dca-321',
    description: 'Demonstrates expertise in containerization, Docker orchestration, and container security practices.',
    skills: ['Docker', 'Containerization', 'Microservices', 'DevOps'],
    categories: ['devops', 'cloud'],
    featured: false,
    expiryDate: '2025-09',
    status: 'active'
  },
  {
    id: '5',
    name: 'PostgreSQL 13 Associate Certification',
    issuer: 'PostgreSQL Global Development Group',
    issueDate: '2023-06',
    credentialId: 'PG13-ASSOC-654',
    imageUrl: '/assets/certificates/postgresql-cert.jpg',
    verificationUrl: 'https://www.postgresql.org/certification/654',
    description: 'Validates comprehensive knowledge of PostgreSQL database administration and advanced SQL techniques.',
    skills: ['PostgreSQL', 'SQL', 'Database Administration', 'Performance Tuning'],
    categories: ['backend'],
    featured: false,
    status: 'lifetime'
  },
  {
    id: '6',
    name: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    issueDate: '2023-03',
    credentialId: 'FCC-JS-ALG-987',
    imageUrl: '/assets/certificates/freecodecamp-js.jpg',
    verificationUrl: 'https://www.freecodecamp.org/certification/miyakoai/javascript-algorithms-and-data-structures',
    description: 'Comprehensive certification covering JavaScript fundamentals, ES6+, algorithms, and data structures.',
    skills: ['JavaScript', 'Algorithms', 'Data Structures', 'ES6+'],
    categories: ['general', 'frontend'],
    featured: false,
    status: 'lifetime'
  }
];

export const certificateCategories = [
  { id: 'all', name: 'All Certificates', icon: '🎓', count: certificates.length },
  { id: 'backend', name: 'Backend', icon: '⚙️', count: certificates.filter(c => c.categories.includes('backend')).length },
  { id: 'cloud', name: 'Cloud', icon: '☁️', count: certificates.filter(c => c.categories.includes('cloud')).length },
  { id: 'devops', name: 'DevOps', icon: '🔧', count: certificates.filter(c => c.categories.includes('devops')).length },
  { id: 'frontend', name: 'Frontend', icon: '🎨', count: certificates.filter(c => c.categories.includes('frontend')).length },
  { id: 'general', name: 'General', icon: '📚', count: certificates.filter(c => c.categories.includes('general')).length }
];

export const getCertificateStats = () => {
  const total = certificates.length;
  const featured = certificates.filter(c => c.featured).length;
  const active = certificates.filter(c => c.status === 'active').length;
  const lifetime = certificates.filter(c => c.status === 'lifetime').length;
  
  return { total, featured, active, lifetime };
};