import React, {Component} from 'react';
import './Toolbar.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class ToolBar extends Component {

  render () {
    return (
    <Navbar sticky="top" bg="dark" expand="lg" variant="dark">
      <Navbar.Brand>Sorting Visualizer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={this.props.clearBoard}>Clear Board</Nav.Link>
          <Nav.Link onClick={this.props.clearPath}>Clear Path</Nav.Link>
          <NavDropdown title="Generate Maze" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={this.props.randomMaze}>Random Maze</NavDropdown.Item>
            <NavDropdown.Item onClick={this.props.recursiveMaze}>Recursive Division Maze</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Algorithms" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={this.props.bfs}>Breadth First Search</NavDropdown.Item>
            <NavDropdown.Item onClick={this.props.dfs}>Depth First Search</NavDropdown.Item>
            <NavDropdown.Item onClick={this.props.dijkstra}>Dijkstra</NavDropdown.Item>
            <NavDropdown.Item onClick={this.props.aStar}>A* Search</NavDropdown.Item>
            <NavDropdown.Item onClick={this.props.greedyBfs}>Greedy Best First Search</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
}

export default ToolBar;