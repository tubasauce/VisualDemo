import React, {Component, PropTypes} from 'react';
import onClickOutsidefrom from 'react-onclickoutside';
import classnames from 'classnames';

class StatusDropdown extends Component {
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
    const dropdownClasses = classnames({
      dropdown: true,
      open: p.isOpen,
      [p.className]: p.className
    });
    const statusClasses = classnames({
      badge: true,
      ['label-' + p.status]: p.status
    });
    const triggerChange = (status) => {
      if (p.status !== status) {
        p.onChange(status);
      }
    };
    const reviewer = p.isReviewed ? ` by ${p.userName}` : '';
    const autoAccepted = p.isAutoAccepted ? ` from ${p.branch}` : '';
    return (
      <div className={dropdownClasses}>
        <a className="btn btn-default dropdown-toggle" onClick={p.onToggleOpen}>
          <span className={statusClasses}>
            <span className="capitalize">{p.status}</span>
            {(p.isReviewed || p.isAutoAccepted) &&
              <span>{reviewer || autoAccepted}</span>
            }
          </span>
          &nbsp;
          <span className="caret"></span>
        </a>
        <div className="dropdown-menu no-padding no-border">
          <div className="open">
            <ul className="dropdown-menu">
              <li className={p.status === 'accepted' ? 'disabled': ''}>
                <a onClick={() => triggerChange('accepted')}>Accept</a>
              </li>
              <li className={p.status === 'rejected' ? 'disabled': ''}>
                <a onClick={() => triggerChange('rejected')}>Reject</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

StatusDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  userName: PropTypes.string,
  isReviewed: PropTypes.bool,
  isAutoAccepted: PropTypes.bool,
  branch: PropTypes.string,
  onChange: PropTypes.func,
  onToggleOpen: PropTypes.func,
  className: PropTypes.string
};

StatusDropdown.defaultProps = {
  isOpen: false
};

export default onClickOutsidefrom(StatusDropdown);
