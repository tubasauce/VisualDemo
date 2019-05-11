import React, {PropTypes} from 'react';
import AppContainer from '../app-container/app-container';
import Activity from '../activity/activity';
import Project from '../project/project';
import GettingStarted from '../getting-started/getting-started';
import Overlay from '../overlay/overlay';
import StateList from '../state-list/state-list';
import StateDetail from '../state-detail/state-detail';
import Trial from '../trial/trial';
import ModalStyleDetail from '../modal-style-detail/modal-style-detail';
import ModalDiffDetail from '../modal-diff-detail/modal-diff-detail';
import ModalShortcuts from '../modal-shortcuts/modal-shortcuts';
import {HotKeys} from 'react-hotkeys';

const Dashboard = (p) => {
  const {ui, activity, activityData} = p;
  const hotKeyMap = {
    prev: 'left',
    next: 'right',
    accept: 'shift+up',
    reject: 'shift+down',
    close: 'esc',
    toggleHighlights: 'x',
    help: '?'
  };
  return (
    <HotKeys keyMap={hotKeyMap}>
      <AppContainer {...p} appView="dashboard">
        {activityData.isTrialExpired &&
          <div className="col-xs-12">
            <Trial />
          </div>
        }
        <div className="col-xs-4">
          <Activity {...p} />
        </div>
        <div className="col-xs-8">
          {(activity.status === '' && (activityData.projects.length === 0 || ui.selected.project === ''))
            ? <GettingStarted {...p} />
            : <Project {...p}
                onToggleUI={(name) => p.toggleUI('dashboard', name)}
                onSelectBranch={(branch) => p.selectProject({
                  project: ui.selected.project,
                  branch
                })}
              />
          }
        </div>

        <Overlay show={ui.dashboard.showOverlay}>
          {!ui.selected.state &&
            <StateList {...p}
              onClose={p.closeStates}
              onToggleFilter={p.toggleStatesFilter}
              onSelectAllFilters={p.selectAllStatesFilters}
              onSelectState={p.selectState}
              onAcceptAll={p.acceptAllStates}
              onAcceptStates={p.acceptStates}
              onToggleUI={p.toggleUI}
            />
          }
          {ui.selected.state &&
            <StateDetail {...p}
              onClose={p.closeState}
              onSelectState={p.selectState}
              onStatusChange={p.updateStateStatus}
              onToggleUI={(name) => p.toggleUI('stateDetail', name)}
            />
          }
        </Overlay>

      </AppContainer>
      <ModalStyleDetail changes={ui.modal.changes} onClose={p.closeModal} />
      <ModalDiffDetail diffImageUrl={ui.modal.diffImageUrl} onClose={p.closeModal} />
      <ModalShortcuts isOpen={ui.modal.shortcuts} onClose={p.closeModal} />
    </HotKeys>
  );
};

Dashboard.propTypes = {
  ui: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired,
  activityData: PropTypes.object.isRequired,
  closeModal: PropTypes.func
};

export default Dashboard;
