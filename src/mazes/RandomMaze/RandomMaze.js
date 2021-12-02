import {START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL,  NUM_OF_WALLS} from '../../containers/Visualizer/Visualizer';

const randomMaze = (grid) => {
  let row = 0;
  let col = 0;
  const newGrid = grid.slice();
  for(let i = 0; i < NUM_OF_WALLS; i++) {
    do {
      row = Math.floor(Math.random() * (grid.length));
      col = Math.floor(Math.random() * (grid[0].length));
    }
    while((row === START_NODE_ROW && col === START_NODE_COL) || (row === FINISH_NODE_ROW && col === FINISH_NODE_COL));
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
  }
  return newGrid;
}

export default randomMaze;
