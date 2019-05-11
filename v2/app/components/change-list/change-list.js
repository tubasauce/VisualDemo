import React, {PropTypes} from 'react';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import ChangeItem from '../change-item/change-item';
import ButtonShowHide from '../button-show-hide/button-show-hide';
import LoaderItem from '../loader-item/loader-item';

const plural = (size) => size === 1 ? '' : 's';

const ChangeList = (p) => {
  const {ui, stateData, changes, changesData, changesGroupedData} = p;
  const {isShot} = stateData || {};
  return (
    <div>
      {changes.status !== '' &&
        <List className="sub-list">
          <LoaderItem request={changes} />
        </List>
      }
      {changes.status === '' && changesData.changes.length > 0 &&
        <a onClick={p.toggleHighlights} className="small text-center block space-top-4 space-bottom-4">
          Toggle Highlights
        </a>
      }
      {changes.status === '' &&
        <List className="sub-list">
          {changesData.changes.length === 0 &&
            <ListItem>
              <h4 className="text-center">No Changes</h4>
            </ListItem>
          }
          {!isShot && changesGroupedData.map((group, groupIndex) => group.changes.length > 0 &&
            <List key={groupIndex} className="sub-list">
              <ListItem>
                <ButtonShowHide show={ui.stateDetail[group.type]} onClick={() => p.onToggleUI(group.type)}>
                  <h5>{group.changes.length} {group.name} Change{plural(group.changes.length)}</h5>
                </ButtonShowHide>
              </ListItem>
              {ui.stateDetail[group.type] && group.changes.map((change, changeIndex) =>
                <ChangeItem
                  {...p}
                  key={changeIndex}
                  change={change}
                  type={group.type}
                  isIgnored={change.ignored}
                  onToggleIgnore={() => change.ignored ? p.removeStateIgnore(stateData, change.selector) : p.addStateIgnore(stateData, change.selector)}
                />
              )}
            </List>
          )}
        </List>
      }
    </div>
  );
};

ChangeList.propTypes = {
  ui: PropTypes.object.isRequired,
  stateData: PropTypes.object.isRequired,
  changes: PropTypes.object.isRequired,
  changesData: PropTypes.object.isRequired,
  changesGroupedData: PropTypes.array.isRequired,
  onToggleUI: PropTypes.func,
  addStateIgnore: PropTypes.func,
  removeStateIgnore: PropTypes.func,
  toggleHighlights: PropTypes.func
};

export default ChangeList;
