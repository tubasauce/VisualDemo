import React, {PropTypes} from 'react';
import classnames from 'classnames';

const TotalsBar = (p) => {
  const types = ['changed', 'new', 'accepted', 'rejected'];
  const selectObj = {
    resolution: p.resolution,
    testName: p.name
  };
  return (
    <div className="flex">
      {types.map((type, index) => {
        const totalClasses = classnames({
          'space-left-4': true,
          'is-disabled': !p.totals[type]
        });
        return (
          <div key={index} className={totalClasses} onClick={() => p.onOpenStates(type, selectObj)}>
            <div className={`${type} large-circle`}></div>
            <a className="title small">{p.totals[type]} {type}</a>
          </div>
        );
      })}
    </div>
  );
};

TotalsBar.propTypes = {
  resolution: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  totals: PropTypes.object.isRequired,
  onOpenStates: PropTypes.func
};

export default TotalsBar;
