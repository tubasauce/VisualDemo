import {createSelector} from 'reselect';

const getAccounts = (state) => state.accounts.result || [];

export const getAccountId = createSelector(
  getAccounts,
  (accountsData) => {
    // return owner account by default
    const ownerAccount = accountsData.filter(account => account.role === 'owner')[0];
    if (ownerAccount) {
      return ownerAccount._id;
    }
    // otherwise, return first account
    if (accountsData.length > 0) {
      return accountsData[0]._id;
    }
    return null;
  }
);
