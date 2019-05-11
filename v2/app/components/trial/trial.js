import React from 'react';

const Trial = (p) => {
  return (
    <div className="alert alert-info">
      <div className="strong">Your Trial Has Expired</div>
      <p>
        We hope you enjoyed your free trial! You can continue where you left off by <a href="/v2/plans" target="_self">subscribing to a plan</a>.
      </p>
    </div>
  );
};

export default Trial;
