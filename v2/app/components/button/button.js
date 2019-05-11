import React, {PropTypes} from 'react';
import Icon from '../icon/icon';
import classnames from 'classnames';

const Button = (p) => {
  const buttonClasses = classnames({
    btn: true,
    ['btn-' + p.type]: true,
    [p.className]: p.className,
    ['btn-' + p.size]: p.size,
    ['btn-border']: p.border,
    active: p.isActive,
    'is-disabled': p.isDisabled
  });
  return (
    <a className={buttonClasses} onClick={p.onClick} disabled={p.isDisabled}>
      {p.icon
        ? (p.children
            ? <span className="flex">
                <Icon type={p.icon} />
                <span className="space-left">{p.children}</span>
              </span>
            : <Icon type={p.icon} />
          )
        : p.children
      }
    </a>
  );
};

Button.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
  size: PropTypes.string,
  border: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool
};

Button.defaultProps = {
  type: 'default'
};

export default Button;
