/// <reference path="../Internalplugin/jquery-1.8.3.min.js" />

function Get_VerticalBarChartAll(ChartID) {

    Data_VerticalBarChart = [
          {
              key: "Cumulative Return",
              values: [
              {
                  "label": "Jan",
                  "value": 15,
                  "color": "#1F8BCA"
              },
              {
                  "label": "Feb",
                  "value": 20,
                  "color": "#1F8BCA"
              },
              {
                  "label": "Mar",
                  "value": 25,
                  "color": "#1F8BCA"
              },


              {
                  "label": "Apr",
                  "value": 30,
                  "color": "#1F8BCA"
              },
              {
                  "label": "May",
                  "value": 35,
                  "color": "#1F8BCA"
              },
              {
                  "label": "Jun",
                  "value": 40,
                  "color": "#1F8BCA"
              },


              {
                  "label": "Jul",
                  "value": 45,
                  "color": "#1F8BCA"
              },
             {
                 "label": "Aug",
                 "value": 55,
                 "color": "#1F8BCA"
             },
              {
                  "label": "Sep",
                  "value": 60,
                  "color": "#1F8BCA"
              },
              {
                  "label": "Oct",
                  "value": 70,
                  "color": "#1F8BCA"
              },
              {
                  "label": "Nov",
                  "value": 80,
                  "color": "#1F8BCA"
              }


              ]
          }
    ];

    nv.addGraph(function () {
        var chart = nv.models.discreteBarChart()
      .x(function (d) { return d.label })
      .y(function (d) { return d.value })
      .staggerLabels(true)
      .margin({ top: 30, right: 35, bottom: 40, left: 35 })
        //.staggerLabels(historicalBarChart[0].values.length > 8)
      .tooltips(true)
      .color(['#1F8BCA'])
      .showValues(false)
      .tooltipContent(function (key, x, y, e, graph) {
          return '<h3>' + key + '</h3>' +
           '<p>' + y + ' on ' + x + '</p>'
      })

      .transitionDuration(250);
        chart.yAxis.tickFormat(d3.format(',f'));
        chart.forceY([0, 60]);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_VerticalBarChart, key, x, y) + '">' + x + ' on' + " " + key + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select('#' + ChartID)
      .datum(Data_VerticalBarChart)
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

function Get_VerticalBarChart(ChartID) {
    Data_VerticalBarChart = [
  {
      key: "Cumulative Return",
      values: [
      {
          "label": "Jan",
          "value": 10,
          "color": "#045284"
      },
      {
          "label": "Feb",
          "value": 15,
          "color": "#045284"
      },
      {
          "label": "Mar",
          "value": 20,
          "color": "#045284"
      },


      {
          "label": "Apr",
          "value": 25,
          "color": "#045284"
      },
      {
          "label": "May",
          "value": 30,
          "color": "#045284"
      },
      {
          "label": "Jun",
          "value": 35,
          "color": "#045284"
      },




      {
          "label": "Jul",
          "value": 40,
          "color": "#045284"
      },
      {
          "label": "Aug",
          "value": 45,
          "color": "#045284"
      },
      {
          "label": "Sep",
          "value": 50,
          "color": "#045284"
      },


      {
          "label": "Oct",
          "value": 55,
          "color": "#045284"
      },
      {
          "label": "Nov",
          "value": 58,
          "color": "#045284"
      },
      {
          "label": "Dec",
          "value": 60,
          "color": "#045284"
      },
      ]
  }
    ];


    nv.addGraph(function () {
        var chart = nv.models.discreteBarChart()
        .x(function (d) { return d.label })
        .y(function (d) { return d.value })
    //    .margin({ top: 10, right: 10, bottom: 35, left: 30 })
        .staggerLabels(true)
        //.staggerLabels(historicalBarChart[0].values.length > 8)
        .tooltips(true)
        .showValues(true)
        .transitionDuration(250);
        chart.forceY([0, 60]);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(Data_VerticalBarChart, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        d3.select('#' + ChartID)

        .datum(Data_VerticalBarChart)
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

//Vertical bar2




function Get_VerticalBarChart2(ChartID) {
    Data_VerticalBarChart2 = [
{
    key: "Cumulative Return",
    values: [
    {
        "label": "A Label",
        "value": -29.765957771107
    },
    {
        "label": "B Label",
        "value": 10
    },
    {
        "label": "C Label",
        "value": 32.807804682612
    },
    {
        "label": "D Label",
        "value": 96.45946739256
    },
    {
        "label": "E Label",
        "value": 5.19434030906893
    },
    {
        "label": "F Label",
        "value": -98.079782601442
    },
    {
        "label": "G Label",
        "value": -13.925743130903
    },
    {
        "label": "H Label",
        "value": -5.1387322875705
    }
    ]
}
    ];


    nv.addGraph(function () {
        var chart = nv.models.discreteBarChart()
      .x(function (d) { return d.label })
      .y(function (d) { return d.value })
     // .margin({ top: 10, right: 10, bottom: 35, left: 30 })
      .staggerLabels(true)
        //.staggerLabels(historicalBarChart[0].values.length > 8)
      .tooltips(true)
      .showValues(true)
      .transitionDuration(250);
        chart.forceY([0, 60]);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(Data_VerticalBarChart2, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        d3.select('#' + ChartID)

      .datum(Data_VerticalBarChart2)
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

//5
function Get_VerticalBarChart5(ChartID) {
    Data_VerticalBarChart5 = [
  {
      key: "Cumulative Return",
      values: [
      {
          "label": "Jan",
          "value": 10,
          "color": "#045284"
      },
      {
          "label": "Feb",
          "value": 15,
          "color": "#045284"
      },
      {
          "label": "Mar",
          "value": 20,
          "color": "#045284"
      },


      {
          "label": "Apr",
          "value": 25,
          "color": "#045284"
      },
      {
          "label": "May",
          "value": 30,
          "color": "#045284"
      },
      {
          "label": "Jun",
          "value": 35,
          "color": "#045284"
      },




      {
          "label": "Jul",
          "value": 40,
          "color": "#045284"
      },
      {
          "label": "Aug",
          "value": 45,
          "color": "#045284"
      },
      {
          "label": "Sep",
          "value": 50,
          "color": "#045284"
      },


      {
          "label": "Oct",
          "value": 55,
          "color": "#045284"
      },
      {
          "label": "Nov",
          "value": 58,
          "color": "#045284"
      },
      {
          "label": "Dec",
          "value": 60,
          "color": "#045284"
      },
      ]
  }
    ];


    nv.addGraph(function () {
        var chart = nv.models.discreteBarChart()
        .x(function (d) { return d.label })
        .y(function (d) { return d.value })
      //  .margin({ top: 10, right: 10, bottom: 35, left: 30 })
        .staggerLabels(true)
        //.staggerLabels(historicalBarChart[0].values.length > 8)
        .tooltips(true)
        .showValues(false)
        .transitionDuration(250);
        chart.forceY([0, 60]);
        chart.showXAxis(false);
        chart.showYAxis(false);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(Data_VerticalBarChart5, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select('#' + ChartID)

        .datum(Data_VerticalBarChart5)
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

function Get_VerticalBarChartDemo1(ChartID) {
    Data_VerticalBarChart5 = [
  {
      key: "Demo",
      values: [
      {
          "label": "Jan",
          "value": 10,
          "color": "#5CB74F"
      },
      {
          "label": "Feb",
          "value": 50,
          "color": "#5CB74F"
      },
      {
          "label": "Mar",
          "value": 34,
          "color": "#5CB74F"
      }
      ]
  }
    ];

    nv.addGraph(function () {
        var chart = nv.models.discreteBarChart()
      .x(function (d) { return d.label })
      .y(function (d) { return d.value })
      .margin({ top: 10, right: 10, bottom: 35, left: 30 })
      .staggerLabels(true)
        //.staggerLabels(historicalBarChart[0].values.length > 8)
      .tooltips(true)
      .showValues(false)
      .transitionDuration(250);
        chart.forceY([0, 60]);
        chart.showXAxis(true);
        chart.showYAxis(true);
        d3.select('#' + ChartID)

      .datum(Data_VerticalBarChart5)
      .call(chart);


        nv.utils.windowResize(chart.update);

        return chart;
    });
}


function Get_VerticalBarChart(ChartID, data, option) {
    nv.addGraph(function () {
        var chart = nv.models.discreteBarChart()
      .x(function (d) { return d.label })
      .y(function (d) { return d.value })
      .staggerLabels(true)
       .forceY([-10, 20000])
        //.staggerLabels(historicalBarChart[0].values.length > 8)
      .tooltips(true)
        //      .color(['#00b3e9'])
        .tooltipContent(function (key, x, y, e, graph) {
            return '<h3>' + key + '</h3>' +
           '<p>' + y + ' on ' + x + '</p>'
        })

      .transitionDuration(250);
        chart.yAxis.axisLabel('Shipment').axisLabelDistance(40).width(20)
         .tickFormat(function (f) { return "$" + f; });

        d3.select('#' + ChartID + '')
      .datum(data)

      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });

}


function DrawVerticalBarDrill(controlID, data) {
    nv.addGraph(function () {

        var values = [];
        $.each(data[0]['values'], function (index, item) {
            var value = parseFloat(item['value']);
            values.push(value);
        });
        var tollernceminper = 0.1;
        var tollerncemaxper = 0.01;
        var max = Math.max.apply(Math, values);
        var min = Math.min.apply(Math, values);
        var tollerancemin = min * tollernceminper;
        var tollerancemax = max * tollerncemaxper;
        var maxY = max + tollerancemax;
        var minY = min - tollerancemin;

        var chart = nv.models.discreteBarChart()
      .x(function (d) { return d.label })
      .y(function (d) { return d.value })
      .staggerLabels(false)
      .margin({ top: 15, right: 30, bottom: 60, left: 80 })
        //.staggerLabels(historicalBarChart[0].values.length > 8)
      .tooltips(true)
        // .color(['#1F8BCA'])
      .showValues(false)
      .forceY([minY, maxY])
       .tooltipContent(function (key, x, y, e, graph) {
           _selectedseries = x;
           return '<h3>' + key + '</h3>' +
           '<p>' + y + ' on ' + x + '</p>'
       })
      .transitionDuration(250);
        chart.yAxis.axisLabel("Amount ($)").tickFormat(function (f) { return "" + f.toFixed(0) + " $"; });
        var formatter;
        formatter = function (d, i) {
            return d;
        }
        chart.xAxis.axisLabel("Product")
        .tickFormat(formatter);
        d3.select('#' + controlID)
      .datum(data)
      .call(chart);
        nv.utils.windowResize(chart.update);

        $(".nv-bar").click(function () {
            if (_selectedseries == "Feb-2016") {
                $("#s3bucket").html('Feb-2016');
                $('#s3breadcrum').html("<li data-chart='Monthly'><i class='fa fa-sitemap'></i><a href='#'>2015-2016</a><i class='fa fa-angle-right'></i></li><li data-chart='Daily'><a href='#'>Feb-2016</a></li>");
                DrawVerticalBarDrill(controlID, s3BucketDaily);
            }

        });
        return chart;
    });
}
function DrawVerticalBarDrill1(controlID, data) {
    nv.addGraph(function () {

        var values = [];
        $.each(data[0]['values'], function (index, item) {
            var value = parseFloat(item['value']);
            values.push(value);
        });
        var tollernceminper = 0.1;
        var tollerncemaxper = 0.01;
        var max = Math.max.apply(Math, values);
        var min = Math.min.apply(Math, values);
        var tollerancemin = min * tollernceminper;
        var tollerancemax = max * tollerncemaxper;
        var maxY = max + tollerancemax;
        var minY = min - tollerancemin;

        var chart = nv.models.discreteBarChart()
      .x(function (d) { return d.label })
      .y(function (d) { return d.value })
      .staggerLabels(false)
      .margin({ top: 15, right: 30, bottom: 60, left: 80 })
        //.staggerLabels(historicalBarChart[0].values.length > 8)
      .tooltips(true)
        // .color(['#1F8BCA'])
      .showValues(false)
      .forceY([minY, maxY])
       .tooltipContent(function (key, x, y, e, graph) {
           _selectedseries = x;
           return '<h3>' + key + '</h3>' +
           '<p>' + y + ' on ' + x + '</p>'
       })
      .transitionDuration(250);
        chart.yAxis.axisLabel("Amount ($)").tickFormat(function (f) { return "" + f.toFixed(0) + " $"; });
        var formatter;
        formatter = function (d, i) {
            return d;
        }
        chart.xAxis.axisLabel("Category")
        .tickFormat(formatter);
        d3.select('#' + controlID)
      .datum(data)
      .call(chart);
        nv.utils.windowResize(chart.update);

        $(".nv-bar").click(function () {
            if (_selectedseries == "Feb-2016") {
                $("#s3bucket").html('Feb-2016');
                $('#s3breadcrum').html("<li data-chart='Monthly'><i class='fa fa-sitemap'></i><a href='#'>2015-2016</a><i class='fa fa-angle-right'></i></li><li data-chart='Daily'><a href='#'>Feb-2016</a></li>");
                DrawVerticalBarDrill(controlID, s3BucketDaily);
            }

        });
        return chart;
    });
}

