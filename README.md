# 🛒 ShopStore - E-commerce

![Estado](https://img.shields.io/badge/Estado-Terminado-success)
![Curso](https://img.shields.io/badge/Curso-Talento%20Tech-blue)
![Licencia](https://img.shields.io/badge/Licencia-MIT-green)

> Proyecto final para el curso de **Desarrollo Web Front-End** de **Talento Tech**.
> Una aplicación web de comercio electrónico moderna, funcional y responsiva que consume datos de una API externa.

---

## 🚀 Demo en Vivo

Puedes ver el proyecto funcionando aquí:
👉 **[Ver Sitio Web en Netlify](https://delightful-capybara-233303.netlify.app/)**

---

## 📋 Características Principales

Este proyecto simula el flujo completo de una tienda online:

* **Catálogo Dinámico:** Los productos se cargan automáticamente desde una API externa (DummyJSON).
* **Carrito de Compras Persistente:** Uso de `LocalStorage` para que no pierdas tus productos al recargar la página.
* **Detalle de Producto:** Página individual con información ampliada de cada ítem.
* **Buscador en Tiempo Real:** Barra de búsqueda funcional que filtra productos desde la API.
* **Formulario de Contacto:** Integración con **Formspree** para envío de correos reales.
* **Diseño Responsivo:** Adaptado a móviles, tablets y escritorio.
* **Simulación de Auth:** Páginas de Login y Registro (Frontend only).

---

## 🛠️ Tecnologías Utilizadas

El proyecto fue construido utilizando tecnologías web estándar sin frameworks pesados, para demostrar el dominio del lenguaje base.

* ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) **HTML5 Semántico**
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) **CSS3 Moderno** (Flexbox & Grid)
* ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) **JavaScript Vanilla (ES6+)**
* **Fetch API** (Consumo de datos asíncrono)
* **Local Storage** (Persistencia de datos)

---

## 📂 Estructura del Proyecto

```text
├── css/
│   └── style.css          # Estilos globales y responsivos
├── js/
│   ├── index.js           # Lógica de la página principal
│   ├── detalle.js         # Lógica de vista de producto
│   ├── carrito.js         # Lógica del carrito (LocalStorage)
│   └── search-results.js  # Lógica de búsqueda
├── index.html             # Página de inicio
├── carrito.html           # Vista del carrito
├── contacto.html          # Formulario de contacto
├── detalle.html           # Vista de detalle
├── search-results.html    # Resultados de búsqueda
└── README.md              # Documentación
