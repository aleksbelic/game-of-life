import {useState} from 'react';

export default function Cell(props) {
  const [isAlive, setIsAlive] = useState(props.isAlive);

  const cellClicked = e => {
    setIsAlive(!isAlive);
    props.onClick(e.target.getAttribute('data-id'));
  };

  return (
    <span
      data-id={`${props.dataId}`}
      className={`cell${isAlive ? ' alive' : ''}`}
      onClick={cellClicked}
    ></span>
  );
}
