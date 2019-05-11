import React, {PropTypes} from 'react';
import classnames from 'classnames';
import Icon from '../icon/icon';

const ButtonShowHide = (p) => {
  const icon = p.show ? 'arrow-down' : 'arrow-right';
  const label = p.label && p.prefix ? (p.show ? `Hide ${p.label}` : `Show ${p.label}`) : p.label;
  const btnClasses = classnames({
    icon: true,
    small: true,
    flex: true,
    'align-center': true,
    [p.className]: p.className
  });
  return (
    <a className={btnClasses} onClick={p.onClick}>
      <Icon type={icon} label={label} />
      {p.children &&
        <span className="space-left">
          {p.children}
        </span>
      }
    </a>
  );
};

ButtonShowHide.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.any,
  label: PropTypes.string,
  onClick: PropTypes.func,
  prefix: PropTypes.bool,
  className: PropTypes.string
};

ButtonShowHide.defaultProps = {
  show: false,
  prefix: true
};

export default ButtonShowHide;
