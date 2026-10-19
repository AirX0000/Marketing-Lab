import React, { useEffect, useState } from 'react';
import { Course } from '../types';
import { api } from '../api/client';
import { CourseCard } from '../components/CourseCard';
import { PricingTiers } from '../components/PricingTiers';
import { CEFRRadar } from '../components/CEFRRadar';

interface HomeProps {
  onStartDiagnostic: () => void;
  onSelectCourse: (course: Course) => void;
}

export const Home: React.FC<HomeProps> = ({ onStartDiagnostic, onSelectCourse }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await api.getCourses();
        setCourses(data);
      } catch (e) {
        // Fallback
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  const sampleRadarSkills = [
    { skill: 'Technical Grammar', score: 82, benchmark: 75 },
    { skill: 'Systems Lexicon', score: 88, benchmark: 80 },
    { skill: 'Architecture Reading', score: 78, benchmark: 70 },
    { skill: 'Standup Fluency', score: 85, benchmark: 75 },
    { skill: 'Executive Negotiation', score: 68, benchmark: 85 },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        padding: '100px 0 80px',
        background: 'radial-gradient(circle at 50% 20%, rgba(255, 71, 87, 0.12) 0%, rgba(9, 10, 15, 0) 70%)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: 99, background: 'rgba(255, 71, 87, 0.12)', border: '1px solid rgba(255, 71, 87, 0.3)', marginBottom: '24px' }}>
            <span style={{ fontSize: '14px' }}>🔥</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#ff6b81', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              International CEFR Standards (A1-C2) · Tailored for Software Teams
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(38px, 6vw, 68px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.12,
            maxWidth: '920px',
            margin: '0 auto 24px',
            color: '#fff'
          }}>
            Stop Translating in Your Head.<br />
            <span style={{ background: 'linear-gradient(135deg, #ff4757, #ffa502)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Lead Standups & Architecture Reviews
            </span> in Fluent Global English.
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            margin: '0 auto 36px',
            lineHeight: 1.6
          }}>
            Gamified, scenario-driven English for engineers and tech leaders. Master diplomatic pull request reviews, incident post-mortems, and executive compensation negotiations.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
            <button onClick={onStartDiagnostic} className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '17px' }}>
              Take Free 10-Min Diagnostic Test 🚀
            </button>
            <a 
              href="#curriculum" 
              onClick={e => { e.preventDefault(); document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn btn-secondary" 
              style={{ padding: '16px 28px', fontSize: '16px' }}
            >
              Explore 3 CEFR Tracks ↓
            </a>
          </div>

          {/* Social Proof Badges */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '32px', flexWrap: 'wrap', opacity: 0.75 }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>Engineers hired at:</span>
            <span style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '0.05em' }}>GOOGLE</span>
            <span style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '0.05em' }}>EPAM</span>
            <span style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '0.05em' }}>REVOLUT</span>
            <span style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '0.05em' }}>INDRIVE</span>
          </div>
        </div>
      </section>

      {/* Proof Metrics */}
      <section style={{ borderBlock: '1px solid var(--border-subtle)', background: 'var(--bg-card)', padding: '36px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', textAlign: 'center' }}>
            <div>
              <b style={{ fontSize: '36px', fontWeight: 800, color: '#ff4757', display: 'block' }}>3,400+</b>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Developers & Leads Trained</span>
            </div>
            <div>
              <b style={{ fontSize: '36px', fontWeight: 800, color: '#ffa502', display: 'block' }}>94.2%</b>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Overseas Interview Pass Rate</span>
            </div>
            <div>
              <b style={{ fontSize: '36px', fontWeight: 800, color: '#2ed573', display: 'block' }}>+38%</b>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Average Compensation Uplift</span>
            </div>
            <div>
              <b style={{ fontSize: '36px', fontWeight: 800, color: '#1e90ff', display: 'block' }}>100%</b>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>CEFR Standards Aligned</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive CEFR Competency Radar Featurette */}
      <section style={{ padding: '90px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
            <div>
              <span className="badge badge-cefr" style={{ marginBottom: '14px' }}>Scientific Assessment Engine</span>
              <h2 style={{ fontSize: '34px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '18px', lineHeight: 1.2 }}>
                Traditional English Tests Fail Engineers. We Benchmark Real Technical Fluency.
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '24px', lineHeight: 1.6 }}>
                General English tests test whether you can order in a café. Phoenix tests whether you can defuse a high-stakes incident on Slack, justify choosing PostgreSQL over MongoDB to an EU client, and negotiate a $120k remote contract.
              </p>

              <div style={{ display: 'grid', gap: '14px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: 'var(--brand-primary)', fontWeight: 800 }}>01.</span>
                  <div>
                    <strong style={{ fontSize: '15px' }}>Diplomatic Hedging & PR Reviews</strong>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Learn phrases like 'might this introduce race conditions' instead of confrontational feedback.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: 'var(--brand-primary)', fontWeight: 800 }}>02.</span>
                  <div>
                    <strong style={{ fontSize: '15px' }}>Architecture Decision Records (ADRs)</strong>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Structure trade-off proposals using precise modal verbs and subjunctive clarity.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: 'var(--brand-primary)', fontWeight: 800 }}>03.</span>
                  <div>
                    <strong style={{ fontSize: '15px' }}>Telegram Bot Micro-Gym</strong>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Maintain your daily XP streak right from Telegram with 3-minute morning micro-challenges.</p>
                  </div>
                </div>
              </div>

              <button onClick={onStartDiagnostic} className="btn btn-primary">
                Discover Your 5-Axis Score Now →
              </button>
            </div>

            <div className="card" style={{ padding: '36px', textAlign: 'center' }}>
              <h4 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '6px' }}>Live Assessment Radar Preview</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>Comparison against Senior Global Remote Benchmark</p>
              <CEFRRadar skills={sampleRadarSkills} size={320} />
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Showcase */}
      <section id="curriculum" style={{ padding: '80px 0', background: 'var(--bg-elevated)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-streak" style={{ marginBottom: '12px' }}>Structured Progression</span>
            <h2 style={{ fontSize: '34px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '14px' }}>
              Specialized Curricula for Global Engineering Tracks
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto', fontSize: '16px' }}>
              Every lesson is paired with real workplace artifacts: GitHub PR comments, sprint burndown presentations, and executive slide decks.
            </p>
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading syllabi...</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
              {courses.map(c => (
                <CourseCard key={c.id} course={c} onSelect={onSelectCourse} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pricing Tiers */}
      <PricingTiers />

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '60px 0 40px', background: 'var(--bg-dark)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '20px' }}>🦅</span>
              <strong style={{ fontSize: '16px', fontWeight: 800 }}>PHOENIX LEARNING CENTER</strong>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              © 2026 Phoenix EdTech Inc. CEFR A1-C2 English Platform for Software Teams.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            <a href="https://t.me/PhoenixEnglishBot" target="_blank" rel="noreferrer">Telegram Bot</a>
            <a href="#curriculum">Curriculum</a>
            <a href="#pricing">Pricing</a>
            <a href="mailto:curriculum@phoenix-edtech.io">Corporate Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
