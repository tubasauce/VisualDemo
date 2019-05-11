import React, {PropTypes} from 'react';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import LoaderItem from '../loader-item/loader-item';
import StateHistoryItem from '../state-history-item/state-history-item';

const StateHistory = (p) => {
  const {history, historyData} = p;
  return (
    <div>
      {history.status !== '' &&
        <List className="sub-list">
          <LoaderItem request={history} />
        </List>
      }
      {history.status === '' &&
        <List className="sub-list">
          {historyData.length === 0 &&
            <ListItem>
              <h4 className="text-center">No History</h4>
            </ListItem>
          }
          {historyData.map((historyItemData, index) => (
            <StateHistoryItem key={index} {...historyItemData} />
          ))}
        </List>
      }
    </div>
  );
};

StateHistory.propTypes = {
  ui: PropTypes.object.isRequired
};

export default StateHistory;
