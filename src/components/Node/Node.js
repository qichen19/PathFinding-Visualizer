import React from 'react';
import './Node.css'


const node = (props) => {
  const row = props.row;
  const col = props.col;
  let extraClassName= '';
  if(props.isStart && !props.isFinish) {
    extraClassName = 'start';
  }
  if(!props.isStart && props.isFinish) {
    extraClassName = 'finish';
  }
  if(props.isWall) {
    extraClassName= 'wall';
  }
  return (
    <div id={`node ${props.row} ${props.col}`}
        style={{width: props.width}}
        className={`node ${extraClassName}`}
        onMouseDown = {() => props.onMouseDown(row, col)}
        onMouseEnter = {() => props.onMouseEnter(row, col)}
        onMouseUp = {props.onMouseUp}></div>
  )
}

export default node;
