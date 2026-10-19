import React, { useState, useEffect } from 'react';
import { DiagnosticTest as IDiagnosticTest, DiagnosticResult, DiagnosticQuestion } from '../types';
import { api } from '../api/client';
import { CEFRRadar } from './CEFRRadar';
import { useAuth } from '../context/AuthContext';

interface DiagnosticTestProps {
  onComplete: () => void;
  onNavigateToPricing: () => void;
}

export const DiagnosticTest: React.FC<DiagnosticTestProps> = ({ onComplete, onNavigateToPricing }) => {
  const { user } = useAuth();
  const [test, setTest] = useState<IDiagnosticTest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  
  // Lead capture state prior to showing certificate
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadName, setLeadName] = useState(user?.full_name || '');
  const [leadEmail, setLeadEmail] = useState(user?.email || '');
  const [leadPhone, setLeadPhone] = useState('');

  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchTest() {
      try {
        const tests = await api.getDiagnosticTests();
        if (tests.length > 0) {
          const fullTest = await api.getDiagnosticTest(tests[0].slug);
          setTest(fullTest);
        } else {
          setError('No diagnostic assessments are currently active.');
        }
      } catch (err) {
        setError('Failed to load diagnostic assessment. Please check backend connection.');
      } finally {
        setLoading(false);
      }
    }
    fetchTest();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '16px' }}>⚡</div>
        <h3>Compiling CEFR Assessment Items...</h3>
        <p style={{ color: 'var(--text-muted)' }}>Calibrating technical grammar, system architecture, and standup scenarios.</p>
      </div>
    );
  }

  if (error || !test || !test.questions || test.questions.length === 0) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <p style={{ color: 'var(--brand-primary)', marginBottom: '16px' }}>{error || 'Test unavailable'}</p>
        <button onClick={onComplete} className="btn btn-secondary">Return Home</button>
      </div>
    );
  }

  const questions = test.questions;
  const currentQ: DiagnosticQuestion = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Reached the end: open lead modal if user is anonymous, otherwise submit directly
      if (!user) {
        setShowLeadModal(true);
      } else {
        submitTestResults();
      }
    }
  };

  const submitTestResults = async () => {
    setIsSubmitting(true);
    try {
      const answersList = Object.entries(selectedAnswers).map(([qId, optId]) => ({
        question_id: qId,
        selected_option_id: optId,
      }));

      const res = await api.submitDiagnostic({
        test_id: test.id,
        answers: answersList,
        lead_name: leadName || undefined,
        lead_email: leadEmail || undefined,
        lead_phone: leadPhone || undefined,
      });

      setResult(res);
      setShowLeadModal(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- RESULTS SCREEN ---
  if (result) {
    const radarData = [
      { skill: 'Technical Grammar', score: result.breakdown.grammar_score, benchmark: 75 },
      { skill: 'Systems Lexicon', score: result.breakdown.tech_vocab_score, benchmark: 80 },
      { skill: 'Architecture Reading', score: result.breakdown.comprehension_score, benchmark: 70 },
      { skill: 'Standup Fluency', score: Math.min(100, result.score_percentage + 4), benchmark: 75 },
      { skill: 'Executive Negotiation', score: Math.max(30, result.score_percentage - 8), benchmark: 85 },
    ];

    return (
      <div className="container" style={{ padding: '60px 24px', maxWidth: '860px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '48px 36px', marginBottom: '32px' }}>
          <span className="badge badge-cefr" style={{ marginBottom: '16px' }}>Official CEFR Placement Certificate</span>
          
          <div style={{
            width: 110,
            height: 110,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 71, 87, 0.2), rgba(255, 165, 2, 0.2))',
            border: '3px solid var(--brand-primary)',
            boxShadow: '0 0 35px var(--brand-primary-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '42px',
            fontWeight: 800,
            color: '#fff'
          }}>
            {result.assigned_cefr}
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>
            CEFR Level {result.assigned_cefr} · Empirical Score {result.score_percentage}%
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 28px' }}>
            Based on international CEFR diagnostic benchmarking across software engineering standups, architectural RFC reviews, and incident retrospectives.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '36px' }}>
            <div style={{ background: 'var(--bg-dark)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <small style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Grammar Accuracy</small>
              <strong style={{ fontSize: '20px', color: '#ff6b81' }}>{result.breakdown.grammar_score}%</strong>
            </div>
            <div style={{ background: 'var(--bg-dark)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <small style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Systems Vocabulary</small>
              <strong style={{ fontSize: '20px', color: '#ffa502' }}>{result.breakdown.tech_vocab_score}%</strong>
            </div>
            <div style={{ background: 'var(--bg-dark)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <small style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Technical Reading</small>
              <strong style={{ fontSize: '20px', color: '#2ed573' }}>{result.breakdown.comprehension_score}%</strong>
            </div>
          </div>

          {/* CEFR Competency Radar */}
          <div style={{ padding: '24px 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', marginBottom: '36px' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>5-Axis Engineering Competency Radar</h4>
            <CEFRRadar skills={radarData} size={300} />
          </div>

          {/* Recommendations */}
          <div style={{ textAlign: 'left', marginBottom: '36px' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Personalized Career Trajectory & Action Plan</h4>
            <div style={{ display: 'grid', gap: '14px' }}>
              {result.detailed_recommendations.map((rec, i) => (
                <div key={i} style={{ background: 'var(--bg-elevated)', borderLeft: '4px solid var(--brand-primary)', padding: '16px 20px', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
                  {rec.focus_area && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <strong style={{ color: 'var(--text-main)', fontSize: '15px' }}>{rec.focus_area}</strong>
                      <span className="badge badge-streak" style={{ fontSize: '10px' }}>Priority: {rec.priority}</span>
                    </div>
                  )}
                  {rec.advice && <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{rec.advice}</p>}
                  {rec.suggested_track && (
                    <div style={{ marginTop: '8px', color: 'var(--brand-accent)', fontWeight: 700, fontSize: '14px' }}>
                      🎯 Recommended Sprint: {rec.suggested_track} ({rec.duration})
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={onNavigateToPricing} className="btn btn-primary">
              Enroll in Recommended Track →
            </button>
            <button onClick={onComplete} className="btn btn-secondary">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- QUESTION RUNNER SCREEN ---
  return (
    <div className="container" style={{ padding: '60px 24px', maxWidth: '780px' }}>
      {/* Test Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div>
          <span className="badge badge-cefr">CEFR Level {currentQ.cefr_level}</span>
          <span style={{ marginLeft: '10px', fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Track: {currentQ.section.replace('_', ' ')}
          </span>
        </div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--brand-gold)' }}>
          Item {currentIndex + 1} of {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ width: '100%', height: 6, background: 'var(--bg-elevated)', borderRadius: 99, marginBottom: '32px', overflow: 'hidden' }}>
        <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #ff4757, #ffa502)', transition: 'width 0.3s ease' }}></div>
      </div>

      {/* Question Card */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 700, lineHeight: 1.4, marginBottom: '14px' }}>
          {currentQ.prompt}
        </h3>

        {/* Context snippet if provided */}
        {currentQ.context_snippet && (
          <div className="code-context">
            {currentQ.context_snippet}
          </div>
        )}

        {/* Options */}
        <div style={{ display: 'grid', gap: '12px', marginTop: '20px' }}>
          {currentQ.options.map(opt => {
            const isSelected = selectedAnswers[currentQ.id] === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                style={{
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected ? '2px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'rgba(255, 71, 87, 0.12)' : 'var(--bg-dark)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  border: isSelected ? '6px solid var(--brand-primary)' : '2px solid var(--text-muted)',
                  background: isSelected ? '#fff' : 'transparent',
                  flexShrink: 0
                }} />
                <span style={{ fontSize: '15px', color: isSelected ? '#fff' : 'var(--text-main)', fontWeight: isSelected ? 600 : 400 }}>
                  {opt.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="btn btn-secondary"
          style={{ visibility: currentIndex === 0 ? 'hidden' : 'visible' }}
        >
          ← Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!selectedAnswers[currentQ.id]}
          className="btn btn-primary"
        >
          {currentIndex === questions.length - 1 ? 'Complete & View Certificate →' : 'Next Item →'}
        </button>
      </div>

      {/* Lead Capture Modal before viewing Results */}
      {showLeadModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <span className="badge badge-cefr" style={{ marginBottom: '12px' }}>Placement Assessment Finalized</span>
            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>
              Where should we send your CEFR Certificate?
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
              Enter your professional details to unlock your 5-axis competency breakdown and career recommendations.
            </p>

            <form onSubmit={e => { e.preventDefault(); submitTestResults(); }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Alex Morozov"
                  value={leadName}
                  onChange={e => setLeadName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Work or Personal Email *</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  placeholder="alex@techlead.io"
                  value={leadEmail}
                  onChange={e => setLeadEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Telegram Handle or Phone (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="@telegram_handle or +998 90..."
                  value={leadPhone}
                  onChange={e => setLeadPhone(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '14px' }}
              >
                {isSubmitting ? 'Evaluating Assessment...' : 'Reveal My Official CEFR Score 🚀'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
