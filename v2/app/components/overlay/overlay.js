import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Overlay = (p) => {
  // handle double scroll bars
  if (document && document.documentElement) {
    document.documentElement.style.overflowY = p.show ? 'hidden' : '';
  }
  return (
    <ReactCSSTransitionGroup
      transitionName="overlay"
      transitionEnterTimeout={200}
      transitionLeaveTimeout={200}>
      {p.show &&
        <div>
          <div id="state-underlay"></div>
          <div id="state" className="desktop-only">
            {p.children}
          </div>
        </div>
      }
    </ReactCSSTransitionGroup>
  );
};

Overlay.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.any
};

Overlay.defaultProps = {
  show: false
};

export default Overlay;
