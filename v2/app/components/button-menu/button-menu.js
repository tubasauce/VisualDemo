import React, {Component, PropTypes} from 'react';
import Button from '../button/button';
import onClickOutsidefrom from 'react-onclickoutside';
import classnames from 'classnames';

class ButtonMenu extends Component {
  constructor() {
    super();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(e) {
    if (this.props.isOpen) {
      this.props.onToggleOpen(e);
    }
  }

  render() {
    const p = this.props;
    const containerClasses = classnames({
      dropdown: true,
      open: p.isOpen,
      [p.className]: p.className
    });
    const menuClasses = classnames({
      'dropdown-menu': true,
      'pull-right': p.align === 'right'
    });
    return (
      <div className={containerClasses}>
        <Button className="dropdown-toggle" icon={p.icon} onClick={p.onToggleOpen}>
          {p.label}
        </Button>
        <ul className={menuClasses} onClick={p.onToggleOpen}>
          {p.children}
        </ul>
      </div>
    );
  }
}

ButtonMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  align: PropTypes.string.isRequired,
  label: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.any,
  onToggleOpen: PropTypes.func,
  className: PropTypes.string
};

ButtonMenu.defaultProps = {
  isOpen: false,
  align: 'left'
};

export default onClickOutsidefrom(ButtonMenu);
