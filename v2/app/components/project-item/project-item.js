import React, {PropTypes} from 'react';
import ListItem from '../list-item/list-item';
import Media from '../media/media';
import Ago from '../ago/ago';

const ProjectItem = (p) => {
  return (
    <ListItem status={p.status} isActive={p.isActive} onClick={p.onClick}>
      <Media icon={p.status}>
        <div className="title truncate">{p.projectRepo}</div>
        <div className="gray-out small">Latest</div>
        <Media object={<Ago date={p.start} />} side="right" className="no-margin small">
          {p.branch}
        </Media>
      </Media>
    </ListItem>
  );
};

ProjectItem.propTypes = {
  projectRepo: PropTypes.string.isRequired,
  branch: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};

export default ProjectItem;
