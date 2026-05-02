import { useInView } from 'react-intersection-observer';

export const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const container = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export function useScrollAnimation(options = {}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    ...options,
  });

  return { ref, inView };
}
