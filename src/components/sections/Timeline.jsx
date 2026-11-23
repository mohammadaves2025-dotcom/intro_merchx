import React from 'react';
import { StepTile } from './StepTile';

export function Timeline({ steps = [] }) {
  return (
    <div className="relative">
      {/* 6 Step Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {steps.map((step, idx) => (
          <StepTile
            key={step.number || idx}
            step={step}
            isLast={idx === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

