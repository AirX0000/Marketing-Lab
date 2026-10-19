import { 
  User, 
  AuthTokens, 
  DiagnosticTest, 
  DiagnosticResult, 
  Course, 
  Lesson, 
  DashboardData, 
  LeaderboardUser 
} from '../types';

const API_BASE = '/api/v1';

class APIError extends Error {
  code: string;
  details?: Record<string, unknown>;

  constructor(message: string, code: string = 'API_ERROR', details?: Record<string, unknown>) {
    super(message);
    this.name = 'APIError';
    this.code = code;
    this.details = details;
  }
}

async function fetchWithAuth<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('phoenix_access_token');
  const headers = new Headers(options.headers || {});
  
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle Token Expiry & Rotation
  if (response.status === 401 && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/refresh')) {
    const refreshToken = localStorage.getItem('phoenix_refresh_token');
    if (refreshToken) {
      try {
        const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken })
        });
        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          localStorage.setItem('phoenix_access_token', refreshData.data.access_token);
          localStorage.setItem('phoenix_refresh_token', refreshData.data.refresh_token);
          // Retry original request with fresh token
          headers.set('Authorization', `Bearer ${refreshData.data.access_token}`);
          const retryRes = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
          if (!retryRes.ok) {
            const errBody = await retryRes.json();
            throw new APIError(errBody.message || 'Request failed', errBody.code);
          }
          const retryData = await retryRes.json();
          return retryData.data as T;
        }
      } catch (err) {
        localStorage.removeItem('phoenix_access_token');
        localStorage.removeItem('phoenix_refresh_token');
      }
    }
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new APIError(
      errorBody.message || `Request failed with status ${response.status}`,
      errorBody.code || 'UNKNOWN_ERROR',
      errorBody.details
    );
  }

  const json = await response.json();
  return json.data as T;
}

export const api = {
  // Auth
  register: (payload: { email: string; password: string; full_name: string; target_domain?: string }) =>
    fetchWithAuth<{ user: User; tokens: AuthTokens }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  login: (payload: { email: string; password: string }) =>
    fetchWithAuth<{ user: User; tokens: AuthTokens }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getCurrentUser: () => fetchWithAuth<User & { gamification: Record<string, unknown> }>('/auth/me'),

  linkTelegram: (payload: { telegram_id: string; telegram_username?: string }) =>
    fetchWithAuth<{ message: string; user: User }>('/auth/telegram/link', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Diagnostic
  getDiagnosticTests: () => fetchWithAuth<DiagnosticTest[]>('/diagnostic/tests'),

  getDiagnosticTest: (slug: string) => fetchWithAuth<DiagnosticTest>(`/diagnostic/tests/${slug}`),

  submitDiagnostic: (payload: {
    test_id: string;
    answers: Array<{ question_id: string; selected_option_id: string }>;
    lead_name?: string;
    lead_email?: string;
    lead_phone?: string;
  }) =>
    fetchWithAuth<DiagnosticResult>('/diagnostic/submit', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getDiagnosticResult: (attemptId: string) =>
    fetchWithAuth<DiagnosticResult>(`/diagnostic/results/${attemptId}`),

  submitLead: (payload: { name: string; email: string; company_name?: string; cohort_size?: string }) =>
    fetchWithAuth<{ name: string; company?: string }>('/diagnostic/lead', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Courses
  getCourses: () => fetchWithAuth<Course[]>('/courses'),

  getCourse: (slug: string) => fetchWithAuth<Course>(`/courses/${slug}`),

  getLesson: (lessonId: string) => fetchWithAuth<Lesson>(`/courses/lessons/${lessonId}`),

  completeLesson: (lessonId: string, payload: { quiz_score?: number; roleplay_submission?: string }) =>
    fetchWithAuth<{ user: User; xp_earned: number }>(`/courses/lessons/${lessonId}/complete`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Analytics
  getDashboard: () => fetchWithAuth<DashboardData>('/analytics/dashboard'),

  getLeaderboard: () => fetchWithAuth<LeaderboardUser[]>('/analytics/leaderboard'),
};
