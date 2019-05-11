import React, {PropTypes} from 'react';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import Media from '../media/media';
import Icon from '../icon/icon';
import Button from '../button/button';
import ButtonShowHide from '../button-show-hide/button-show-hide';
import BuildContainerItem from '../build-container-item/build-container-item';
import Ago from '../ago/ago';
import Duration from '../duration/duration';
import Confirm from 'react-confirm-bootstrap';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';

const BuildItem = (p) => {
  const {projectData, user} = p;
  // check queued or running status, and has at least 1 running container
  const isCancellable = user && (p.status === 'queued' || p.status === 'running') && p.containers.filter(c =>
    ['queued', 'running', 'ready'].indexOf(c.status) > -1
  ).length > 0;
  const isCompleted = p.status === 'success' || p.status === 'failure';
  const isError = !p.showScreenshots && p.status === 'error';
  // get earliest container date
  const durationStart = sortBy(map(p.containers, 'start'), start => new Date(start))[0] || p.start;
  // calculate parallelism
  const maxConcurrent = projectData.maxConcurrent || 0;
  const parallelism = p.containers.length < maxConcurrent ? p.containers.length : maxConcurrent;
  const showScreenshots = p.showScreenshots && isCompleted;
  return (
    <List className="sub-list">
      <ListItem isActive status={p.status} className="justify-spaced align-center">
        <div>
          <Media object={<h4><Icon type={p.status} /></h4>} align="center">
            <div className="flex align-center">
              <h4 className={p.status + ' color-only'}>
                <span className="capitalize space-right">{p.status}</span>&nbsp;#{p.build}
              </h4>
              {p.githubCommitUrl &&
                <a href={p.githubCommitUrl} target="_blank">
                  <h4><Icon type="github" /></h4>
                </a>
              }
              {isCancellable &&
                <Confirm
                  onConfirm={() => p.cancelBuild(p.build)}
                  body="Are you sure you want to Cancel this Build?"
                  confirmText="Yes"
                  title="Cancel Build">
                  <Button size="xs" border className="space-left-2">Cancel Build</Button>
                </Confirm>
              }
              {isError &&
                <Button onClick={() => window.Intercom('show')} size="xs" border className="space-left-2">
                  Need Help?
                </Button>
              }
            </div>
          </Media>
          {showScreenshots &&
            <div className="space-bottom-2">
              <a href={`/api/v2/projects/${projectData.project}/branches/${encodeURIComponent(p.branch)}/screenshots/${p._id}?format=html`} target="_blank" className="small">
                View All Screenshots
              </a>
              <span className="space-left space-right">|</span>
              <a href={`/api/v2/projects/${projectData.project}/branches/${encodeURIComponent(p.branch)}/screenshots/${p._id}?format=html&filter=changes`} target="_blank" className="small">
                View Changes
              </a>
            </div>
          }
          {p.containers.length > 0 &&
            <ButtonShowHide show={p.showContainers} label="Logs" onClick={() => p.toggleContainers(p._id)} />
          }
        </div>
        <div className="text-right">
          <h5>
            <Icon type="time" />
            <span className="space-left">
              {p.end &&
                <span>
                  <Duration start={durationStart} end={p.end} />
                  <span>&nbsp;-&nbsp;</span>
                </span>
              }
              <Ago date={p.start} />
            </span>
          </h5>
          {parallelism > 0 && <h5>{parallelism}x parallelism</h5>}
        </div>
      </ListItem>
      {p.showContainers && p.containers.map((container, index) =>
        <BuildContainerItem key={index} {...container} />
      )}
    </List>
  );
};

BuildItem.propTypes = {
  projectData: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  branch: PropTypes.string.isRequired,
  build: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string,
  githubCommitUrl: PropTypes.string,
  containers: PropTypes.array,
  showContainers: PropTypes.bool,
  showScreenshots: PropTypes.bool,
  toggleContainers: PropTypes.func,
  cancelBuild: PropTypes.func,
  user: PropTypes.object
};

export default BuildItem;
