// ===============================
// Lógica del Menú de Navegación
// ===============================

import { $, $$, safeOn } from './utils.js';

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

  /**
   * Inicializa los eventos del menú
   */
  init() {
    safeOn(this.openBtn, "click", () => this.toggle());
    safeOn(this.closeBtn, "click", () => this.close());
    
    // Cerrar menú al clickear un link
    this.navLinks.forEach((link) => 
      safeOn(link, "click", () => this.close())
    );

    // Cerrar menú al hacer clic fuera
    safeOn(document, "click", (event) => this.handleOutsideClick(event));

    // Cerrar menú con tecla Escape
    safeOn(document, "keydown", (event) => {
      if (event.key === "Escape") this.close();
    });
  }

  /**
   * Abre o cierra el menú (toggle)
   */
  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  /**
   * Abre el menú
   */
  open() {
    if (this.isOpen) return;
    
    this.nav.classList.add("visible");
    this.openBtn.setAttribute("aria-expanded", "true");
    this.nav.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    this.isOpen = true;
  }

  /**
   * Cierra el menú
   */
  close() {
    if (!this.isOpen) return;
    
    this.nav.classList.remove("visible");
    this.openBtn.setAttribute("aria-expanded", "false");
    this.nav.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
    this.isOpen = false;
  }

  /**
   * Maneja clicks fuera del menú
   */
  handleOutsideClick(event) {
    const isClickInsideNav = this.nav.contains(event.target);
    const isClickOnOpenBtn = this.openBtn.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnOpenBtn && this.isOpen) {
      this.close();
    }
  }
}

export default NavMenu;
