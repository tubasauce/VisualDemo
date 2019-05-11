import React, {PropTypes} from 'react';
import Button from '../button/button';
import classnames from 'classnames';

const ButtonReview = (p) => {
  const btnClasses = classnames({
    'qa-review': true,
    [p.className]: p.className
  });
  const reviewTotal = p.totals.changed + p.totals.new;
  let label = 'Review';
  if (reviewTotal > 0) {
    if (p.totals.changed > 0 && p.totals.new > 0) {
      label = `Review ${reviewTotal} Changed & New`;
    } else if (p.totals.changed > 0) {
      label = `Review ${reviewTotal} Changed`;
    } else {
      label = `Review ${reviewTotal} New`;
    }
  }
  return (
    <Button size={p.size} border className={btnClasses} isDisabled={reviewTotal === 0} onClick={p.onClick}>
      {label}
    </Button>
  );
};

ButtonReview.propTypes = {
  totals: PropTypes.object.isRequired,
  size: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

ButtonReview.defaultProps = {
  size: 'sm'
};

export default ButtonReview;
