import * as d3 from 'd3';
import d3Wrap from 'react-d3-wrap';

/*
options:
- side=left|right
- show={
  dom: true|false,
  layout: true|false,
  css: true|false,
  content: true|false
}
*/

const StateHighlights = d3Wrap({
  update(svg, data, options) {
    // make copy
    data = JSON.parse(JSON.stringify(data));
    // inject content attribute in order to merge text/media changes into single content category
    data.changes = data.changes.map((change) => ({
      ...change,
      content: change.media || change.text
    }));
    highlights(svg, data, options);
  }
});

export default StateHighlights;

function highlights(svg, data, options) {
  svg = d3.select(svg);
  // clear all children
  svg.selectAll('*').remove();
  // check data
  if (!data || !data.changes || data.changes.length === 0 || !options.side) return;

  // init variables based on side
  var side = options.side,
    w = data[side + 'Size'].width,
    h = data[side + 'Size'].height,
    changes = data.changes,
    coordsProperty = side + 'Coords';

  svg
    .attr('viewBox', '0 0 ' + w + ' ' + h)
    .attr('preserveAspectRatio', 'xMidYMin')
    .attr('width', w)
    .attr('height', h)
    .attr('class', 'img-responsive');

  var defs = svg.append('defs');
  var deletePattern = defs.append('pattern')
    .attr('id', 'pattern-delete')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 16)
    .attr('height', 16)
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('patternTransform', 'rotate(45)');
  deletePattern.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 1)
    .attr('height', 16)
    .attr('style', 'stroke:none; fill:rgba(255,0,0,0.8);');
  var insertPattern = defs.append('pattern')
    .attr('id', 'pattern-insert')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 16)
    .attr('height', 16)
    .attr('patternUnits', 'userSpaceOnUse');
  insertPattern.append('rect')
    .attr('x', 5)
    .attr('y', 0)
    .attr('width', 1)
    .attr('height', 11)
    .attr('style', 'stroke:none; fill:rgba(0,255,0,0.8);');
  insertPattern.append('rect')
    .attr('x', 0)
    .attr('y', 5)
    .attr('width', 11)
    .attr('height', 1)
    .attr('style', 'stroke:none; fill:rgba(0,255,0,0.8);');

  for (var i = 0, len = changes.length; i < len; i++) {
    var change = changes[i],
      coords = change[coordsProperty];
    if (coords) {
      var id = 'change-' + change.id,
        highlight = svg.append('rect')
          .attr('x', coords.left)
          .attr('y', coords.top)
          .attr('width', coords.width)
          .attr('height', coords.height)
          .classed(id, true)
          .on('mouseover', (function(id, ignored) {
            return function() {
              if (!ignored) {
                d3.selectAll('.' + id).classed('active', true);
              }
            };
          })(id, change.ignored))
          .on('mouseout', (function(id) {
            return function() {
              d3.selectAll('.' + id).classed('active', false);
            };
          })(id))
          .on('click', (function(id, ignored) {
            return function() {
              if (!ignored) {
                // open side panel
                if (options.openSidePanel) {
                  options.openSidePanel();
                }
                // scroll to change in changes list
                var changeItem = document.querySelector('.side-panel .' + id);
                if (changeItem && changeItem.scrollIntoView) {
                  changeItem.scrollIntoView();
                }
              }
            };
          })(id, change.ignored));
      if (change.dom === 'insert') {
        highlight.classed('type-insert', true);
      } else if (change.dom === 'delete') {
        highlight.classed('type-delete', true);
      } else {
        highlight.classed('type-change', true);
      }
      if (change.ignored) highlight.classed('ignored', true);
      if (change.dom) highlight.classed('dom-change', true);
      if (change.layout) highlight.classed('layout-change', true);
      if (change.css) highlight.classed('css-change', true);
      if (change.content) highlight.classed('content-change', true);

      // show/hide changes
      var visibleClasses = [], hiddenClasses = [];
      for (var prop in options.show) {
        if (options.show[prop])
          visibleClasses.push('.' + prop + '-change');
        else
          hiddenClasses.push('.' + prop + '-change');
      }
      if (hiddenClasses.length)
        d3.selectAll(hiddenClasses.join(',')).style('visibility', 'hidden');
      if (visibleClasses.length)
        d3.selectAll(visibleClasses.join(',')).style('visibility', 'visible');
    }
  }
}
