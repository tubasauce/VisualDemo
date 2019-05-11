import React, {PropTypes} from 'react';
import Icon from '../icon/icon';
import classnames from 'classnames';

const Media = (p) => {
  // when align=center, use flexbox
  // otherwise, use media object with floats so that text truncate works
  const useFlex = p.align === 'center';
  const mediaClasses = classnames({
    // flexbox
    flex: useFlex,
    'align-center': p.align === 'center',
    'row-reverse': useFlex && p.side === 'right',
    // traditional media object
    media: !useFlex,
    // all
    [p.className]: p.className
  });
  const objectClasses = classnames({
    // flexbox
    'space-right-2': useFlex && p.side === 'left',
    'space-left-2': useFlex && p.side === 'right',
    // traditional media object
    'pull-left': !useFlex && p.side === 'left',
    'pull-right': !useFlex && p.side === 'right'
  });
  const bodyClasses = classnames({
    // flexbox
    'flex-auto': useFlex,
    // traditional media object
    'media-body': !useFlex
  });
  return (
    <div className={mediaClasses}>
      <div className={objectClasses}>
        {p.icon && <Icon type={p.icon} />}
        {p.object}
      </div>
      <div className={bodyClasses}>
        {p.children}
      </div>
    </div>
  );
};

Media.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.string,
  object: PropTypes.any,
  side: PropTypes.string,
  align: PropTypes.string,
  className: PropTypes.string
};

Media.defaultProps = {
  side: 'left'
};

export default Media;
