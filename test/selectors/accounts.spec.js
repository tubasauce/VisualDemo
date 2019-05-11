import {expect} from 'chai';
import * as accountsSelectors from '../../v2/app/selectors/accounts';

describe('selectors/accounts', () => {
  describe('accountsSelectors.getAccountId', () => {
    it('should return id of owner', () => {
      const testState = {
        accounts: {
          result: [
            {
              _id: 'account-admin'
            },
            {
              _id: 'account-owner',
              role: 'owner'
            }
          ]
        }
      };
      const value = accountsSelectors.getAccountId(testState);
      expect(value).to.equal('account-owner');
    });

    it('should return first id if not owner', () => {
      const testState = {
        accounts: {
          result: [
            {
              _id: 'account-admin'
            },
            {
              _id: 'account-admin-2'
            }
          ]
        }
      };
      const value = accountsSelectors.getAccountId(testState);
      expect(value).to.equal('account-admin');
    });

    it('should return null if no accounts', () => {
      const testState = {
        accounts: {
          result: []
        }
      };
      const value = accountsSelectors.getAccountId(testState);
      expect(value).to.equal(null);
    });
  });
});
