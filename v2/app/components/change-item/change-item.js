import React, {PropTypes} from 'react';
import ListItem from '../list-item/list-item';
import Button from '../button/button';
import Media from '../media/media';
import * as d3 from 'd3';
import classnames from 'classnames';

const getDomClasses = (dom) => classnames({
  'label label-padding inline-block space-right': true,
  'label-success': dom === 'insert',
  'label-danger':  dom === 'delete',
  'label-warning': dom === 'attributes'
});

const getTextClasses = (txtObj) => classnames({
  'label label-padding inline-block space-right': true,
  'label-success': txtObj.type === 'insert',
  'label-danger':  txtObj.type === 'delete',
  'label-text': txtObj.type === 'equal'
});

const selectChangeHighlight = (id, isSelected) =>
  d3.selectAll('.change-' + id).classed('active', isSelected);

const scrollIntoView = (id) => {
  const highlight = document.querySelector('svg .change-' + id);
  if (highlight && highlight.getAttribute('y')) {
    document.querySelector('#state').scrollTop = parseInt(highlight.getAttribute('y')) + 80;
  }
};

const ChangeItem = (p) => {
  const {projectData, change} = p;
  const isTester = projectData.role !== 'viewer';
  const changeClasses = classnames({
    truncate: true,
    'is-link dark-hover': !p.isIgnored,
    ['change-' + change.id]: change.id
  });
  return (
    <ListItem
      isActive={!p.isIgnored}
      className={changeClasses}
      onClick={() => scrollIntoView(change.id)}
      onMouseEnter={() => selectChangeHighlight(change.id, true)}
      onMouseLeave={() => selectChangeHighlight(change.id, false)}>
      <Media side="right" object={isTester && <Button size="xs" className="small" onClick={p.onToggleIgnore}>{p.isIgnored ? 'Undo Ignore' : 'Ignore'}</Button>}>
        {p.type === 'dom' &&
          <div className={p.isIgnored ? 'is-disabled' : ''}>
            <span className="label label-default label-padding inline-block space-right">{change.tagName}</span>
            {change.dom && typeof change.dom === 'string' &&
              <span className={getDomClasses(change.dom)}>{change.dom}</span>
            }
            {change.dom && typeof change.dom.map === 'function' && change.dom.map((attribute, index) =>
              <span key={index} className="label label-info label-padding inline-block space-right">{attribute.name}</span>
            )}
          </div>
        }
        {p.type === 'layout' &&
          <div className={p.isIgnored ? 'is-disabled' : ''}>
            <span className="label label-default label-padding inline-block space-right">{change.tagName}</span>
            {change.layout.top > 0 && <span className="label label-warning label-padding inline-block space-right">top: {change.layout.top}</span>}
            {change.layout.left > 0 && <span className="label label-warning label-padding inline-block space-right">left: {change.layout.left}</span>}
            {change.layout.width > 0 && <span className="label label-warning label-padding inline-block space-right">width: {change.layout.width}</span>}
            {change.layout.height > 0 && <span className="label label-warning label-padding inline-block space-right">height: {change.layout.height}</span>}
          </div>
        }
        {p.type === 'css' &&
          <div className={p.isIgnored ? 'is-disabled' : ''}>
            <span className="label label-default label-padding inline-block space-right">{change.tagName}</span>
            {change.css.map((style, index) =>
              <a key={index} className="label label-warning label-padding inline-block space-right" onClick={() => p.updateUI('modal', 'changes', change.css)}>
                {style.name}
              </a>
            )}
          </div>
        }
        {p.type === 'content' &&
          <div className={p.isIgnored ? 'is-disabled' : ''}>
            {(change.media && change.diffKey)
              ? <a className="label label-default label-padding inline-block space-right" onClick={() => p.updateUI('modal', 'diffImageUrl', `https://screener.io/shots/${change.diffKey}`)}>{change.tagName}</a>
              : <span className="label label-default label-padding inline-block space-right">{change.tagName}</span>
            }
            {change.media && typeof change.media.map === 'function' && change.media.map((attribute, index) =>
              <span key={index} className="label label-info label-padding inline-block space-right">{attribute.name}</span>
            )}
            {change.text && change.text.map((txtObj, index) =>
              <span key={index} className={getTextClasses(txtObj)}>{txtObj.value}</span>
            )}
          </div>
        }
      </Media>
    </ListItem>
  );
};

ChangeItem.propTypes = {
  projectData: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  change: PropTypes.object.isRequired,
  isIgnored: PropTypes.bool,
  updateUI: PropTypes.func,
  onToggleIgnore: PropTypes.func
};

export default ChangeItem;
