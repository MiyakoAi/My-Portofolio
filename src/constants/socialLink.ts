export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
  username?: string;
  description: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/MiyakoAi',
    icon: 'github',
    color: '#333',
    username: '@MiyakoAi',
    description: 'Check out my code repositories and contributions'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/mugniadji',
    icon: 'linkedin',
    color: '#0077B5',
    username: 'Mungi Adji',
    description: 'Connect with me professionally'
  },
  {
    name: 'Email',
    url: 'mailto:mugniadji25@gmail.com',
    icon: 'mail',
    color: '#EA4335',
    username: 'Mugni Adji',
    description: 'Send me a direct message'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/mugniadji',
    icon: 'instagram',
    color: '#C13584',
    username: '@mugniadji_',
    description: 'Follow my personal journey'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/mugniadji_',
    icon: 'twitter',
    color: '#1DA1F2',
    username: '@mugniadji_',
    description: 'Follow me for fun'
  }
];