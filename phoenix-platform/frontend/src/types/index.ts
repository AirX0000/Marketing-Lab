export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'student' | 'corporate_lead' | 'admin';
  cefr_level: CEFRLevel | null;
  target_domain: 'IT' | 'Business' | 'Executive';
  xp_points: number;
  streak_days: number;
  telegram_id?: string | null;
  telegram_username?: string | null;
  is_active: boolean;
  created_at: string;
}

export interface LevelInfo {
  level: number;
  rank_title: string;
  current_xp: number;
  next_level_xp: number;
  level_progress_percentage: number;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface DiagnosticOption {
  id: string;
  text: string;
  is_correct?: boolean;
  explanation?: string;
}

export interface DiagnosticQuestion {
  id: string;
  order_index: number;
  section: 'grammar' | 'tech_vocab' | 'architecture_reading' | 'business_negotiation';
  cefr_level: CEFRLevel;
  prompt: string;
  context_snippet?: string | null;
  options: DiagnosticOption[];
  weight: number;
}

export interface DiagnosticTest {
  id: string;
  slug: string;
  title: string;
  target_domain: string;
  duration_minutes: number;
  questions_count: number;
  questions?: DiagnosticQuestion[];
}

export interface Recommendation {
  focus_area?: string;
  priority?: 'High' | 'Medium' | 'Low';
  advice?: string;
  suggested_track?: string;
  duration?: string;
  target_outcome?: string;
}

export interface DiagnosticResult {
  id: string;
  user_id?: string | null;
  test_id: string;
  lead_name?: string | null;
  lead_email?: string | null;
  score_total: number;
  score_percentage: number;
  assigned_cefr: CEFRLevel;
  breakdown: {
    grammar_score: number;
    tech_vocab_score: number;
    comprehension_score: number;
  };
  detailed_recommendations: Recommendation[];
  completed_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  order_index: number;
  title: string;
  content_markdown: string;
  scenario_roleplay: {
    scenario_title?: string;
    character?: string;
    dialogue?: Array<{ speaker: string; text: string }>;
  };
  xp_reward: number;
  is_completed?: boolean;
}

export interface CourseModule {
  id: string;
  course_id: string;
  order_index: number;
  title: string;
  summary: string;
  lessons_count: number;
  lessons?: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  cefr_level: CEFRLevel;
  track: string;
  modules_count: number;
  estimated_hours: number;
  is_published: boolean;
  modules?: CourseModule[];
}

export interface RadarSkill {
  skill: string;
  score: number;
  benchmark: number;
}

export interface ActivityLogItem {
  id: string;
  activity_type: string;
  details: Record<string, unknown>;
  xp_earned: number;
  created_at: string;
}

export interface DashboardData {
  user: User;
  level_info: LevelInfo;
  metrics: {
    completed_lessons: number;
    current_cefr: string;
    streak_days: number;
    xp_points: number;
  };
  radar_competencies: RadarSkill[];
  recent_activity: ActivityLogItem[];
}

export interface LeaderboardUser {
  rank: number;
  full_name: string;
  cefr_level: string;
  target_domain: string;
  xp_points: number;
  streak_days: number;
}
