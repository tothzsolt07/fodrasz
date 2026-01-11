import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize all GSAP animations for the barber shop website
 * Based on the animation plan provided in the requirements
 */
export const initAnimations = () => {
  // Wait for DOM to be ready
  if (typeof window === 'undefined') return;

  // Use requestAnimationFrame to ensure DOM is ready
  requestAnimationFrame(() => {
    // Hero animations - image zoom and text fade-in
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
      gsap.from(heroImage, {
        scale: 1.05,
        duration: 0.8,
        ease: 'power3.out'
      });
    }

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      gsap.from(heroTitle, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: 'power3.out'
      });
    }

    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
      gsap.from(heroSubtitle, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.35,
        ease: 'power3.out'
      });
    }

    // CTA button pulse animation
    const ctaPrimary = document.querySelector('.cta-primary');
    if (ctaPrimary) {
      gsap.to(ctaPrimary, {
        scale: 1.03,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'sine.inOut'
      });
    }

    // Scroll-triggered section animations - használjunk fromTo explicit végállapotokkal
    const sections = gsap.utils.toArray('.animate-section');
    sections.forEach((section: any) => {
      gsap.fromTo(section, 
        {
          y: 60,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          }
        }
      );
    });

    // Animated headings
    const headings = gsap.utils.toArray('.animate-heading');
    headings.forEach((heading: any) => {
      gsap.fromTo(heading,
        {
          y: 40,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            once: true,
          }
        }
      );
    });

    // Service cards entrance animation
    const serviceCards = gsap.utils.toArray('.service-card');
    if (serviceCards.length > 0) {
      gsap.fromTo('.service-card',
        {
          y: 40,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.service-card',
            start: 'top 80%',
            once: true,
          }
        }
      );
    }

    // Portfolio gallery items
    const galleryItems = gsap.utils.toArray('.gallery-item--draggable');
    if (galleryItems.length > 0) {
      galleryItems.forEach((item: any) => {
        gsap.fromTo(item,
          {
            y: 40,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              once: true,
            }
          }
        );
      });
    }

    // Testimonial cards animation
    const testimonials = gsap.utils.toArray('.testimonial-card');
    testimonials.forEach((card: any, index: number) => {
      gsap.fromTo(card,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          }
        }
      );
    });
  });
};

/**
 * Service card hover animation
 */
export const setupServiceCardHovers = () => {
  const cards = document.querySelectorAll('.service-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -6,
        boxShadow: '0 10px 30px rgba(255, 212, 0, 0.12)',
        duration: 0.25,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.12)',
        duration: 0.25,
        ease: 'power2.out'
      });
    });
  });
};

/**
 * Booking wizard step transitions
 */
export const animateBookingStep = (fromEl: HTMLElement | null, toEl: HTMLElement | null, progressPercent: number) => {
  const tl = gsap.timeline();
  
  if (fromEl) {
    tl.to(fromEl, {
      x: -40,
      opacity: 0,
      duration: 0.35,
      ease: 'power3.in'
    });
  }
  
  if (toEl) {
    tl.fromTo(
      toEl,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
      '-=0.15'
    );
  }
  
  // Animate progress bar
  gsap.to('.booking-progress .bar', {
    width: `${progressPercent}%`,
    duration: 0.45,
    ease: 'power3.out'
  });
};

/**
 * Admin approval animation (calendar pulse)
 */
export const animateAdminApproval = () => {
  // Toast entrance
  gsap.fromTo(
    '.toast',
    { y: -20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }
  );
  
  // Calendar pulse
  const calendarIcon = document.querySelector('.calendar-pulse');
  if (calendarIcon) {
    gsap.fromTo(
      calendarIcon,
      { scale: 0.8, opacity: 0 },
      { scale: 1.1, opacity: 1, duration: 0.45, ease: 'elastic.out(1, 0.6)' }
    );
  }
};

/**
 * Focus state animations for accessibility
 */
export const setupAccessibilityAnimations = () => {
  document.addEventListener('focusin', (e) => {
    const target = e.target as HTMLElement;
    if (target.matches('button, a, input')) {
      gsap.to(target, {
        boxShadow: '0 0 0 4px rgba(255, 212, 0, 0.12)',
        duration: 0.18
      });
    }
  });

  document.addEventListener('focusout', (e) => {
    const target = e.target as HTMLElement;
    if (target.matches('button, a, input')) {
      gsap.to(target, {
        boxShadow: 'none',
        duration: 0.12
      });
    }
  });
};

/**
 * Gallery drag hint animation
 */
export const animateGalleryDragHint = () => {
  const firstGalleryItem = document.querySelector('.gallery-item--draggable');
  if (firstGalleryItem) {
    gsap.to(firstGalleryItem, {
      x: 6,
      duration: 0.12,
      yoyo: true,
      repeat: 3,
      ease: 'sine.inOut',
      delay: 1
    });
  }
};

/**
 * Lightbox modal animation
 */
export const animateLightbox = (element: HTMLElement) => {
  gsap.fromTo(
    element,
    { scale: 0.95, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.45, ease: 'power3.out' }
  );
};

/**
 * Modal/Wizard entrance animation
 */
export const animateModalEntrance = (element: HTMLElement) => {
  gsap.fromTo(
    element,
    { scale: 0.9, opacity: 0, y: 20 },
    { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
  );
};

/**
 * Stagger animation for lists
 */
export const staggerFadeIn = (selector: string, delay = 0) => {
  gsap.from(selector, {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: 'power3.out',
    delay
  });
};