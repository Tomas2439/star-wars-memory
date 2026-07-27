# 🌌 Jedi Memory Card

Un juego de memoria interactivo con temática de Star Wars, construido como parte del currículo de **The Odin Project** (Módulo de React). Pon a prueba tu conexión con la Fuerza haciendo clic en las cartas, pero con una regla principal: **¡no hagas clic en la misma carta dos veces!**

[🔗 Juega la versión en vivo aquí](https://star-wars-memory.vercel.app/)

## 🎮 Características del Juego

- **Sistema de Puntuación:** El juego rastrea tu puntaje actual y guarda tu "Mejor Puntaje" localmente durante la sesión.
- **Niveles de Poder (Dificultad):** 
  - *Padawan:* Un tablero estándar de 8 cartas.
  - *Jedi:* Un desafío mayor con un tablero de 16 cartas.
- **Repartidor Inteligente:** Un algoritmo que asegura que, en cada ronda de 5 cartas mostradas, siempre haya al menos una opción válida (no clickeada) para evitar situaciones imposibles de ganar.
- **Consumo de API Externa:** Las imágenes y nombres de los personajes son obtenidos de manera dinámica utilizando una API de Star Wars.
- **Inmersión Retro:** Controles de música integrados (volumen ajustable) y diseño responsivo con estética inspirada en el universo de Star Wars.
- **Modales Personalizados:** Pantallas de victoria y derrota personalizadas (sin usar los molestos alerts del navegador).

## 🛠️ Tecnologías Utilizadas

- **React.js** (Functional Components, useState, useEffect, useRef)
- **Vite** (Herramienta de construcción y entorno de desarrollo local)
- **JavaScript (ES6+)**
- **CSS3** (Diseño flexible, Grid y animaciones de hover)
- **Star Wars API** (Akabab API para obtener los datos e imágenes en formato JSON)

## 🚀 Instalación y Uso Local

Si deseas clonar este repositorio y correr el proyecto en tu máquina local, sigue estos pasos:

1. Clona el repositorio:
´´´bash
git clone https://github.com/TU_USUARIO/jedi-memory-card.git
´´´
2. Navega al directorio del proyecto:
´´´bash
    cd jedi-memory-card
´´´
3. Instala las dependencias necesarias:
´´´bash
    npm install
´´´
4. Inicia el servidor de desarrollo local:
´´´bash
    npm run dev
´´´
5. Abre tu navegador y visita el enlace proporcionado por Vite (generalmente http://localhost:5173).

## 🧠 Aprendizajes del Proyecto

La construcción de esta aplicación fue un gran ejercicio para consolidar conceptos fundamentales de React:
- Manejo del ciclo de vida de los componentes con useEffect para hacer un fetch inicial a una API.
- Gestión de estado complejo con múltiples useState para controlar puntuaciones, modos de juego y el estado de la música.
- Principios de inmutabilidad en React al actualizar arreglos y barajar las cartas.
- Separación de responsabilidades dividiendo la interfaz en componentes más pequeños y reutilizables (Scoreboard, CardGrid, Card).

---
*Que la Fuerza te acompañe.* Desarrollo Practico realizado por Tomas2439
