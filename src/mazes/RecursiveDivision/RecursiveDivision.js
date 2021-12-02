import {START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL} from '../../containers/Visualizer/Visualizer';

const getRecursiveDevisionWallsInOrder = (grid) => {
  const wallsInOrder = [];
  addOuterWalls(grid, wallsInOrder);
  addInnerWalls(true, 1, grid.length - 2, 1, grid[0].length - 2,  grid, wallsInOrder);
  return wallsInOrder;
}

const addOuterWalls = (grid, wallsInOrder) => {
  for(let i = 0; i < grid.length; i++) {
    if(i === 0 || i === grid.length-1) {
      for(let j = 0; j < grid[0].length; j++) {
        grid[i][j].isWall = 'true';
        wallsInOrder.push(grid[i][j]);
      }
    } else {
      grid[i][0].isWall = 'true';
      wallsInOrder.push(grid[i][0]);
      grid[i][grid[0].length-1].isWall = 'true';
      wallsInOrder.push(grid[i][grid[0].length-1]);
    }
  }
}

const randomNumber = (min, max) => (Math.floor(Math.random()*(max-min+1) + min));

const addInnerWalls = (horizontalWall, minRow, maxRow, minColumn, maxColumn, grid, wallsInOrder) => {
  if(horizontalWall) {
    if (maxRow - minRow < 2) {
      return;
    }
    const row = Math.floor(randomNumber(minRow, maxRow)/2)*2;
    addHorizontalWall(minColumn, maxColumn, row, grid, wallsInOrder);
    addInnerWalls(!horizontalWall, minRow, row-1, minColumn, maxColumn, grid, wallsInOrder);
    addInnerWalls(!horizontalWall, row+1, maxRow, minColumn+1, maxColumn, grid, wallsInOrder);
  } else {
    if (maxColumn - minColumn < 2) {
      return;
    }
    const column = Math.floor(randomNumber(minColumn, maxColumn)/2)*2;
    addVerticalWall(minRow, maxRow, column, grid, wallsInOrder);
    addInnerWalls(!horizontalWall, minRow, maxRow, minColumn, column-1, grid, wallsInOrder);
    addInnerWalls(!horizontalWall, minRow, maxRow, column+1, maxColumn, grid, wallsInOrder);
  }
}

const addVerticalWall = (minRow, maxRow, column, grid, wallsInOrder) => {
  let hole = Math.floor(randomNumber(minRow, maxRow)/2)*2+1;
  for(let i = minRow; i <= maxRow; i++) {
    if(i === hole || (i===START_NODE_ROW && column === START_NODE_COL) || (i===FINISH_NODE_ROW && column === FINISH_NODE_COL)) {
      continue;
    }
    grid[i][column].isWall = 'true';
    wallsInOrder.push(grid[i][column]);
  }
}

const addHorizontalWall = (minColumn, maxColumn, row, grid, wallsInOrder) => {
  let hole = Math.floor(randomNumber(minColumn, maxColumn)/2)*2+1;
  for(let i = minColumn; i <= maxColumn; i++) {
    if(i===hole || (row===START_NODE_ROW && i === START_NODE_COL) || (row===FINISH_NODE_ROW && i === FINISH_NODE_COL)) {
      continue;
    }
    grid[row][i].isWall = 'true';
    wallsInOrder.push(grid[row][i]);
  }
}

export default getRecursiveDevisionWallsInOrder;
