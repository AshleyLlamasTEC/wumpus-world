import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

const Grid = memo(({ gameState }) => {
  const { gridSize } = gameState;
  const grid = [];

  for (let y = 0; y < gridSize; y++) {
    const row = [];
    for (let x = 0; x < gridSize; x++) {
      row.push(<Cell key={`${x}-${y}`} x={x} y={y} gameState={gameState} />);
    }
    grid.push(
      <div key={y} className="flex">
        {row}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
      <div className="grid gap-0.5 bg-gray-200 p-0.5 rounded-lg overflow-hidden">
        {grid}
      </div>
    </div>
  );
});

Grid.propTypes = {
  gameState: PropTypes.object.isRequired,
};

export default Grid;