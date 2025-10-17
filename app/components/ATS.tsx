import React from 'react';

export interface ATSSuggestion {
  type: 'good' | 'improve';
  tip: string;
}

export interface ATSProps {
  score: number; // 0-100
  suggestions: ATSSuggestion[];
  className?: string;
}

const getScoreStyles = (score: number) => {
  if (score > 69) {
    return {
      gradientFrom: 'from-green-100',
      icon: '/icons/ats-good.svg',
      titleColor: 'text-green-700',
      ring: 'ring-green-200',
    } as const;
  }
  if (score > 49) {
    return {
      gradientFrom: 'from-yellow-100',
      icon: '/icons/ats-warning.svg',
      titleColor: 'text-yellow-700',
      ring: 'ring-yellow-200',
    } as const;
  }
  return {
    gradientFrom: 'from-red-100',
    icon: '/icons/ats-bad.svg',
    titleColor: 'text-red-700',
    ring: 'ring-red-200',
  } as const;
};

const ATS: React.FC<ATSProps> = ({ score, suggestions, className = '' }) => {
  const { gradientFrom, icon, titleColor, ring } = getScoreStyles(score);

  return (
    <section
      className={`rounded-2xl bg-gradient-to-br ${gradientFrom} to-white ring-1 ${ring} p-5 sm:p-6 ${className}`}
      aria-label={`ATS score card with score ${score}`}
    >
      {/* Top: Icon + Headline */}
      <div className="flex items-center gap-3 mb-3">
        <img src={icon} alt="ATS status" className="w-8 h-8" />
        <h3 className={`text-xl sm:text-2xl font-bold ${titleColor}`}>
          ATS Score – {Math.max(0, Math.min(100, Math.round(score)))}/100
        </h3>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <h4 className="text-base sm:text-lg font-semibold text-gray-800">Applicant Tracking System (ATS) Readiness</h4>
        <p className="text-sm text-gray-500">
          This reflects how well your resume can be parsed and understood by common ATS software. Improve structure,
          keywords, and formatting to increase your chances of getting through automated screenings.
        </p>
      </div>

      {/* Suggestions list */}
      <ul className="mt-4 space-y-2">
        {suggestions && suggestions.length > 0 ? (
          suggestions.map((s, idx) => {
            const isGood = s.type === 'good';
            return (
              <li key={idx} className="flex items-start gap-3">
                <img
                  src={isGood ? '/icons/check.svg' : '/icons/warning.svg'}
                  alt={isGood ? 'Good' : 'Improve'}
                  className="w-5 h-5 mt-0.5"
                />
                <p className={`text-sm ${isGood ? 'text-gray-800' : 'text-gray-700'}`}>{s.tip}</p>
              </li>
            );
          })
        ) : (
          <li className="text-sm text-gray-500">No ATS suggestions available.</li>
        )}
      </ul>

      {/* Closing line */}
      <p className="mt-4 text-sm text-gray-600">
        Keep refining your resume—small improvements can significantly boost your ATS compatibility.
      </p>
    </section>
  );
};

export default ATS;
