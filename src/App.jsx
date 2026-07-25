import React from 'react';
import { Crosshair } from 'lucide-react';
import { useGameLogic } from './hooks/useGameLogic';
import Controls from './components/Controls';
import StatusPanel from './components/StatusPanel';
import Grid from './components/Grid';
import Legend from './components/Legend';
import WumpusIcon from './components/icons/WumpusIcon';

function App() {
  const { state, initializeGame } = useGameLogic();
  const { gameStarted, gameMode } = state;

  return (
    <div className="min-h-screen bg-gradient-to-t from-green-300 to-lime-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg">
            <Crosshair className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Wumpus World</h1>
            <WumpusIcon className="w-8 h-8" />
          </div>
        </div>

        {/* Panel de controles */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <Controls
            gameStarted={gameStarted}
            gameMode={gameMode}
            initializeGame={initializeGame}
          />
        </div>

        {/* Panel de información */}
        <StatusPanel gameState={state} />

        {/* Tablero y leyenda */}
        {gameStarted && (
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            <Grid gameState={state} />
            <Legend gameState={state} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;