import React, {PropTypes} from 'react';
import Moment from 'moment';

const calculateDuration = (start, end) => {
  let duration = (new Date(end) - new Date(start));
  const hr = 60*60*1000;
  const hrs = Math.floor(duration / hr);
  if (hrs > 0) {
    duration = duration - (hrs * hr);
    return `${hrs}:${Moment(duration).format('mm:ss')}`;
  } else {
    return Moment(duration).format('mm:ss');
  }
};

const Duration = (p) => {
  return (
    <span>{calculateDuration(p.start, p.end)}</span>
  );
};

Duration.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired
};

export default Duration;
