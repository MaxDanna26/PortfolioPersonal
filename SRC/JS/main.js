// Utilidades DOM
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const safeOn = (el, type, handler, opts) => el && el.addEventListener(type, handler, opts);

// ===============================
// Datos del Carrusel de Educación
// ===============================
var EDUCATION_DATA = [
  {
    type: "Bootcamp",
    title: "Full Stack Angular - 2023",
    description: "Maquetacion de proyectos webs en distintos lenguajes enfocado a aprender patrones de programación, manejo de gitHub y bases de datos relacionales.",
    links: [
      { icon: "star", iconType: "solid", url: "https://www.linkedin.com/in/maximiliano-danna-67b862266/details/education/1712490972755/single-media-viewer/?profileId=ACoAAEFENz8BunUIgOHbPXktp5dYTBxQwMRFVkY", label: "Certificado LinkedIn" },
      { icon: "link-alt", iconType: "solid", url: "https://www.red.es/es/actualidad/noticias/conoce-e-inscribete-los-cursos-de-talento-digital-para-jovenes-y-personas", label: "Web del curso" },
      { icon: "github", iconType: "logo", url: "https://github.com/MaxDanna26/PorfolioAngular_FullStack", label: "Repositorio GitHub" }
    ]
  },
  {
    type: "Bootcamp",
    title: "Php y BDDD - 2023",
    description: "Conocimientos de bases de datos, diseño, manipulación de datos, desarrollo web dinámico, transacciones, vistas, y optimización.",
    links: [
      { icon: "star", iconType: "solid", url: "https://www.linkedin.com/in/maximiliano-danna-67b862266/details/education/1712491216560/single-media-viewer/?profileId=ACoAAEFENz8BunUIgOHbPXktp5dYTBxQwMRFVkY", label: "Certificado LinkedIn" },
      { icon: "link-alt", iconType: "solid", url: "https://pimecformacio.org/es/", label: "Web del curso" },
      { icon: "github", iconType: "logo", url: "https://github.com/MaxDanna26/ProyectoFinal_PHPyBDD", label: "Repositorio GitHub" }
    ]
  },
  {
    type: "Certificado",
    title: "Azure Fundamentals - 2023",
    description: "Conocimiento de nivel básico de los servicios en la nube y cómo se brindan esos servicios con Microsoft Azure.",
    links: [
      { icon: "star", iconType: "solid", url: "https://www.credly.com/badges/5fe75ab4-b558-4b74-95bd-06b06d7c4a3a/linked_in_profile", label: "Badge Credly" },
      { icon: "link-alt", iconType: "solid", url: "https://learn.microsoft.com/es-es/credentials/certifications/azure-fundamentals/?practice-assessment-type=certification", label: "Web oficial" }
    ]
  },
  {
    type: "Bootcamp",
    title: "Full Stack C# y .Net - 2023",
    description: "Fundamentos de programacion orientada a objetos con C# y .NET, git control de versiones, desarrollo web estático, bases de datos SQL y Frontend.",
    links: [
      { icon: "link-alt", iconType: "solid", url: "https://fundacionesplai.org/programa/formacion-tic-e-insercion-laboral/", label: "Web del curso" },
      { icon: "github", iconType: "logo", url: "https://github.com/MaxDanna26/WindowsForms_FundacionSplai", label: "Repositorio GitHub" }
    ]
  },
  {
    type: "Escuela",
    title: "42 Barcelona - 2024",
    description: "Fundamentos de programacion con C, git, softskills y examenes semanales para ingresar a la escuela 42 reconocida en toda Europa creada por la compañia Telefonica.",
    links: [
      { icon: "link-alt", iconType: "solid", url: "https://www.42barcelona.com/es", label: "Web 42 Barcelona" },
      { icon: "github", iconType: "logo", url: "https://github.com/MaxDanna26/42Barcelona", label: "Repositorio GitHub" }
    ]
  }
];

// ===============================
// Año del Footer
// ===============================
function initYear() {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

// ===============================
// Menú de Navegación
// ===============================
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

// ===============================
// Reveal on Scroll
// Fade + Slide arriba 500ms
// ===============================
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

// ===============================
// Carrusel con Swipe
// ===============================
class Carousel {
  constructor() {
    this.prevBtn = $(".carousel-control.prev");
    this.nextBtn = $(".carousel-control.next");
    this.carouselInner = $(".carousel-inner");
    this.currentIndex = 0;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.minSwipeDistance = 50;

    if (this.carouselInner) {
      this.render();
      this.init();
    }
  }

  render() {
    this.carouselInner.innerHTML = EDUCATION_DATA.map(function(item, index) {
      var linksHTML = item.links.map(function(link) {
        var iconHTML = link.icon === 'link-alt'
          ? '<img src="/build/IMG/linkIcon.svg" alt="' + link.label + '" class="iconoCert">'
          : '<box-icon class="iconoCert" name="' + link.icon + '" type="' + link.iconType + '" color="#4E342E" style="color:#4E342E"></box-icon>';
        
        return '<a href="' + link.url + '" aria-label="' + link.label + '" target="_blank" rel="noopener noreferrer">'
          + iconHTML
          + '</a>';
      }).join('');

      return '<div class="carousel-item" aria-hidden="' + (index !== 0) + '" aria-current="' + (index === 0) + '">'
        + '<div class="cardCert">'
        + '<p class="titleCard titleCard--type">' + item.type + '</p>'
        + '<p class="titleCard titleCard--main">' + item.title + '</p>'
        + '<p class="pcard">' + item.description + '</p>'
        + '<div class="iconosCert">' + linksHTML + '</div>'
        + '</div>'
        + '</div>';
    }).join('');
  }

  init() {
    this.update();
    this.setupEvents();
  }

  setupEvents() {
    safeOn(this.prevBtn, "click", () => this.move(-1));
    safeOn(this.nextBtn, "click", () => this.move(1));
    safeOn(document, "keydown", (e) => {
      if (e.key === "ArrowLeft") this.move(-1);
      if (e.key === "ArrowRight") this.move(1);
    });
    safeOn(this.carouselInner, "touchstart", (e) => this.handleSwipeStart(e), false);
    safeOn(this.carouselInner, "touchend", (e) => this.handleSwipeEnd(e), false);
  }

  handleSwipeStart(event) {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  handleSwipeEnd(event) {
    this.touchEndX = event.changedTouches[0].clientX;
    this.detectSwipe();
  }

  detectSwipe() {
    const swipeDistance = this.touchStartX - this.touchEndX;
    if (Math.abs(swipeDistance) > this.minSwipeDistance) {
      this.move(swipeDistance > 0 ? 1 : -1);
    }
  }

  move(direction) {
    this.currentIndex += direction;
    this.update();
  }

  update() {
    const total = this.carouselInner.children.length;
    this.currentIndex = Math.max(0, Math.min(this.currentIndex, total - 1));
    const offset = -this.currentIndex * 100;
    this.carouselInner.style.transform = `translateX(${offset}%)`;

    Array.from(this.carouselInner.children).forEach((item, index) => {
      const isActive = index === this.currentIndex;
      item.style.opacity = isActive ? "1" : "0.55";
      item.setAttribute("aria-hidden", String(!isActive));
      item.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }
}

// ===============================
// Toggle "Leer más" / "Leer menos"
// ===============================
class AboutToggle {
  constructor() {
    this.btn = $("#btnAbout");
    this.content = $("#aboutmeP");
    this.aboutSection = $("#aboutme");
    this.isExpanded = false;

    if (this.btn && this.content) {
      this.init();
    }
  }

  init() {
    this.btn.setAttribute("aria-controls", "aboutmeP");
    this.btn.setAttribute("aria-expanded", "false");
    this.updateUI();
    safeOn(this.btn, "click", () => this.toggle());
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
    this.updateUI();

    // Al contraer el texto, vuelve suavemente al bloque AboutMe
    // para no dejar al usuario "atrapado" más abajo en el scroll.
    if (!this.isExpanded) {
      this.scrollBackToAbout();
    }
  }

  scrollBackToAbout() {
    if (!this.aboutSection) return;

    const header = $(".header");
    const headerOffset = header ? header.offsetHeight + 12 : 12;
    const sectionTop = this.aboutSection.getBoundingClientRect().top + window.scrollY;
    const targetTop = Math.max(0, sectionTop - headerOffset);

    // Pequeño delay para que inicie el colapso visual antes del scroll.
    window.setTimeout(() => {
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }, 120);
  }

  updateUI() {
    const textEl = this.btn.querySelector(".btnAbout__text");
    const text = this.isExpanded ? "Ver menos" : "Ver más";
    
    if (textEl) {
      textEl.textContent = text;
    }
    
    this.btn.setAttribute("aria-expanded", String(this.isExpanded));

    if (this.isExpanded) {
      this.content.classList.remove("oculto");
    } else {
      this.content.classList.add("oculto");
    }
  }
}

// ===============================
// Mailto (para formulario contacto)
// ===============================
function enviarCorreo() {
  const nombreEl = $("#name");
  const subjectEl = $("#subject");
  const mensajeEl = $("#message");

  if (!nombreEl || !subjectEl || !mensajeEl) return;

  const nombre = nombreEl.value.trim();
  const subject = subjectEl.value.trim();
  const mensaje = mensajeEl.value.trim();

  if (!subject && !mensaje && !nombre) {
    alert("Por favor, completa al menos un campo antes de enviar.");
    return;
  }

  const email = "maximilianodanna@hotmail.com";
  const body = `Nombre: ${nombre}\n\nMensaje:\n${mensaje}`;
  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
}

window.enviarCorreo = enviarCorreo;

// ===============================
// Inicialización
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  initYear();
  new NavMenu();
  new ScrollReveal();
  new Carousel();
  new AboutToggle();
});
