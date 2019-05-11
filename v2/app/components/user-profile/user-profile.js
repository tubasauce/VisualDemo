import React, {PropTypes} from 'react';
import {required, validate} from '../../utils/validation';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import LoaderItem from '../loader-item/loader-item';
import Breadcrumb from '../breadcrumb/breadcrumb';
import FormInput from '../form-input/form-input';
import Button from '../button/button';

const UserProfile = (p) => {
  const {ui, account} = p;
  return (
    <List>
      <ListItem isActive>
        <Breadcrumb values={['Account', 'User Profile']} priority={4} />
      </ListItem>
      <LoaderItem request={account} />
      {account.status === '' &&
        <List className="sub-list-bottom">
          <ListItem isActive>
            <h5>
              Use the form below to view, update or remove your profile information. This information is used by the Screener team to contact you and to customize your experience with Screener.
            </h5>
            <div className="row space-top-2">
              <div className="col-xs-6">
                <FormInput label="Email" value={window.appGlobal.user.email} isDisabled />
              </div>
              <div className="col-xs-6">
                <div className="alert alert-info">
                  Your account&apos;s email address is read-only. To change your email address, please <a href="javascript: window.Intercom('show')">message us</a> and request to have your email updated.
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <FormInput
                  label="Name"
                  value={ui.profile.name}
                  maxLength={100}
                  onChange={(value) => p.setProfile('name', value)}
                  errorMessage={validate([required])(ui.profile.name)} />
              </div>
              <div className="col-xs-6">
                <FormInput
                  label="Phone"
                  value={ui.profile.phone}
                  placeholder="(xxx) xxx-xxxx"
                  maxLength={50}
                  onChange={(value) => p.setProfile('phone', value)} />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <FormInput
                  label="Company"
                  value={ui.profile.company}
                  placeholder="My Company Inc."
                  maxLength={50}
                  onChange={(value) => p.setProfile('company', value)} />
              </div>
              <div className="col-xs-6">
                <FormInput
                  label="Location"
                  value={ui.profile.location}
                  placeholder="City, Country"
                  maxLength={50}
                  onChange={(value) => p.setProfile('location', value)} />
              </div>
            </div>
          </ListItem>
          <ListItem className="text-right">
            <div>
              <h5>Any personal information provided is voluntary.<br/>By saving this form you are consenting to Screener storing and using this data.</h5>
              <h5>For more information, please view our <a href="/terms/privacy" target="_blank">Privacy Policy</a>.</h5>
            </div>
            <Button type="primary" className="btn-wide" onClick={() => !validate([required])(ui.profile.name) && p.updateProfile(ui.profile)}>
              Save
            </Button>
          </ListItem>
        </List>
      }
    </List>
  );
};

UserProfile.propTypes = {
  ui: PropTypes.object,
  account: PropTypes.object,
  setProfile: PropTypes.func,
  updateProfile: PropTypes.func
};

export default UserProfile;
