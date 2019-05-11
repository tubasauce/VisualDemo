import * as d3 from 'd3';
import d3Wrap from 'react-d3-wrap';

const TotalsChart = d3Wrap({
  update(svg, data) {
    // convert data to chart format
    const dataset = [
      {
        data: [
          {cat: 'changed', val: data.changed},
          {cat: 'new', val: data.new},
          {cat: 'accepted', val: data.accepted},
          {cat: 'rejected', val: data.rejected}
        ],
        total: data.changed + data.new + data.accepted + data.rejected,
        type: 'UI States',
        unit: ''
      }
    ];
    var donuts = new DonutCharts(svg);
    donuts.create(dataset, 210);
  }
});

export default TotalsChart;

// http://bl.ocks.org/erichoco/6694616
function DonutCharts(svg) {
  var charts = d3.select(svg);
  var chart_m,
    chart_r,
    color = ['#ec971f', '#296fb0', '#449d44', '#c9302c'];

  var createCenter = function() {
    var eventObj = {
      'mouseover': function() {
        d3.select(this)
          .transition()
          .attr('r', chart_r * 0.65);
      },
      'mouseout': function() {
        d3.select(this)
          .transition()
          .duration(500)
          .ease('bounce')
          .attr('r', chart_r * 0.6);
      },
      'click': function() {
        var paths = charts.selectAll('.clicked');
        pathAnim(paths, 0);
        paths.classed('clicked', false);
        resetAllCenterText();
      }
    };

    var donuts = d3.selectAll('.donut');

    // The circle displaying total data.
    donuts.append('svg:circle')
      .attr('r', chart_r * 0.6)
      .style('fill', '#E7E7E7')
      .on(eventObj);

    donuts.append('text')
      .attr('class', 'center-txt type')
      .attr('y', chart_r * -0.16)
      .attr('text-anchor', 'middle')
      .style('font-weight', 'bold')
      .text(function(d) {
        return d.type;
      });
    donuts.append('text')
      .attr('class', 'center-txt value')
      .attr('text-anchor', 'middle');
    donuts.append('text')
      .attr('class', 'center-txt percentage')
      .attr('y', chart_r * 0.16)
      .attr('text-anchor', 'middle')
      .style('fill', '#A2A2A2');
  };

  var setCenterText = function(thisDonut) {
    var sum = d3.sum(thisDonut.selectAll('.clicked').data(), function(d) {
      return d.data.val;
    });

    thisDonut.select('.value')
      .text(function(d) {
        return (sum)? sum.toFixed() + d.unit
          : d.total.toFixed() + d.unit;
      });
    thisDonut.select('.percentage')
      .text(function(d) {
        return (sum)? (sum/d.total*100).toFixed(2) + '%'
                    : '';
      });
  };

  var resetAllCenterText = function() {
    charts.selectAll('.value')
      .text(function(d) {
        return d.total.toFixed() + d.unit;
      });
    charts.selectAll('.percentage')
      .text('');
  };

  var pathAnim = function(path, dir) {
    switch(dir) {
    case 0:
      path.transition()
        .duration(500)
        .ease('bounce')
        .attr('d', d3.svg.arc()
            .innerRadius(chart_r * 0.7)
            .outerRadius(chart_r)
        );
      break;
    case 1:
      path.transition()
        .attr('d', d3.svg.arc()
            .innerRadius(chart_r * 0.7)
            .outerRadius(chart_r * 1.08)
        );
      break;
    }
  };

  var updateDonut = function() {
    var eventObj = {
      'mouseover': function(d, i, j) {
        pathAnim(d3.select(this), 1);

        var thisDonut = charts.select('.type' + j);
        thisDonut.select('.value').text(function(donut_d) {
          return d.data.val.toFixed() + donut_d.unit;
        });
        thisDonut.select('.percentage').text(function(donut_d) {
          return (d.data.val/donut_d.total*100).toFixed(2) + '%';
        });
      },

      'mouseout': function(d, i, j) {
        var thisPath = d3.select(this);
        if (!thisPath.classed('clicked')) {
          pathAnim(thisPath, 0);
        }
        var thisDonut = charts.select('.type' + j);
        setCenterText(thisDonut);
      },

      'click': function(d, i, j) {
        var thisDonut = charts.select('.type' + j);

        if (0 === thisDonut.selectAll('.clicked')[0].length) {
          thisDonut.select('circle').on('click')();
        }

        var thisPath = d3.select(this);
        var clicked = thisPath.classed('clicked');
        pathAnim(thisPath, ~~(!clicked));
        thisPath.classed('clicked', !clicked);

        setCenterText(thisDonut);
      }
    };

    var pie = d3.layout.pie()
                    .sort(null)
                    .value(function(d) {
                      return d.val;
                    });

    var arc = d3.svg.arc()
                    .innerRadius(chart_r * 0.7)
                    .outerRadius(function() {
                      return (d3.select(this).classed('clicked'))? chart_r * 1.08
                                             : chart_r;
                    });

    // Start joining data with paths
    var paths = charts.selectAll('.donut')
      .selectAll('path')
      .data(function(d) {
        return pie(d.data);
      });

    paths
        .attr('d', arc);

    paths.enter()
      .append('svg:path')
        .attr('d', arc)
        .style('fill', function(d, i) {
          return color[i];
        })
        .style('stroke', '#FFFFFF')
        .on(eventObj);

    paths.exit().remove();

    resetAllCenterText();
  };

  this.create = function(dataset, width) {
    chart_m = width / dataset.length / 2 * 0.15;
    chart_r = width / dataset.length / 2 * 0.85;

    charts.selectAll('.donut')
                      .data(dataset)
                  .enter()
                  .append('svg:g')
                      .attr('class', function(d, i) {
                        return 'donut type' + i;
                      })
                      .attr('transform', 'translate(' + (chart_r+chart_m) + ',' + (chart_r+chart_m) + ')');

    createCenter();
    updateDonut();
  };

  this.update = function(dataset) {
    // Assume no new categ of data enter
    charts.selectAll('.donut').data(dataset);
    updateDonut();
  };
}
