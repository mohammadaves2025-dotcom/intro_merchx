import React from 'react';
import { Palette, Globe, Cpu } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const iconMap = {
  Palette,
  Globe,
  Cpu
};

export function PillarCard({ pillar, variant = 'light' }) {
  const IconComponent = iconMap[pillar.icon] || Cpu;

  return (
    <Card variant={variant} className="h-full">
      <div className="w-12 h-12 rounded-xs bg-green-primary/10 text-green-primary flex items-center justify-center mb-5 shrink-0">
        <IconComponent className="w-6 h-6 text-green-primary" />
      </div>
      <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-tight mb-3">
        {pillar.title}
      </h3>
      <p className={`text-sm leading-relaxed ${
        variant === 'dark' ? 'text-neutral-300' : 'text-grey'
      }`}>
        {pillar.description}
      </p>
    </Card>
  );
}

