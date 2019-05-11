import React, {PropTypes} from 'react';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import LazyLoad from 'react-lazyload';
import classnames from 'classnames';

const StateItem = (p) => {
  const statusClasses = classnames({
    badge: true,
    'inline-truncate': true,
    'badge-orange': p.status === 'changed',
    'badge-blue-dark': p.status === 'new',
    'badge-green': p.status === 'accepted',
    'badge-red': p.status === 'rejected'
  });
  const reviewer = p.isReviewed ? ` by ${p.userName}` : '';
  const autoAccepted = p.isAutoAccepted ? ` from ${p.branch}` : '';
  return (
    <List>
      <ListItem isActive className="no-padding dark-hover" onClick={p.onClick}>
        <div className="crop-thumbnail">
          {p.lazyLoad
            ? <LazyLoad overflow scroll resize height={120} once>
                <img src={p.thumbnailUrl} className="img-responsive" style={{width:'240px', height:'120px'}} />
              </LazyLoad>
            : <img src={p.thumbnailUrl} className="img-responsive" style={{width:'240px', height:'120px'}} />
          }
        </div>
        <div className="padding-2 padding-bottom dont-break-out">
          <div className={statusClasses} title={`${p.status}${reviewer}`}>
            <span className="capitalize">{p.status}</span>
            {(p.isReviewed || p.isAutoAccepted) &&
              <span>{reviewer || autoAccepted}</span>
            }
          </div>
          <h5>{p.name}</h5>
        </div>
      </ListItem>
    </List>
  );
};

StateItem.propTypes = {
  status: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  userName: PropTypes.string,
  isReviewed: PropTypes.bool,
  isAutoAccepted: PropTypes.bool,
  branch: PropTypes.string,
  onClick: PropTypes.func,
  lazyLoad: PropTypes.bool
};

StateItem.defaultProps = {
  lazyLoad: true
};

export default StateItem;
