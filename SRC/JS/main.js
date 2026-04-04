// ===============================
// utilidades DOM seguras
// ===============================
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const safeOn = (el, type, handler, opts) => el && el.addEventListener(type, handler, opts);

// ===============================
// nodos
// ===============================
const nav = $("#nav");
const abrir = $("#abrir");
const cerrar = $("#cerrar");
const btnContact = $("#btn");                 // si existe
const nosotrosImg = $("#nosotros-imagen");    // si existe
const btnAbout = $("#btnAbout");
const aboutmeP = $("#aboutmeP");
const btnOculto = $("#btnOculto");            // si existe

// ===============================
// correo por mailto
// ===============================
function enviarCorreo() {
  const nombreEl  = $("#name");
  const subjectEl = $("#subject");
  const mensajeEl = $("#message");

  if (!nombreEl || !subjectEl || !mensajeEl) return;

  const nombre  = nombreEl.value.trim();
  const subject = subjectEl.value.trim();
  const mensaje = mensajeEl.value.trim();

  // Validación básica para evitar abrir un mailto vacío
  if (!subject && !mensaje && !nombre) {
    alert("Por favor, completa al menos un campo antes de enviar.");
    return;
  }

  const email = "maximilianodanna@hotmail.com";
  const body  = `Nombre: ${nombre}\n\nMensaje:\n${mensaje}`;
  // Importante: usar '&' y no '&amp;' al construir en JS
  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;
}

// exponemos si tu HTML la llama onsubmit / onclick
window.enviarCorreo = enviarCorreo;

// ===============================
// año del footer
// ===============================
const yearEl = $("#year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// ===============================
// navegacion responsive (abre/cierra)
// ===============================
function toggleNav() {
  if (!nav || !abrir) return;
  const isVisible = nav.classList.toggle("visible");
  // A11Y: sincronizamos estado del botón hamburguesa
  abrir.setAttribute("aria-expanded", String(isVisible));
}

safeOn(abrir, "click", toggleNav);
safeOn(cerrar, "click", toggleNav);

// Cerrar nav al hacer clic fuera (opcional)
safeOn(document, "click", (e) => {
  if (!nav || !abrir) return;
  const clickDentro = nav.contains(e.target) || abrir.contains(e.target);
  if (!clickDentro && nav.classList.contains("visible")) {
    toggleNav();
  }
});

// ===============================
// "Leer más" About me (toggle)
// ===============================
if (btnAbout && aboutmeP) {
  // Estados accesibles
  btnAbout.setAttribute("aria-controls", "aboutmeP");
  btnAbout.setAttribute("aria-expanded", "false");
  btnAbout.dataset.state = "collapsed"; // collapsed | expanded

  const updateAboutUI = () => {
    const expanded = btnAbout.dataset.state === "expanded";
    btnAbout.textContent = expanded ? "Leer menos…" : "Leer más…";
    btnAbout.setAttribute("aria-expanded", String(expanded));
    aboutmeP.classList.toggle("oculto", !expanded); // .oculto { display: none; } en CSS
  };

  // Estado inicial
  updateAboutUI();

  safeOn(btnAbout, "click", () => {
    btnAbout.dataset.state = btnAbout.dataset.state === "expanded" ? "collapsed" : "expanded";
    updateAboutUI();
  });
}

// ===============================
// efecto reveal on scroll (con IntersectionObserver)
// ===============================
const revealTargets = $$(".scroll-element");

if (revealTargets.length) {
  const onEnter = (el) => el.classList.add("visible");
  const onLeave = (el) => el.classList.remove("visible");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onEnter(entry.target);
          else onLeave(entry.target);
        });
      },
      { root: null, rootMargin: "0px 0px -20% 0px", threshold: 0.1 }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    // Fallback con rAF + throttle
    const revealOnScroll = () => {
      const triggerY = window.scrollY + window.innerHeight * 0.8;
      revealTargets.forEach((el) => {
        if (el.offsetTop < triggerY) onEnter(el);
        else onLeave(el);
      });
    };
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          revealOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
    revealOnScroll();
  }
}

// ===============================
// carrusel simple
// ===============================
const prevButton = $(".carousel-control.prev");
const nextButton = $(".carousel-control.next");
const carouselInner = $(".carousel-inner");
let currentIndex = 0;

function updateCarousel() {
  if (!carouselInner) return;
  const total = carouselInner.children.length;
  const clamped = Math.max(0, Math.min(currentIndex, total - 1));
  if (clamped !== currentIndex) currentIndex = clamped;

  const offset = -currentIndex * 100;
  carouselInner.style.transform = `translateX(${offset}%)`;

  // opacidad y estado accesible del item activo
  Array.from(carouselInner.children).forEach((item, index) => {
    const isActive = index === currentIndex;
    item.style.opacity = isActive ? "1" : "0.55";
    item.setAttribute("aria-hidden", String(!isActive));
    item.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function moveCarousel(direction) {
  if (!carouselInner) return;
  currentIndex += direction;
  updateCarousel();
}

safeOn(prevButton, "click", () => moveCarousel(-1));
safeOn(nextButton, "click", () => moveCarousel(1));

safeOn(document, "keydown", (e) => {
  if (!carouselInner) return;
  if (e.key === "ArrowLeft") moveCarousel(-1);
  if (e.key === "ArrowRight") moveCarousel(1);
});

if (carouselInner) {
  updateCarousel();
}
