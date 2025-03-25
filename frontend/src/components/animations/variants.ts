/**
 * Animation variants for the mini-games components
 * These variants ensure consistent animations across all sections
 */
export const variants = {
  /** Container animations for main images */
  imageContainer: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
  },

  /** Individual image animations with hover effect */
  image: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    whileHover: { scale: 1.02 },
    transition: { duration: 0.3 }
  },

  /** Main heading animations (h2) */
  title: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true }
  },

  /** Text content fade and slide animations */
  textContent: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, delay: 0.3 }
  },

  /** Subtitle animations (h3) */
  subtitle: {
    initial: { opacity: 0, x: -20 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.5, delay: 0.2 },
    viewport: { once: true }
  },

  /** Card animations with stagger effect support */
  card: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true }
  },

  /** Section entrance animations */
  section: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.8 },
    viewport: { once: true }
  },

  /** Interactive button animations */
  button: {
    initial: { opacity: 0.9 },
    whileHover: { scale: 1.05, opacity: 1 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2 }
  }
}; 