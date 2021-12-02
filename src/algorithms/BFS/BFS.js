const breadthFirstSearch = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = [];
  startNode.isVisited = true;
  const queue = [startNode];
  while(queue.length > 0) {
    const currentNode = queue.shift();    
    if (currentNode === finishNode) return visitedNodesInOrder;
    let unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    unvisitedNeighbors = shuffleArray(unvisitedNeighbors);
    for (const neighbor of unvisitedNeighbors) {
      if(neighbor.isWall) continue;
      neighbor.isVisited = true;
      visitedNodesInOrder.push(neighbor);
      queue.push(neighbor);
      neighbor.previousNode = currentNode;
    }
  }
  return visitedNodesInOrder;
}

const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  // if(row > 0 && col > 0) neighbors.push(grid[row-1][col-1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  // if(row < grid.length -1 && col > 0) neighbors.push(grid[row+1][col-1]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  // if(row > 0 && col < grid[0].length - 1) neighbors.push(grid[row-1][col+1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  // if(row < grid.length -1 && col < grid[0].length - 1) neighbors.push(grid[row+1][col+1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
const shuffleArray = (array) => {
  for(let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random()*(i+1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const getNodesInShortestPathOrderBFS = (finishNode) => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

export {breadthFirstSearch, getNodesInShortestPathOrderBFS};
