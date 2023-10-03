const nav = document.querySelector("#nav")
const abrir = document.querySelector("#abrir")
const cerrar = document.querySelector("#cerrar")
const boton = document.querySelector("#btn")
const nosotros = document.querySelector("#nosotros-imagen")
const copyright = document.getElementById("copyright")
const fullStack = document.getElementById("h3")

let date = new Date()

abrir.addEventListener('click', () =>{
    nav.classList.add("visible")
})

cerrar.addEventListener('click', () =>{
    nav.classList.remove("visible")
})

abrir.addEventListener('click', () =>{
    btn.classList.add('invisible')
})

cerrar.addEventListener('click', () =>{
    btn.classList.remove('invisible')
})

abrir.addEventListener('click', () =>{
    nosotros.classList.add('invisible')
})

cerrar.addEventListener('click', () =>{
    nosotros.classList.remove('invisible')
})

const content = document.querySelector('.content');
let lastScrollTop = 0;

document.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    content.classList.add('animate__rubberBand');
  } else {
    content.classList.remove('animate__rubberBand');
  }

  lastScrollTop = scrollTop;
});


copyright.innerHTML = `All Rights Reserved ${date.getFullYear()} &copy;`