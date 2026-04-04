# Portfolio Personal · Maximiliano Danna

Portfolio web personal enfocado en mostrar proyectos reales, experiencia profesional y propuesta de valor como desarrollador Full Stack con foco en UX/UI.

## Vista general

Este proyecto fue refactorizado para mejorar:

- Experiencia de usuario en mobile y desktop
- Jerarquía visual y claridad de contenido
- Escalabilidad de estilos con arquitectura SCSS modular
- Consistencia entre Home, Projects y componentes compartidos
- Calidad general de UI con animaciones y microinteracciones

## Demo

- Home: /HTML/index.html
- Projects: /HTML/projects.html
- Proyecto destacado Love.app: https://love-app-delta.vercel.app/

## Stack

- HTML5
- SCSS (arquitectura por parciales)
- JavaScript Vanilla
- Gulp (pipeline de build)

## Funcionalidades

- Navegación responsive con menú móvil
- Secciones con animaciones y scroll reveal
- Carrusel de formación renderizado dinámicamente
- Grid de proyectos con cards modernas y CTA claros
- Card destacada de experiencia profesional actual
- Footer rediseñado con foco UX/UI y accesibilidad
- Favicon custom (cursor cream)

## Estructura del proyecto

```
PortfolioPersonal/
├── build/
│   └── css/
├── HTML/
│   ├── index.html
│   └── projects.html
├── SRC/
│   ├── JS/
│   │   ├── main.js
│   │   └── projects.js
│   └── SCSS/
│       ├── app.scss
│       ├── _tokens.scss
│       ├── base/
│       └── contenido/
├── SVG/
├── gulpfile.js
└── package.json
```

## Instalación y uso local

### 1) Clonar repositorio

```
git clone https://github.com/TU-USUARIO/TU-REPO.git
cd TU-REPO
```

### 2) Instalar dependencias

```
npm install
```

### 3) Ejecutar entorno de desarrollo

```
npm run dev
```

### 4) Build de producción

```
npm run build
```

## Scripts disponibles

- npm run dev: entorno de desarrollo con tareas de Gulp
- npm run build: compilación final de estilos y assets

## Objetivo del refactor

Este refactor no fue solo estético: se trabajó para que el portfolio refleje una forma profesional de construir producto digital.

- Mejorar rendimiento visual y legibilidad
- Reducir fricción de navegación
- Comunicar mejor experiencia técnica y de negocio
- Mantener base limpia para futuras iteraciones

## Próximas mejoras

- Modo multilenguaje (ES/EN)
- Optimización de imágenes y carga diferida
- Mejoras SEO on-page
- Página de detalle por proyecto

## Autor

**Maximiliano Danna**

- LinkedIn: https://www.linkedin.com/in/maximiliano-gaspar-danna-67b862266/
- GitHub: https://github.com/maxdanna26
- Email: maximilianodanna@hotmail.com

---

Si te gustó el proyecto o querés conectar para colaborar, escribime.
