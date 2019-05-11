import React, {PropTypes} from 'react';
import classnames from 'classnames';

const ListItem = (p) => {
  const listItemClasses = classnames({
    'list-group-item': true,
    lite: !p.isActive,
    dark: p.isDark,
    'status-bar-large': p.status,
    [`status-${p.status}`]: p.status,
    [p.className]: p.className,
    'is-link': p.onClick
  });
  return (
    <div className={listItemClasses} onClick={p.onClick} onMouseEnter={p.onMouseEnter} onMouseLeave={p.onMouseLeave}>
      {p.children}
    </div>
  );
};

ListItem.propTypes = {
  children: PropTypes.any,
  isActive: PropTypes.bool,
  isDark: PropTypes.bool,
  status: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

export default ListItem;
