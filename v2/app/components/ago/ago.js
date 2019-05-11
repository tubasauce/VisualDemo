import React, {PropTypes} from 'react';
import TimeAgo from 'react-timeago';

const timeFormatter = (value, unit, suffix) => {
  // If saved less than a minute ago, display a static message instead
  // of counting up the seconds
  if (unit !== 'second') {
    return [value, unit + (value !== 1 ? 's' : ''), suffix].join(' ');
  }
  if (suffix === 'ago') {
    return 'just now';
  }
};

const Ago = (p) => {
  return (
    <TimeAgo date={p.date} formatter={timeFormatter} />
  );
};

Ago.propTypes = {
  date: PropTypes.string.isRequired
};

export default Ago;
