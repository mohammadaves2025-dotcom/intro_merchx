import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

export function ImagePlaceholder({
  src,
  alt = '',
  aspectRatio = 'aspect-video',
  caption = '',
  className = '',
  width,
  height
}) {
  const [imageError, setImageError] = useState(false);

  if (src && !imageError) {
    return (
      <div className={`relative overflow-hidden bg-cream ${aspectRatio} ${className}`}>
        <img
          src={src}
          alt={alt || caption || 'MerchX apparel and merchandise'}
          loading="lazy"
          width={width}
          height={height}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-cream border border-beige flex flex-col items-center justify-center p-6 text-center select-none ${aspectRatio} ${className}`}
      role="img"
      aria-label={caption || alt || 'Apparel showcase visual placeholder'}
    >
      <div className="flex flex-col items-center justify-center space-y-2 max-w-sm">
        <div className="w-10 h-10 rounded-full bg-beige/60 flex items-center justify-center text-charcoal/60">
          <ImageIcon className="w-5 h-5 text-grey" />
        </div>
        {caption && (
          <p className="text-xs sm:text-sm font-medium text-grey italic leading-snug">
            {caption}
          </p>
        )}
        <span className="text-[10px] font-bold tracking-widest uppercase text-green-primary/80">
          MerchX Showcase
        </span>
      </div>
    </div>
  );
}

