import React, {PropTypes} from 'react';

const Totals = (p) => {
  const types = ['changed', 'new', 'accepted', 'rejected'];
  return (
    <div className="row">
      {types.map((type, index) =>
        <div key={index} className="col-xs-3 text-center">
          <div className={!p.totals[type] && 'is-disabled'} onClick={() => p.onOpenStates(type)}>
            <a className={'states-total total-' + type}>{p.totals[type]}</a>
            <a className="title block">{type}</a>
          </div>
        </div>
      )}
    </div>
  );
};

Totals.propTypes = {
  totals: PropTypes.object.isRequired,
  onOpenStates: PropTypes.func
};

export default Totals;
