import React, {PropTypes} from 'react';
import Button from '../button/button';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import classnames from 'classnames';

const SideNav = (p) => {
  const {isOpen, stateData, statesGroupedData} = p;
  const navClasses = classnames({
    'side-nav': true,
    open: isOpen
  });
  const toggleClasses = classnames({
    'side-nav-toggle': true,
    open: isOpen
  });
  const containerClasses = classnames({
    'side-nav-container': true,
    open: isOpen
  });
  return (
    <div className={containerClasses}>
      <div className={toggleClasses}>
        <Button size="xs" icon={isOpen ? 'arrow-right' : 'arrow-left'} onClick={p.onToggleOpen} />
      </div>
      <div className={navClasses}>
        {(statesGroupedData || []).map((group, i) => {
          if (stateData.resolution === group.resolution && stateData.testName === group.testName) {
            return (
              <div key={i}>
                {(group.sections || []).length > 0 &&
                  <List className="sub-list">
                    {group.sections.map((section, j) => {
                      const isSection = stateData.name.indexOf(`${section.name}: `) === 0;
                      const sectionStates = group.states.filter((state) => state.name.indexOf(`${section.name}: `) === 0);
                      return (
                        <List className="sub-list no-margin" key={j}>
                          <ListItem onClick={() => sectionStates[0] && p.onSelectState(sectionStates[0])}>
                            <div title={section.name} className={`truncate ${isSection ? 'strong' : ''}`}>
                              {section.name}
                            </div>
                          </ListItem>
                          {isSection && sectionStates.map((state) =>
                            <ListItem isActive key={state._id} onClick={() => p.onSelectState(state)}>
                              <div title={state.name} className={`small truncate indent ${stateData._id === state._id ? 'strong' : ''}`}>
                                {state.name.substring(section.name.length + 2)}
                              </div>
                            </ListItem>
                          )}
                        </List>
                      );
                    })}
                  </List>
                }
                {(group.sections || []).length === 0 &&
                  <List className="sub-list">
                    {group.states.map((state) =>
                      <ListItem key={state._id} onClick={() => p.onSelectState(state)}>
                        <div title={state.name} className={`small truncate ${stateData._id === state._id ? 'strong' : ''}`}>
                          {state.name}
                        </div>
                      </ListItem>
                    )}
                  </List>
                }
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

SideNav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  stateData: PropTypes.object.isRequired,
  statesGroupedData: PropTypes.array.isRequired,
  onSelectState: PropTypes.func,
  onToggleOpen: PropTypes.func
};

SideNav.defaultProps = {
  isOpen: false
};

export default SideNav;
