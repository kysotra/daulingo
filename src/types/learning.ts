export interface Language {
  id: string; // e.g. 'es', 'fr', 'ja'
  name: string; // e.g. 'Spanish', 'French', 'Japanese'
  nativeName: string; // e.g. 'Español', 'Français', '日本語'
  flag: string; // Emoji character or flag code
  code: string; // Locale string e.g. 'es-ES', 'fr-FR', 'ja-JP'
  learners?: string; // e.g. '28.4M learners'
}

export interface VocabItem {
  id: string;
  word: string;
  translation: string;
  pronunciation?: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun' | 'preposition' | 'conjunction' | 'interjection' | 'phrase';
  gender?: 'masculine' | 'feminine' | 'neuter';
  example?: string;
  exampleTranslation?: string;
}

export interface PhraseItem {
  id: string;
  phrase: string;
  translation: string;
  pronunciation?: string;
  context?: string;
}

export type ActivityType =
  | 'multiple_choice'
  | 'translate'
  | 'matching'
  | 'speaking'
  | 'audio_tutor'
  | 'vision_agent';

export interface BaseActivity {
  id: string;
  type: ActivityType;
  instruction: string; // e.g. "Select the correct translation"
}

export interface MultipleChoiceActivity extends BaseActivity {
  type: 'multiple_choice';
  question: string;
  options: string[];
  correctIndex: number;
}

export interface TranslateActivity extends BaseActivity {
  type: 'translate';
  question: string;
  correctAnswers: string[]; // Set of valid translations
  options?: string[]; // Word bank options
  direction: 'target-to-native' | 'native-to-target';
}

export interface MatchingActivity extends BaseActivity {
  type: 'matching';
  pairs: { target: string; translation: string }[];
}

export interface SpeakingActivity extends BaseActivity {
  type: 'speaking';
  prompt: string;
  pronunciationGuide?: string;
}

export interface AudioTutorActivity extends BaseActivity {
  type: 'audio_tutor';
  characterName: string;
  scenario: string;
  aiPrompt: string;
  initialMessage: string;
}

export interface VisionAgentActivity extends BaseActivity {
  type: 'vision_agent';
  agentName: string;
  scenario: string;
  systemPrompt: string;
  topics: string[];
  videoUrl?: string;
}

export type Activity =
  | MultipleChoiceActivity
  | TranslateActivity
  | MatchingActivity
  | SpeakingActivity
  | AudioTutorActivity
  | VisionAgentActivity;

export type LessonType = 'standard' | 'vocab_review' | 'ai_tutor' | 'vision_teacher';

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  xpReward: number;
  type: LessonType;
  activities: Activity[];
  vocabularyIds?: string[];
  phraseIds?: string[];
}

export interface Unit {
  id: string;
  languageId: string;
  title: string;
  description: string;
  goals: string[];
  lessons: Lesson[];
}
