import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';

const LinkItem = (p) => {
  const linkClasses = classnames({
    'list-group-item': true,
    active: p.isActive,
    'space-left': p.indent
  });
  return (
    <Link to={p.to} className={linkClasses}>
      {p.children}
    </Link>
  );
};

LinkItem.displayName = 'LinkItem';

LinkItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.any,
  isActive: PropTypes.bool,
  indent: PropTypes.bool
};

export default LinkItem;
