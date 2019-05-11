import React, {PropTypes} from 'react';
import ListItem from '../list-item/list-item';
import Icon from '../icon/icon';
import classnames from 'classnames';

const LoaderItem = (p) => {
  if (p.request.status === '') {
    return null;
  } else if (p.request.status.indexOf('error') === 0) {
    const itemClasses = classnames({
      flex: true,
      [p.className]: p.className
    });
    return (
      <ListItem isActive className={itemClasses}>
        <Icon type="error" />
        <div className="error space-left">{p.request.errorMessage}</div>
      </ListItem>
    );
  } else {
    const itemClasses = classnames({
      'justify-center': true,
      [p.className]: p.className
    });
    return (
      <ListItem className={itemClasses}>
        <Icon type="pending" />
        <div className="capitalize space-left">{p.request.status}</div>
      </ListItem>
    );
  }
};

LoaderItem.propTypes = {
  request: PropTypes.shape({
    status: PropTypes.string,
    errorMessage: PropTypes.string
  }),
  className: PropTypes.string
};

export default LoaderItem;
