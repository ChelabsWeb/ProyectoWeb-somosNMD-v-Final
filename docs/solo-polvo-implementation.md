# Solo Polvo Section Implementation

## Overview
The "SOLO POLVO..." section is a cinematic particle text effect that appears after the Hero section. It features interactive particle animations using Three.js and GSAP scroll animations.

## Components

### ParticleText Component (`apps/web/src/components/effects/ParticleText.tsx`)
- **Purpose**: Renders text as interactive particles using Three.js
- **Features**:
  - Text rendering with particles sampled from canvas
  - Multiple interaction effects (default, spark, wave, vortex)
  - Mouse/touch interaction for particle manipulation
  - Drag to rotate the particle field
  - Respects reduced motion preference
  - Uses project's cinematic color palette (pink to blue gradient)

### SoloPolvoSection Component (`apps/web/src/components/sections/SoloPolvoSection.tsx`)
- **Purpose**: Section wrapper with GSAP scroll animations
- **Features**:
  - Fade-in and scale animation on scroll
  - Continuous floating animation
  - Background gradient with animated orbs
  - Parallax scrolling effect
  - Analytics tracking for section views

## Technical Details

### Dependencies
- **three**: 3D graphics library for particle rendering
- **@types/three**: TypeScript definitions for Three.js
- **gsap**: Animation library (already in project)
- **@nmd/animation**: Project's animation utilities

### Performance Optimizations
1. **Particle Count**: Limited to ~5000-8000 particles for optimal performance
2. **BufferGeometry**: Uses Three.js BufferGeometry for efficient rendering
3. **Sampling Rate**: Samples every 2 pixels from text to reduce particle count
4. **Reduced Motion**: Falls back to static gradient text when motion is disabled
5. **Canvas Size**: Fixed dimensions (1600x400) for consistent performance

### Scroll Animation Implementation
The particles animate from scattered positions to form the text "SOLO POLVO..." as the user scrolls:
1. **Initial State**: Particles start scattered randomly across the viewport
2. **Scroll Progress**: As the section enters the viewport, particles gradually move to form the text
3. **Complete State**: When the section reaches the center of the viewport, text is fully formed
4. **ScrollTrigger Configuration**:
   - Start: `top bottom` (when section enters viewport)
   - End: `center center` (when section is centered)
   - Scrub: Direct scrubbing for responsive feel
5. **Interpolation**: Uses eased interpolation between scattered and target positions

### Interaction Effects
- **Default**: Light particle scatter on mouse hover
- **Spark**: Strong scatter effect with more dramatic repulsion
- **Wave**: Ripple effect emanating from cursor position
- **Vortex**: Spiral pull effect around cursor

## Usage

The section is integrated into the main page flow:
```tsx
<LoaderSection />
<HeroSection />
<SoloPolvoSection />  // New section
<ArtistsSection />
```

## Customization

### Changing the Text
Edit the `text` prop in `SoloPolvoSection.tsx`:
```tsx
<ParticleText text="YOUR TEXT HERE" />
```

### Adjusting Colors
The particle colors use a gradient from pink to blue based on the project's palette:
```tsx
// In ParticleText.tsx
colors.push(
  0.92 + t * 0.08,  // R: pink to lighter
  0.17 + t * 0.35,  // G: pink to blue
  0.46 + t * 0.51   // B: pink to blue
);
```

### Modifying Effects
Effect parameters can be adjusted in the animation loop:
- `repelStrength`: Force of particle repulsion
- `effectRadius`: Radius of mouse interaction
- `attractStrength`: How strongly particles return to position
- `damping`: Smoothness of particle movement

## Accessibility

- **Reduced Motion**: Automatically detects and respects `prefers-reduced-motion`
- **Fallback**: Displays static gradient text when animations are disabled
- **ARIA Labels**: Proper semantic markup with descriptive labels
- **Keyboard Support**: Effect buttons are keyboard accessible

## Browser Support

- **WebGL Required**: Three.js requires WebGL support
- **Fallback**: Gracefully degrades to static text if WebGL unavailable
- **Performance**: Optimized for modern browsers (Chrome, Firefox, Safari, Edge)

## Analytics Events

- `solo_polvo_section_viewed`: Fired when section scroll animation completes

## Future Enhancements

1. Add more particle effects (explode, implode, morph)
2. Implement particle color transitions based on scroll position
3. Add audio visualization integration
4. Create mobile-optimized particle count
5. Add WebGL detection with custom fallback message