// ===============================
// Script para página de Projects
// Reutiliza las clases principales
// ===============================

// Utilidades DOM
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const safeOn = (el, type, handler, opts) => el && el.addEventListener(type, handler, opts);

// Año del Footer
function initYear() {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

// Clase NavMenu (igual que en main.js)
class NavMenu {
  constructor() {
    this.nav = $("#nav");
    this.openBtn = $("#abrir");
    this.closeBtn = $("#cerrar");
    this.navLinks = $$(".navegation-list a");
    this.isOpen = false;

    if (this.nav && this.openBtn) {
      this.init();
    }
  }

  init() {
    safeOn(this.openBtn, "click", () => this.toggle());
    safeOn(this.closeBtn, "click", () => this.close());
    this.navLinks.forEach((link) => safeOn(link, "click", () => this.close()));
    safeOn(document, "click", (e) => this.handleOutsideClick(e));
    safeOn(document, "keydown", (e) => e.key === "Escape" && this.close());
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    if (this.isOpen) return;
    this.nav.classList.add("visible");
    this.openBtn.setAttribute("aria-expanded", "true");
    this.nav.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    this.isOpen = true;
  }

  close() {
    if (!this.isOpen) return;
    this.nav.classList.remove("visible");
    this.openBtn.setAttribute("aria-expanded", "false");
    this.nav.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
    this.isOpen = false;
  }

  handleOutsideClick(event) {
    const isClickInsideNav = this.nav.contains(event.target);
    const isClickOnOpenBtn = this.openBtn.contains(event.target);
    if (!isClickInsideNav && !isClickOnOpenBtn && this.isOpen) {
      this.close();
    }
  }
}

// Clase ScrollReveal (igual que en main.js)
class ScrollReveal {
  constructor() {
    this.elements = $$(".scroll-element");
    if (this.elements.length > 0) {
      this.init();
    }
  }

  init() {
    this.injectStyles();
    if ("IntersectionObserver" in window) {
      this.initIntersectionObserver();
    } else {
      this.initScrollFallback();
    }
  }

  injectStyles() {
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

  initIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -20% 0px", threshold: 0.1 }
    );
    this.elements.forEach((el) => observer.observe(el));
  }

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
    window.addEventListener("scroll", () => {
      if (isThrottled) return;
      isThrottled = true;
      window.requestAnimationFrame(() => {
        checkElements();
        isThrottled = false;
      });
    });
    checkElements();
  }
}

// Inicialización al cargar DOM
document.addEventListener("DOMContentLoaded", () => {
  initYear();
  new NavMenu();
  new ScrollReveal();
});