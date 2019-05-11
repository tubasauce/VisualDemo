import React, {PropTypes} from 'react';
import ListItem from '../list-item/list-item';
import classnames from 'classnames';

const StateHistoryItem = (p) => {
  const reviewClasses = classnames({
    badge: true,
    'inline-truncate': true,
    'badge-green': p.status === 'accepted',
    'badge-red': p.status === 'rejected'
  });
  const date = new Date(p.updatedAt).toLocaleString();
  return (
    <ListItem>
      <div className="justify-spaced align-center space-top-2">
        <a href={p.githubCommitUrl}
          className="block badge badge-black inline-truncate"
          title={`${p.branch} #${p.build}`}
          target="_blank">
          {p.branch} #{p.build}
        </a>
        <div className="badge badge-contrast inline-truncate" title={date}>
          {date}
        </div>
      </div>
      <div className="justify-center space-top-4 space-bottom-4">
        {p.status &&
          <div className={reviewClasses}>
            <span className="capitalize">{p.status}</span>
            {p.isReviewed &&
              <span> by {p.userName}</span>
            }
            {p.isAutoAccepted &&
              <span> from {p.fromBranch}</span>
            }
          </div>
        }
      </div>
      <a className="side-panel-img" target="_blank" href={p.screenshotUrl}>
        <img className="img-responsive" src={p.thumbnailUrl} />
      </a>
    </ListItem>
  );
};

StateHistoryItem.propTypes = {
  build: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  screenshotUrl: PropTypes.string.isRequired,
  isReviewed: PropTypes.bool,
  isAutoAccepted: PropTypes.bool,
  status: PropTypes.string,
  userName: PropTypes.string,
  branch: PropTypes.string
};

export default StateHistoryItem;
