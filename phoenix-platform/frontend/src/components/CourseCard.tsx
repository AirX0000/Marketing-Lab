import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onSelect: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect }) => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <span className="badge badge-cefr">CEFR {course.cefr_level}</span>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>
            ⏱ {course.estimated_hours}h estimated
          </span>
        </div>

        <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px', lineHeight: 1.3 }}>
          {course.title}
        </h3>
        
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
          {course.tagline}
        </p>
      </div>

      <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', color: 'var(--brand-gold)', fontWeight: 700 }}>
          {course.modules_count} Intensive Modules
        </span>
        <button onClick={() => onSelect(course)} className="btn btn-sm btn-secondary">
          View Syllabus →
        </button>
      </div>
    </div>
  );
};
