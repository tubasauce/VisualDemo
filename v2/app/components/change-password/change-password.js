import React, {PropTypes} from 'react';
import {required, minLength, validate} from '../../utils/validation';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import LoaderItem from '../loader-item/loader-item';
import Breadcrumb from '../breadcrumb/breadcrumb';
import FormInput from '../form-input/form-input';
import Button from '../button/button';

const validatePassword = (value) =>
  validate([required, minLength(8)])(value);

const validateConfirm = (value1, value2) =>
  (value1 !== value2) && 'Passwords do not match';

const ChangePassword = (p) => {
  const {ui, account} = p;
  const onSubmit = () => {
    p.setPassword('isSubmitted', true);
    if (validatePassword(ui.password.old) || validatePassword(ui.password.new) || validateConfirm(ui.password.new, ui.password.confirm)) return;
    p.changePassword(ui.password.old, ui.password.new);
  };
  return (
    <List>
      <ListItem isActive>
        <Breadcrumb values={['Account', 'Change Password']} priority={4} />
      </ListItem>
      <LoaderItem request={account} />
      {account.status === '' &&
        <List className="sub-list-bottom">
          <ListItem isActive>
            <div className="row space-top-2">
              <div className="col-xs-6">
                <FormInput
                  label="Enter Old Password"
                  type="password"
                  onChange={(value) => p.setPassword('old', value)}
                  errorMessage={ui.password.isSubmitted && validatePassword(ui.password.old)} />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <FormInput
                  label="Enter New Password"
                  type="password"
                  maxLength={100}
                  onChange={(value) => p.setPassword('new', value)}
                  errorMessage={ui.password.isSubmitted && validatePassword(ui.password.new)} />
              </div>
              <div className="col-xs-6">
                <FormInput
                  label="Confirm New Password"
                  type="password"
                  maxLength={100}
                  onChange={(value) => p.setPassword('confirm', value)}
                  errorMessage={ui.password.isSubmitted && (validatePassword(ui.password.confirm) || validateConfirm(ui.password.new, ui.password.confirm))} />
              </div>
            </div>
          </ListItem>
          <ListItem className="text-right">
            <Button type="primary" className="btn-wide" onClick={onSubmit}>
              Change Password
            </Button>
          </ListItem>
        </List>
      }
    </List>
  );
};

ChangePassword.propTypes = {
  ui: PropTypes.object,
  account: PropTypes.object,
  changePassword: PropTypes.func
};

export default ChangePassword;
