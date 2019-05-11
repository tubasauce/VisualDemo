import React, {PropTypes} from 'react';

const List = (p) => {
  return (
    <div className={p.className}>
      <div className="list-group">
        {p.children}
      </div>
    </div>
  );
};

List.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

export default List;
