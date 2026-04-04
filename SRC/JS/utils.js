// ===============================
// Utilidades DOM seguras
// ===============================

/**
 * Selecciona un elemento del DOM de forma segura
 * @param {string} selector - Selector CSS
 * @param {Element} root - Elemento raíz de búsqueda (default: document)
 * @returns {Element|null}
 */
const $ = (selector, root = document) => root.querySelector(selector);

/**
 * Selecciona múltiples elementos del DOM
 * @param {string} selector - Selector CSS
 * @param {Element} root - Elemento raíz de búsqueda (default: document)
 * @returns {Array<Element>}
 */
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

/**
 * Agrega evento a un elemento de forma segura
 * @param {Element} element - Elemento destino
 * @param {string} eventType - Tipo de evento
 * @param {Function} handler - Función manejadora
 * @param {Object} options - Opciones (capture, once, passive)
 */
const safeOn = (element, eventType, handler, options) => 
  element && element.addEventListener(eventType, handler, options);

/**
 * Establece el año actual en el footer
 */
function setCurrentYear() {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

// ===============================
// Exportar para módulos
// ===============================
export { $, $$, safeOn, setCurrentYear };
