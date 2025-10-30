import React from "react";
import "./Campfire.css";
import "../theme/Theme.css";

type Props = { size?: number };

const Campfire: React.FC<Props> = ({ size = 240 }) => {
  const s = { width: size, height: size };
  return (
    <div className="campfire-wrap" style={s} aria-label="焚火アニメーション">
      <div className="campfire-glow" />
      <svg className="campfire" viewBox="0 0 200 200" role="img" aria-hidden="true">
        <defs>
          <radialGradient id="flame" cx="50%" cy="60%" r="60%">
            <stop offset="0%" stopColor="var(--ember)" />
            <stop offset="55%" stopColor="var(--warm2)" />
            <stop offset="100%" stopColor="var(--warm3)" />
          </radialGradient>
        </defs>
        <g className="flames">
          <path className="flame f1" d="M100 20 C 70 50, 80 80, 100 110 C 120 80, 130 50, 100 20 Z" fill="url(#flame)"/>
          <path className="flame f2" d="M100 40 C 85 60, 90 85, 100 105 C 110 85, 115 60, 100 40 Z" fill="url(#flame)"/>
          <path className="flame f3" d="M100 55 C 92 70, 95 85, 100 98 C 105 85, 108 70, 100 55 Z" fill="url(#flame)"/>
        </g>
        <g className="logs">
          <rect x="55" y="140" width="90" height="14" rx="7" fill="#6b4b3e" transform="rotate(-15 100 147)"/>
          <rect x="55" y="140" width="90" height="14" rx="7" fill="#6b4b3e" transform="rotate(15 100 147)"/>
          <circle cx="65" cy="145" r="4" fill="#3b2a24"/>
          <circle cx="135" cy="150" r="4" fill="#3b2a24"/>
        </g>
      </svg>
    </div>
  );
};

export default Campfire;
