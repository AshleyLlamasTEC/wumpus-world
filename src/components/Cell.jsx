import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { User, Circle, DoorOpen } from 'lucide-react';
import WumpusIcon from './icons/WumpusIcon';
import GoldIcon from './icons/GoldIcon';
import PersonIcon from './icons/PersonIcon';
import DoorIcon from './icons/DoorIcon';

const Cell = memo(({ x, y, gameState, size = 'w-14 h-14' }) => {
  const { playerPosition, wumpusPosition, pits, goldPosition, hasGold } = gameState;

  let content = null;
  let bgColor = 'bg-gray-100';
  let animation = '';

  const isPlayer = x === playerPosition.x && y === playerPosition.y;
  const isWumpus = x === wumpusPosition.x && y === wumpusPosition.y;
  const isPit = pits.some((pit) => pit.x === x && pit.y === y);
  const isGold = x === goldPosition.x && y === goldPosition.y && !hasGold;
  const isExit = x === 0 && y === 0;

  // Asignar contenido y estilos
  if (isPlayer) {
    content = <PersonIcon className="w-6 h-6 text-blue-600" />;
    bgColor = 'bg-blue-100';
  } else if (isWumpus) {
    content = <WumpusIcon className="w-6 h-6 text-red-600" />;
    bgColor = 'bg-red-100';
    animation = 'animate-pulse';
  } else if (isPit) {
    content = <Circle className="w-5 h-5 text-gray-600 fill-gray-600" />;
    bgColor = 'bg-gray-200';
  } else if (isGold) {
    content = <GoldIcon className="w-6 h-6" />;
    bgColor = 'bg-yellow-100';
    animation = 'animate-bounce';
  } else if (isExit) {
    content = <DoorIcon className="w-6 h-6" />;
    bgColor = 'bg-green-100';
  }

  return (
    <div
      className={clsx(
        size,
        'flex items-center justify-center',
        'border border-gray-300 m-1',
        'rounded-lg',
        'transition-all duration-200 ease-in-out',
        'hover:scale-105 hover:z-10',
        bgColor,
        animation,
        {
          'hover:shadow-lg': isPlayer || isWumpus || isGold || isExit,
        }
      )}
      style={{ boxSizing: 'border-box' }} // Asegura que borde y ring no aumenten el tamaño
    >
      {content}
    </div>
  );
});

Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  gameState: PropTypes.object.isRequired,
  size: PropTypes.string,
};

export default Cell;