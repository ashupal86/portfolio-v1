import React from 'react';
import * as simpleIcons from 'simple-icons';
import { FaJava, FaAws } from 'react-icons/fa';

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className = '' }: TechIconProps) {
  // Normalize the name to find the right simple-icon (e.g., 'Node.js' -> 'siNodejs')
  const normalizedName = name.replace(/[\s.-]/g, '').toLowerCase();
  
  // Try to find the icon matching the slug
  let icon = null;
  const iconsArray = Object.values(simpleIcons);
  
  for (const ic of iconsArray) {
    if (ic.slug === normalizedName) {
      icon = ic;
      break;
    }
  }
  
  // Some manual overrides for common mismatches
  if (!icon) {
    if (normalizedName === 'html/css') {
      const htmlIcon = iconsArray.find(i => i.slug === 'html5');
      const cssIcon = iconsArray.find(i => i.slug === 'css3');
      
      if (htmlIcon && cssIcon) {
        return (
          <div className={`flex items-center gap-1 ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', verticalAlign: 'middle', marginRight: '6px' }}>
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d={htmlIcon.path} />
            </svg>
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d={cssIcon.path} />
            </svg>
          </div>
        );
      }
    } else if (normalizedName === 'ui/uxdesign' || normalizedName === 'ui/ux') {
      icon = iconsArray.find(i => i.slug === 'figma');
    } else if (normalizedName === 'restapis') {
      icon = iconsArray.find(i => i.slug === 'postman');
    } else if (normalizedName === 'websockets') {
      icon = iconsArray.find(i => i.slug === 'socketdotio');
    } else if (normalizedName === 'next.js' || normalizedName === 'nextjs') {
      icon = iconsArray.find(i => i.slug === 'nextdotjs');
    } else if (normalizedName === 'framermotion') {
      icon = iconsArray.find(i => i.slug === 'framer');
    } else if (normalizedName === 'sql') {
      icon = iconsArray.find(i => i.slug === 'postgresql');
    }
  }

  // React Icons fallback for removed simple-icons
  if (normalizedName === 'java') {
    return <FaJava className={className} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} size={16} title="Java" />;
  }
  if (normalizedName === 'aws') {
    return <FaAws className={className} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} size={16} title="AWS" />;
  }

  if (!icon) return null;

  return (
    <svg 
      role="img" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      width="16" 
      height="16" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}
    >
      <title>{name}</title>
      <path d={icon.path} />
    </svg>
  );
}
