import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Target, Info, Trophy, XCircle } from "lucide-react";
import GoldIcon from "./icons/GoldIcon";

const StatusPanel = ({ gameState }) => {
  const { moves, hasGold, message, gameWon, gameOver } = gameState;

  const messageIcon = useMemo(() => {
    if (gameWon) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (gameOver) return <XCircle className="w-5 h-5 text-red-500" />;
    if (hasGold) return <GoldIcon className="w-5 h-5" />;
    return <Info className="w-5 h-5 text-blue-500" />;
  }, [gameWon, gameOver, hasGold]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">
              Movimientos
            </span>
            <span className="text-xl font-bold text-gray-800">{moves}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Estado</span>
            <span
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                hasGold
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {hasGold ? (
                <GoldIcon className="w-4 h-4" />
              ) : (
                <Target className="w-4 h-4" />
              )}
              {hasGold ? "Oro obtenido" : "Buscando oro"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
          {messageIcon}
          <span className="text-sm">{message}</span>
        </div>
      </div>
    </div>
  );
};

StatusPanel.propTypes = {
  gameState: PropTypes.object.isRequired,
};

export default StatusPanel;
