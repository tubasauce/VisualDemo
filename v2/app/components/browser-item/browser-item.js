import React, {PropTypes} from 'react';
import ListItem from '../list-item/list-item';
import Media from '../media/media';
import TotalsBar from '../totals-bar/totals-bar';
import ButtonReview from '../button-review/button-review';
import Ago from '../ago/ago';

const BrowserItem = (p) => {
  const selectObj = {
    resolution: p.resolution,
    testName: p.name
  };
  const isDeviceEmulation = p.browserName === 'chrome' && p.name.toLowerCase().indexOf(p.browserName) === -1;
  const browserIcon = isDeviceEmulation ? 'chrome-device-emulation' : (p.browserName || '').replace(/\s/g, '-');
  return (
    <ListItem isActive>
      <Media icon={browserIcon} align={browserIcon && 'center'}>
        <div className="justify-spaced align-center">
          <div>
            <h4>{p.name}</h4>
            <a className="small" onClick={() => p.onOpenStates('all', selectObj)}>View {p.name} States</a>
          </div>
          <div className="text-right">
            <TotalsBar {...p} />
            <ButtonReview totals={p.totals} className="space-top-2 space-bottom-2" onClick={() => p.onOpenStates('review', selectObj)} />
            <div className="small">
              Updated <Ago date={p.updatedAt} />
            </div>
          </div>
        </div>
      </Media>
    </ListItem>
  );
};

BrowserItem.propTypes = {
  resolution: PropTypes.string.isRequired,
  browserName: PropTypes.string,
  name: PropTypes.string.isRequired,
  totals: PropTypes.object.isRequired,
  updatedAt: PropTypes.string.isRequired,
  onOpenStates: PropTypes.func
};

export default BrowserItem;
