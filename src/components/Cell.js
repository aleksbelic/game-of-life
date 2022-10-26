export default function Cell(props) {
  return (
    <span
      className={`cell${props.isAlive ? ' alive' : ''}`}
      onClick={props.updateCellsOnCellClick}
    ></span>
  );
}
