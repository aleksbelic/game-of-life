import PropTypes from 'prop-types';

export default function Cell(props) {
  return (
    <span
      className={`cell${props.isAlive ? ' alive' : ''}`}
      onClick={props.updateCellsOnCellClick}
    ></span>
  );
}

Cell.propTypes = {
  isAlive: PropTypes.bool.isRequired,
  updateCellsOnCellClick: PropTypes.func.isRequired,
};
