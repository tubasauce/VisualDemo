import React, {PropTypes} from 'react';
import classnames from 'classnames';

const FormInput = (p) => {
  const groupClasses = classnames({
    'form-group': true,
    'has-error': p.errorMessage,
    [p.className]: p.className
  });
  return (
    <div className={groupClasses}>
      {p.label &&
        <label>{p.label}</label>
      }
      {p.errorMessage &&
        <label className="control-label block">{p.errorMessage}</label>
      }
      <input
        type={p.type}
        className="form-control"
        name={p.name}
        value={p.value}
        placeholder={p.placeholder}
        autoFocus={p.autoFocus}
        maxLength={p.maxLength}
        disabled={p.isDisabled}
        onChange={(e) => p.onChange && p.onChange(e.target.value)} />
    </div>
  );
};

FormInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  autoFocus: PropTypes.bool,
  isDisabled: PropTypes.bool,
  errorMessage: PropTypes.any,
  onChange: PropTypes.func,
  className: PropTypes.string
};

FormInput.defaultProps = {
  type: 'text'
};

export default FormInput;
