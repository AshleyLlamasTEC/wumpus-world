import { GRID_SIZE, PITS_COUNT, INITIAL_POSITION } from './constants';

/**
 * Calcula la distancia Manhattan entre dos posiciones
 */
export const calculateDistance = (pos1, pos2) =>
  Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);

/**
 * Genera una posición aleatoria dentro del tablero, evitando posiciones ocupadas
 */
export const generateRandomPosition = (occupied) => {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (occupied.has(`${pos.x},${pos.y}`));
  return pos;
};

/**
 * Obtiene un movimiento aleatorio válido desde una posición dada
 */
export const getRandomMove = (currentPos) => {
  const directions = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ];
  const valid = directions
    .map((d) => ({ x: currentPos.x + d.x, y: currentPos.y + d.y }))
    .filter((p) => p.x >= 0 && p.x < GRID_SIZE && p.y >= 0 && p.y < GRID_SIZE);
  return valid.length > 0 ? valid[Math.floor(Math.random() * valid.length)] : null;
};

/**
 * Inicializa el estado del juego (estado puro)
 */
export const createInitialState = (mode = 'random') => {
  const occupied = new Set();
  const playerPosition = { ...INITIAL_POSITION };
  occupied.add('0,0');

  const wumpusPosition = generateRandomPosition(occupied);
  occupied.add(`${wumpusPosition.x},${wumpusPosition.y}`);

  const pits = [];
  for (let i = 0; i < PITS_COUNT; i++) {
    const pit = generateRandomPosition(occupied);
    occupied.add(`${pit.x},${pit.y}`);
    pits.push(pit);
  }

  const goldPosition = generateRandomPosition(occupied);

  return {
    gridSize: GRID_SIZE,
    playerPosition,
    wumpusPosition,
    pits,
    goldPosition,
    hasGold: false,
    gameOver: false,
    gameWon: false,
    gameStarted: true,
    moves: 0,
    gameMode: mode,
    message:
      mode === 'random'
        ? 'Modo aleatorio activo. ¡Suerte!'
        : 'Modo inteligente activo. ¡Estrategia!',
  };
};