import React, {PropTypes} from 'react';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import LoaderItem from '../loader-item/loader-item';
import Breadcrumb from '../breadcrumb/breadcrumb';
import Button from '../button/button';

const Notifications = (p) => {
  const {subscriptions, subscriptionsData} = p;
  return (
    <List>
      <ListItem isActive>
        <Breadcrumb values={['Account', 'Notifications']} priority={4} />
      </ListItem>
      <LoaderItem request={subscriptions} />
      {subscriptions.status === '' &&
        <List className="sub-list-bottom">
          <ListItem isActive>

            <div className="text-center">
              <h4>Subscriptions</h4>
              <p>You are subscribed to receive email notifications from the following projects:</p>
            </div>
            <br/>
            <table className="table">
              <tbody>
                {subscriptionsData.subscribed.length === 0 &&
                  <tr>
                    <td className="text-center">
                      <h5 className="gray-out">No Projects Found</h5>
                    </td>
                  </tr>
                }
                {subscriptionsData.subscribed.map((project) => (
                  <tr className="active" key={project.project}>
                    <td className="justify-spaced align-center">
                      <h5>
                        <span className="label label-success space-right-2">Subscribed</span>
                        <span>{project.projectRepo}</span>
                      </h5>
                      <Button border size="sm" onClick={() => p.unsubscribe(project.project)}>Unsubscribe</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br/>
            <div className="text-center">
              <h4>Unsubscribed Projects</h4>
            </div>
            <br/>
            <table className="table">
              <tbody>
                {subscriptionsData.unsubscribed.length === 0 &&
                  <tr>
                    <td className="text-center">
                      <h5 className="gray-out">No Projects Found</h5>
                    </td>
                  </tr>
                }
                {subscriptionsData.unsubscribed.map((project) => (
                  <tr className="active" key={project.project}>
                    <td className="justify-spaced align-center">
                      <h5>{project.projectRepo}</h5>
                      <Button border size="sm" onClick={() => p.subscribe(project.project)}>Subscribe</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </ListItem>
        </List>
      }
    </List>
  );
};

Notifications.propTypes = {
  subscriptions: PropTypes.object,
  subscriptionsData: PropTypes.object,
  subscribe: PropTypes.func,
  unsubscribe: PropTypes.func
};

export default Notifications;
