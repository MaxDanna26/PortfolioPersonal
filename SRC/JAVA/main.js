const nav = document.querySelector("#nav")
const abrir = document.querySelector("#abrir")
const cerrar = document.querySelector("#cerrar")
const boton = document.querySelector("#btn")
const nosotros = document.querySelector("#nosotros-imagen")
const btnAbout = document.getElementById("btnAbout")
const aboutmeP = document.getElementById("aboutmeP")
const btnOculto = document.getElementById("btnOculto")
let date = new Date()

// Función para alternar una clase en un elemento
function toggleClass(element, className) {
  element.classList.toggle(className);
}
btnAbout.textContent = "Leer mas ->"
// Llamo a la funcion para mostrar/ocultar secciones y botón
btnAbout.addEventListener('click', () => {
  if(btnAbout.textContent == "Leer menos <-")
    btnAbout.textContent = "Leer mas ->"
  else if(btnAbout.textContent == "Leer mas ->")
    btnAbout.textContent = "Leer menos <-";
  toggleClass(aboutmeP, "oculto");
});

// Llamo a la funcion para mostrar/ocultar el menú de navegación
abrir.addEventListener('click', () => {
  toggleClass(nav, "visible");
});

cerrar.addEventListener('click', () => {
  toggleClass(nav, "visible");
});

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.scroll-element');

  const revealOnScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.8;

      elements.forEach(element => {
          if (element.offsetTop < scrollPosition) {
            element.classList.add('visible');
          } else {
              element.classList.remove('visible');
          }
      });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Para verificar la visibilidad inicial
});