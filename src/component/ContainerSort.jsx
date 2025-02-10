import PropTypes from 'prop-types';

export function ContainerSort({ noSort, sortAlfa, sortYear, handleSort, className  }){ 
  return(
    <>
      <div className={className}>
        <div>
          <label role='contentinfo'>Sin orden</label>
          <input
            type="checkbox"
            name="noSort"
            onChange={handleSort}
            checked={noSort}
          />
        </div>
        <div>
          <label role='contentinfo'>Orden Alfabético</label>
          <input
            type="checkbox"
            name="sortAlfa"
            onChange={handleSort}
            checked={sortAlfa}
          />
        </div>
        <div>
          <label role='contentinfo'>Orden por año</label>
          <input
            type="checkbox"
            name="sortYear"
            onChange={handleSort}
            checked={sortYear}
          />
        </div>
      </div>
    </>
  );
}

ContainerSort.propTypes = {
  noSort: PropTypes.bool.isRequired,
  sortAlfa:PropTypes.bool.isRequired, 
  sortYear: PropTypes.bool.isRequired, 
  className: PropTypes.string,
  handleSort: PropTypes.func
};