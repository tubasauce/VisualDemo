import React, {PropTypes} from 'react';
import Icon from '../icon/icon';
import classnames from 'classnames';

const ButtonClose = (p) => {
  const buttonClasses = classnames({
    flex: true,
    'align-center': true,
    small: true,
    lite: p.isLite
  });
  return (
    <a className={buttonClasses} onClick={p.onClick}>
      <Icon type="x" label={p.label} />
    </a>
  );
};

ButtonClose.propTypes = {
  label: PropTypes.string.isRequired,
  isLite: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};

ButtonClose.defaultProps = {
  isLite: false
};

export default ButtonClose;
