const nav = document.querySelector("#nav")
const abrir = document.querySelector("#abrir")
const cerrar = document.querySelector("#cerrar")
const boton = document.querySelector("#btn")

// Obtiene el año actual
const año = new Date().getFullYear();
// Selecciona el elemento <span> con id "year" y actualiza su contenido
document.getElementById('year').textContent = año;

// Función para alternar una clase en un elemento
function toggleClass(element, className) {
    element.classList.toggle(className);
  }

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