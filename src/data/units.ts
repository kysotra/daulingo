import { Unit } from '../types/learning';
import { lessons } from './lessons';

export const units: Unit[] = [
  {
    id: 'es-u1',
    languageId: 'es',
    title: 'Unit 1: Basics & Cafés',
    description: 'Master simple greetings and converse with a barista in Spanish.',
    goals: [
      'Say hello and goodbye politely',
      'Order coffee and food at a café',
      'Introduce yourself to an AI Teacher'
    ],
    lessons: lessons.filter(l => l.unitId === 'es-u1')
  },
  {
    id: 'fr-u1',
    languageId: 'fr',
    title: 'Unit 1: Basic Greetings',
    description: 'Learn fundamental French words, phrases, and bakery expressions.',
    goals: [
      'Greet people and use polite terms',
      'Order a croissant and baguettes at a bakery'
    ],
    lessons: lessons.filter(l => l.unitId === 'fr-u1')
  }
];
