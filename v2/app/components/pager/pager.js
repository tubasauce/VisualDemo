import React, {PropTypes} from 'react';
import Icon from '../icon/icon';

const Pager = (p) => {
  const hasPrev = (p.index - 1) > -1;
  const hasNext = (p.index + 1) < p.total;
  return (
    <div className="flex align-center">
      <h4>
        {hasPrev
          ? <a className="icon qa-prev" onClick={p.onPrev}><Icon type="arrow-left" /></a>
          : <span className="is-disabled"><Icon type="arrow-left" /></span>
        }
      </h4>
      <div className="space-left-2 space-right-2">
        {p.index + 1} / {p.total}
      </div>
      <h4>
        {hasNext
          ? <a className="icon qa-next" onClick={p.onNext}><Icon type="arrow-right" /></a>
          : <span className="is-disabled"><Icon type="arrow-right" /></span>
        }
      </h4>
    </div>
  );
};

Pager.propTypes = {
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPrev: PropTypes.func,
  onNext: PropTypes.func
};

Pager.defaultProps = {
  index: -1,
  total: 0
};

export default Pager;
