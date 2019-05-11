import React,{PropTypes} from 'react';
import {required, pattern, validate} from '../../utils/validation';
import List from '../list/list';
import ListItem from '../list-item/list-item';
import LoaderItem from '../loader-item/loader-item';
import Breadcrumb from '../breadcrumb/breadcrumb';
import Wizard from '../wizard/wizard';
import Media from '../media/media';
import ButtonCopy from '../button-copy/button-copy';
import FormInput from '../form-input/form-input';

const escape = (str) => (str || '').replace(/\\/g, '\\\\').replace(/'/g, '\\\'');

const generateCodeSnippet = (wizardData, apiKey) => {
  let code = 'module.exports = {\n';
  code += `  projectRepo: '${escape(wizardData.projectRepo)}',\n`;
  code += `  storybookConfigDir: '${escape(wizardData.storybookConfigDir || '.storybook')}',\n`;
  if (wizardData.storybookStaticDir) {
    code += `  storybookStaticDir: '${escape(wizardData.storybookStaticDir)}',\n`;
  }
  code += `  apiKey: '${apiKey}',\n`;
  code += '  resolution: \'1024x768\'\n';
  code += '};';
  return code;
};

const validateProjectRepo = (value) =>
  validate([
    required,
    pattern(/^[a-zA-Z0-9\/\.\-\_]{1,100}$/, 'Field must consist of only alphanumeric characters, dashes, underscores, periods or forward-slashes')
  ])(value);

const GettingStarted = (p) => {
  const {ui, accounts, accountsData} = p;
  const apiKey = ui.wizard.apiKey || (accountsData[0] && accountsData[0].apiKey);
  const codeSnippet = generateCodeSnippet(ui.wizard, apiKey);
  const onNext = (nextIndex) => {
    p.updateUI('wizard', 'submitted', nextIndex - 1);
    // validate projectRepo input
    if (nextIndex === 2 && validateProjectRepo(ui.wizard.projectRepo)) return;
    p.updateUI('wizard', 'stepIndex', nextIndex);
  };
  if (accounts.status !== '') {
    return (
      <LoaderItem request={accounts} />
    );
  }
  const isAdmin = accountsData.length > 0;
  if (!isAdmin) {
    return (
      <List>
        <ListItem>
          <h3 className="gray-out text-center space-bottom-4">You do not have permission to add new Projects</h3>
          <div className="alert alert-info space-bottom-2">
            <p>To add Projects:</p>
            <br/>
            <ol>
              <li>Have your Account Owner add you as an Admin.</li>
              <li>Or subscribe to a plan.</li>
            </ol>
          </div>
        </ListItem>
      </List>
    );
  }
  const showSelectAccount = accountsData.length > 1 || accountsData[0].role !== 'owner';
  return (
    <List>
      <ListItem isDark>
        <Breadcrumb values={['Getting Started with Screener Storybook', 'New Project']} priority={5} className="white" />
      </ListItem>
      <Wizard
        stepIndex={ui.wizard.stepIndex}
        onPrev={(prevIndex) => p.updateUI('wizard', 'stepIndex', prevIndex)}
        onNext={onNext}>

        {/* STEP 1 */}
        <section>
          <h4 className="wizard-title">Verify Requirements</h4>
          <p>
            Get Automated Visual Testing across your React, Vue or Angular components with <a href="https://storybook.js.org/" target="_blank">Storybook</a> and Screener.
          </p>
          <p>
            To add a new Storybook Project to Screener, confirm the requirements below and then click next.
          </p>
          <hr/>
          <ol>
            <li>Storybook is <a href="https://storybook.js.org/basics/quick-start-guide/" target="_blank">installed</a>.</li>
            <li className="space-top-2">You have <a href="https://storybook.js.org/basics/writing-stories/" target="_blank">written some stories</a> for your components.</li>
            <li className="space-top-2">You can successfully view your stories when running the Storybook Dev server<br/>(<strong style={{fontFamily: 'helvetica'}}>npm run storybook</strong>).</li>
          </ol>
        </section>

        {/* STEP 2 */}
        <section>
          {showSelectAccount
            ? <div>
                <h4 className="wizard-title">Select Account &amp; Add Your Project Repo</h4>
                <select className="form-control" onChange={(e) => p.updateUI('wizard', 'apiKey', e.target.value)}>
                  {accountsData.map((account, index) =>
                    <option key={index} value={account.apiKey}>{account.name}</option>
                  )}
                </select>
                <br/>
              </div>
            : <h4 className="wizard-title">Add Your Project Repo</h4>
          }
          <p>Enter the full name of your Project&apos;s Repository in the field below.</p>
          <p>For example, GitHub repositories are in the format: <strong style={{fontFamily: 'helvetica'}}>owner/repository-name</strong></p>
          <FormInput
            name="projectRepo"
            value={ui.wizard.projectRepo}
            autoFocus
            placeholder="owner/repository-name"
            maxLength={100}
            onChange={(value) => p.updateUI('wizard', 'projectRepo', value)}
            errorMessage={ui.wizard.submitted === 1 && validateProjectRepo(ui.wizard.projectRepo)}
          />
          <br/>
          <p className="small gray-out">Note: this is a name only. Screener does not need access to your repository.</p>
        </section>

        {/* STEP 3 */}
        <section>
          <h4 className="wizard-title">Add Storybook Options</h4>
          <p>
            Enter your Storybook server options below.<br/>
            Discover the options by looking at your <strong style={{fontFamily: 'helvetica'}}>start-storybook</strong> command (usually a script in package.json file).
          </p>
          <br/>
          <p>If the <strong style={{fontFamily: 'helvetica'}}>-c</strong> or <strong style={{fontFamily: 'helvetica'}}>--config-dir</strong> option is set, please enter its value:</p>
          <div className="row">
            <div className="col-xs-7">
              <FormInput
                value={ui.wizard.storybookConfigDir}
                placeholder="Optional config-dir option"
                onChange={(value) => p.updateUI('wizard', 'storybookConfigDir', value)} />
            </div>
          </div>
          <p>If the <strong style={{fontFamily: 'helvetica'}}>-s</strong> or <strong style={{fontFamily: 'helvetica'}}>--static-dir</strong> option is set, please enter its value:</p>
          <div className="row">
            <div className="col-xs-7">
              <FormInput
                value={ui.wizard.storybookStaticDir}
                placeholder="Optional static-dir option"
                onChange={(value) => p.updateUI('wizard', 'storybookStaticDir', value)} />
            </div>
          </div>
        </section>

        {/* STEP 4 */}
        <section>
          <h4 className="wizard-title">Save Screener Config File</h4>
          <p>
            Put a file named <strong style={{fontFamily: 'helvetica'}}>screener.config.js</strong> in the root directory of your application with the following code:
          </p>
          <Media object={<ButtonCopy text={codeSnippet}>Copy Code Snippet</ButtonCopy>} side="right">
            <pre className="small">
              {codeSnippet}
            </pre>
          </Media>
          <br/>
          <p className="small gray-out">Note: we recommend securing your API Key by storing it as an environment variable.</p>
        </section>

        {/* STEP 5 */}
        <section>
          <h4 className="wizard-title">Include Screener In Your Application</h4>
          <p>
            1. Install the <strong style={{fontFamily: 'helvetica'}}>screener-storybook</strong> package as a dependency:
          </p>
          <pre className="small">
            npm install --save-dev screener-storybook
          </pre>
          <br/>
          <p>
            2. Add the following NPM script to your <strong style={{fontFamily: 'helvetica'}}>package.json</strong> file:
          </p>
          <pre className="small">
{`"scripts": {
  "test-storybook": "screener-storybook --conf screener.config.js"
}`}
          </pre>
        </section>

        {/* STEP 6 */}
        <section>
          <h4 className="wizard-title">Run Screener</h4>
          <p>Great, you&apos;re all set!</p>
          <p>Now run your first test with the following command:</p>
          <pre className="small">
            npm run test-storybook
          </pre>
          <p>
            The list on the left will automatically update when your test is run. Click on it to view test results.
          </p>
          <br/>
          <p>
            <strong style={{fontFamily: 'helvetica'}}>Next Steps</strong>
          </p>
          <ul>
            <li><a href="/v2/docs/review-flow" target="_blank">Learn the Review Flow</a> for reviewing UI test results.</li>
            <li><a href="/v2/docs/ci" target="_blank">Integrate into your CI process</a> for continuous visual testing.</li>
          </ul>
        </section>
      </Wizard>
    </List>
  );
};

GettingStarted.propTypes = {
  accounts: PropTypes.object.isRequired,
  accountsData: PropTypes.array.isRequired,
  ui: PropTypes.object.isRequired,
  updateUI: PropTypes.func
};

export default GettingStarted;
