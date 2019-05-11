import React, {PropTypes} from 'react';
import compact from 'lodash/compact';
import classnames from 'classnames';

const Breadcrumb = (p) => {
  const values = compact(p.values);
  const breadcrumbClasses = classnames({
    flex: true,
    'align-center': true,
    [p.className]: p.className
  });
  const HeadingTag = `h${p.priority}`;
  return (
    <div className={breadcrumbClasses}>
      {values.map((value, index) => {
        if (index === 0) {
          return (
            <HeadingTag key={index}>{value}</HeadingTag>
          );
        } else {
          return (
            <div key={index} className="flex align-center">
              <span className="glyphicon glyphicon-chevron-right tiny space-left-2 space-right-2"></span>
              <HeadingTag>{value}</HeadingTag>
            </div>
          );
        }
      })}
    </div>
  );
};

Breadcrumb.propTypes = {
  values: PropTypes.array.isRequired,
  priority: PropTypes.number.isRequired,
  className: PropTypes.string
};

Breadcrumb.defaultProps = {
  priority: 5
};

export default Breadcrumb;
