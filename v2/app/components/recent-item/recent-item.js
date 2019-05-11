import React, {PropTypes} from 'react';
import ListItem from '../list-item/list-item';
import Media from '../media/media';
import Ago from '../ago/ago';

const RecentItem = (p) => {
  return (
    <ListItem status={p.status} isActive={p.isActive} onClick={p.onClick}>
      <Media icon={p.status}>
        <div className="title small truncate">{p.projectRepo}</div>
        <div className="title truncate">{p.branch}</div>
        <Media object={`#${p.build}`} side="right" className="no-margin small">
          <Ago date={p.start} />
        </Media>
      </Media>
    </ListItem>
  );
};

RecentItem.propTypes = {
  projectRepo: PropTypes.string.isRequired,
  branch: PropTypes.string.isRequired,
  build: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};

export default RecentItem;
