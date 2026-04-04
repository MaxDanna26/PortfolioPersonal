// ===============================
// Efecto Reveal on Scroll
// Fade + Slide arriba en 500ms
// ===============================

import { $$ } from './utils.js';

class ScrollReveal {
  constructor() {
    this.elements = $$(".scroll-element");
    this.animationDuration = 500; // ms

    if (this.elements.length > 0) {
      this.init();
    }
  }

  /**
   * Inicializa el efecto de reveal
   */
  init() {
    this.injectStyles();

    if ("IntersectionObserver" in window) {
      this.initIntersectionObserver();
    } else {
      this.initScrollFallback();
    }
  }

  /**
   * Inyecta estilos CSS para la animación
   */
  injectStyles() {
    // Verificar si ya existe el estilo
    if (!document.getElementById("scroll-reveal-styles")) {
      const styles = document.createElement("style");
      styles.id = "scroll-reveal-styles";
      styles.textContent = `
        .scroll-element {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .scroll-element.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `;
      document.head.appendChild(styles);
    }
  }

  /**
   * Inicializa con IntersectionObserver (recomendado, eficiente)
   */
  initIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Opcional: dejar de observar después de animar
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -20% 0px",
        threshold: 0.1,
      }
    );

    this.elements.forEach((el) => observer.observe(el));
  }

  /**
   * Fallback para navegadores antiguos (scroll throttled)
   */
  initScrollFallback() {
    let isThrottled = false;

    const checkElements = () => {
      const triggerPoint = window.scrollY + window.innerHeight * 0.8;

      this.elements.forEach((el) => {
        if (el.offsetTop < triggerPoint && !el.classList.contains("visible")) {
          el.classList.add("visible");
        }
      });
    };

    const handleScroll = () => {
      if (isThrottled) return;

      isThrottled = true;
      window.requestAnimationFrame(() => {
        checkElements();
        isThrottled = false;
      });
    };

    window.addEventListener("scroll", handleScroll);
    checkElements(); // Verificar al cargar
  }
}

export default ScrollReveal;
