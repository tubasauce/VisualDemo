import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import Icon from '../icon/icon';
import Breadcrumb from '../breadcrumb/breadcrumb';
import Button from '../button/button';
import ButtonClose from '../button-close/button-close';
import ButtonCheckbox from '../button-checkbox/button-checkbox';
import ButtonShowHide from '../button-show-hide/button-show-hide';
import StateItem from '../state-item/state-item';
import LoaderItem from '../loader-item/loader-item';
import Confirm from 'react-confirm-bootstrap';
import {HotKeys} from 'react-hotkeys';

class StateList extends Component {
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.stateList).focus();
  }

  render() {
    const p = this.props;
    const {ui, projectData, states, statesTotals, statesGroupedData} = p;
    const breadcrumbs = [
      projectData.projectRepo,
      ui.selected.branch
    ];
    const allFiltersSelected = ui.statesFilterBy.changed && ui.statesFilterBy.new && ui.statesFilterBy.rejected;
    const hotKeyHandlers = {
      close: p.onClose
    };
    const isTester = projectData.role !== 'viewer';
    const truncate = (txt, maxLength) => {
      if (txt.length > maxLength) {
        return `${txt.substring(0, maxLength)}...`;
      }
      return txt;
    };
    const getChanged = (states) => states.filter(({status}) => status === 'changed');
    return (
      <HotKeys handlers={hotKeyHandlers} ref="stateList">

        <List className="top-fixed-list sub-list desktop-only">
          <ListItem isDark className="justify-spaced align-center">
            <Breadcrumb values={breadcrumbs} className="white" />
            <ButtonClose label="Back to Dashboard" isLite onClick={p.onClose} />
          </ListItem>
          <LoaderItem request={states} />
          {states.status === '' &&
            <ListItem isActive className="justify-spaced align-center">
              <div className="flex align-center space-top space-bottom" style={{minHeight: '32px'}}>
                <a className="small qa-select-all" onClick={p.onSelectAllFilters}>Select All</a>
                <ButtonCheckbox label={`${statesTotals.changed} Changed`} isChecked={ui.statesFilterBy.changed} onClick={() => p.onToggleFilter('changed')} color="orange" className="space-left-4" />
                <ButtonCheckbox label={`${statesTotals.new} New`} isChecked={ui.statesFilterBy.new} onClick={() => p.onToggleFilter('new')} color="blue-dark" className="space-left-4" />
                <ButtonCheckbox label={`${statesTotals.accepted} Accepted`} isChecked={ui.statesFilterBy.accepted} onClick={() => p.onToggleFilter('accepted')} color="green" className="space-left-4" />
                <ButtonCheckbox label={`${statesTotals.rejected} Rejected`} isChecked={ui.statesFilterBy.rejected} onClick={() => p.onToggleFilter('rejected')} color="red" className="space-left-4" />
                {projectData.totalReviewed > 0 &&
                  <div className="separator-left">
                    <ButtonCheckbox label="Show Reviewed Only" isChecked={ui.statesFilterBy.reviewed} onClick={() => p.onToggleFilter('reviewed')} color="black" />
                  </div>
                }
              </div>
              {isTester &&
                <Confirm
                  onConfirm={p.onAcceptAll}
                  body="Are you sure you want to Accept All Currently Selected UI States?"
                  confirmText="Yes"
                  title="Accept All Selected">
                  <Button border className="btn-accept-all" isDisabled={p.isAllAccepted}>
                    <Icon type="success" label={`Accept All ${allFiltersSelected ? '' : 'Selected'}`} />
                  </Button>
                </Confirm>
              }
            </ListItem>
          }
        </List>

        {states.status === '' && statesGroupedData.length === 0 &&
          <h3 className="white text-center space-bottom">No Results for Selected Filters</h3>
        }
        {statesGroupedData.map((group, i) =>
          <div key={i} className="clearfix space-bottom-4">
            <h3 className="white text-center space-top-4 space-bottom-4">{group.resolution} - {group.testName}</h3>
            {(group.sections || []).length > 0 &&
              <div>
                {group.sections.map((section, j) => {
                  const truncatedName = truncate(section.name, 24);
                  const sectionStates = group.states.filter(({name}) => name.indexOf(`${section.name}: `) === 0);
                  const changedStates = getChanged(sectionStates);
                  const hasChanged = changedStates.length > 0;
                  return (
                    <div key={j}>
                      <h4 className="gallery-header justify-spaced align-center">
                        <ButtonShowHide
                            className="white"
                            label={section.name}
                            prefix={false}
                            show={!ui.showSections[section._id]}
                            onClick={() => p.onToggleUI('showSections', section._id)} />
                        {isTester && hasChanged &&
                          <Confirm
                            onConfirm={() => p.onAcceptStates(changedStates)}
                            body={`Are you sure you want to Accept ${truncatedName} Changed States?`}
                            confirmText="Yes"
                            title={`Accept ${truncatedName} States`}>
                            <Button border size="xs" className="btn-accept-all no-bg space-right-4">
                              <Icon type="success" label={`Accept ${truncatedName} States`} />
                            </Button>
                          </Confirm>
                        }
                      </h4>
                      {!ui.showSections[section._id] &&
                        <div className="gallery">
                          {sectionStates.map((state, j) =>
                            <StateItem key={j} {...state} onClick={() => p.onSelectState(state, true)} />
                          )}
                        </div>
                      }
                    </div>
                  );
                })}
              </div>
            }
            {(group.sections || []).length === 0 &&
              <div className="gallery">
                {group.states.map((state, j) =>
                  <StateItem key={j} {...state} onClick={() => p.onSelectState(state, true)} />
                )}
              </div>
            }
          </div>
        )}

      </HotKeys>
    );
  }
}

StateList.propTypes = {
  ui: PropTypes.object.isRequired,
  projectData: PropTypes.object.isRequired,
  states: PropTypes.object.isRequired,
  statesGroupedData: PropTypes.array.isRequired,
  onClose: PropTypes.func,
  onSelectAllFilters: PropTypes.func,
  onToggleFilter: PropTypes.func,
  onAcceptAll: PropTypes.func,
  onAcceptStates: PropTypes.func,
  onSelectState: PropTypes.func,
  onToggleUI: PropTypes.func
};

export default StateList;
