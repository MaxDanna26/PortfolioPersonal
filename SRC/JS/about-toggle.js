// ===============================
// Toggle "Leer más" / "Leer menos"
// ===============================

import { $, safeOn } from './utils.js';

class AboutToggle {
  constructor() {
    this.btn = $("#btnAbout");
    this.content = $("#aboutmeP");
    this.isExpanded = false;

    if (this.btn && this.content) {
      this.init();
    }
  }

  /**
   * Inicializa el toggle
   */
  init() {
    // Configurar atributos accesibles
    this.btn.setAttribute("aria-controls", "aboutmeP");
    this.btn.setAttribute("aria-expanded", "false");

    // Mostrar texto inicial
    this.updateUI();

    // Evento de click
    safeOn(this.btn, "click", () => this.toggle());
  }

  /**
   * Alterna entre expandido y colapsado
   */
  toggle() {
    this.isExpanded = !this.isExpanded;
    this.updateUI();
  }

  /**
   * Actualiza el texto del botón y visibilidad del contenido
   */
  updateUI() {
    const text = this.isExpanded ? "Leer menos…" : "Leer más…";
    this.btn.textContent = text;
    this.btn.setAttribute("aria-expanded", String(this.isExpanded));

    // Agregar/remover clase para ocultar con CSS
    if (this.isExpanded) {
      this.content.classList.remove("oculto");
    } else {
      this.content.classList.add("oculto");
    }
  }
}

export default AboutToggle;
