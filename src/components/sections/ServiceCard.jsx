import React from 'react';
import { Palette, Globe, Factory, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const iconMap = {
  Palette,
  Globe,
  Factory,
  ShieldCheck,
  Truck
};

export function ServiceCard({ service, variant = 'light' }) {
  const IconComponent = iconMap[service.icon] || Sparkles;

  return (
    <Card variant={variant} className="h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xs bg-green-primary/10 text-green-primary flex items-center justify-center shrink-0">
          <IconComponent className="w-6 h-6 text-green-primary" />
        </div>
        <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-tight leading-tight">
          {service.title}
        </h3>
      </div>

      <p className={`text-sm sm:text-base leading-relaxed mb-6 ${
        variant === 'dark' ? 'text-neutral-300' : 'text-grey'
      }`}>
        {service.summary}
      </p>

      <div className="mt-auto pt-4 border-t border-beige/40">
        <p className="text-[11px] font-bold uppercase tracking-wider text-green-primary mb-2.5">
          Key Capabilities
        </p>
        <ul className="space-y-2">
          {service.bullets.map((bullet, idx) => (
            <li
              key={idx}
              className={`text-xs sm:text-sm flex items-start gap-2.5 ${
                variant === 'dark' ? 'text-neutral-300' : 'text-charcoal'
              }`}
            >
              <span className="w-1.5 h-1.5 bg-green-primary rounded-full mt-1.5 shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

