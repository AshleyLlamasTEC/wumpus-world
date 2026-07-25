import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  Circle,
  Zap,
  Target,
  Dice5,
  Footprints,
} from "lucide-react";
import WumpusIcon from "./icons/WumpusIcon";
import GoldIcon from "./icons/GoldIcon";
import PersonIcon from "./icons/PersonIcon";
import DoorIcon from "./icons/DoorIcon";

const Legend = memo(({ gameState }) => {
  const { hasGold, gameMode } = gameState;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full lg:w-72">
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
          <PersonIcon className="w-5 h-5" />
          <span className="text-sm">Jugador</span>
        </div>
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
          <WumpusIcon className="w-5 h-5" />
          <span className="text-sm">Wumpus</span>
        </div>
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
          <Circle className="w-5 h-5 text-gray-700 fill-gray-700" />
          <span className="text-sm">Pozo</span>
        </div>
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
          <GoldIcon className="w-5 h-5" />
          <span className="text-sm">Oro</span>
        </div>
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
          <DoorIcon className="w-5 h-5" />
          <span className="text-sm">Salida</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-indigo-500" />
          Estrategia actual
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm bg-blue-50 p-2 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="flex items-center gap-1">
              {hasGold ? (
                <>
                  <Footprints className="w-4 h-4 text-blue-500" />
                  Yendo a salida
                </>
              ) : (
                <>
                  <GoldIcon className="w-4 h-4" />
                  Buscando oro
                </>
              )}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm bg-red-50 p-2 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="flex items-center gap-1">
              {gameMode === "intelligent" ? (
                <>
                  <Target className="w-4 h-4 text-red-500" />
                  Persiguiendo
                </>
              ) : (
                <>
                  <Dice5 className="w-4 h-4 text-gray-500" />
                  Aleatorio
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

Legend.propTypes = {
  gameState: PropTypes.object.isRequired,
};

export default Legend;
