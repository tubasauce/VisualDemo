import React, {PropTypes} from 'react';
import Icon from '../icon/icon';
import classnames from 'classnames';

const ButtonCheckbox = (p) => {
  const checkboxClasses = classnames({
    badge: true,
    border: true,
    ['badge-' + p.color]: p.isChecked,
    'badge-lite': !p.isChecked,
    [p.className]: p.className
  });
  const icon = p.isChecked ? 'checked' : 'unchecked';
  return (
    <a className={checkboxClasses} onClick={p.onClick}>
      <Icon type={icon} label={p.label} />
    </a>
  );
};

ButtonCheckbox.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
};

ButtonCheckbox.defaultProps = {
  isChecked: false,
  color: 'blue'
};

export default ButtonCheckbox;
