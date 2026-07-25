import React from 'react';
import PropTypes from 'prop-types';
import { Dice5, Brain, RefreshCw } from 'lucide-react';

const Controls = ({ gameStarted, gameMode, initializeGame }) => {
  if (!gameStarted) {
    return (
      <>
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
          Selecciona el modo de juego
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={() => initializeGame('random')}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all hover:scale-105 font-medium"
          >
            <Dice5 className="w-5 h-5" />
            Modo Aleatorio
          </button>
          <button
            onClick={() => initializeGame('intelligent')}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full hover:shadow-lg transition-all hover:scale-105 font-medium"
          >
            <Brain className="w-5 h-5" />
            Modo Inteligente
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-500">
            <div className="flex items-center gap-2 font-semibold text-purple-700">
              <Dice5 className="w-4 h-4" /> Aleatorio
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Jugador y Wumpus se mueven al azar
            </p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border-l-4 border-emerald-500">
            <div className="flex items-center gap-2 font-semibold text-emerald-700">
              <Brain className="w-4 h-4" /> Inteligente
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Wumpus te persigue, tú buscas el oro estratégicamente
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <button
        onClick={() => initializeGame(gameMode)}
        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition shadow-md"
      >
        <RefreshCw className="w-4 h-4" />
        Reiniciar
      </button>
      <span className="flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-medium">
        {gameMode === 'random' ? (
          <Dice5 className="w-4 h-4" />
        ) : (
          <Brain className="w-4 h-4" />
        )}
        Modo: {gameMode === 'random' ? 'Aleatorio' : 'Inteligente'}
      </span>
    </div>
  );
};

Controls.propTypes = {
  gameStarted: PropTypes.bool.isRequired,
  gameMode: PropTypes.string.isRequired,
  initializeGame: PropTypes.func.isRequired,
};

export default Controls;