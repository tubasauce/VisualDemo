import React, {PropTypes} from 'react';
import StateHighlights from '../state-highlights/state-highlights';
import ImageLoader from 'react-imageloader';
import classnames from 'classnames';

const StateScreenshot = (p) => {
  const {ui, changesData} = p;
  const imgClasses = classnames({
    'img-responsive': !p.isFullSize,
    'no-vmargin': !p.isFullSize
  });
  return (
    <div className="text-center">
      <h4 className="white space-bottom">{p.label}</h4>
      <a className="small inline-block space-top-2" onClick={p.onToggleFullSize}>{p.isFullSize ? 'Close' : 'View'} Full Size</a>
      <div className="overlay-container space-top-4 space-bottom-4">
        <ImageLoader
            src={p.imageUrl}
            wrapper={React.DOM.div}
            imgProps={{ className: imgClasses }}
            preloader={() => <img src="/img/running.svg" />}>
          <img src={p.imageUrl} className={imgClasses} />
        </ImageLoader>
        {!p.isFullSize && changesData &&
          <div className="text-center overlay-screenshot">
            <StateHighlights
              data={changesData}
              options={{
                side: p.side,
                show: {
                  dom: ui.stateDetail.dom,
                  layout: ui.stateDetail.layout,
                  css: ui.stateDetail.css,
                  content: ui.stateDetail.content
                },
                openSidePanel: p.openSidePanel
              }}
              width={10}
              height={10} />
          </div>
        }
      </div>
    </div>
  );
};

StateScreenshot.propTypes = {
  ui: PropTypes.object.isRequired,
  side: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  changesData: PropTypes.object,
  isFullSize: PropTypes.bool.isRequired,
  onToggleFullSize: PropTypes.func,
  openSidePanel: PropTypes.func
};

StateScreenshot.defaultProps = {
  isFullSize: false
};

export default StateScreenshot;
