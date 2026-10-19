import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenDiagnostic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenDiagnostic }) => {
  const { user, login, register, logout } = useAuth();
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      if (authModal === 'login') {
        await login(authEmail, authPassword);
      } else {
        await register(authEmail, authPassword, authName);
      }
      setAuthModal(null);
      setAuthEmail('');
      setAuthPassword('');
      setAuthName('');
      onNavigate('dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAuthError(err.message);
      } else {
        setAuthError('Authentication failed. Please verify credentials.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(9, 10, 15, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '14px 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')} 
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ff4757, #ffa502)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(255, 71, 87, 0.4)',
              fontSize: '18px'
            }}>
              🦅
            </div>
            <div>
              <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em', display: 'block', lineHeight: 1.1 }}>
                PHOENIX
              </span>
              <span style={{ fontSize: '11px', color: 'var(--brand-primary)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                EdTech · CEFR IT English
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button 
              onClick={() => onNavigate('home')} 
              style={{ color: currentView === 'home' ? 'var(--brand-primary)' : 'var(--text-secondary)', fontWeight: 600, fontSize: '14px' }}
            >
              Curriculum
            </button>
            <button 
              onClick={onOpenDiagnostic} 
              style={{ color: currentView === 'diagnostic' ? 'var(--brand-primary)' : 'var(--text-secondary)', fontWeight: 600, fontSize: '14px' }}
            >
              Diagnostic Test
            </button>
            <a 
              href="#pricing" 
              onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
              style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '14px' }}
            >
              Pricing
            </a>
            <a 
              href="https://t.me/PhoenixEnglishBot" 
              target="_blank" 
              rel="noreferrer" 
              style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>🤖</span> Telegram Bot
            </a>
          </nav>

          {/* User Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="badge badge-streak" title="Daily Learning Streak">
                  🔥 {user.streak_days}d
                </span>
                {user.cefr_level && (
                  <span className="badge badge-cefr">
                    {user.cefr_level}
                  </span>
                )}
                <button 
                  onClick={() => onNavigate('dashboard')} 
                  className={`btn btn-sm ${currentView === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={logout} 
                  className="btn btn-sm btn-outline" 
                  title="Log out"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button 
                  onClick={() => { setAuthModal('login'); setAuthError(null); }} 
                  className="btn btn-sm btn-secondary"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => { setAuthModal('register'); setAuthError(null); }} 
                  className="btn btn-sm btn-primary"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {authModal && (
        <div className="modal-overlay" onClick={() => setAuthModal(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 800 }}>
                {authModal === 'login' ? 'Sign In to Phoenix' : 'Create Student Account'}
              </h3>
              <button onClick={() => setAuthModal(null)} style={{ fontSize: '20px', color: 'var(--text-muted)' }}>
                ✕
              </button>
            </div>

            {authError && (
              <div style={{
                background: 'rgba(255, 71, 87, 0.15)',
                border: '1px solid #ff4757',
                color: '#ff6b81',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '18px',
                fontSize: '13px'
              }}>
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit}>
              {authModal === 'register' && (
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Alex Morozov"
                    value={authName}
                    onChange={e => setAuthName(e.target.value)}
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  placeholder="alex@tech.io"
                  value={authEmail}
                  onChange={e => setAuthEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  className="form-input"
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={e => setAuthPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '10px' }}
              >
                {authLoading ? 'Processing...' : (authModal === 'login' ? 'Sign In →' : 'Create Free Account →')}
              </button>

              <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                {authModal === 'login' ? (
                  <>Don't have an account? <span onClick={() => { setAuthModal('register'); setAuthError(null); }} style={{ color: 'var(--brand-primary)', cursor: 'pointer', fontWeight: 600 }}>Sign up free</span></>
                ) : (
                  <>Already enrolled? <span onClick={() => { setAuthModal('login'); setAuthError(null); }} style={{ color: 'var(--brand-primary)', cursor: 'pointer', fontWeight: 600 }}>Sign in</span></>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
