import React, {PropTypes} from 'react';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import LoaderItem from '../loader-item/loader-item';
import RecentItem from '../recent-item/recent-item';
import ProjectItem from '../project-item/project-item';
import Button from '../button/button';
import Tabs from '../tabs/tabs';

const Activity = (p) => {
  const {ui, activity, activityData, user} = p;
  const activityResults = activityData[ui.dashboard.activityType] || [];
  const showMore = ui.dashboard.activityType === 'recent' && activityResults.length === ui.dashboard.activityLimit && activityResults.length < 120;
  return (
    <List>
      <ListItem className="justify-spaced">
        <Tabs
          value={ui.dashboard.activityType}
          onChange={p.setActivityType}
          items={[{label: 'All Projects', value: 'projects'}, {label: 'Recent Builds', value: 'recent'}]} />
        {user &&
          <Button size="sm" icon="plus" onClick={p.newProject} className="qa-new-project" isDisabled={ui.selected.project === ''} />
        }
      </ListItem>
      <LoaderItem request={activity} />
      {activity.status === '' && activityResults.length === 0 &&
        <ListItem>
          No {ui.dashboard.activityType === 'projects' ? 'Projects' : 'Builds'} Found
        </ListItem>
      }
      {activity.status === '' && activityResults.map((build, index) => {
        if (ui.dashboard.activityType === 'projects') {
          if (build.start) {
            return (
              <ProjectItem key={index}
                {...build}
                isActive={ui.selected.project === build.project}
                onClick={() => p.selectProject(build)} />
            );
          }
        } else {
          return (
            <RecentItem key={index}
              {...build}
              isActive={ui.selected.project === build.project && ui.selected.branch === build.branch}
              onClick={() => p.selectProject(build)} />
          );
        }
      })}
      {activity.status === '' && showMore &&
        <ListItem className="justify-center">
          <Button size="xs" onClick={p.moreActivity}>Show more</Button>
        </ListItem>
      }
    </List>
  );
};

Activity.propTypes = {
  ui: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired,
  activityData: PropTypes.object.isRequired,
  setActivityType: PropTypes.func,
  selectProject: PropTypes.func,
  newProject: PropTypes.func,
  user: PropTypes.object,
  moreActivity: PropTypes.func
};

export default Activity;
