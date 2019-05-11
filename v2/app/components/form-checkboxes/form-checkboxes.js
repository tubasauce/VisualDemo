import React, {PropTypes} from 'react';
import classnames from 'classnames';

const FormCheckboxes = (p) => {
  const {values} = p;
  const groupClasses = classnames({
    'form-group': true,
    'has-error': p.errorMessage,
    [p.className]: p.className
  });
  const isChecked = (value) => values.indexOf(value) >= 0;
  const toggleValue = (value) => {
    let newValues;
    if (isChecked(value)) {
      newValues = values.filter(v => v !== value);
    } else {
      newValues = values.concat([value]);
    }
    p.onChange && p.onChange(newValues);
  };
  return (
    <div className={groupClasses}>
      {p.label &&
        <label>{p.label}</label>
      }
      {p.errorMessage &&
        <label className="control-label block">{p.errorMessage}</label>
      }
      {p.options.map(({label, value}) => (
        <div className="checkbox" key={value}>
          <label>
            <input
              type="checkbox"
              value={value}
              checked={isChecked(value)}
              onChange={() => toggleValue(value)}
            />
            {label}
          </label>
        </div>
      ))}
    </div>
  );
};

FormCheckboxes.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  values: PropTypes.array,
  errorMessage: PropTypes.any,
  className: PropTypes.string,
  onChange: PropTypes.func
};

FormCheckboxes.defaultProps = {
  options: [],
  values: []
};

export default FormCheckboxes;
