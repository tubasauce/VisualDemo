import React, {PropTypes} from 'react';
import Button from '../button/button';
import ButtonClose from '../button-close/button-close';
import ChangeList from '../change-list/change-list';
import StateHistory from '../state-history/state-history';
import StateOverlaySlider from '../state-overlay-slider/state-overlay-slider';
import Tabs from '../tabs/tabs';
import classnames from 'classnames';

const SidePanel = (p) => {
  const {ui, stateData} = p;
  const panelClasses = classnames({
    'side-panel v2': true,
    open: p.isOpen
  });
  const sideType = ui.stateDetail.sideType || 'changes';
  return (
    <div>
      {!p.isOpen &&
        <div className="side-toggle v2" style={{position: 'fixed', top: 0}}>
          <Button size="xs" icon="arrow-right" onClick={p.onToggleOpen} />
        </div>
      }
      <div className={panelClasses}>
        <div className="justify-end space-top-2 space-right-2">
          <ButtonClose label="Close" onClick={p.onToggleOpen} />
        </div>
        <div className="space-left-2">
          <Tabs
            value={sideType}
            onChange={p.setSideType}
            items={[
              {label: 'Changes', value: 'changes'},
              stateData && stateData.referenceUrl && {label: 'Overlay', value: 'overlay'},
              {label: 'History', value: 'history'}
            ]} />
        </div>
        {sideType === 'changes' &&
          <ChangeList {...p} />
        }
        {sideType === 'overlay' &&
          <StateOverlaySlider {...p} />
        }
        {sideType === 'history' &&
          <StateHistory {...p} />
        }
      </div>
    </div>
  );
};

SidePanel.propTypes = {
  ui: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggleOpen: PropTypes.func,
  setSideType: PropTypes.func,
  stateData: PropTypes.object
};

SidePanel.defaultProps = {
  isOpen: false
};

export default SidePanel;
