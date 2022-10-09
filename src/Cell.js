import React, {useState} from 'react';

export default function Cell(props) {
  const [isAlive, setIsAlive] = useState(props.isAlive);

  return (
    <span
      className={`cell${isAlive ? ' alive' : ''}`}
      onClick={() => setIsAlive(!isAlive)}
    ></span>
  );
}
