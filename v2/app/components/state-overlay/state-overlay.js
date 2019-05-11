import React, {PropTypes} from 'react';
import ImageLoader from 'react-imageloader';

const StateOverlay = (p) => {
  const {ui, stateData} = p;
  const opacity = (ui.stateDetail.overlay >= 0 ? ui.stateDetail.overlay : 100) / 100;
  return (
    <div className="col-xs-12 text-center">
      <div className="overlay-container" style={{minHeight: '100vh'}}>
        <ImageLoader
            src={stateData.referenceUrl}
            wrapper={React.DOM.div}
            imgProps={{ className: 'img-responsive no-vmargin' }}
            preloader={() => <img src="/img/running.svg" />}>
          <img src={stateData.referenceUrl} className="img-responsive no-vmargin" />
        </ImageLoader>
        <div className="overlay-screenshot" style={{opacity}}>
          <ImageLoader
              src={stateData.currentUrl}
              wrapper={React.DOM.div}
              imgProps={{ className: 'img-responsive' }}
              preloader={() => <img src="/img/running.svg" />}>
            <img src={stateData.currentUrl} className="img-responsive" />
          </ImageLoader>
        </div>
      </div>
    </div>
  );
};

StateOverlay.propTypes = {
  ui: PropTypes.object.isRequired,
  stateData: PropTypes.object.isRequired
};

export default StateOverlay;
