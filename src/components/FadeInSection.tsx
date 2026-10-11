import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  id?: string;
  as?: React.ElementType;
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 700,
  direction = 'up',
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  id,
  as: Component = 'div',
}) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold,
    rootMargin,
    triggerOnce,
    delay,
  });

  const getDirectionClasses = () => {
    switch (direction) {
      case 'up':
        return isVisible ? 'translate-y-0' : 'translate-y-8 sm:translate-y-12';
      case 'down':
        return isVisible ? 'translate-y-0' : '-translate-y-8 sm:-translate-y-12';
      case 'left':
        return isVisible ? 'translate-x-0' : 'translate-x-8 sm:translate-x-12';
      case 'right':
        return isVisible ? 'translate-x-0' : '-translate-x-8 sm:-translate-x-12';
      case 'none':
      default:
        return '';
    }
  };

  return (
    <Component
      ref={ref}
      id={id}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${getDirectionClasses()} ${className}`}
    >
      {children}
    </Component>
  );
};
