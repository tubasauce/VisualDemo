import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import Breadcrumb from '../breadcrumb/breadcrumb';
import Pager from '../pager/pager';
import ButtonClose from '../button-close/button-close';
import Media from '../media/media';
import StatusDropdown from '../status-dropdown/status-dropdown';
import StateScreenshot from '../state-screenshot/state-screenshot';
import StateOverlay from '../state-overlay/state-overlay';
import SidePanel from '../side-panel/side-panel';
import SideNav from '../side-nav/side-nav';
import {HotKeys} from 'react-hotkeys';
import classnames from 'classnames';

class StateDetail extends Component {
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.stateDetail).focus();
  }

  render() {
    const p = this.props;
    const {ui, projectData, stateData, statesData, stateIndex} = p;
    const breadcrumbs = [
      projectData.projectRepo,
      ui.selected.branch,
      stateData.resolution,
      stateData.testName
    ];
    const showReference = stateData.referenceUrl && !ui.stateDetail.currentFullSize;
    const showCurrent = !ui.stateDetail.referenceFullSize;
    const isFullSize = ui.stateDetail.currentFullSize || ui.stateDetail.referenceFullSize;
    const showOverlay = ui.stateDetail.sideType === 'overlay';
    const colClass = classnames({
      'col-xs-6': stateData.referenceUrl && !isFullSize,
      'col-xs-12': !stateData.referenceUrl || isFullSize
    });
    const isTester = projectData.role !== 'viewer';
    const prevState = statesData[stateIndex - 1];
    const nextState = statesData[stateIndex + 1];
    const isModalOpen = !!ui.modal.shortcuts || !!ui.modal.changes || !!ui.modal.diffImageUrl;
    const hotKeyHandlers = {
      prev: () => !isModalOpen && prevState && p.onSelectState(prevState),
      next: () => !isModalOpen && nextState && p.onSelectState(nextState),
      accept: () => !isModalOpen && isTester && stateData.status !== 'accepted' && p.onStatusChange(stateData, 'accepted'),
      reject: () => !isModalOpen && isTester && stateData.status !== 'rejected' && p.onStatusChange(stateData, 'rejected'),
      close: () => isModalOpen ? p.closeModal() : p.onClose(ui.dashboard.scrollTop),
      toggleHighlights: () => !isModalOpen && p.toggleHighlights(),
      help: () => !isModalOpen && p.toggleModal('shortcuts')
    };
    return (
      <HotKeys handlers={hotKeyHandlers} ref="stateDetail">

        <Media side="right" object={
          <SideNav {...p} isOpen={ui.prefs.openSideNav} onToggleOpen={() => p.toggleUI('prefs', 'openSideNav')} />
        }>
          <List className="top-fixed-list sub-list desktop-only">
            <ListItem isDark className="justify-spaced align-center">
              <Breadcrumb values={breadcrumbs} className="white" />
              <ButtonClose label="Back to Index" isLite onClick={() => p.onClose(ui.dashboard.scrollTop)} />
            </ListItem>
            <ListItem isActive>
              <Media side="right" className="overflow" object={
                <Pager
                  index={stateIndex}
                  total={statesData.length}
                  onPrev={() => p.onSelectState(prevState)}
                  onNext={() => p.onSelectState(nextState)}
                />
              }>
                <div className="flex align-center">
                  {isTester &&
                    <StatusDropdown
                      {...stateData}
                      isOpen={ui.stateDetail.openStatus}
                      onToggleOpen={() => p.onToggleUI('openStatus')}
                      onChange={(status) => p.onStatusChange(stateData, status)}
                      className="space-right-2" />
                  }
                  <h4 className="truncate">
                    {stateData.name}
                    {projectData && projectData.latestBuild &&
                      <a
                        className="glyphicon glyphicon-new-window tiny space-left-2"
                        title="View in logs"
                        target="_blank"
                        href={`/find/${projectData.project}/logs?buildRef=${projectData.latestBuild._id}&testName=${encodeURIComponent(stateData.testName)}&resolution=${stateData.resolution}&state=${encodeURIComponent(stateData.id)}`}>
                      </a>
                    }
                  </h4>
                </div>
              </Media>
            </ListItem>
          </List>

          {showOverlay &&
            <StateOverlay {...p} />
          }
          {showReference && !showOverlay &&
            <div className={colClass}>
              <StateScreenshot
                {...p}
                side="left"
                label="Previously Accepted"
                imageUrl={stateData.referenceUrl}
                isFullSize={ui.stateDetail.referenceFullSize}
                onToggleFullSize={() => p.onToggleUI('referenceFullSize')}
                />
            </div>
          }
          {showCurrent && !showOverlay &&
            <div className={colClass}>
              <StateScreenshot
                {...p}
                side="right"
                label="Current"
                imageUrl={stateData.currentUrl}
                isFullSize={ui.stateDetail.currentFullSize}
                onToggleFullSize={() => p.onToggleUI('currentFullSize')}
                />
            </div>
          }

          <SidePanel {...p} isOpen={ui.prefs.openSidePanel} onToggleOpen={() => p.toggleUI('prefs', 'openSidePanel')} />
        </Media>

      </HotKeys>
    );
  }
}

StateDetail.propTypes = {
  ui: PropTypes.object.isRequired,
  projectData: PropTypes.object.isRequired,
  stateData: PropTypes.object.isRequired,
  statesData: PropTypes.array.isRequired,
  onClose: PropTypes.func,
  onSelectState: PropTypes.func,
  onToggleUI: PropTypes.func,
  onStatusChange: PropTypes.func,
  closeModal: PropTypes.func,
  toggleHighlights: PropTypes.func,
  toggleModal: PropTypes.func
};

export default StateDetail;
