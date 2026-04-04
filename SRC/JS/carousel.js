// ===============================
// Carrusel con Swipe
// ===============================

import { $, safeOn } from './utils.js';

class Carousel {
  constructor() {
    this.prevBtn = $(".carousel-control.prev");
    this.nextBtn = $(".carousel-control.next");
    this.carouselInner = $(".carousel-inner");
    this.currentIndex = 0;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.minSwipeDistance = 50; // píxeles mínimos para detectar swipe

    if (this.carouselInner) {
      this.init();
    }
  }

  /**
   * Inicializa el carrusel
   */
  init() {
    this.update();
    this.setupEvents();
  }

  /**
   * Configura todos los eventos
   */
  setupEvents() {
    // Botones de navegación
    safeOn(this.prevBtn, "click", () => this.move(-1));
    safeOn(this.nextBtn, "click", () => this.move(1));

    // Teclado
    safeOn(document, "keydown", (event) => {
      if (event.key === "ArrowLeft") this.move(-1);
      if (event.key === "ArrowRight") this.move(1);
    });

    // Swipe en móvil
    safeOn(this.carouselInner, "touchstart", (event) => this.handleSwipeStart(event), false);
    safeOn(this.carouselInner, "touchend", (event) => this.handleSwipeEnd(event), false);
  }

  /**
   * Guarda la posición de inicio del swipe
   */
  handleSwipeStart(event) {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  /**
   * Detecta y ejecuta el swipe
   */
  handleSwipeEnd(event) {
    this.touchEndX = event.changedTouches[0].clientX;
    this.detectSwipe();
  }

  /**
   * Determine dirección del swipe y navega
   */
  detectSwipe() {
    const swipeDistance = this.touchStartX - this.touchEndX;

    if (Math.abs(swipeDistance) > this.minSwipeDistance) {
      // Swipe a la izquierda (siguiente)
      if (swipeDistance > 0) {
        this.move(1);
      } 
      // Swipe a la derecha (anterior)
      else {
        this.move(-1);
      }
    }
  }

  /**
   * Mueve el carrusel en una dirección
   * @param {number} direction - 1 para siguiente, -1 para anterior
   */
  move(direction) {
    this.currentIndex += direction;
    this.update();
  }

  /**
   * Actualiza el estado visual del carrusel
   */
  update() {
    const totalItems = this.carouselInner.children.length;

    // Limpia el índice dentro de los límites
    this.currentIndex = Math.max(0, Math.min(this.currentIndex, totalItems - 1));

    // Aplica transformación
    const offset = -this.currentIndex * 100;
    this.carouselInner.style.transform = `translateX(${offset}%)`;

    // Actualiza estados accesibles de los items
    Array.from(this.carouselInner.children).forEach((item, index) => {
      const isActive = index === this.currentIndex;
      item.style.opacity = isActive ? "1" : "0.55";
      item.setAttribute("aria-hidden", String(!isActive));
      item.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }
}

export default Carousel;
