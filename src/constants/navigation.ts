export interface NavigationItem {
  name: string;
  path: string;
  command: string;
  description: string;
}

export const navigationItems: NavigationItem[] = [
  {
    name: 'Home',
    path: '/',
    command: 'whoami',
    description: 'About me and terminal interface'
  },
  {
    name: 'About',
    path: '/about',
    command: 'cat about.md',
    description: 'My background and experience'
  },
  {
    name: 'Projects',
    path: '/projects',
    command: 'ls projects/',
    description: 'Portfolio of my work'
  },
  {
    name: 'Skills',
    path: '/skills',
    command: 'which skills',
    description: 'Technical expertise'
  },
    {
    name: 'Certificates',
    path: '/certificates',
    command: 'find certificates/',
    description: 'Professional certifications'
  },
  {
    name: 'Contact',
    path: '/contact',
    command: 'curl contact.json',
    description: 'Get in touch with me'
  }
];