import React from 'react';

export function StepTile({ step, isLast = false, light = false }) {
  return (
    <div className="relative flex flex-col p-6 rounded-xs bg-white border border-beige hover:border-green-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-md group">
      {/* Top green accent indicator */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-heading text-4xl sm:text-5xl font-black text-green-primary leading-none group-hover:scale-105 transition-transform origin-left">
          {step.number}
        </span>
        <span className="h-1.5 w-6 bg-beige group-hover:bg-green-primary transition-colors" />
      </div>

      <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-tight text-charcoal mb-2 leading-snug">
        {step.title}
      </h3>

      <p className="text-sm text-grey leading-relaxed">
        {step.description}
      </p>
    </div>
  );
}

