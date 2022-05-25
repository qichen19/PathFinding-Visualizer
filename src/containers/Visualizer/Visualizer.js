import React, { Component } from "react";
import Node from "../../components/Node/Node";
import ToolBar from "../../Toolbar/Toolbar";
import _ from "lodash"
import {dijkstra, getNodesInShortestPathOrder} from '../../algorithms/Dijkstra/Dijkstra';
import {breadthFirstSearch, getNodesInShortestPathOrderBFS} from '../../algorithms/BFS/BFS';
import {depthFirstSearch, getNodesInShortestPathOrderDFS} from '../../algorithms/DFS/DFS';
import {aStar, getNodesInShortestPathOrderAstar} from '../../algorithms/Astar/Astar';
import {greedyBFS, getNodesInShortestPathOrderGreedyBFS} from '../../algorithms/GreedyBFS/GreedyBFS';
import getRecursiveDevisionWallsInOrder from '../../mazes/RecursiveDivision/RecursiveDivision';
import RandomMaze from '../../mazes/RandomMaze/RandomMaze';

export const START_NODE_ROW = 4;
export const START_NODE_COL = 10;
export const FINISH_NODE_ROW = 16;
export const FINISH_NODE_COL = 40;
const NUM_OF_ROWS = 20;
const NUM_OF_COLUMNS = 50;
export const NUM_OF_WALLS = 300;

class Visualizer extends Component {
  state = {
    grid: [],
    mouseIsPressed: false,
    width: '25px',
    height: '25px',
  };

  componentDidMount() {
    const grid = getInitialGrid();
    const width = getNodeWidth();
    const height = getNodeHeight();
    this.setState({ grid: grid, width: width, height: height});
  }

  clearBoardHandler = () => {
    window.location.reload(false);
  }

  clearPathHandler = () => {
    const wallNodes = document.getElementsByClassName('node wall');
    console.log(wallNodes);
    const wallNodesArray = [];
    for(let node of wallNodes) {
      const wallNode = [node.row, node.col];
      wallNodesArray.push(wallNode);
    }


    const grid = getInitialGrid();
    this.setState({ grid: grid });

    const newGrid =_.clone(this.state.grid);

    for(let row = 0; row < NUM_OF_ROWS; row++) {
      for(let col = 0; col < NUM_OF_COLUMNS; col++) {
        const node = newGrid[row][col];
        if(wallNodesArray.includes([row, col])) {
          const wallNode = {
            ...node,
            isWall: true,
          }
          newGrid[row][col] = wallNode;
        }
      }
    }
    this.setState({grid: newGrid});
  }


  generateRecursiveDivisionMazeHandler = () => {
    const grid = _.clone(this.state.grid);
    const wallsInOrder = getRecursiveDevisionWallsInOrder(grid);
    for (let i = 0; i <= wallsInOrder.length; i++) {
      if(i === wallsInOrder.length) {
        setTimeout(() => {
          this.setState({grid: grid})}, 2 * i)
        }
       else {
        setTimeout(() => {
          const node = wallsInOrder[i];
          document.getElementById(`node ${node.row} ${node.col}`).className =
            'node wall';
        }, 2 * i)
      }
    }
  }

  animateVisitedNodes = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node= visitedNodesInOrder[i];
        document.getElementById(`node ${node.row} ${node.col}`).className =
          'node visited';
      }, 10 * i);
    }
  }

  animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node ${node.row} ${node.col}`).className =
          'node shortestPath';
      }, 50 * i)
    }
  }

  dijkstraHandler = () => {
    const grid =_.clone(this.state.grid);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
    this.setState({grid: grid});
  }

  bfsHandler = () => {
    const grid = _.clone(this.state.grid);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = breadthFirstSearch(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderBFS(finishNode);
    this.animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
    this.setState({grid: grid});
  }

  dfsHandler = () => {
    const grid = _.clone(this.state.grid);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = depthFirstSearch(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderDFS(finishNode);
    this.animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
    this.setState({grid: grid});
  }

  aStarHandler = () => {
    const grid = _.clone(this.state.grid);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = aStar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderAstar(finishNode);
    this.animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
    this.setState({grid: grid});
  }

  greedyBFSHandler = () => {
    const grid = _.clone(this.state.grid);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = greedyBFS(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderGreedyBFS(finishNode);
    this.animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
    this.setState({grid: grid});
  }

  generateRandomMazeHandler = () => {
    const newGrid = RandomMaze(this.state.grid);
    this.setState({grid: newGrid});
  }


  mouseDownHandler = (row, col) => {
    const newGrid = getNewGridWithWall(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  mouseEnterHandler = (row, col) => {
    if(!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWall(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  mouseUpHandler = () => {
    this.setState({mouseIsPressed: false});
  }

  render() {
    const grid = this.state.grid;
    return (
      <div>
      <ToolBar 
        dijkstra={this.dijkstraHandler}
        bfs={this.bfsHandler}
        dfs={this.dfsHandler}
        aStar={this.aStarHandler}
        greedyBfs={this.greedyBFSHandler}
        clearBoard={this.clearBoardHandler}
        clearPath={this.clearPathHandler}
        randomMaze={this.generateRandomMazeHandler}
        recursiveMaze={this.generateRecursiveDivisionMazeHandler}  
        ></ToolBar>
      <div className="Grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const {row, col, isFinish, isStart, isWall} = node;
              return (
                <Node
                  key={nodeIdx}
                  row={row}
                  col={col}
                  width={this.state.width}
                  height={this.state.height}
                  isStart={isStart}
                  isFinish={isFinish}
                  isWall={isWall}
                  mouseIsPressed={this.state.mouseIsPressed}
                  onMouseDown={(row, col) => this.mouseDownHandler(row, col)}
                  onMouseEnter={(row, col) => this.mouseEnterHandler(row, col)}
                  onMouseUp={this.mouseUpHandler}
                  ></Node>
              )})
            }
          </div>
        ))}
      </div>
      </div>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  
  for (let row = 0; row < NUM_OF_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < NUM_OF_COLUMNS; col++) {
      const currentNode = createNode(row, col);
      currentRow.push(currentNode);
    }
    grid.push(currentRow);
  }
  return grid;
};

const getNodeWidth = () => {
    let maxWidth = window.innerWidth;
    let width  = (maxWidth - 20)/NUM_OF_COLUMNS + 'px' ;
    return width;
}

const getNodeHeight = () => {
  let maxWidth = window.innerWidth;
  let height = '25px';
  if(maxWidth <= 640 ) {
    height = '15px';
  }
  return height;
}

const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};


const getNewGridWithWall = (grid, row, col) => {
  const newGrid =_.clone(grid);
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default Visualizer;
