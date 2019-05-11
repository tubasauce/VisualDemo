import React, {PropTypes} from 'react';

const LinkHeading = (p) => {
  return (
    <div className="list-group-item lite large">
      <strong>{p.children}</strong>
    </div>
  );
};

LinkHeading.displayName = 'LinkHeading';

LinkHeading.propTypes = {
  children: PropTypes.any
};

export default LinkHeading;
