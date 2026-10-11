import { useState, useEffect, useRef, RefObject } from 'react';

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T | null>, boolean] {
  const {
    threshold = 0.12,
    rootMargin = '0px 0px -40px 0px',
    triggerOnce = true,
    delay = 0,
  } = options;

  const elementRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    // If reduced motion is preferred, show immediately without animation delay
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return true;
      }
    }
    return false;
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Fallback if IntersectionObserver is not available
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    // Check prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    let timeoutId: number | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (delay > 0) {
            timeoutId = window.setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }

          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return [elementRef, isVisible];
}
