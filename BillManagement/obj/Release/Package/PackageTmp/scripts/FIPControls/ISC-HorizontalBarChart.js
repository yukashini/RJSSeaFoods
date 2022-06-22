
//Model4

function Get_HorizontalStackedBarChartModel4(ChartID) {
    Data_HorizontalBarChartModel4 = [
  {
      "color": "#1F91AB",
      key: "Cumulative Return",
      values: [
      {
          "label": "Arc Vault",
          "value": 100,
          "color": "#73BB69"
      },
      {
          "label": "Arc Sign",
          "value": 90,
          "color": "#73BB69"
      },
      {
          "label": "ELM",
          "value": 80,
          "color": "#73BB69"
      },

      {
          "label": "ECM",
          "value": 70,
          "color": "#73BB69"
      },
      {
          "label": "GTCP",
          "value": 60,
          "color": "#73BB69"
      },
      {
          "label": "CRM",
          "value": 50,
          "color": "#73BB69"
      },

      {
          "label": "PIM",
          "value": 40,
          "color": "#73BB69"
      },
      {
          "label": "List App",
          "value": 30,
          "color": "#73BB69"
      },
      {
          "label": "My Portal",
          "value": 20,
          "color": "#73BB69"
      },


      {
          "label": "Esign",
          "value": 15,
          "color": "#73BB69"
      },
      {
          "label": "Chat Apps",
          "value": 10,
          "color": "#73BB69"
      },
      {
          "label": "Devops",
          "value": 5,
          "color": "#73BB69"
      },
      ]
  }
    ];
    var chart;
    nv.addGraph(function () {
        chart = nv.models.multiBarHorizontalChart()
            .x(function (d) { return d.label })
      .y(function (d) { return d.value })
      .margin({ top: 0, right: 20, left: 80 })
        .showValues(false)
       .tooltips(true)
       //.height(325)


        // .barColor(d3.scale.category20().range())
      .transitionDuration(250)
      .stacked(false)
        .showControls(false);
        chart.showLegend(false);
        chart.yAxis.axisLabel('Revenue By Product')
      .tickFormat(d3.format(',.2f'));
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_HorizontalBarChartModel4, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        var a = nv.tooltip;


        d3.select('#' + ChartID)
      .datum(Data_HorizontalBarChartModel4)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}
function ToolTipContent(data, key, x, y) {
    var color = "";
    var _temp = [];
    $.each(data, function (index, item) {
        if (item.key == key) {
            color = item.color;
        }

    });

    return color;
}
function payable_by_category(ChartID) {
    Data_HorizontalBarChartModel4 = [
  {
      "color": "#1F91AB",
      key: "Cumulative Return",
      values: [
      {
          "label": "Arc Vault",
          "value": 100,
          "color": "#73BB69"
      },
      {
          "label": "Arc Sign",
          "value": 90,
          "color": "#73BB69"
      },
      {
          "label": "ELM",
          "value": 80,
          "color": "#73BB69"
      },

      {
          "label": "ECM",
          "value": 70,
          "color": "#73BB69"
      },
      {
          "label": "GTCP",
          "value": 60,
          "color": "#73BB69"
      },
      {
          "label": "CRM",
          "value": 50,
          "color": "#73BB69"
      },

      {
          "label": "PIM",
          "value": 40,
          "color": "#73BB69"
      },
      {
          "label": "List App",
          "value": 30,
          "color": "#73BB69"
      },
      {
          "label": "My Portal",
          "value": 20,
          "color": "#73BB69"
      },


      {
          "label": "Esign",
          "value": 15,
          "color": "#73BB69"
      },
      {
          "label": "Chat Apps",
          "value": 10,
          "color": "#73BB69"
      },
      {
          "label": "Devops",
          "value": 5,
          "color": "#73BB69"
      },
      ]
  }
    ];
    var chart;
    nv.addGraph(function () {
        chart = nv.models.multiBarHorizontalChart()
            .x(function (d) { return d.label })
      .y(function (d) { return d.value })
      .margin({ top: 0, right: 20, left: 80 })
        .showValues(false)
       .tooltips(true)
       //.height(325)


        // .barColor(d3.scale.category20().range())
      .transitionDuration(250)
      .stacked(false)
        .showControls(false);
        chart.showLegend(false);
        chart.yAxis.axisLabel('Payable By Category')
      .tickFormat(d3.format(',.2f'));
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_HorizontalBarChartModel4, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        var a = nv.tooltip;


        d3.select('#' + ChartID)
      .datum(Data_HorizontalBarChartModel4)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}
function ToolTipContent(data, key, x, y) {
    var color = "";
    var _temp = [];
    $.each(data, function (index, item) {
        if (item.key == key) {
            color = item.color;
        }

    });

    return color;
}

function Get_HorizontalStackedBarByCategory(ChartID) {
    Data_HorizontalBarChartModel4 = [
  {
      "color": "#1F91AB",
      key: "Cumulative Return",
      values: [
      {
          "label": "Services",
          "value": 100,
          "color": "#73BB69"
      },
      {
          "label": "Investment",
          "value": 90,
          "color": "#73BB69"
      },
      {
          "label": "Mortgage",
          "value": 80,
          "color": "#73BB69"
      },

      {
          "label": "Loans",
          "value": 70,
          "color": "#73BB69"
      },
      {
          "label": "Finance",
          "value": 60,
          "color": "#73BB69"
      },
      {
          "label": "Aid",
          "value": 50,
          "color": "#73BB69"
      },

      {
          "label": "NerdWallet",
          "value": 40,
          "color": "#73BB69"
      },
      {
          "label": "ROI",
          "value": 30,
          "color": "#73BB69"
      },
      {
          "label": "Rent",
          "value": 20,
          "color": "#73BB69"
      },


      {
          "label": "Internet",
          "value": 15,
          "color": "#73BB69"
      },
      {
          "label": "Travel",
          "value": 10,
          "color": "#73BB69"
      },
      {
          "label": "Snacks",
          "value": 5,
          "color": "#73BB69"
      },
      ]
  }
    ];
    var chart;
    nv.addGraph(function () {
        chart = nv.models.multiBarHorizontalChart()
            .x(function (d) { return d.label })
      .y(function (d) { return d.value })
      .margin({ top: 0, right: 20, left: 80 })
        .showValues(false)
       .tooltips(true)
      // .height(325)


        // .barColor(d3.scale.category20().range())
      .transitionDuration(250)
      .stacked(true)
        .showControls(false);
        chart.showLegend(false);
        chart.yAxis.axisLabel('Expense By Category')
      .tickFormat(d3.format(',.2f'));
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_HorizontalBarChartModel4, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        var a = nv.tooltip;


        d3.select('#' + ChartID)
      .datum(Data_HorizontalBarChartModel4)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}
function ToolTipContent(data, key, x, y) {
    var color = "";
    var _temp = [];
    $.each(data, function (index, item) {
        if (item.key == key) {
            color = item.color;
        }

    });

    return color;
}



function Get_HorizontalStackedBarChartModel5(ChartID) {
    Data_HorizontalBarChartModel5 = [{ "color": "#C94D67", "key": "Call", "values": [{ "label": "Sussex Bancorp", "value": 100 }, { "label": "Vmware", "value": 120 }, { "label": "China Ming", "value": 111 }, { "label": "Whirlpool Corpo", "value": 166 }, { "label": "Fuwei Films", "value": 170 }, { "label": "Baytex Energy", "value": 127 }, { "label": "Universal American", "value": 140 }, { "label": "SM Listed", "value": 124 }, { "label": "DigitalGlobe", "value": 156 }, { "label": "Live Nation", "value": 125 }, { "label": "Dynatronics Corporation", "value": 176 }, { "label": "Actuate Corporation", "value": 159 }, { "label": "Helmerich", "value": 176 }, { "label": "CAE Inc", "value": 149 }] },
                                     { "color": "#E96955", "key": "Connect", "values": [{ "label": "Sussex Bancorp", "value": 82 }, { "label": "Vmware", "value": 76 }, { "label": "China Ming", "value": 28 }, { "label": "Whirlpool Corpo", "value": 37 }, { "label": "Fuwei Films", "value": 66 }, { "label": "Baytex Energy", "value": 84 }, { "label": "Universal American", "value": 38 }, { "label": "SM Listed", "value": 35 }, { "label": "DigitalGlobe", "value": 64 }, { "label": "Live Nation", "value": 27 }, { "label": "Dynatronics Corporation", "value": 59 }, { "label": "Actuate Corporation", "value": 89 }, { "label": "Helmerich", "value": 59 }, { "label": "CAE Inc", "value": 38 }] },
                                     { "color": "#FFC23E", "key": "Meeting Schd.", "values": [{ "label": "Sussex Bancorp", "value": 22 }, { "label": "Vmware", "value": 37 }, { "label": "China Ming", "value": 26 }, { "label": "Whirlpool Corpo", "value": 37 }, { "label": "Fuwei Films", "value": 35 }, { "label": "Baytex Energy", "value": 13 }, { "label": "Universal American", "value": 38 }, { "label": "SM Listed", "value": 44 }, { "label": "DigitalGlobe", "value": 12 }, { "label": "Live Nation", "value": 27 }, { "label": "Dynatronics Corporation", "value": 19 }, { "label": "Actuate Corporation", "value": 3 }, { "label": "Helmerich", "value": 39 }, { "label": "CAE Inc", "value": 58 }] },
                                      { "color": "#E1DB3F", "key": "Demo Comp", "values": [{ "label": "Sussex Bancorp", "value": 20 }, { "label": "Vmware", "value": 23 }, { "label": "China Ming", "value": 37 }, { "label": "Whirlpool Corpo", "value": 30 }, { "label": "Fuwei Films", "value": 28 }, { "label": "Baytex Energy", "value": 38 }, { "label": "Universal American", "value": 27 }, { "label": "SM Listed", "value": 59 }, { "label": "DigitalGlobe", "value": 47 }, { "label": "Live Nation", "value": 68 }, { "label": "Dynatronics Corporation", "value": 40 }, { "label": "Actuate Corporation", "value": 100 }, { "label": "Helmerich", "value": 50 }, { "label": "CAE Inc", "value": 79 }] },
                                      { "color": "#5FBA50", "key": "Opp Sourced", "values": [{ "label": "Sussex Bancorp", "value": 38 }, { "label": "Vmware", "value": 26 }, { "label": "China Ming", "value": 35 }, { "label": "Whirlpool Corpo", "value": 20 }, { "label": "Fuwei Films", "value": 10 }, { "label": "Baytex Energy", "value": 25 }, { "label": "Universal American", "value": 49 }, { "label": "SM Listed", "value": 19 }, { "label": "DigitalGlobe", "value": 49 }, { "label": "Live Nation", "value": 38 }, { "label": "Dynatronics Corporation", "value": 30 }, { "label": "Actuate Corporation", "value": 40 }, { "label": "Helmerich", "value": 49 }, { "label": "CAE Inc", "value": 47 }] },
                                      { "color": "#26A7DD", "key": "Deal (Prosp)", "values": [{ "label": "Sussex Bancorp", "value": 23 }, { "label": "Vmware", "value": 87 }, { "label": "China Ming", "value": 86 }, { "label": "Whirlpool Corpo", "value": 37 }, { "label": "Fuwei Films", "value": 36 }, { "label": "Baytex Energy", "value": 35 }, { "label": "Universal American", "value": 54 }, { "label": "SM Listed", "value": 64 }, { "label": "DigitalGlobe", "value": 65 }, { "label": "Live Nation", "value": 45 }, { "label": "Dynatronics Corporation", "value": 50 }, { "label": "Actuate Corporation", "value": 68 }, { "label": "Helmerich", "value": 68 }, { "label": "CAE Inc", "value": 38 }] },
                                      { "color": "#57D0B5", "key": "Lost (Prosp)", "values": [{ "label": "Sussex Bancorp", "value": 12 }, { "label": "Vmware", "value": 23 }, { "label": "China Ming", "value": 19 }, { "label": "Whirlpool Corpo", "value": 14 }, { "label": "Fuwei Films", "value": 16 }, { "label": "Baytex Energy", "value": 18 }, { "label": "Universal American", "value": 26 }, { "label": "SM Listed", "value": 38 }, { "label": "DigitalGlobe", "value": 27 }, { "label": "Live Nation", "value": 14 }, { "label": "Dynatronics Corporation", "value": 30 }, { "label": "Actuate Corporation", "value": 40 }, { "label": "Helmerich", "value": 49 }, { "label": "CAE Inc", "value": 59 }] },

    ];

    var chart;
    nv.addGraph(function () {
        chart = nv.models.multiBarHorizontalChart()
      .x(function (d) { return d.label })
      .y(function (d) { return d.value })
     .margin({ top: 0, right: 20, left: 140 })
        .showValues(true)
       .tooltips(true)
        // .barColor(d3.scale.category20().range())
      .transitionDuration(250)
      .stacked(true)
        .showControls(false);
        chart.showLegend(false);
        chart.yAxis.axisLabel('Revenue By Product')
      .tickFormat(d3.format(',.2f'));
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_HorizontalBarChartModel4, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        chart.forceY([0, 500]);
        d3.select('#' + ChartID)
      .datum(Data_HorizontalBarChartModel5)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}
function ToolTipContent(data, key, x, y) {
    var color = "";
    var _temp = [];
    $.each(data, function (index, item) {
        if (item.key == key) {
            color = item.color;
        }

    });

    return color;
}


//NumberofDeals

function Get_HorizontalStackedNumberofDeals(ChartID) {
    NumberofDeals = [{ "color": "#0BC9FF", "key": "Quarter-To-DateBookings", "values": [{ "label": "Joe Smith", "value": -175 }, { "label": "Nacy Olson", "value": 50 }, { "label": "Helena Carter", "value": 40 }, { "label": "Angelina Fox", "value": 45 }, { "label": "Sylvia Sidney", "value": 20 }, { "label": "Lauren Bacall", "value": 10 }, { "label": "Joseph Teegardin", "value": 4 }] },
                                     { "color": "#D18FE2", "key": "Open Opportunity Forecast", "values": [{ "label": "Joe Smith", "value": 80 }, { "label": "Nacy Olson", "value": 55 }, { "label": "Helena Carter", "value": 28 }, { "label": "Angelina Fox", "value": 37 }, { "label": "Sylvia Sidney", "value": 26 }, { "label": "Lauren Bacall", "value": 34 }, { "label": "Joseph Teegardin", "value": 2 }] },
                                     { "color": "#897B71", "key": "Goal", "values": [{ "label": "Joe Smith", "value": 22 }, { "label": "Nacy Olson", "value": 2 }, { "label": "Helena Carter", "value": 1 }, { "label": "Angelina Fox", "value": 2 }, { "label": "Sylvia Sidney", "value": 2 }, { "label": "Lauren Bacall", "value": 1 }, { "label": "Joseph Teegardin", "value": 0 }] }
    ];

    var chart;
    nv.addGraph(function () {
        chart = nv.models.multiBarHorizontalChart()
      .x(function (d) { return d.label })
      .y(function (d) { return d.value })
      .margin({ right: 20, left: 140 })
        .showValues(true)
       .tooltips(true)
        // .barColor(d3.scale.category20().range())
      .transitionDuration(250)
      .stacked(true)
        .showControls(false);
        chart.showLegend(false);
        chart.yAxis.axisLabel('Number of Deals')
      .tickFormat(function (f) { return "$" + f + "K"; });
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1"></label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(NumberofDeals, key, x, y) + '">' + y + ' on ' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        chart.forceY([0, 300]);
        d3.select('#' + ChartID)
      .datum(NumberofDeals)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}
function ToolTipContent(data, key, x, y) {
    var color = "";
    var _temp = [];
    $.each(data, function (index, item) {
        if (item.key == key) {
            color = item.color;
        }

    });

    return color;
}

function Get_HorizontalStackedBarChartModel6(ChartID) {
    var data = [
  {
      "key": "Series 1",
      "color": "#d67777",
      "values": [
      {
          "label": "Group A",
          "value": -1.8746444827653
      },
      {
          "label": "Group B",
          "value": -8.0961543492239
      },
      {
          "label": "Group C",
          "value": -0.57072943117674
      },
      {
          "label": "Group D",
          "value": -2.4174010336624
      },
      {
          "label": "Group E",
          "value": -0.72009071426284
      },
      {
          "label": "Group F",
          "value": -0.77154485523777
      },
      {
          "label": "Group G",
          "value": -0.90152097798131
      },
      {
          "label": "Group H",
          "value": -0.91445417330854
      },
      {
          "label": "Group I",
          "value": -0.055746319141851
      }
      ]
  },
  {
      "key": "Series 2",
      "color": "#4f99b4",
      "values": [
      {
          "label": "Group A",
          "value": 25.307646510375
      },
      {
          "label": "Group B",
          "value": 16.756779544553
      },
      {
          "label": "Group C",
          "value": 18.451534877007
      },
      {
          "label": "Group D",
          "value": 8.6142352811805
      },
      {
          "label": "Group E",
          "value": 7.8082472075876
      },
      {
          "label": "Group F",
          "value": 5.259101026956
      },
      {
          "label": "Group G",
          "value": 0.30947953487127
      },
      {
          "label": "Group H",
          "value": 0
      },
      {
          "label": "Group I",
          "value": 0
      }
      ]
  }
    ];
    nv.addGraph(function () {
        var chart = nv.models.multiBarHorizontalChart()
          .x(function (d) { return d.label })
          .y(function (d) { return d.value })
          .margin({ top: 30, right: 20, bottom: 50, left: 175 })
          .showValues(true)           //Show bar value next to each bar.
          .tooltips(true)             //Show tooltips on hover.       
          .transitionDuration(350)
          .showControls(true);        //Allow user to switch between "Grouped" and "Stacked" mode.

        chart.yAxis
          .tickFormat(d3.format(',.2f'));

        chart.tooltipContent(function (key, x, y, e, graph) {
            var dd = 0;
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1"></label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(data, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        d3.select('#' + ChartID)
          .datum(data)
          .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });

}

function Get_HorizontalStackedBarChartModel_Goal(ChartID) {

    var SysColor = '';
    switch (ChartID) {

        case 'LinePlusBarChartModel1':
            {
                SysColor = '#00A4D9';
                break;
            }
        case 'LinePlusBarChartModel2':
            {
                SysColor = '#00D1B4';
                break;
            }
        case 'LinePlusBarChartModel3':
            {
                SysColor = '#2eb959';
                break;
            }
        case 'LinePlusBarChartModel4':
            {
                SysColor = '#e4dd5d';
                break;
            }
    }

    var data = [
  {
      "key": "Current Week",
      "color": SysColor,
      "values": [
      {
          "label": "WK5 ",
          "value": 10
      },
       {
           "label": "WK4",
           "value": 8.5
       },
       {
           "label": "WK3",
           "value": 6
       },
       {
           "label": "WK2",
           "value": 5.5
       },
       {
           "label": "WK1",
           "value": 2
       }
      ]
  }
    ];

    nv.addGraph(function () {
        var chart = nv.models.multiBarHorizontalChart()
          .x(function (d) { return d.label })
          .y(function (d) { return d.value })
          .margin({ top: 30, right: 20, bottom: 50, left: 175 })
          .height(350)
          .showValues(false)           //Show bar value next to each bar.
          .tooltips(true)             //Show tooltips on hover.       
          .transitionDuration(350)
          .showLegend(false)
          .showControls(false);        //Allow user to switch between "Grouped" and "Stacked" mode.

        if (ChartID == 'LinePlusBarChartModel1') {
            chart.showXAxis(true);
        }
        else {
            chart.showXAxis(false);
        }

        //chart.xRange([0, 350]);

        chart.yAxis
          .tickFormat(function (d) { return d + "%"; });

        chart.forceY([0, 10]);

        chart.tooltipContent(function (key, x, y, e, graph) {
            var dd = 0;
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1"></label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(data, key, x, y) + '">' + y + '  on  ' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        d3.select('#' + ChartID)
          .datum(data)
          .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });

}


function Get_HorizontalStackedBarChartModel7(ChartID) {
    Data_HorizontalBarChartModel7 = [
  {
      "color": "#1F91AB",
      key: "Cumulative Return",
      values: [
      {
          "label": "ABC INDUSTRIES",

          "value": 100,
          "color": "#73BB69"
      },
      {
          "label": "AC GROUP LIMITED",

          "value": 90,
          "color": "#73BB69"
      },
      {
          "label": "ANATOLIA",

          "value": 80,
          "color": "#73BB69"
      },
      {
          "label": "ARMALY BRANDS",

          "value": 60,
          "color": "#73BB69"
      },
      {
          "label": "AZEK",

          "value": 50,
          "color": "#73BB69"
      },

      {
          "label": "BACK TO THE ROOTS",

          "value": 40,
          "color": "#73BB69"
      },
      {
          "label": "BAD DAWG ACCESSORIES",

          "value": 30,
          "color": "#73BB69"
      },
      {
          "label": "BILLY GANDY AGENCY",

          "value": 20,
          "color": "#73BB69"
      },


      {
          "label": "BLUELINX",

          "value": 15,
          "color": "#73BB69"
      },
      {
          "label": "BOELTER BRANDS",

          "value": 10,
          "color": "#73BB69"
      },
      {
          "label": "BOSTIK- PRO",

          "value": 5,
          "color": "#73BB69"
      },
      ]
  }
    ];
    var chart;
    nv.addGraph(function () {
        chart = nv.models.multiBarHorizontalChart()
            .x(function (d) { return d.label })
      .y(function (d) { return d.value })
      .margin({ top: 0, right: 20, left: 140 })
        .showValues(true)
       .tooltips(true)
      .height(325)


        // .barColor(d3.scale.category20().range())
      .transitionDuration(250)
      .stacked(false)
        .showControls(false);
        chart.showLegend(false);
        chart.yAxis.axisLabel('Revenue By Customers (Top 10)')
      .tickFormat(d3.format(',.2f'));
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_HorizontalBarChartModel4, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        var a = nv.tooltip;


        d3.select('#' + ChartID)
      .datum(Data_HorizontalBarChartModel7)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}
function ToolTipContent(data, key, x, y) {
    var color = "";
    var _temp = [];
    $.each(data, function (index, item) {
        if (item.key == key) {
            color = item.color;
        }

    });

    return color;
}

function Get_HorizontalStackedBarChartModel8(ChartID) {
    Data_HorizontalBarChartModel8 = [
  {
      "color": "#1F91AB",
      key: "Cumulative Return",
      values: [
      {
          "label": " Bank of America credit card",


          "value": 100,
          "color": "#73BB69"
      },
      {
          "label": "Decentec",


          "value": 90,
          "color": "#73BB69"
      },
      {
          "label": "Marathin Business Center",


          "value": 80,
          "color": "#73BB69"
      },

      {
          "label": "  United Healthcare Insurence C0",

          "value": 70,
          "color": "#73BB69"
      },
      //{
      //    "label": "ARMALY BRANDS",

      //    "value": 60,
      //    "color": "#73BB69"
      //},
      //{
      //    "label": "AZEK",

      //    "value": 50,
      //    "color": "#73BB69"
      //},

      //{
      //    "label": "BACK TO THE ROOTS",

      //    "value": 40,
      //    "color": "#73BB69"
      //},
      //{
      //    "label": "BAD DAWG ACCESSORIES",

      //    "value": 30,
      //    "color": "#73BB69"
      //},
      //{
      //    "label": "BILLY GANDY AGENCY",

      //    "value": 20,
      //    "color": "#73BB69"
      //},


      //{
      //    "label": "BLUELINX",

      //    "value": 15,
      //    "color": "#73BB69"
      //},
      //{
      //    "label": "BOELTER BRANDS",

      //    "value": 10,
      //    "color": "#73BB69"
      //},
      //{
      //    "label": "BOSTIK- PRO",

      //    "value": 5,
      //    "color": "#73BB69"
      //},
      ]
  }
    ];
    var chart;
    nv.addGraph(function () {
        chart = nv.models.multiBarHorizontalChart()
            .x(function (d) { return d.label })
      .y(function (d) { return d.value })
      .margin({ top: 0, right: 20, left: 170 })
        .showValues(false)
       .tooltips(true)
      .height(300)


        // .barColor(d3.scale.category20().range())
      .transitionDuration(250)
      .stacked(false)
        .showControls(false);
        chart.showLegend(false);
        chart.yAxis.axisLabel('Expense By Vendor')
      .tickFormat(d3.format(',.2f'));
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_HorizontalBarChartModel4, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        var a = nv.tooltip;


        d3.select('#' + ChartID)
      .datum(Data_HorizontalBarChartModel8)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}
function ToolTipContent(data, key, x, y) {
    var color = "";
    var _temp = [];
    $.each(data, function (index, item) {
        if (item.key == key) {
            color = item.color;
        }

    });

    return color;
}

//Account Receivable-by Aging
function Acc_Rec_by_aging(ChartID) {
    Data_HorizontalBarChartModel4 = [
  {
      "color": "#219AB5",
      key: "Cumulative Return",
      values: [
      {
          "label": "BAD DAWG ACCESSORIES",
          "value": 26400,
          "color": "#73BB69"
      },
      {
          "label": "MERCHANT METALS",
          "value": 24650,
          "color": "#73BB69"
      },
      {
          "label": "GE LIGHTING CANADA",
          "value": 15726.2,
          "color": "#73BB69"
      },

      {
          "label": "LOWE'S PROSERVICES",
          "value": 14250,
          "color": "#73BB69"
      },
      {
          "label": "TREX COMPANY, INC",
          "value": 9568,
          "color": "#73BB69"
      },
      {
          "label": "GREEN TOUCH USA",
          "value": 8400,
          "color": "#73BB69"
      },

      {
          "label": "HENKEL CORP.",
          "value": 7020,
          "color": "#73BB69"
      },
      {
          "label": "BILLY GANDY AGENCY",
          "value": 7000,
          "color": "#73BB69"
      },
      {
          "label": "BOSTIK- PRO",
          "value": 6625,
          "color": "#73BB69"
      },


      {
          "label": "LG HOME DEPOT",
          "value": 6500,
          "color": "#73BB69"
      },
      {
          "label": "PITTSBURGH GLASS",
          "value": 6300,
          "color": "#73BB69"
      },
      {
          "label": "SHARP ELECTRONICS",
          "value": 6021.1,
          "color": "#73BB69"
      },
      {
          "label": "FRANKLIN",
          "value": 6000,
          "color": "#73BB69"
      },
      {
          "label": "SOUTHWIRE REPORTING",
          "value": 6000,
          "color": "#73BB69"
      },
      {
          "label": "SAMSUNG",
          "value": 5475,
          "color": "#73BB69"
      },
      {
          "label": "SHAW",
          "value": 5460,
          "color": "#73BB69"
      },
      {
          "label": "OWENS CORNING",
          "value": 5400,
          "color": "#73BB69"
      },
      {
          "label": "OATEY",
          "value": 4743.29,
          "color": "#73BB69"
      },
      {
          "label": "OLD WORLD CHRISTMAS",
          "value": 4644.5,
          "color": "#73BB69"
      },
      {
          "label": "US FLOORS",
          "value": 4417.5,
          "color": "#73BB69"
      },
      {
          "label": "LEGGETT & PLATT INC",
          "value": 4286.5,
          "color": "#73BB69"
      },
      {
          "label": "ENERCO GROUP INC",
          "value": 3950,
          "color": "#73BB69"
      },
      {
          "label": "BP-CASTROL",
          "value": 3917,
          "color": "#73BB69"
      },
      {
          "label": "CLARION LAMINATES, LLC",
          "value": 3794,
          "color": "#73BB69"
      },
       {
           "label": "GHP GROUP, INC.",
           "value": 3650,
           "color": "#73BB69"
       },
        {
            "label": "AC GROUP LIMITED",
            "value": 3600,
            "color": "#73BB69"
        },
         {
             "label": "EXACO TRADING",
             "value": 3541.44,
             "color": "#73BB69"
         },
          {
              "label": "JACUZZI LUXURY BATH",
              "value": 3196.25,
              "color": "#73BB69"
          },
      ]
  }
    ];
    var chart;
    nv.addGraph(function () {
        chart = nv.models.multiBarHorizontalChart()
            .x(function (d) { return d.label })
      .y(function (d) { return d.value })
      .margin({ top: 0, right: 20, left: 150 })
        .showValues(true)
       .tooltips(true)
       //.height(325)


        // .barColor(d3.scale.category20().range())
      .transitionDuration(250)
      .stacked(false)
        .showControls(false);
        chart.showLegend(false);
        chart.yAxis.axisLabel('Receivables By Customers')
      .tickFormat(d3.format(',.2f'));
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_HorizontalBarChartModel4, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        var a = nv.tooltip;


        d3.select('#' + ChartID)
      .datum(Data_HorizontalBarChartModel4)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}
function ToolTipContent(data, key, x, y) {
    var color = "";
    var _temp = [];
    $.each(data, function (index, item) {
        if (item.key == key) {
            color = item.color;
        }

    });

    return color;
}

//Account Receivable-by Aging
function Acc_Rec_by_aging1(ChartID) {
    Data_HorizontalBarChartModel4 = [
  {
      "color": "#219AB5",
      key: "Cumulative Return",
      values: [
      {
          "label": "BAD DAWG ACCESSORIES",
          "value": 26400.00,
          "color": "#73BB69"
      },

      {
          "label": "LOWE'S PROSERVICES",
          "value": 14250,
          "color": "#73BB69"
      },
      {
          "label": "TREX COMPANY, INC",
          "value": 9568,
          "color": "#73BB69"
      },

      {
          "label": "HENKEL CORP.",
          "value": 7020,
          "color": "#73BB69"
      },
            {
                "label": "BOSTIK- PRO",
                "value": 6625,
                "color": "#73BB69"
            },


      {
          "label": "LG HOME DEPOT",
          "value": 6500,
          "color": "#73BB69"
      },

       {
           "label": "FRANKLIN",
           "value": 6000,
           "color": "#73BB69"
       },
      {
          "label": "SOUTHWIRE REPORTING",
          "value": 6000,
          "color": "#73BB69"
      },
      {
          "label": "SAMSUNG",
          "value": 5475,
          "color": "#73BB69"
      },
      {
          "label": "SHAW",
          "value": 5460,
          "color": "#73BB69"
      },
           {
               "label": "OATEY",
               "value": 4743.29,
               "color": "#73BB69"
           },
           {
               "label": "US FLOORS",
               "value": 4417.5,
               "color": "#73BB69"
           },
      {
          "label": "LEGGETT & PLATT INC",
          "value": 4286.5,
          "color": "#73BB69"
      },
      {
          "label": "ENERCO GROUP INC",
          "value": 3950,
          "color": "#73BB69"
      },
      {
          "label": "BP-CASTROL",
          "value": 3917,
          "color": "#73BB69"
      },

       {
           "label": "GHP GROUP, INC.",
           "value": 3650,
           "color": "#73BB69"
       },
        {
            "label": "AC GROUP LIMITED",
            "value": 3600,
            "color": "#73BB69"
        },
         {
             "label": "EXACO TRADING",
             "value": 3541.44,
             "color": "#73BB69"
         },
          {
              "label": "JACUZZI LUXURY BATH",
              "value": 3196.25,
              "color": "#73BB69"
          },
           {
               "label": "ABC INDUSTRIES",
               "value": 2220,
               "color": "#73BB69"
           },
      ]
  }
    ];
    var chart;
    nv.addGraph(function () {
        chart = nv.models.multiBarHorizontalChart()
            .x(function (d) { return d.label })
      .y(function (d) { return d.value })
      .margin({ top: 0, right: 20, left: 150 })
        .showValues(true)
       .tooltips(true)
       //.height(325)


        // .barColor(d3.scale.category20().range())
      .transitionDuration(250)
      .stacked(false)
        .showControls(false);
        chart.showLegend(false);
        chart.yAxis.axisLabel('Receivables By Customers (Top 20)')
      .tickFormat(d3.format(',.2f'));
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_HorizontalBarChartModel4, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        var a = nv.tooltip;


        d3.select('#' + ChartID)
      .datum(Data_HorizontalBarChartModel4)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}
function ToolTipContent(data, key, x, y) {
    var color = "";
    var _temp = [];
    $.each(data, function (index, item) {
        if (item.key == key) {
            color = item.color;
        }

    });

    return color;
}

function Acc_Rec_by_aging2(ChartID) {
    Data_HorizontalBarChartModel5 = [
  {
      "color": "#73BB69",
      key: "Cumulative Return",
      values: [
      {
          "label": "Total Payments Due",
          "value": 60,
          "color": "#34D3EB"
      },

      {
          "label": "Posted Payments",
          "value": 40,
          "color": "#34D3EB"
      },
      {
          "label": "Overdue Payments",
          "value": 30,
          "color": "#34D3EB"
      },

      {
          "label": "Unsuccessful Payments",
          "value": 25,
          "color": "#34D3EB"
      },
            

      ]
  }
    ];
    var chart;
    nv.addGraph(function () {
        chart = nv.models.multiBarHorizontalChart()
            .x(function (d) { return d.label })
      .y(function (d) { return d.value })
      .margin({ top: 0, right: 20, left: 150 })
            .valueFormat(d3.format(".0f"))
        .showValues(true)
           
       .tooltips(true)
     .height(400)


        // .barColor(d3.scale.category20().range())
      .transitionDuration(250)
      .stacked(false)
        .showControls(false);
        chart.showLegend(false);
        chart.yAxis.axisLabel('')
      .tickFormat(d3.format(',.0f'));
       
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_HorizontalBarChartModel5, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        var a = nv.tooltip;


        d3.select('#' + ChartID)
      .datum(Data_HorizontalBarChartModel5)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}
function ToolTipContent(data, key, x, y) {
    var color = "";
    var _temp = [];
    $.each(data, function (index, item) {
        if (item.key == key) {
            color = item.color;
        }

    });

    return color;
}

function Acc_Rec_by_aging3(ChartID) {
    Data_HorizontalBarChartModel5 = [
  {
      "color": "#73BB69",
      key: "Cumulative Return",
      values: [
      {
          "label": "DACENTEC",
          "value": 26400.00,
          "color": "#73BB69"
      },

      {
          "label": "BANK OF AMERICA  CREDIT CARD",
          "value": 14250,
          "color": "#73BB69"
      },
      {
          "label": "MARATHON BUSINESS CENTER",
          "value": 9568,
          "color": "#73BB69"
      },

      {
          "label": "United Healthcare Insurance Co.",
          "value": 7020,
          "color": "#73BB69"
      },
            {
                "label": "Evergreen International Corp.",
                "value": 6625,
                "color": "#73BB69"
            }


      ]
  }
    ];
    var chart;
    nv.addGraph(function () {
        chart = nv.models.multiBarHorizontalChart()
            .x(function (d) { return d.label })
      .y(function (d) { return d.value })
      .margin({ top: 0, right: 20, left: 185 })
        .showValues(true)
       .tooltips(true)
     .height(175)


        // .barColor(d3.scale.category20().range())
      .transitionDuration(250)
      .stacked(false)
        .showControls(false);
        chart.showLegend(false);
        chart.yAxis.axisLabel('Customers By Sale (Top 5)')
      .tickFormat(d3.format(',.2f'));
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_HorizontalBarChartModel5, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        var a = nv.tooltip;


        d3.select('#' + ChartID)
      .datum(Data_HorizontalBarChartModel5)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}
function ToolTipContent(data, key, x, y) {
    var color = "";
    var _temp = [];
    $.each(data, function (index, item) {
        if (item.key == key) {
            color = item.color;
        }

    });

    return color;
}


function Acc_Rec_by_aging4(ChartID) {
    Data_HorizontalBarChartModel4 = [
  {
      "color": "#219AB5",
      key: "Cumulative Return",
      values: [
      {
          "label": "DACENTEC",
          "value": 26400.00,
          "color": "#73BB69"
      },

      {
          "label": "BANK OF AMERICA  CREDIT CARD",
          "value": 14250,
          "color": "#73BB69"
      },
      {
          "label": "MARATHON BUSINESS CENTER",
          "value": 9568,
          "color": "#73BB69"
      },

      {
          "label": "United Healthcare Insurance Co",
          "value": 7020,
          "color": "#73BB69"
      },
            {
                "label": "Evergreen International Corp.",
                "value": 6625,
                "color": "#73BB69"
            },


      {
          "label": "Akamai Technologies Inc",
          "value": 6500,
          "color": "#73BB69"
      },

       {
           "label": "Arrow Financial Corporation",
           "value": 6000,
           "color": "#73BB69"
       },
      {
          "label": "Ajs Bancorp, Inc.",
          "value": 6000,
          "color": "#73BB69"
      },
      {
          "label": "Alarm com Holdings Inc",
          "value": 5475,
          "color": "#73BB69"
      },
      {
          "label": "Adaiah Distribution Inc",
          "value": 5460,
          "color": "#73BB69"
      },
           {
               "label": "Avery Dennison Corp",
               "value": 4743.29,
               "color": "#73BB69"
           },
           {
               "label": "Smith A O Corp",
               "value": 4417.5,
               "color": "#73BB69"
           },

       {
           "label": "GHP GROUP, INC.",
           "value": 3650,
           "color": "#73BB69"
       },
        {
            "label": "AC GROUP LIMITED",
            "value": 3600,
            "color": "#73BB69"
        },
         {
             "label": "EXACO TRADING",
             "value": 3541.44,
             "color": "#73BB69"
         },
          {
              "label": "JACUZZI LUXURY BATH",
              "value": 3196.25,
              "color": "#73BB69"
          },
           {
               "label": "ABC INDUSTRIES",
               "value": 2220,
               "color": "#73BB69"
           },
      ]
  }
    ];
    var chart;
    nv.addGraph(function () {
        chart = nv.models.multiBarHorizontalChart()
            .x(function (d) { return d.label })
      .y(function (d) { return d.value })
      .margin({ top: 0, right: 20, left: 185 })
        .showValues(true)
       .tooltips(true)
       //.height(325)


        // .barColor(d3.scale.category20().range())
      .transitionDuration(250)
      .stacked(false)
        .showControls(false);
        chart.showLegend(false);
        chart.yAxis.axisLabel('Amount Due by Vendors (Top 20)')
      .tickFormat(d3.format(',.2f'));
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_HorizontalBarChartModel4, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        var a = nv.tooltip;


        d3.select('#' + ChartID)
      .datum(Data_HorizontalBarChartModel4)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}
function ToolTipContent(data, key, x, y) {
    var color = "";
    var _temp = [];
    $.each(data, function (index, item) {
        if (item.key == key) {
            color = item.color;
        }

    });

    return color;
}