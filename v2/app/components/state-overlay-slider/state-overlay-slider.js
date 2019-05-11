import React, {PropTypes} from 'react';
import Slider from 'rc-slider';
import List from '../list/list';
import ListItem from '../list-item/list-item';

const StateOverlaySlider = (p) => {
  const {ui} = p;
  const opacity = ui.stateDetail.overlay >= 0 ? ui.stateDetail.overlay : 100;
  return (
    <List className="sub-list">
      <ListItem>
        Opacity {opacity}%
        <Slider defaultValue={opacity} onChange={value => p.updateUI('stateDetail', 'overlay', value)} />
      </ListItem>
    </List>
  );
};

StateOverlaySlider.propTypes = {
  ui: PropTypes.object.isRequired,
  updateUI: PropTypes.func
};

export default StateOverlaySlider;
