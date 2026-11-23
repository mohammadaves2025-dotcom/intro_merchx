import React from 'react';
import { Linkedin, User } from 'lucide-react';

export function TeamCard({ member }) {
  if (!member || !member.name) return null;

  return (
    <div className="bg-white border border-beige rounded-xs overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <div className="h-1 w-full bg-green-primary" />
      <div className="p-6 sm:p-8 flex-1 flex flex-col">
        {/* Photo / Avatar Placeholder */}
        <div className="w-20 h-20 rounded-full bg-cream border border-beige flex items-center justify-center mb-6 overflow-hidden">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <User className="w-10 h-10 text-grey" />
          )}
        </div>

        <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-charcoal">
          {member.name}
        </h3>

        <p className="text-xs font-bold uppercase tracking-wider text-green-primary mt-1 mb-4">
          {member.role}
        </p>

        {member.bio && (
          <p className="text-sm text-grey leading-relaxed flex-1">
            {member.bio}
          </p>
        )}

        {member.linkedin && (
          <div className="mt-6 pt-4 border-t border-beige">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal hover:text-green-primary transition-colors"
            >
              <Linkedin className="w-4 h-4 text-green-primary" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

