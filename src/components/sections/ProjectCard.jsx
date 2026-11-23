import React from 'react';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Info, ExternalLink } from 'lucide-react';

export function ProjectCard({ project, variant = 'dark' }) {
  const isDark = variant === 'dark';

  return (
    <div className={`rounded-xs border overflow-hidden ${
      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-beige text-charcoal'
    }`}>
      {/* Top Green Accent */}
      <div className="h-1.5 w-full bg-green-primary" />

      {/* Image Grid / Hero Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 bg-neutral-950/20">
        {project.images && project.images.length > 0 ? (
          project.images.map((img, idx) => (
            <div key={idx} className="relative overflow-hidden aspect-[4/3] rounded-xs bg-neutral-800">
              <img
                src={img}
                alt={`${project.client} — ${project.title} apparel`}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))
        ) : (
          <ImagePlaceholder
            aspectRatio="aspect-[4/3]"
            caption={project.placeholderCaption || 'MerchX Project Showcase'}
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-green-primary">
            {project.category}
          </span>
          <span className={`text-xs font-semibold ${isDark ? 'text-neutral-400' : 'text-grey'}`}>
            {project.client}
          </span>
        </div>

        <h3 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-4">
          {project.title}
        </h3>

        <p className={`text-sm sm:text-base leading-relaxed mb-6 ${
          isDark ? 'text-neutral-300' : 'text-grey'
        }`}>
          {project.description}
        </p>

        {/* Mandatory Disclaimer (Brief Rule 4) */}
        {project.disclaimer && (
          <div className="p-3.5 mb-6 rounded-xs bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-600 dark:text-amber-300 font-medium leading-relaxed">
              {project.disclaimer}
            </p>
          </div>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-beige/20">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-xs ${
                  isDark
                    ? 'bg-neutral-800 text-neutral-300'
                    : 'bg-cream text-charcoal'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Live Storefront External Link */}
        {project.link && (
          <div className="mt-6 pt-4 border-t border-beige/20 flex flex-wrap items-center justify-between gap-3">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-primary hover:bg-green-dark text-white font-heading text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xs transition-colors shadow-sm"
            >
              <span>Visit Live JMI Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="text-[11px] text-neutral-400 italic">
              Live E-Commerce Platform
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

