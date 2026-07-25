import { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { createInitialState } from '../utils/helpers';
import { getIntelligentPlayerMove, getIntelligentWumpusMove } from './useWumpusAI';
import { getRandomMove } from '../utils/helpers';

export const useGameLogic = () => {
  const [state, setState] = useState({
    playerPosition: { x: 0, y: 0 },
    wumpusPosition: { x: 0, y: 0 },
    pits: [],
    goldPosition: { x: 0, y: 0 },
    hasGold: false,
    gameOver: false,
    gameWon: false,
    gameStarted: false,
    moves: 0,
    message: 'Selecciona un modo y presiona "Iniciar Juego"',
    gameMode: 'random',
  });

  // Inicializar juego
  const initializeGame = useCallback((mode = 'random') => {
    const newState = createInitialState(mode);
    setState(newState);
  }, []);

  // Movimiento del jugador
  const movePlayer = useCallback(() => {
    setState((prev) => {
      if (prev.gameOver || !prev.gameStarted) return prev;

      let newPos;
      if (prev.gameMode === 'intelligent') {
        newPos = getIntelligentPlayerMove(
          prev.playerPosition,
          prev.hasGold,
          prev.goldPosition,
          prev.wumpusPosition,
          prev.pits
        );
      } else {
        newPos = getRandomMove(prev.playerPosition);
      }
      if (!newPos) return prev;

      const updated = { ...prev, playerPosition: newPos, moves: prev.moves + 1 };

      // Verificar colisiones
      if (newPos.x === prev.wumpusPosition.x && newPos.y === prev.wumpusPosition.y) {
        updated.gameOver = true;
        updated.message = `¡El Wumpus te ha atrapado! Game Over. ${
          prev.gameMode === 'intelligent' ? 'El Wumpus era muy inteligente.' : ''
        }`;
        return updated;
      }

      if (prev.pits.some((p) => p.x === newPos.x && p.y === newPos.y)) {
        updated.gameOver = true;
        updated.message = '¡Caíste en un pozo! Game Over.';
        return updated;
      }

      if (!prev.hasGold && newPos.x === prev.goldPosition.x && newPos.y === prev.goldPosition.y) {
        updated.hasGold = true;
        updated.message =
          prev.gameMode === 'intelligent'
            ? '¡Has recogido el oro! Yendo estratégicamente hacia la salida...'
            : '¡Has recogido el oro! Regresa a la salida (0,0).';
      }

      if (prev.hasGold && newPos.x === 0 && newPos.y === 0) {
        updated.gameWon = true;
        updated.gameOver = true;
        updated.message = `¡Felicidades! Ganaste en ${prev.moves + 1} movimientos. ${
          prev.gameMode === 'intelligent' ? '¡Estrategia perfecta!' : '¡Suerte increíble!'
        }`;
      }

      return updated;
    });
  }, []);

  // Movimiento del Wumpus
  const moveWumpus = useCallback(() => {
    setState((prev) => {
      if (prev.gameOver || !prev.gameStarted) return prev;

      let newPos;
      if (prev.gameMode === 'intelligent') {
        newPos = getIntelligentWumpusMove(
          prev.wumpusPosition,
          prev.playerPosition,
          prev.pits
        );
      } else {
        if (Math.random() > 0.3) {
          newPos = getRandomMove(prev.wumpusPosition);
        }
      }
      if (!newPos) return prev;

      const updated = { ...prev, wumpusPosition: newPos };

      if (newPos.x === prev.playerPosition.x && newPos.y === prev.playerPosition.y) {
        updated.gameOver = true;
        updated.message = `¡El Wumpus ${
          prev.gameMode === 'intelligent' ? 'te persiguió y ' : 'se movió y '
        }te atrapó! Game Over.`;
      }

      return updated;
    });
  }, []);

  // Efecto del intervalo
  useEffect(() => {
    if (!state.gameStarted || state.gameOver) return;

    const interval = setInterval(() => {
      movePlayer();
      setTimeout(moveWumpus, 500);
    }, 1000);

    return () => clearInterval(interval);
  }, [state.gameStarted, state.gameOver, movePlayer, moveWumpus]);

  // Efecto de SweetAlert (Game Over / Win)
  useEffect(() => {
    if (state.gameOver || state.gameWon) {
      const isWin = state.gameWon;
      Swal.fire({
        title: isWin ? '¡Victoria!' : 'Game Over',
        text: state.message,
        icon: isWin ? 'success' : 'error',
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        html: `
          <div style="display: flex; gap: 12px; justify-content: center; margin-top: 12px;">
            <button id="random-btn" class="swal2-confirm swal2-styled" style="background-color: #8b5cf6; padding: 8px 20px; border-radius: 8px; font-weight: 600;">
              Modo Aleatorio
            </button>
            <button id="intelligent-btn" class="swal2-confirm swal2-styled" style="background-color: #10b981; padding: 8px 20px; border-radius: 8px; font-weight: 600;">
              Modo Inteligente
            </button>
          </div>
        `,
        didRender: () => {
          document.getElementById('random-btn')?.addEventListener('click', () => {
            Swal.close();
            initializeGame('random');
          });
          document.getElementById('intelligent-btn')?.addEventListener('click', () => {
            Swal.close();
            initializeGame('intelligent');
          });
        },
      });
    }
  }, [state.gameOver, state.gameWon, state.message, initializeGame]);

  return { state, initializeGame };
};