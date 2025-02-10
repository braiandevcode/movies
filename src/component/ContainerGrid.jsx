import PropTypes from 'prop-types';
export function ContainerGrid({ children, title, classNameContainer}){
  return (
    <section>
      <h2 className={classNameContainer}>{ title }</h2>
      { children }
    </section>
  );
}

ContainerGrid.propTypes = {
  classNameContainer: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired
};