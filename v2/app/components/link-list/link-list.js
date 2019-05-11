import React, {PropTypes} from 'react';
import List from '../list/list';

const LinkList = (p) => {
  // Update props of child LinkItem components
  const children = React.Children.map(p.children, (child, index) => {
    if (child && child.type.displayName === 'LinkItem') {
      return React.cloneElement(child, {
        key: index,
        isActive: p.location && child.props.to === p.location.pathname
      });
    } else {
      return child;
    }
  });
  return (
    <List>
      {children}
    </List>
  );
};

LinkList.propTypes = {
  location: PropTypes.object
};

export default LinkList;
