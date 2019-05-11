import React, {PropTypes} from 'react';

const Tags = (p) => {
  return (
    <div>
      {p.values.map((tag, index) =>
        <div key={index} className="space-bottom">
          <div className="label label-contrast space-right">{tag}</div>
        </div>
      )}
    </div>
  );
};

Tags.propTypes = {
  values: PropTypes.array.isRequired
};

export default Tags;
