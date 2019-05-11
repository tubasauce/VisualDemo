import React, {PropTypes} from 'react';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import LoaderItem from '../loader-item/loader-item';
import Breadcrumb from '../breadcrumb/breadcrumb';
import Moment from 'moment';
import Numeral from 'numeral';

const Usage = (p) => {
  const {accounts, accountsData, usage, usageData} = p;
  const startDate = Moment(usageData && usageData.startDate).format('MMM D');
  const endDate = Moment(usageData && usageData.endDate).format('MMM D, YYYY');
  return (
    <List>
      <ListItem isActive>
        <Breadcrumb values={['Account', 'Usage Stats']} priority={4} />
      </ListItem>
      <LoaderItem request={accounts} />
      {accounts.status === '' &&
        <List className="sub-list-bottom">
          <ListItem isActive>
            <div className="text-center">
              {accountsData.length === 0 &&
                <h4 className="gray-out">You do not have access to any accounts.</h4>
              }
              {accountsData.length > 0 &&
                <div className="flex space-top-2 space-bottom-2">
                  <h5>Usage&nbsp;for</h5>
                  <select className="form-control space-left-2" onChange={(e) => p.getUsage(e.target.value)}>
                    {accountsData.map((account, index) =>
                      <option key={index} value={account._id}>{account.name}</option>
                    )}
                  </select>
                </div>
              }
            </div>
          </ListItem>
          <LoaderItem request={usage} />
          {accountsData.length > 0 && usage.status === '' &&
            <ListItem isActive>
              <div className="text-center">
                <h4>Current Month</h4>
                <p className="gray-out">{startDate} - {endDate}</p>
              </div>
              <div className="row">
                <div className="col-xs-6 text-center">
                  <h1>{Numeral(usageData.totalStates).format('0,0')}</h1>
                  <h5>Total UI States Tested</h5>
                  {usageData.maxValidations &&
                    <div style={{maxWidth: '300px', margin: '0 auto'}}>
                        <div className="progress">
                          <a style={{width: `${(usageData.totalStates/usageData.maxValidations)*100}%`}} className="progress-bar"></a>
                        </div>
                        <h5>Monthly limit: {Numeral(usageData.maxValidations).format('0,0')}</h5>
                    </div>
                  }
                </div>
                <div className="col-xs-6 text-center">
                  <h1>{Numeral(usageData.totalTests).format('0,0')}</h1>
                  <h5>Total Test Runs</h5>
                </div>
              </div>
              <br/>
            </ListItem>
          }
        </List>
      }
    </List>
  );
};

Usage.propTypes = {
  accounts: PropTypes.object,
  accountsData: PropTypes.object,
  usage: PropTypes.object,
  usageData: PropTypes.object,
  getUsage: PropTypes.func
};

export default Usage;
