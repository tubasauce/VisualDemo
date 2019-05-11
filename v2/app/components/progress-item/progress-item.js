import React, {PropTypes} from 'react';
import ListItem from '../list-item/list-item';

const ProgressItem = (p) => {
  return (
    <ListItem isActive className="no-border no-padding active">
      <div className="progress progress-item">
        <div className="progress-bar" style={{width: `${p.percent}%`}}>
        </div>
      </div>
    </ListItem>
  );
};

ProgressItem.propTypes = {
  percent: PropTypes.number
};

ProgressItem.defaultProps = {
  percent: 0
};

export default ProgressItem;
