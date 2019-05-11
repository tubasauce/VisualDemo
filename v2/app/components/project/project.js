import React, {PropTypes} from 'react';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import LoaderItem from '../loader-item/loader-item';
import BuildItem from '../build-item/build-item';
import BrowserItem from '../browser-item/browser-item';
import Icon from '../icon/icon';
import Button from '../button/button';
import ButtonMenu from '../button-menu/button-menu';
import ButtonReview from '../button-review/button-review';
import Breadcrumb from '../breadcrumb/breadcrumb';
import Tabs from '../tabs/tabs';
import Totals from '../totals/totals';
import TotalsChart from '../totals-chart/totals-chart';
import Confirm from 'react-confirm-bootstrap';
import FormInput from '../form-input/form-input';

const Project = (p) => {
  const {ui, project, projectData, branches, branchesData, builds, buildsData, user} = p;
  const isTester = ['tester', 'admin', 'owner'].indexOf(projectData.role) > -1;
  const isAdmin = ['admin', 'owner'].indexOf(projectData.role) > -1;
  const projectBranch = `${projectData.project}/${projectData.branch}`;
  const showMore = ui.dashboard.resultType === 'history' && buildsData.length === (ui.buildsLimit[projectBranch] || 10) && buildsData.length < 100;
  return (
    <div>
      <LoaderItem request={project} />
      {project.status === '' &&
        <List>
          <ListItem isActive className="justify-spaced align-center">
            <Breadcrumb values={[projectData.projectRepo, projectData.branch]} priority={4} />
            {user &&
              <ButtonMenu icon="cog" align="right"
                isOpen={ui.dashboard.openOptions}
                onToggleOpen={() => p.onToggleUI('openOptions')}>
                {projectData.isSubscribed &&
                  <li className="dropdown-header nowrap">Subscribed to Project Notifications</li>
                }
                {projectData.isSubscribed
                  ? <li><a onClick={p.unsubscribe}>Unsubscribe</a></li>
                  : <li><a onClick={p.subscribe}>Subscribe to Project Notifications</a></li>
                }
                {isTester && <li className="divider"></li>}
                {isTester &&
                  <li>
                    <Confirm
                      onConfirm={p.removeBranch}
                      body="Are you sure you want to Permanently Delete this Branch? This cannot be undone."
                      confirmText="Yes"
                      title={`Delete Branch: ${projectData.branch}`}>
                      <a><Icon type="trash" label={`Delete Branch: ${projectData.branch}`} /></a>
                    </Confirm>
                  </li>
                }
                {isAdmin && <li className="divider"></li>}
                {isAdmin &&
                  <li onClick={() => p.updateUI('dashboard', 'delete', '')}>
                    <Confirm
                      onConfirm={p.removeProject}
                      body={
                        <div>
                          <p>Are you sure you want to Permanently Delete the <span className="strong">{projectData.projectRepo}</span> project and all its branches and builds?</p>
                          <p>This action <span className="strong">cannot</span> be undone.</p>
                          <p>To proceed, type in the name of this project to confirm:</p>
                          <FormInput
                              value={ui.dashboard.delete}
                              onChange={(value) => p.updateUI('dashboard', 'delete', value)} />
                        </div>
                      }
                      confirmBSStyle={(ui.dashboard.delete === projectData.projectRepo) ? 'danger' : 'hide'}
                      confirmText="Yes, permanently delete this project"
                      title={`Delete Project: ${projectData.projectRepo}`}>
                      <a><Icon type="trash" label="Delete Project" /></a>
                    </Confirm>
                  </li>
                }
              </ButtonMenu>
            }
          </ListItem>
          <ListItem className="justify-spaced">
            <Tabs
              value={ui.dashboard.resultType}
              onChange={p.setResultType}
              items={[{label: 'Current', value: 'current'}, {label: 'Build History', value: 'history'}]} />
            {branches && branchesData &&
              <ButtonMenu label="Branches" align="right"
                isOpen={ui.dashboard.openBranches}
                onToggleOpen={() => p.toggleBranches(ui.dashboard.openBranches)}>
                {branches.status !== '' &&
                  <li><LoaderItem request={branches} className="no-border" /></li>
                }
                {branches.status === '' &&
                  <li className="dropdown-header">Recent:</li>
                }
                {branches.status === '' && branchesData.map((branch, index) =>
                  <li key={index}>
                    <a onClick={() => p.onSelectBranch(branch)}>{branch}</a>
                  </li>
                )}
                {branches.status === '' && branchesData.length === 20 && branches.result && branches.result.limit === 20 &&
                  <li className="divider"></li>
                }
                {branches.status === '' && branchesData.length === 20 && branches.result && branches.result.limit === 20 &&
                  <li><a className="small" onClick={() => p.moreBranches()}>Load More</a></li>
                }
              </ButtonMenu>
            }
          </ListItem>
          {ui.dashboard.resultType === 'current' &&
            <div>
              <BuildItem {...p} {...projectData.latestBuild} showContainers={ui.showContainers[projectData.latestBuild._id]} />
              {projectData.resolutions.length > 0 &&
                <ListItem isActive>
                  <div className="row">
                    <div className="col-xs-4">
                      <TotalsChart data={projectData.totals} width={210} height={210} />
                    </div>
                    <div className="col-xs-8">
                      <Totals totals={projectData.totals} onOpenStates={p.openStates} />
                      <br/>
                      <div className="row text-center">
                        <ButtonReview size="lg" totals={projectData.totals} className="space-top-4" onClick={() => p.openStates('review')} />
                        <div className="flex align-center justify-center space-top-4">
                          <a className="small" onClick={() => p.openStates('all')}>View All States</a>
                          {projectData.totalReviewed > 0 &&
                            <span className="space-left-2">|</span>
                          }
                          {projectData.totalReviewed > 0 &&
                            <a className="small space-left-2" onClick={() => p.openStates('reviewed')}>
                              {projectData.totalReviewed} Reviewed State{projectData.totalReviewed === 1 ? '' : 's'}
                            </a>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </ListItem>
              }
              {projectData.resolutions.map((group, index) =>
                <List key={index} className="sub-list-bottom">
                  <ListItem isActive className="text-center">
                    <h4>{group.resolution}</h4>
                  </ListItem>
                  {group.tests.map((test, index) =>
                    <BrowserItem key={index} {...test} onOpenStates={p.openStates} />
                  )}
                </List>
              )}
            </div>
          }
          {ui.dashboard.resultType === 'history' &&
            <div>
              <LoaderItem request={builds} />
              {builds.status === '' && buildsData.map((build, index) =>
                <BuildItem key={index} {...p} {...build} showContainers={ui.showContainers[build._id]} showScreenshots={true} />
              )}
              {builds.status === '' && showMore &&
                <ListItem className="justify-center">
                  <Button size="xs" onClick={p.moreBuilds}>Show more</Button>
                </ListItem>
              }
            </div>
          }
        </List>
      }
    </div>
  );
};

Project.propTypes = {
  ui: PropTypes.object,
  project: PropTypes.object,
  projectData: PropTypes.object,
  setResultType: PropTypes.func,
  openStates: PropTypes.func,
  onToggleUI: PropTypes.func,
  onSelectBranch: PropTypes.func,
  removeProject: PropTypes.func,
  removeBranch: PropTypes.func,
  subscribe: PropTypes.func,
  unsubscribe: PropTypes.func,
  updateUI: PropTypes.func,
  user: PropTypes.object,
  moreBuilds: PropTypes.func
};

export default Project;
