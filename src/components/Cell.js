export default function Cell(props) {
  return (
    <span
      data-id={`${props.dataId}`}
      className={`cell${props.isAlive ? ' alive' : ''}`}
      onClick={props.updateCellsOnCellClick}
    ></span>
  );
}
