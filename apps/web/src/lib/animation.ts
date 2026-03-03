export const springPreset = {
  type: "spring",
  stiffness: 400,
  damping: 25,
  mass: 1,
};

export const bentoHoverPreset = {
  scale: 1.02,
  transition: { ...springPreset },
};

export const gooeyToastPreset = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: -20 },
  transition: springPreset,
};
