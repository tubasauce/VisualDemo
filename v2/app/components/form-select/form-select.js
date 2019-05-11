import React, {PropTypes} from 'react';
import classnames from 'classnames';

const FormSelect = (p) => {
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
      <select className="form-control" value={p.value} onChange={(e) => p.onChange(e.target.value)}>
        {p.options.map((option, index) =>
          <option key={index} value={option.value}>{option.label}</option>
        )}
      </select>
    </div>
  );
};

FormSelect.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  errorMessage: PropTypes.any,
  className: PropTypes.string,
  onChange: PropTypes.func
};

FormSelect.defaultProps = {
  options: []
};

export default FormSelect;
