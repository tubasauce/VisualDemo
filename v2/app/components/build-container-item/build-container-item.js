import React, {PropTypes} from 'react';
import ListItem from '../list-item/list-item';
import Tags from '../tags/tags';
import Duration from '../duration/duration';
import Moment from 'moment';
import classnames from 'classnames';

const BuildContainerItem = (p) => {
  const statusClasses = classnames({
    capitalize: true,
    [p.status]: p.status
  });
  return (
    <ListItem status={p.status}>
      <div className="row">
        <div className="col-xs-3">
          <div className={statusClasses}>{p.status}</div>
          {p.logUrl &&
            <a className="small block" href={p.logUrl} target="_blank">View Log</a>
          }
          {p.logScreenshotUrl &&
            <a className="small block" href={p.logScreenshotUrl} target="_blank">View Last Screenshot</a>
          }
        </div>
        <div className="col-xs-3">
          <u className="small">Start</u>
          <div className="small qa-screener-ignore">
            {Moment(p.start).format('MMM D,YYYY')}
          </div>
          <div className="qa-screener-ignore">
            {Moment(p.start).format('hh:mm:ss')}
          </div>
        </div>
        <div className="col-xs-3">
          <u className="small">Duration</u>
          {p.start && p.end &&
            <div><Duration start={p.start} end={p.end} /></div>
          }
        </div>
        <div className="col-xs-3">
          <Tags values={[p.resolution, p.name]} />
        </div>
      </div>
    </ListItem>
  );
};

BuildContainerItem.propTypes = {
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  resolution: PropTypes.string.isRequired,
  logUrl: PropTypes.string,
  logScreenshotUrl: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string
};

export default BuildContainerItem;
