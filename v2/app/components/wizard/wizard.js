import React, {PropTypes} from 'react';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import ProgressItem from '../progress-item/progress-item';
import Button from '../button/button';
import Icon from '../icon/icon';

const Wizard = (p) => {
  const totalSteps = React.Children.count(p.children);
  const progressPercent = ((p.stepIndex + 1) / totalSteps) * 100;
  const prevIndex = p.stepIndex > 0 ? p.stepIndex - 1 : false;
  const nextIndex = p.stepIndex < (totalSteps - 1) ? p.stepIndex + 1 : false;
  return (
    <List className="sub-list-bottom">
      <ProgressItem percent={progressPercent} />
      <ListItem isActive>
        <div style={{height: '300px'}}>
          {p.children[p.stepIndex]}
        </div>
      </ListItem>
      <ListItem isActive className="justify-spaced align-center">
        {prevIndex !== false &&
          <Button border onClick={() => p.onPrev(prevIndex)} className="qa-wizard-prev">
            <div className="flex">
              <Icon type="arrow-left" />
              <span className="space-left-2">Previous</span>
            </div>
          </Button>
        }
        <a onClick={() => window.Intercom('show')}>Need Help?</a>
        {nextIndex &&
          <Button type="primary" onClick={() => p.onNext(nextIndex)} className="qa-wizard-next">
            <div className="flex">
              <span className="space-right-2">Next</span>
              <Icon type="arrow-right" />
            </div>
          </Button>
        }
      </ListItem>
    </List>
  );
};

Wizard.propTypes = {
  children: PropTypes.any,
  stepIndex: PropTypes.number,
  onPrev: PropTypes.func,
  onNext: PropTypes.func
};

Wizard.defaultProps = {
  stepIndex: 0
};

export default Wizard;
