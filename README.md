# Wumpus World

[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38b2ac)](https://tailwindcss.com/)
[![Lucide](https://img.shields.io/badge/Lucide-Icons-8B5CF6)](https://lucide.dev/)
[![SweetAlert2](https://img.shields.io/badge/SweetAlert2-11-orange)](https://sweetalert2.github.io/)

**Wumpus World** es una implementación interactiva del clásico juego de inteligencia artificial. El objetivo es explorar un tablero, recolectar el oro y regresar a la salida, mientras esquivas al temible Wumpus y los peligrosos pozos.

El juego incorpora **dos modos de IA** para demostrar conceptos de inteligencia artificial:
- **Modo Aleatorio**: movimientos completamente aleatorios.
- **Modo Inteligente**: el jugador usa búsqueda heurística (distancia Manhattan) y el Wumpus persigue activamente.

---

## Capturas de pantalla

| Juego | Win |
|:---:|:---:|
|![Game Screenshot](https://github.com/AshleyLlamasTEC/wumpus-world/blob/main/public/screenshots/game.png)| ![Victory Screenshot](https://github.com/AshleyLlamasTEC/wumpus-world/blob/main/public/screenshots/game-victory.png)|

*Ejemplo de partida en modo inteligente: el jugador (azul) busca el oro (amarillo) mientras el Wumpus (rojo) lo persigue.*

---

## Características

- **Dos modos de juego**: Aleatorio vs. Inteligente.
- **IA heurística**: búsqueda de camino más corto evitando obstáculos.
- **Diseño moderno**: Tailwind CSS + Lucide React.
- **Fully responsive**: funciona en móvil, tablet y escritorio.
- **Rápido y ligero**: construido con Vite.
- **Feedback visual**: SweetAlert2 para victorias y derrotas.
- **Reinicio**: sin recargar la página.

---

## Tecnologías

- **React 18** con Hooks y componentes funcionales.
- **Vite** como bundler y servidor de desarrollo.
- **Tailwind CSS 4** para estilos utilitarios.
- **Lucide React** para iconos vectoriales.
- **SweetAlert2** para modales de fin de partida.
- **PropTypes** para validación de props.

---

## Instalación y uso

### Prerrequisitos

- Node.js >= 18.x
- npm o yarn

### Pasos

**1. Clona el repositorio:**

git clone https://github.com/AshleyLlamasTEC/wumpus-world.git

cd wumpus-world

**Instala las dependencias:**

bash
npm install

**Inicia el servidor de desarrollo:**

bash
npm run dev
Abre http://localhost:5173 en tu navegador.

Build para producción
bash
npm run build

---

## Cómo jugar
**Selecciona un modo:**
- **Aleatorio**: el jugador y el Wumpus se mueven al azar.
- **Inteligente**: el jugador usa IA heurística (distancia Manhattan) y el Wumpus persigue al jugador.

**Objetivo**: 
Recoge el oro y regresa a la salida.

**Peligros**:
- El Wumpus te atrapará si te acercas.
- Los pozos te harán caer y perder.

**Feedback**:
Cada movimiento se muestra en el panel de estado. Al ganar o perder, aparecerá un modal con opciones para reiniciar.

## IA Implementada
**Distancia Manhattan**:
Se usa como heurística para encontrar el camino más corto.

**Movimiento inteligente**:
- El jugador se dirige al oro o a la salida.
- El Wumpus persigue al jugador.

**Personalización**
- Cambiar iconos
- Puedes reemplazar los SVG en src/components/icons/ con tus propios iconos. Asegúrate de que tengan viewBox="0 0 24 24" para consistencia.

**Modificar la IA**
Edita src/hooks/useWumpusAI.js para ajustar la heurística o agregar nuevos comportamientos.

---

## Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o pull request con tus mejoras.

---

## Agradecimientos
Inspirado en el clásico juego de "Hunt the Wumpus" gracias a mi profe de IA Noé del TecNM.

*Construido con ❤️ para fines educativos de IA.*
