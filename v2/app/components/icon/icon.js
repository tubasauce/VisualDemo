import React, {PropTypes} from 'react';
import classnames from 'classnames';

const Icon = (p) => {
  const iconClasses = classnames({
    glyphicon: p.type !== 'pending' && p.type !== 'running',
    [p.type]: p.type,
    [{
      plus: 'glyphicon-plus',
      cog: 'glyphicon-cog',
      queued: 'glyphicon-minus-sign',
      running: 'icon-running color-only',
      pending: 'icon-running',
      success: 'glyphicon-ok-sign',
      failure: 'glyphicon-exclamation-sign',
      error: 'glyphicon-exclamation-sign',
      cancelled: 'glyphicon-minus-sign',
      checked: 'glyphicon-check',
      unchecked: 'glyphicon-unchecked',
      time: 'glyphicon-time',
      trash: 'glyphicon-trash',
      'arrow-left': 'glyphicon-chevron-left',
      'arrow-right': 'glyphicon-chevron-right',
      'arrow-down': 'glyphicon-chevron-down',
      github: 'icon-github-circled icon-gh',
      x: 'icon-close'
    }[p.type] || 'icon-browser']: p.type
  });
  return (
    <span>
      <span className={iconClasses}></span>
      {p.label && <span className="space-left">{p.label}</span>}
    </span>
  );
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string
};

export default Icon;
