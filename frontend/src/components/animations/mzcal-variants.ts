export const mzcalVariants = {
  section: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  fadeIn: {
    initial: { 
      opacity: 0,
      y: 20
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      y: -20
    }
  },
  utility: {
    container: {
      initial: { opacity: 0 },
      animate: { 
        opacity: 1,
        transition: {
          staggerChildren: 0.2
        }
      }
    },
    list: {
      initial: { opacity: 0 },
      animate: { 
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    },
    item: {
      initial: { opacity: 0.5, x: -10 },
      animate: { opacity: 1, x: 0 },
      hover: { x: 10, opacity: 1 }
    },
    description: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.3 }
    }
  },
  card: {
    initial: { 
      opacity: 0,
      y: 50
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      y: -50
    }
  }
};
