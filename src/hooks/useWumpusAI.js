import { calculateDistance, getRandomMove } from '../utils/helpers';
import { GRID_SIZE } from '../utils/constants';

/**
 * Encuentra el mejor movimiento para acercarse a un objetivo evitando obstáculos
 */
const findBestMove = (currentPos, targetPos, obstacles = []) => {
  const directions = [
    { x: 0, y: -1, name: 'up' },
    { x: 1, y: 0, name: 'right' },
    { x: 0, y: 1, name: 'down' },
    { x: -1, y: 0, name: 'left' },
  ];

  const validMoves = directions
    .map((dir) => ({
      x: currentPos.x + dir.x,
      y: currentPos.y + dir.y,
      name: dir.name,
    }))
    .filter(
      (pos) =>
        pos.x >= 0 &&
        pos.x < GRID_SIZE &&
        pos.y >= 0 &&
        pos.y < GRID_SIZE &&
        !obstacles.some((obs) => obs.x === pos.x && obs.y === pos.y)
    );

  if (validMoves.length === 0) return null;

  return validMoves.reduce((best, move) => {
    const newDist = calculateDistance(move, targetPos);
    if (!best || newDist < calculateDistance(best, targetPos)) return move;
    return best;
  }, null);
};

/**
 * Movimiento inteligente del jugador
 */
export const getIntelligentPlayerMove = (
  currentPos,
  hasGold,
  goldPosition,
  wumpusPos,
  pits
) => {
  const target = hasGold ? { x: 0, y: 0 } : goldPosition;
  const obstacles = [...pits, wumpusPos];
  const best = findBestMove(currentPos, target, obstacles);

  if (best) return best;

  // Si no hay movimiento óptimo, intenta moverse a una celda segura aleatoria
  const safeMoves = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ]
    .map((dir) => ({ x: currentPos.x + dir.x, y: currentPos.y + dir.y }))
    .filter(
      (pos) =>
        pos.x >= 0 &&
        pos.x < GRID_SIZE &&
        pos.y >= 0 &&
        pos.y < GRID_SIZE &&
        !obstacles.some((obs) => obs.x === pos.x && obs.y === pos.y)
    );

  return safeMoves.length > 0
    ? safeMoves[Math.floor(Math.random() * safeMoves.length)]
    : null;
};

/**
 * Movimiento inteligente del Wumpus
 */
export const getIntelligentWumpusMove = (currentPos, playerPos, pits) => {
  const best = findBestMove(currentPos, playerPos, pits);
  if (best) return best;

  const validMoves = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ]
    .map((dir) => ({ x: currentPos.x + dir.x, y: currentPos.y + dir.y }))
    .filter(
      (pos) =>
        pos.x >= 0 &&
        pos.x < GRID_SIZE &&
        pos.y >= 0 &&
        pos.y < GRID_SIZE &&
        !pits.some((pit) => pit.x === pos.x && pit.y === pos.y)
    );

  return validMoves.length > 0
    ? validMoves[Math.floor(Math.random() * validMoves.length)]
    : null;
};