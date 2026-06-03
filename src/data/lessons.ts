import { Lesson } from '../types/learning';

export const lessons: Lesson[] = [
  // --- SPANISH LESSONS ---
  {
    id: 'es-u1-l1',
    unitId: 'es-u1',
    title: 'Basic Greetings',
    description: 'Learn to say hello, goodbye, and basic polite phrases in Spanish.',
    xpReward: 10,
    type: 'standard',
    vocabularyIds: ['es-vocab-hola', 'es-vocab-adios', 'es-vocab-gracias', 'es-vocab-porfavor', 'es-vocab-buenosdias'],
    phraseIds: ['es-phrase-comoestas'],
    activities: [
      {
        id: 'es-u1-l1-a1',
        type: 'matching',
        instruction: 'Match the words with their meanings.',
        pairs: [
          { target: 'hola', translation: 'hello' },
          { target: 'adiós', translation: 'goodbye' },
          { target: 'gracias', translation: 'thank you' },
          { target: 'por favor', translation: 'please' },
          { target: 'buenos días', translation: 'good morning' }
        ]
      },
      {
        id: 'es-u1-l1-a2',
        type: 'multiple_choice',
        instruction: 'What is "hello" in Spanish?',
        question: 'Hello',
        options: ['adiós', 'gracias', 'hola', 'por favor'],
        correctIndex: 2
      },
      {
        id: 'es-u1-l1-a3',
        type: 'translate',
        instruction: 'Translate this sentence into Spanish.',
        question: 'Hello, thank you.',
        correctAnswers: ['hola, gracias', 'hola gracias', 'hola, gracias.'],
        options: ['hola', 'gracias', 'adiós', 'buenos días', 'por favor'],
        direction: 'native-to-target'
      },
      {
        id: 'es-u1-l1-a4',
        type: 'speaking',
        instruction: 'Repeat this phrase aloud.',
        prompt: 'Hola, ¿cómo estás?',
        pronunciationGuide: 'OH-lah, KOH-moh ess-TAHSS'
      }
    ]
  },
  {
    id: 'es-u1-l2',
    unitId: 'es-u1',
    title: 'Café Barista Chat',
    description: 'Practice ordering coffee and food with Sofía, the AI Barista.',
    xpReward: 15,
    type: 'ai_tutor',
    activities: [
      {
        id: 'es-u1-l2-a1',
        type: 'audio_tutor',
        instruction: 'Order a coffee and a pastry at a local cafe in Madrid.',
        characterName: 'Sofía',
        scenario: 'Ordering coffee and pastries at a local cafe in Madrid.',
        initialMessage: '¡Hola! Bienvenidos a Café Central. ¿Qué te pongo hoy?',
        aiPrompt: 'You are Sofía, a friendly cafe barista in Madrid. Help the user order coffee and a pastry in Spanish. Keep your sentences short, simple, and encouraging for beginners. Only speak in Spanish and gently correct them if they make mistakes.'
      }
    ]
  },
  {
    id: 'es-u1-l3',
    unitId: 'es-u1',
    title: 'AI Video Teacher Lesson',
    description: 'Introduce yourself and ask names in video-based AI lesson with Carlos.',
    xpReward: 20,
    type: 'vision_teacher',
    activities: [
      {
        id: 'es-u1-l3-a1',
        type: 'vision_agent',
        instruction: 'Start the video session and introduce yourself to Carlos.',
        agentName: 'Carlos',
        scenario: 'AI Teacher introducing greetings, asking names, and origins.',
        topics: ['greetings', 'names', 'origins'],
        systemPrompt: 'You are Carlos, a supportive and energetic AI Spanish Teacher. You will conduct an interactive, audio-video conversation with the user. Start by greeting them warmly, introducing yourself ("Me llamo Carlos, soy de Colombia"), and asking their name. Wait for their reply, praise their effort, and then ask where they are from. Keep the conversation interactive and friendly.'
      }
    ]
  },

  // --- FRENCH LESSONS ---
  {
    id: 'fr-u1-l1',
    unitId: 'fr-u1',
    title: 'Basic Greetings',
    description: 'Learn how to greet people, say goodbye, and say thank you in French.',
    xpReward: 10,
    type: 'standard',
    vocabularyIds: ['fr-vocab-bonjour', 'fr-vocab-aurevoir', 'fr-vocab-merci', 'fr-vocab-silvousplait', 'fr-vocab-salut'],
    phraseIds: ['fr-phrase-commentcava'],
    activities: [
      {
        id: 'fr-u1-l1-a1',
        type: 'matching',
        instruction: 'Match the words with their meanings.',
        pairs: [
          { target: 'bonjour', translation: 'hello' },
          { target: 'au revoir', translation: 'goodbye' },
          { target: 'merci', translation: 'thank you' },
          { target: 's\'il vous plaît', translation: 'please' },
          { target: 'salut', translation: 'hi' }
        ]
      },
      {
        id: 'fr-u1-l1-a2',
        type: 'multiple_choice',
        instruction: 'What is "goodbye" in French?',
        question: 'Goodbye',
        options: ['bonjour', 'merci', 'salut', 'au revoir'],
        correctIndex: 3
      },
      {
        id: 'fr-u1-l1-a3',
        type: 'translate',
        instruction: 'Translate this sentence into French.',
        question: 'Hello, please.',
        correctAnswers: ['bonjour, s\'il vous plaît', 'bonjour s\'il vous plaît', 'bonjour, s\'il vous plait', 'bonjour s\'il vous plait'],
        options: ['bonjour', 'merci', 'au revoir', 's\'il vous plaît', 'salut'],
        direction: 'native-to-target'
      },
      {
        id: 'fr-u1-l1-a4',
        type: 'speaking',
        instruction: 'Repeat this phrase aloud.',
        prompt: 'Bonjour, comment ça va ?',
        pronunciationGuide: 'bohn-ZHOOR, koh-mahnt sah VAH'
      }
    ]
  },
  {
    id: 'fr-u1-l2',
    unitId: 'fr-u1',
    title: 'Boulangerie Order',
    description: 'Order a croissant and baguettes with Pierre, the AI Baker.',
    xpReward: 15,
    type: 'ai_tutor',
    activities: [
      {
        id: 'fr-u1-l2-a1',
        type: 'audio_tutor',
        instruction: 'Order a croissant or baguette at a bakery in Paris.',
        characterName: 'Pierre',
        scenario: 'Ordering croissants at a Parisian bakery.',
        initialMessage: 'Bonjour ! Qu\'est-ce que vous désirez aujourd\'hui ?',
        aiPrompt: 'You are Pierre, a friendly baker in Paris. Help the user order a croissant or baguette in French. Keep your sentences short and simple. Only speak in French and gently correct the user.'
      }
    ]
  }
];
