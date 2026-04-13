import type { ReactNode } from 'react';

export type Tab = 'About' | 'Resume' | 'Portfolio' | 'Blog' | 'Contact';

export interface Service {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface TimelineItem {
  title: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  percentage: number;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  gallery: string[];
}

export interface BlogPost {
  title: string;
  category: string;
  date: string;
  description: string;
  image: string;
}
