import React, { useEffect, useState } from 'react';
import { LeaderboardUser, LevelInfo } from '../types';
import { api } from '../api/client';

interface GamifiedProgressProps {
  levelInfo?: LevelInfo;
  streakDays?: number;
}

export const GamifiedProgress: React.FC<GamifiedProgressProps> = ({ levelInfo, streakDays = 1 }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaders() {
      try {
        const data = await api.getLeaderboard();
        setLeaderboard(data);
      } catch (err) {
        // Fallback or silence
      } finally {
        setLoading(false);
      }
    }
    fetchLeaders();
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
      {/* Gamification Stats Card */}
      {levelInfo && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="badge badge-streak">Daily Streak: 🔥 {streakDays} Days</span>
            <span className="badge badge-xp">Level {levelInfo.level}</span>
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>
            {levelInfo.rank_title}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '18px' }}>
            {levelInfo.current_xp} XP earned · {levelInfo.next_level_xp - levelInfo.current_xp} XP to next rank
          </p>

          {/* XP Progress Bar */}
          <div style={{ width: '100%', height: 8, background: 'var(--bg-dark)', borderRadius: 99, overflow: 'hidden', marginBottom: '12px', border: '1px solid var(--border-subtle)' }}>
            <div style={{
              width: `${levelInfo.level_progress_percentage}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #2ed573, #ffa502)',
              transition: 'width 0.4s ease'
            }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span>Level {levelInfo.level}</span>
            <span>{levelInfo.level_progress_percentage}%</span>
            <span>Level {levelInfo.level + 1}</span>
          </div>
        </div>
      )}

      {/* Community Leaderboard Card */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800 }}>🏆 Community Leaderboard</h3>
          <span style={{ fontSize: '12px', color: 'var(--brand-gold)', fontWeight: 700 }}>Top Learners</span>
        </div>

        {loading ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading rankings...</p>
        ) : (
          <div style={{ display: 'grid', gap: '10px' }}>
            {leaderboard.slice(0, 5).map(u => (
              <div 
                key={u.rank} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: u.rank === 1 ? 'rgba(255, 165, 2, 0.1)' : 'var(--bg-dark)',
                  border: u.rank === 1 ? '1px solid rgba(255, 165, 2, 0.3)' : '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ 
                    fontWeight: 800, 
                    fontSize: '13px', 
                    width: 20, 
                    color: u.rank === 1 ? '#ffa502' : u.rank === 2 ? '#a4b0be' : '#e056fd' 
                  }}>
                    #{u.rank}
                  </span>
                  <div>
                    <strong style={{ fontSize: '14px', display: 'block' }}>{u.full_name}</strong>
                    <small style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{u.target_domain} · CEFR {u.cefr_level}</small>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brand-accent)' }}>
                    {u.xp_points} XP
                  </span>
                  <div style={{ fontSize: '11px', color: 'var(--brand-gold)' }}>🔥 {u.streak_days}d</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
