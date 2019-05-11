import React, {PropTypes} from 'react';
import Button from '../button/button';
import compact from 'lodash/compact';

const Tabs = (p) => {
  const triggerChange = (value) => {
    if (p.value !== value) {
      p.onChange && p.onChange(value);
    }
  };
  return (
    <div className="btn-group">
      {compact(p.items).map((tab, index) => {
        const isSelected = p.value === tab.value;
        const buttonType = isSelected ? 'primary' : 'default';
        return (
          <Button key={index} type={buttonType} isActive={isSelected} onClick={() => triggerChange(tab.value)}>
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
};

Tabs.propTypes = {
  items: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default Tabs;
