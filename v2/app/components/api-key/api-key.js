import React, {PropTypes} from 'react';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import LoaderItem from '../loader-item/loader-item';
import Breadcrumb from '../breadcrumb/breadcrumb';
import FormInput from '../form-input/form-input';
import Button from '../button/button';
import ButtonCopy from '../button-copy/button-copy';
import Confirm from 'react-confirm-bootstrap';

const ApiKey = (p) => {
  const {account, accountData, accounts, accountsData} = p;
  // if user is not owner, use apiKey that they have access to
  let apiKey = accountData.apiKey;
  if (accountsData.length === 1) {
    apiKey = accountsData[0].apiKey;
  }
  const isOwner = apiKey === accountData.apiKey;
  return (
    <List>
      <ListItem isActive>
        <Breadcrumb values={['Account', 'API Key']} priority={4} />
      </ListItem>
      <LoaderItem request={account} />
      {account.status === '' &&
        <LoaderItem request={accounts} />
      }
      {account.status === '' && accounts.status === '' &&
        <List className="sub-list-bottom">
          <ListItem isActive>
            {isOwner &&
              <p className="space-top-2">
                The API Key for projects owned by your Account is:
              </p>
            }
            <br/>
            <div className="flex">
              <div className="flex-auto space-right-2">
                <FormInput value={apiKey} isDisabled />
              </div>
              <ButtonCopy text={apiKey}>Copy</ButtonCopy>
            </div>
            <br/>
          </ListItem>
          {isOwner &&
            <ListItem className="text-left">
              <Confirm
                onConfirm={p.generateNewKey}
                body={
                  <div>
                    <p>Regenerating your API Key will require updating this API Key value throughout All configurations associated with this Account.</p>
                    <p><span className="strong">Any tests configured to use your old API Key will Fail.</span></p>
                    <p>Are you sure you want to regenerate your API Key?</p>
                  </div>
                }
                confirmText="Yes"
                title="WARNING">
                <Button border className="btn-wide">
                  Regenerate API Key
                </Button>
              </Confirm>
            </ListItem>
          }
        </List>
      }
    </List>
  );
};

ApiKey.propTypes = {
  account: PropTypes.object,
  accountData: PropTypes.object,
  accounts: PropTypes.object,
  accountsData: PropTypes.object,
  generateNewKey: PropTypes.func
};

export default ApiKey;
