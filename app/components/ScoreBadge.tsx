import React from 'react';

export interface ScoreBadgeProps {
  score: number;
  className?: string;
}

/**
 * ScoreBadge
 * Renders a small badge that describes the strength of a numeric score.
 *
 * Rules:
 * - score > 70: green badge, label "Strong"
 * - score > 49: yellow badge, label "Good Start"
 * - else: red badge, label "Needs Work"
 *
 * Styling uses Tailwind utility classes like bg-badge-green, text-green-600, etc.
 * The component returns a styled div with a single p element inside.
 */
const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score, className = '' }) => {
  let label = 'Needs Work';
  let bgClass = 'bg-badge-red';
  let textClass = 'text-red-600';
  let ringClass = 'ring-red-200';

  if (score > 70) {
    label = 'Strong';
    bgClass = 'bg-badge-green';
    textClass = 'text-green-600';
    ringClass = 'ring-green-200';
  } else if (score > 49) {
    label = 'Good Start';
    bgClass = 'bg-badge-yellow';
    textClass = 'text-yellow-700';
    ringClass = 'ring-yellow-200';
  }

  return (
    <div
      className={`inline-flex items-center rounded-full px-3 py-1 ${bgClass} ring-1 ${ringClass} ${className}`}
      aria-label={`Score badge: ${label}`}
    >
      <p className={`text-xs font-medium leading-none ${textClass}`}>{label}</p>
    </div>
  );
};

export default ScoreBadge;
