import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardData, Course, Lesson } from '../types';
import { api } from '../api/client';
import { CEFRRadar } from '../components/CEFRRadar';
import { GamifiedProgress } from '../components/GamifiedProgress';

interface DashboardProps {
  onStartDiagnostic: () => void;
  selectedCourse?: Course | null;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartDiagnostic, selectedCourse }) => {
  const { user, refreshUser } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const data = await api.getDashboard();
      setDashboardData(data);

      // Load syllabus for default or selected course
      const courses = await api.getCourses();
      if (courses.length > 0) {
        const targetSlug = selectedCourse ? selectedCourse.slug : courses[0].slug;
        const fullCourse = await api.getCourse(targetSlug);
        setCourse(fullCourse);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedCourse]);

  const handleCompleteLesson = async (lesson: Lesson) => {
    setCompleting(true);
    try {
      const res = await api.completeLesson(lesson.id, { quiz_score: 100 });
      setToastMessage(`🎉 Lesson completed! +${res.xp_earned} XP awarded to your profile.`);
      setTimeout(() => setToastMessage(null), 4000);
      setActiveLesson(null);
      await refreshUser();
      await loadData();
    } catch (err) {
      alert('Could not record lesson completion.');
    } finally {
      setCompleting(false);
    }
  };

  if (!user) {
    return (
      <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>
        <h2>Sign In to Access Your Learning Dashboard</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '14px 0 24px' }}>
          Track your CEFR progression, daily standup streak, and active technical tracks.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading student telemetry & radar...</p>
      </div>
    );
  }

  const tgDeepLink = `https://t.me/PhoenixEnglishBot?start=${user.id}`;

  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      {/* Toast */}
      {toastMessage && (
        <div className="toast-msg">
          <span>⚡</span> {toastMessage}
        </div>
      )}

      {/* Top Welcome Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, rgba(255, 71, 87, 0.15), rgba(255, 165, 2, 0.08))',
        border: '1px solid rgba(255, 71, 87, 0.3)',
        marginBottom: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="badge badge-cefr">CEFR: {user.cefr_level || 'Pending Assessment'}</span>
            <span className="badge badge-streak">🔥 {user.streak_days} Day Streak</span>
            <span className="badge badge-xp">⚡ {user.xp_points} Total XP</span>
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 800 }}>
            Welcome back, {user.full_name}!
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Focus today: Master diplomatic modal phrasing in code reviews & architectural RFCs.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button onClick={onStartDiagnostic} className="btn btn-sm btn-primary">
            Retake Diagnostic Test
          </button>
          <a
            href={tgDeepLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <span>🤖</span> {user.telegram_id ? 'Telegram Synced ✓' : 'Connect Telegram Bot (+50 XP)'}
          </a>
        </div>
      </div>

      {/* Main Grid: Competency Radar + Gamification Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '40px' }}>
        {/* Radar Card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800 }}>5-Axis Engineering Competency</h3>
            <span style={{ fontSize: '12px', color: 'var(--brand-primary)', fontWeight: 700 }}>CEFR {user.cefr_level || 'B2'}</span>
          </div>
          {dashboardData && (
            <CEFRRadar skills={dashboardData.radar_competencies} size={300} />
          )}
        </div>

        {/* Gamified Level & Leaderboard */}
        {dashboardData && (
          <GamifiedProgress
            levelInfo={dashboardData.level_info}
            streakDays={user.streak_days}
          />
        )}
      </div>

      {/* Active Syllabus & Interactive Lessons */}
      {course && (
        <div className="card" style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
            <div>
              <span className="badge badge-cefr" style={{ marginBottom: '8px' }}>Active Curriculum</span>
              <h3 style={{ fontSize: '22px', fontWeight: 800 }}>{course.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{course.tagline}</p>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--brand-gold)', fontWeight: 700 }}>
              {course.modules?.length || 0} Modules · {course.estimated_hours} Hours
            </div>
          </div>

          <div style={{ display: 'grid', gap: '20px' }}>
            {course.modules?.map(mod => (
              <div key={mod.id} style={{ background: 'var(--bg-dark)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px', color: '#ff6b81' }}>
                  {mod.title}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                  {mod.summary}
                </p>

                <div style={{ display: 'grid', gap: '8px' }}>
                  {mod.lessons?.map(les => (
                    <div
                      key={les.id}
                      onClick={() => setActiveLesson(les)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-sm)',
                        background: les.is_completed ? 'rgba(46, 213, 115, 0.08)' : 'var(--bg-card)',
                        border: les.is_completed ? '1px solid rgba(46, 213, 115, 0.3)' : '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '16px' }}>{les.is_completed ? '✅' : '📖'}</span>
                        <strong style={{ fontSize: '14px', color: les.is_completed ? 'var(--brand-accent)' : 'var(--text-main)' }}>
                          {les.title}
                        </strong>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span className="badge badge-xp">+{les.xp_reward} XP</span>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Start →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Lesson Modal */}
      {activeLesson && (
        <div className="modal-overlay" onClick={() => setActiveLesson(null)}>
          <div className="modal-card" style={{ maxWidth: '680px', maxHeight: '85vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <span className="badge badge-xp">+{activeLesson.xp_reward} XP Reward</span>
              <button onClick={() => setActiveLesson(null)} style={{ fontSize: '20px', color: 'var(--text-muted)' }}>✕</button>
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '14px' }}>
              {activeLesson.title}
            </h3>

            {/* Markdown Lesson Content */}
            <div style={{
              background: 'var(--bg-dark)',
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              fontSize: '14px',
              lineHeight: 1.6,
              marginBottom: '20px',
              whiteSpace: 'pre-wrap'
            }}>
              {activeLesson.content_markdown}
            </div>

            {/* Roleplay Dialogue Simulator */}
            {activeLesson.scenario_roleplay && activeLesson.scenario_roleplay.dialogue && (
              <div style={{ background: 'var(--bg-elevated)', padding: '18px', borderRadius: 'var(--radius-md)', marginBottom: '24px', borderLeft: '4px solid var(--brand-gold)' }}>
                <strong style={{ fontSize: '14px', color: 'var(--brand-gold)', display: 'block', marginBottom: '10px' }}>
                  🎭 Standup Roleplay Simulator: {activeLesson.scenario_roleplay.scenario_title}
                </strong>
                <div style={{ display: 'grid', gap: '10px' }}>
                  {activeLesson.scenario_roleplay.dialogue.map((d, idx) => (
                    <div key={idx} style={{ fontSize: '13px', padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: d.speaker === 'You' ? 'rgba(255, 71, 87, 0.15)' : 'var(--bg-dark)' }}>
                      <strong>{d.speaker}:</strong> {d.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => handleCompleteLesson(activeLesson)}
              disabled={completing}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              {completing ? 'Recording XP...' : 'Complete Lesson & Claim +50 XP 🚀'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
