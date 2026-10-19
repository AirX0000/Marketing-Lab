import React, { useState } from 'react';
import { api } from '../api/client';

export const PricingTiers: React.FC = () => {
  const [b2bModal, setB2bModal] = useState(false);
  const [b2bName, setB2bName] = useState('');
  const [b2bEmail, setB2bEmail] = useState('');
  const [b2bCompany, setB2bCompany] = useState('');
  const [b2bSize, setB2bSize] = useState('5-15');
  const [b2bSuccess, setB2bSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleB2bSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.submitLead({
        name: b2bName,
        email: b2bEmail,
        company_name: b2bCompany,
        cohort_size: b2bSize,
      });
      setB2bSuccess(true);
    } catch (err) {
      alert('Failed to submit inquiry. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="pricing" style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="badge badge-cefr" style={{ marginBottom: '12px' }}>Transparent Investment</span>
          <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '14px' }}>
            Elevate Your Engineering Team's Global Standing
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto', fontSize: '16px' }}>
            Choose the trajectory that matches your career milestones—from self-paced placement to enterprise corporate cohorts.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
          {/* Starter Free */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="badge badge-streak" style={{ marginBottom: '14px' }}>Diagnostic Baseline</span>
              <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>Self-Study Starter</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                For individual engineers seeking to pinpoint CEFR blindspots.
              </p>
              <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '24px' }}>
                $0 <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>/ Free forever</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <li>✓ Full 5-Axis CEFR Diagnostic Assessment</li>
                <li>✓ Personalized Career Competency Radar</li>
                <li>✓ Core Technical English Glossary (350+ terms)</li>
                <li>✓ Public Telegram Bot Daily Vocabulary Bites</li>
              </ul>
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="btn btn-secondary" 
              style={{ width: '100%', marginTop: '30px' }}
            >
              Take Free Diagnostic →
            </button>
          </div>

          {/* Pro Career Sprint */}
          <div className="card" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            border: '2px solid var(--brand-primary)',
            boxShadow: '0 0 35px var(--brand-primary-glow)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: -14,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #ff4757, #ffa502)',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 800,
              padding: '4px 14px',
              borderRadius: 99,
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              Most Popular for Tech Leads
            </div>

            <div>
              <span className="badge badge-cefr" style={{ marginBottom: '14px' }}>Professional Accelerator</span>
              <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>Pro Career Track</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Interactive roleplays, PR review gyms, and negotiation masterclasses.
              </p>
              <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '24px' }}>
                $39 <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>/ month (billed annually)</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <li>✓ <strong>All 3 CEFR Curricula</strong> (B1 through C2 tracks)</li>
                <li>✓ <strong>Daily Standup Gym:</strong> Interactive voice & async simulations</li>
                <li>✓ <strong>Pull Request Sandbox:</strong> Diplomatic hedging & code critiques</li>
                <li>✓ <strong>Telegram Sync:</strong> Deep-linked streaks and mobile micro-quizzes</li>
                <li>✓ <strong>Executive Salary Negotiation</strong> roleplay frameworks</li>
              </ul>
            </div>
            <button 
              onClick={() => alert('Stripe Checkout Simulator: In production, redirects to payment gateway.')} 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '30px' }}
            >
              Start 7-Day Free Trial 🚀
            </button>
          </div>

          {/* Enterprise B2B */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="badge badge-xp" style={{ marginBottom: '14px' }}>Corporate Cohorts</span>
              <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>Enterprise Team B2B</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Upskill remote development teams for global client-facing communication.
              </p>
              <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '24px' }}>
                $1,200 <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>/ team cohort (up to 15)</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <li>✓ Custom Glossary based on <strong>your company tech stack</strong></li>
                <li>✓ Weekly Mock Architecture Reviews with Native Tech Leads</li>
                <li>✓ HR Team Dashboard: Track CEFR elevation & employee engagement</li>
                <li>✓ SLA CEFR Level Advancement Guarantee</li>
                <li>✓ Dedicated Curriculum Advisor & Invoicing via Bank/Transfer</li>
              </ul>
            </div>
            <button 
              onClick={() => { setB2bModal(true); setB2bSuccess(false); }} 
              className="btn btn-outline" 
              style={{ width: '100%', marginTop: '30px' }}
            >
              Request Enterprise Proposal →
            </button>
          </div>
        </div>
      </div>

      {/* B2B Consultation Modal */}
      {b2bModal && (
        <div className="modal-overlay" onClick={() => setB2bModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 800 }}>Enterprise Team Consultation</h3>
              <button onClick={() => setB2bModal(false)} style={{ fontSize: '20px', color: 'var(--text-muted)' }}>✕</button>
            </div>

            {b2bSuccess ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: '42px', marginBottom: '12px' }}>✅</div>
                <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Inquiry Registered!</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
                  Our Corporate English Director will reach out to schedule an engineering communications audit.
                </p>
                <button onClick={() => setB2bModal(false)} className="btn btn-secondary">Close</button>
              </div>
            ) : (
              <form onSubmit={handleB2bSubmit}>
                <div className="form-group">
                  <label className="form-label">Contact Name *</label>
                  <input type="text" required className="form-input" placeholder="e.g. Dmitry Ivanov (CTO / Head of HR)" value={b2bName} onChange={e => setB2bName(e.target.value)} />
                </div>

                <div className="form-group">
                  <label className="form-label">Corporate Email *</label>
                  <input type="email" required className="form-input" placeholder="dmitry@company.com" value={b2bEmail} onChange={e => setB2bEmail(e.target.value)} />
                </div>

                <div className="form-group">
                  <label className="form-label">Company / Product Name *</label>
                  <input type="text" required className="form-input" placeholder="e.g. Payme, InDrive, IT Park" value={b2bCompany} onChange={e => setB2bCompany(e.target.value)} />
                </div>

                <div className="form-group">
                  <label className="form-label">Engineers in Cohort</label>
                  <select className="form-input" value={b2bSize} onChange={e => setB2bSize(e.target.value)}>
                    <option value="5-15">5 – 15 Engineers</option>
                    <option value="15-50">15 – 50 Engineers</option>
                    <option value="50+">50+ Engineers (Full Division)</option>
                  </select>
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', marginTop: '14px' }}>
                  {isSubmitting ? 'Submitting...' : 'Submit Enterprise Request 🚀'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
