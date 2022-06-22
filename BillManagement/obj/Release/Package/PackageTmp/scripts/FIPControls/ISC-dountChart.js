

function Get_DonutChart(ChartID) {
    var Data_PieChart = [
    {
        key: "TM",
        y: 10

    },
    {
        key: "CRM",
        y: 20

    },
    {
        key: "PST",
        y: 40

    },
    {
        key: "FMLA",
        y: 10

    },
    {
        key: "Spend",
        y: 20

    }
    ];


    nv.addGraph(function () {
        //        var width = 300,
        //        height = 280;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        // .margin({ top: 50, right: 5, bottom: 50, left: 5 })
         .donut(true)
        .color(['#EF7F67', '#aaa', '#5fba50', '#ffc23e', '#19ccff'])
        //.width(width)
        // .height(height);
        chart.showLegend(false);
        //  chart.donutRatio(donutRatio = 1.3)
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on July 29, 2018</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_PieChart, key, x, y) + '">' + x + ' on' + " " + key + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        d3.select("#" + ChartID + "")
          .datum(Data_PieChart)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
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
//FIP Controls



function Get_DonutChartTypeOut(ChartID) {
    var Data_PieChart = [
    {
        key: "Paid",
        y: 318

    },
    {
        key: "Taxes",
        y: 91

    },
    {
        key: "Deductions ",
        y: 170

    },
    {
        key: "Benefits ",
        y: 224

    }
    ];

    nv.addGraph(function () {
        //        var width = 500,
        //        height = 200;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
      .margin({ top: -10, right: 70, bottom: 30, left: 60 })
         .donut(true)
         .donutLabelsOutside(true)
        .color(['#b9b9b9', '#FFBB43', '#00a198', '#4FCC73'])
        //        .width(width)
        //.height(250);

        chart.showLegend(false);
        chart.labelType(false);
        chart.defaultState(false);
        //  chart.donutRatio(donutRatio = 0.15)
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on July 29, 2018</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_PieChart, key, x, y) + '">' + x + ' on' + " " + key + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select("#" + ChartID + "")
          .datum(Data_PieChart)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
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

//purchase donut
function Get_DonutChartTypeOut12(ChartID) {
    var Data_PieChart = [
    {
        key: "Year",
        y: 318

    },
    {
        key: "Division",
        y: 91

    },
    {
        key: "Amount",
        y: 170

    },
  
    ];

    nv.addGraph(function () {
        //        var width = 500,
        //        height = 200;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
      .margin({ top: -10, right: 70, bottom: 30, left: 60 })
         .donut(true)
         .donutLabelsOutside(true)
        .color([ '#FFBB43', '#00a198', '#4FCC73'])
        //        .width(width)
        //.height(250);

        chart.showLegend(false);
        chart.labelType(false);
        chart.defaultState(false);
        //  chart.donutRatio(donutRatio = 0.15)
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on July 29, 2018</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_PieChart, key, x, y) + '">' + x + ' on' + " " + key + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select("#" + ChartID + "")
          .datum(Data_PieChart)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
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
//Donut ChartIn

function Get_DonutChartIn(ChartID) {
    var Data_PieChart = [
    {
        key: "TM",
        y: 10

    },
    {
        key: "CRM",
        y: 20

    },
    {
        key: "PST",
        y: 40

    },
    {
        key: "FMLA",
        y: 10

    }
    ];

    nv.addGraph(function () {
        //        var width = 500,
        //        height = 200;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        //  .margin({ top: 5, right: 60, bottom: 5, left: 70 })
         .donut(true)
         .donutLabelsOutside(false)
        .color(['#F45B5B', '#7798BF', '#AAEEEE', '#2B908F']);
        //        .width(width)
        //        .height(height);


        chart.showLegend(false);
        //  chart.donutRatio(donutRatio = 0.15)
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on July 29, 2018</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_PieChart, key, x, y) + '">' + x + ' on' + " " + key + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select("#" + ChartID + "")
          .datum(Data_PieChart)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
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
//Donut chart3

function Get_DonutChart3(ChartID) {
    var Data_PieChart3 = [
    {
        key: "TM",
        y: 10

    },
    {
        key: "CRM",
        y: 20

    },
    {
        key: "PST",
        y: 40

    },
    {
        key: "FMLA",
        y: 10

    },
    {
        key: "Spend",
        y: 20

    }
    ];

    nv.addGraph(function () {
        //        var width = 500,
        //        height = 200;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        //.margin({ top: 5, right: 70, bottom: 5, left: 60 })
         .donut(true)
         .donutLabelsOutside(true)
        .color(['#E96955', '#FFC23E', '#5CA733', '#5FBA50', '#26A7DD']);
        //        .width(width)
        //        .height(height);
        chart.showLegend(false);
        chart.labelType(labelType = "percent");
        //  chart.donutRatio(donutRatio = 0.7)
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on July 29, 2018</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_PieChart3, key, x, y) + '">' + x + ' on' + " " + key + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select("#" + ChartID + "")
          .datum(Data_PieChart3)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
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
//Type4
function Get_DonutChart4(ChartID) {
    var Data_PieChart = [
    {
        key: "TM",
        y: 10

    },
    {
        key: "CRM",
        y: 20

    }
    ];

    nv.addGraph(function () {
        //        var width = 500,
        //        height = 200;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        //.margin({ top: 5, right: 70, bottom: 5, left: 60 })
         .donut(true)
         .donutLabelsOutside(true)
        .color(['#FE9900', '#DC3811'])
        //        .width(width)
        //        .height(height);
        chart.showLegend(false);
        chart.labelType(labelType = "percent");
        chart.donutRatio(donutRatio = 0.2)

        chart.defaultState(false);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on July 29, 2018</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_PieChart, key, x, y) + '">' + x + ' on' + " " + key + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select("#" + ChartID + "")
          .datum(Data_PieChart)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
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
function Get_DonutChart5(ChartID) {
    var Data_PieChart3 = [
    {
        key: "TM",
        y: 10

    },
    {
        key: "CRM",
        y: 20

    },
    {
        key: "PST",
        y: 40

    },
    {
        key: "FMLA",
        y: 10

    },
    {
        key: "Spend",
        y: 20

    }
    ];

    nv.addGraph(function () {
        //        var width = 500,
        //        height = 200;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
      // .margin({ top: 5, right: 70, bottom: 5, left: 60 })
         .donut(true)
         .donutLabelsOutside(true)
        .color(['#F45B5B', '#7798BF', '#AAEEEE', '#2B908F', '#90EE7E'])
        //        .width(width)
        //        .height(height);
        chart.showLegend(false);
        chart.labelType(labelType = "value");
        chart.donutRatio(donutRatio = 0.5)
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on July 29, 2018</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_PieChart3, key, x, y) + '">' + x + ' on' + " " + key + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select("#" + ChartID + "")
          .datum(Data_PieChart3)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
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
//Type6
function Get_DonutChart6(ChartID) {
    var Data_PieChart = [
    {
        key: "TM",
        y: 10

    },
    {
        key: "CRM",
        y: 20

    }
    ];

    nv.addGraph(function () {
        //        var width = 500,
        //        height = 200;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
       // .margin({ top: 5, right: 70, bottom: 5, left: 60 })
         .donut(true)
         .donutLabelsOutside(false)
        .color(['#F45B5B', '#024F9D'])
        //        .width(width)
        //        .height(height);
        chart.showLegend(false);
        chart.labelType(labelType = "value");
        chart.donutRatio(donutRatio = 0.5)

        chart.defaultState(false);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on July 29, 2018</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_PieChart, key, x, y) + '">' + x + ' on' + " " + key + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select("#" + ChartID + "")
          .datum(Data_PieChart)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
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
//7
function Get_DonutChart7(ChartID) {
    var Data_PieChart3 = [
    {
        key: "TM (10)",
        y: 10

    },
    {
        key: "CRM (20)",
        y: 20

    },
    {
        key: "PST (40)",
        y: 40

    },
    {
        key: "FMLA (10)",
        y: 10

    }
    ];

    nv.addGraph(function () {
        //        var width = 500,
        //        height = 150;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
       //.margin({ top: 5, right: 70, bottom: 5, left: 60 })
         .donut(true)
         .donutLabelsOutside(true)
        .color(['#7DA1D1', '#63A01F', '#26A7DD', '#FFC23E'])
        //        .width(width)
        //        .height(height);
        chart.showLegend(false);
        chart.showLabels(true);
        chart.labelType(labelType = "key");
        chart.donutRatio(donutRatio = 0.1)

        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on July 29, 2018</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_PieChart3, key, x, y) + '">' + x + ' on' + " " + key + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select("#" + ChartID + "")
          .datum(Data_PieChart3)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
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
//Type8
function Get_DonutChart8(ChartID) {
    var Data_PieChart = [
    {
        key: "TM (10)",
        y: 10

    },
    {
        key: "CRM (20)",
        y: 20

    }
    ];

    nv.addGraph(function () {
        //        var width = 500,
        //        height = 150;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
       // .margin({ top: 5, right: 70, bottom: 5, left: 60 })
         .donut(true)
         .donutLabelsOutside(false)
        .color(['#F25453', '#94AE0A'])
        //        .width(width)
        //        .height(height);
        chart.showLegend(true);
        chart.showLabels(false);
        chart.labelType(labelType = "value");
        chart.donutRatio(donutRatio = 0.7)

        chart.defaultState(false);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on July 29, 2018</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_PieChart, key, x, y) + '">' + x + ' on' + " " + key + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select("#" + ChartID + "")
          .datum(Data_PieChart)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
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

//Analytical report

function Get_DonutChartInAnalytical(ChartID) {
    var Data_PieChartAnalytical = [
    {
        key: "Year",
        y: 222

    },
    {
        key: "Division ",
        y: 185

    },
    {
        key: "Amount",
        y: 165

    },
   
    ];

    nv.addGraph(function () {
        // var width = 500,
        //  height = 190;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
     // .margin({ top: 5, right: 220, bottom: 5, left: 10 })
         .donut(true)
         .donutLabelsOutside(false)
        .color(['#FFC23E', '#5FBA50', '#26A7DD'])
        // .width(width)
        // .height(height);


        chart.showLegend(false);
        chart.donutRatio(donutRatio = 0.3)

        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on July 29, 2018</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_PieChartAnalytical, key, x, y) + '">' + x + ' on' + " " + key + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select("#" + ChartID + "")
          .datum(Data_PieChartAnalytical)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
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

//KPITile

function Get_DonutChartKPITile(ChartID) {


    var Data_DonutChartKPITile = [
    {
        key: "TM",
        y: 222

    },
    {
        key: "CRM",
        y: 185

    },
    {
        key: "PST",
        y: 165

    },
    {
        key: "FMLA",
        y: 142

    }
    ];

    nv.addGraph(function () {
        var width = 500,
        height = 220;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
      .margin({ top: 5, right: 300, bottom: 25, left: 10 })
         .donut(true)
         .donutLabelsOutside(false)
        .color(['#1da4dc', '#4cb23c', '#e3de4d', '#e14d57'])
        .width(width)
        .height(height);


        chart.showLegend(false);
        chart.donutRatio(donutRatio = 0.15)
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on July 29, 2018</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_DonutChartKPITile, key, x, y) + '">' + x + ' on' + " " + key + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select("#" + ChartID + "")
          .datum(Data_DonutChartKPITile)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
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

//Admissions

function Get_DonutChartAdmissions(ChartID) {
    var Data_PieChart3 = [
    {
        key: "TM",
        y: 10

    },
    {
        key: "CRM",
        y: 20

    },
    {
        key: "PST",
        y: 40

    },
    {
        key: "FMLA",
        y: 10

    },
    {
        key: "Spend",
        y: 20

    }
    ];

    nv.addGraph(function () {
        var width = 400,
        height = 150;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
       .margin({ top: 5, right: 70, bottom: 5, left: 60 })
         .donut(true)
         .donutLabelsOutside(true)
        .color(['#F45B5B', '#7798BF', '#AAEEEE', '#2B908F', '#90EE7E'])
        .width(width)
        .height(height);
        chart.showLegend(false);
        chart.labelType(labelType = "percent");
        chart.donutRatio(donutRatio = 0.7)
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on July 29, 2018</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_PieChart3, key, x, y) + '">' + x + ' on' + " " + key + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select("#" + ChartID + "")
          .datum(Data_PieChart3)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
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

function drawProjection1positive(ChartID, data) {

    nv.addGraph(function () {
        var w = 150;
        var h = 150;
        var padding = 20;
        var color_hash = {
            0: ["As on date", "#01AFD4"],
            1: ["2016", "#5FBA50"]
        }
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
         .donut(true)
         .donutLabelsOutside(true)
       .color(['#01AFD4', '#5FBA50'])
        chart.showLegend(false);
        chart.labelType(labelType = "value");
        chart.defaultState(true);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1"></label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContentProjection(data, key, x, y) + '">$' + x + 'M on' + " " + key + '</label></div></div>'
        });
        var svg = d3.select("#" + ChartID + "");
        svg
          .datum(data)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });

        // add legend  
        var w = 150;
        var h = 150;
        var padding = 20;
        var color_hash = {
            0: ["As on date", "#01AFD4"],
            1: ["2016", "#5FBA50"]
        }
        var legend = svg.append("g")
	  .attr("class", "legend")
	  .attr("height", 100)
	  .attr("width", 100)
    .attr('transform', 'translate(175,50)')

        legend.selectAll('rect')
      .data(data)
      .enter()
      .append("rect")
	  .attr("x", w - 65)
      .attr("y", function (d, i) { return i * 20; })
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function (d) {
	      var color = color_hash[data.indexOf(d)][1];
	      return color;
	  })
        legend.selectAll('text')
      .data(data)
      .enter()
      .append("text")
	  .attr("x", w - 52)
      .attr("y", function (d, i) { return i * 20 + 9; })
	  .text(function (d) {
	      var text = color_hash[data.indexOf(d)][0];
	      return text;
	  });
        nv.utils.windowResize(chart.update);
        return chart;
    });
}


function drawProjection1negative(ChartID, data) {
    nv.addGraph(function () {
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
         .donut(true)
         .donutLabelsOutside(true)
       .color(['#01AFD4', '#F16B50'])
        chart.showLegend(false);
        chart.labelType(labelType = "value");
        chart.defaultState(false);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1"></label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContentProjection(data, key, x, y) + '">$' + x + 'M on' + " " + key + '</label></div></div>'
        });
        var svg = d3.select("#" + ChartID + "");
        svg
          .datum(data)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
        nv.utils.windowResize(chart.update);
        // add legend  
        var w = 150;
        var h = 150;
        var padding = 20;
        var color_hash = {
            0: ["As on date", "#01AFD4"],
            1: ["2016", "#F16B50"]
        }
        var legend = svg.append("g")
	  .attr("class", "legend")
	  .attr("height", 100)
	  .attr("width", 100)
    .attr('transform', 'translate(175,50)')

        legend.selectAll('rect')
      .data(data)
      .enter()
      .append("rect")
	  .attr("x", w - 65)
      .attr("y", function (d, i) { return i * 20; })
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function (d) {
	      var color = color_hash[data.indexOf(d)][1];
	      return color;
	  })
        legend.selectAll('text')
      .data(data)
      .enter()
      .append("text")
	  .attr("x", w - 52)
      .attr("y", function (d, i) { return i * 20 + 9; })
	  .text(function (d) {
	      var text = color_hash[data.indexOf(d)][0];
	      return text;
	  });
        return chart;
    });
}

function ToolTipContentProjection(data, key, x, y) {
    var color = "";
    var _temp = [];
    $.each(data, function (index, item) {
        if (item.key == key) {
            color = item.color;
        }
    });
    return color;
}
//Pie  Chart Custom Set Home screen overallstatus 
function drawPieChartOverallStatus(ChartID, data) {

    nv.addGraph(function () {
        var w = 600;
        var h = 250;
        var padding = 0;
        var color_hash = {
            0: ["Build Success", "#31B2B1"],
            1: ["Build Failure", "#E4B34A"],
            2: ["Deployment Success", "#D16056"],
            3: ["Deployment Failure", "#6FB979"]
        }
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        .margin({ top: 0, right: 0, bottom: 20, left: 10 })
         .donut(false)
         .donutLabelsOutside(true)
       .color(['#31B2B1', '#E4B34A', '#D16056', '#6FB979'])
       .width(w)
        .height(h);
        chart.showLegend(false);
        chart.showLabels(false);
        chart.labelType(labelType = "value");
        chart.defaultState(true);
        chart.donutRatio(0.65);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1"></label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContentProjection(data, key, x, y) + '">' + x + '% on' + " " + key + '</label></div></div>'
        });
        chart.donutRatio(0.60)
        var svg = d3.select("#" + ChartID + "");
        svg
          .datum(data)
          .attr('transform', 'translate(0,0)')
            .attr("width", w)
          .attr("height", h)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });

        // add legend  
        var w = 100;
        var h = 150;
        var padding = 0;
        var color_hash = {
            0: ["Build Success", "#31B2B1 "],
            1: ["Build Failure", "#E4B34A"],
            2: ["Deployment Success", "#D16056"],
            3: ["Deployment Failure", "#6FB979"]
        }
        var legend = svg.append("g")
	  .attr("class", "legend")
	  .attr("height", 200)
	  .attr("width", 200)
    .attr('transform', 'translate(375,80)')

        legend.selectAll('rect')
      .data(data)
      .enter()
      .append("rect")
	  .attr("x", w - 65)
      .attr("y", function (d, i) { return i * 30; })
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function (d) {
	      var color = color_hash[data.indexOf(d)][1];
	      return color;
	  })
        legend.selectAll('text')

      .data(data)
      .enter()
      .append("text")
      .attr("class", "legend-text")
	  .attr("x", w - 52)
      .attr("y", function (d, i) { return i * 30 + 9; })
      .style("fill", function (d) {
          var color = color_hash[data.indexOf(d)][1];
          return color;
      })
	  .text(function (d) {
	      var text = color_hash[data.indexOf(d)][0];
	      return text;
	  });


        var centertext = svg.append("g")
        .attr("class", "centertext")
        .attr("height", 100)
        .attr("width", 50)
      .attr('transform', 'translate(245,110)')

        centertext
        .append("text")
        .attr("x", w - 52)
        .attr("y", function (d, i) { return i * 20 + 9; })
        //.text(function (d) {
        //    var text = "100%";
        //    return text;
        //});


        nv.utils.windowResize(chart.update);
        return chart;
    });
}

function drawPieChartOverallStatuss1(ChartID, data) {

    nv.addGraph(function () {
        var w = 600;
        var h = 250;
        var padding = 0;
        var color_hash = {
            0: ["Build Success", "#31B2B1"],
            1: ["Build Failure", "#E4B34A"],
            2: ["Deployment Success", "#D16056"],
            3: ["Deployment Failure", "#6FB979"]
        }
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        .margin({ top: 0, right: 0, bottom: 20, left: 10 })
         .donut(false)
         .donutLabelsOutside(true)
       .color(['#31B2B1', '#E4B34A', '#D16056', '#6FB979'])
       .width(w)
        .height(h);
        chart.showLegend(false);
        chart.showLabels(false);
        chart.labelType(labelType = "value");
        chart.defaultState(true);
        chart.donutRatio(0.65);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1"></label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContentProjection(data, key, x, y) + '">' + x + '% on' + " " + key + '</label></div></div>'
        });
        chart.donutRatio(0.60)
        var svg = d3.select("#" + ChartID + "");
        svg
          .datum(data)
          .attr('transform', 'translate(0,0)')
            .attr("width", w)
          .attr("height", h)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });

        // add legend  
        var w = 100;
        var h = 150;
        var padding = 0;
        var color_hash = {
            0: ["Build Success", "#31B2B1 "],
            1: ["Build Failure", "#E4B34A"],
            2: ["Deployment Success", "#D16056"],
            3: ["Deployment Failure", "#6FB979"]
        }
        var legend = svg.append("g")
	  .attr("class", "legend")
	  .attr("height", 200)
	  .attr("width", 200)
    .attr('transform', 'translate(375,80)')

        legend.selectAll('rect')
      .data(data)
      .enter()
      .append("rect")
	  .attr("x", w - 65)
      .attr("y", function (d, i) { return i * 30; })
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function (d) {
	      var color = color_hash[data.indexOf(d)][1];
	      return color;
	  })
        legend.selectAll('text')

      .data(data)
      .enter()
      .append("text")
      .attr("class", "legend-text")
	  .attr("x", w - 52)
      .attr("y", function (d, i) { return i * 30 + 9; })
      .style("fill", function (d) {
          var color = color_hash[data.indexOf(d)][1];
          return color;
      })
	  .text(function (d) {
	      var text = color_hash[data.indexOf(d)][0];
	      return text;
	  });


        var centertext = svg.append("g")
        .attr("class", "centertext")
        .attr("height", 100)
        .attr("width", 50)
      .attr('transform', 'translate(245,110)')

        centertext
        .append("text")
        .attr("x", w - 52)
        .attr("y", function (d, i) { return i * 20 + 9; })
        //.text(function (d) {
        //    var text = "100%";
        //    return text;
        //});


        nv.utils.windowResize(chart.update);
        return chart;
    });
}
function drawPieChartOverallStatuss2(ChartID, data) {

    nv.addGraph(function () {
        var w = 600;
        var h = 250;
        var padding = 0;
        var color_hash = {
            0: ["Build Success", "#31B2B1 "],
            1: ["Build Failure", "#E4B34A"],
            2: ["Deployment Success", "#D16056"],
            3: ["Deployment Failure", "#6FB979"]
        }
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        .margin({ top: 0, right: 0, bottom: 20, left: 10 })
         .donut(false)
         .donutLabelsOutside(true)
       .color(['#31B2B1', '#E4B34A', '#D16056', '#6FB979'])
       .width(w)
        .height(h);
        chart.showLegend(false);
        chart.showLabels(false);
        chart.labelType(labelType = "value");
        chart.defaultState(true);
        chart.donutRatio(0.65);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1"></label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContentProjection(data, key, x, y) + '">' + x + '% on' + " " + key + '</label></div></div>'
        });
        chart.donutRatio(0.60)
        var svg = d3.select("#" + ChartID + "");
        svg
          .datum(data)
          .attr('transform', 'translate(0,0)')
            .attr("width", w)
          .attr("height", h)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });

        // add legend  
        var w = 100;
        var h = 150;
        var padding = 0;
        var color_hash = {
            0: ["Build Success", "#31B2B1"],
            1: ["Build Failure", "#E4B34A"],
            2: ["Deployment Success", "#D16056"],
            3: ["Deployment Failure", "#6FB979"]
        }
        var legend = svg.append("g")
	  .attr("class", "legend")
	  .attr("height", 200)
	  .attr("width", 200)
    .attr('transform', 'translate(375,80)')

        legend.selectAll('rect')
      .data(data)
      .enter()
      .append("rect")
	  .attr("x", w - 65)
      .attr("y", function (d, i) { return i * 30; })
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function (d) {
	      var color = color_hash[data.indexOf(d)][1];
	      return color;
	  })
        legend.selectAll('text')

      .data(data)
      .enter()
      .append("text")
      .attr("class", "legend-text")
	  .attr("x", w - 52)
      .attr("y", function (d, i) { return i * 30 + 9; })
      .style("fill", function (d) {
          var color = color_hash[data.indexOf(d)][1];
          return color;
      })
	  .text(function (d) {
	      var text = color_hash[data.indexOf(d)][0];
	      return text;
	  });


        var centertext = svg.append("g")
        .attr("class", "centertext")
        .attr("height", 100)
        .attr("width", 50)
      .attr('transform', 'translate(245,110)')

        centertext
        .append("text")
        .attr("x", w - 52)
        .attr("y", function (d, i) { return i * 20 + 9; })
        //.text(function (d) {
        //    var text = "100%";
        //    return text;
        //});


        nv.utils.windowResize(chart.update);
        return chart;
    });
}
function drawPieChartOverallStatuss3(ChartID, data) {

    nv.addGraph(function () {
        var w = 600;
        var h = 250;
        var padding = 0;
        var color_hash = {
            0: ["Build Success", "#31B2B1 "],
            1: ["Build Failure", "#E4B34A"],
            2: ["Deployment Success", "#D16056"],
            3: ["Deployment Failure", "#6FB979"]
        }
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        .margin({ top: 0, right: 0, bottom: 20, left: 10 })
         .donut(false)
         .donutLabelsOutside(true)
       .color(['#31B2B1', '#E4B34A', '#D16056', '#6FB979'])
       .width(w)
        .height(h);
        chart.showLegend(false);
        chart.showLabels(false);
        chart.labelType(labelType = "value");
        chart.defaultState(true);
        chart.donutRatio(0.65);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1"></label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContentProjection(data, key, x, y) + '">' + x + '% on' + " " + key + '</label></div></div>'
        });
        chart.donutRatio(0.60)
        var svg = d3.select("#" + ChartID + "");
        svg
          .datum(data)
          .attr('transform', 'translate(0,0)')
            .attr("width", w)
          .attr("height", h)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });

        // add legend  
        var w = 100;
        var h = 150;
        var padding = 0;
        var color_hash = {
            0: ["Build Success", "#31B2B1 "],
            1: ["Build Failure", "#E4B34A"],
            2: ["Deployment Success", "#D16056"],
            3: ["Deployment Failure", "#6FB979"]
        }
        var legend = svg.append("g")
	  .attr("class", "legend")
	  .attr("height", 200)
	  .attr("width", 200)
    .attr('transform', 'translate(375,80)')

        legend.selectAll('rect')
      .data(data)
      .enter()
      .append("rect")
	  .attr("x", w - 65)
      .attr("y", function (d, i) { return i * 30; })
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function (d) {
	      var color = color_hash[data.indexOf(d)][1];
	      return color;
	  })
        legend.selectAll('text')

      .data(data)
      .enter()
      .append("text")
      .attr("class", "legend-text")
	  .attr("x", w - 52)
      .attr("y", function (d, i) { return i * 30 + 9; })
      .style("fill", function (d) {
          var color = color_hash[data.indexOf(d)][1];
          return color;
      })
	  .text(function (d) {
	      var text = color_hash[data.indexOf(d)][0];
	      return text;
	  });


        var centertext = svg.append("g")
        .attr("class", "centertext")
        .attr("height", 100)
        .attr("width", 50)
      .attr('transform', 'translate(245,110)')

        centertext
        .append("text")
        .attr("x", w - 52)
        .attr("y", function (d, i) { return i * 20 + 9; })
        //.text(function (d) {
        //    var text = "100%";
        //    return text;
        //});


        nv.utils.windowResize(chart.update);
        return chart;
    });
}
function drawPieChartOverallStatuss4(ChartID, data) {

    nv.addGraph(function () {
        var w = 600;
        var h = 250;
        var padding = 0;
        var color_hash = {
            0: ["Build Success", "#31B2B1 "],
            1: ["Build Failure", "#E4B34A"],
            2: ["Deployment Success", "#D16056"],
            3: ["Deployment Failure", "#6FB979"]
        }
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        .margin({ top: 0, right: 0, bottom: 20, left: 10 })
         .donut(false)
         .donutLabelsOutside(true)
       .color(['#31B2B1', '#E4B34A', '#D16056', '#6FB979'])
       .width(w)
        .height(h);
        chart.showLegend(false);
        chart.showLabels(false);
        chart.labelType(labelType = "value");
        chart.defaultState(true);
        chart.donutRatio(0.65);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1"></label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContentProjection(data, key, x, y) + '">' + x + '% on' + " " + key + '</label></div></div>'
        });
        chart.donutRatio(0.60)
        var svg = d3.select("#" + ChartID + "");
        svg
          .datum(data)
          .attr('transform', 'translate(0,0)')
            .attr("width", w)
          .attr("height", h)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });

        // add legend  
        var w = 100;
        var h = 150;
        var padding = 0;
        var color_hash = {
            0: ["Build Success", "#31B2B1 "],
            1: ["Build Failure", "#E4B34A"],
            2: ["Deployment Success", "#D16056"],
            3: ["Deployment Failure", "#6FB979"]
        }
        var legend = svg.append("g")
	  .attr("class", "legend")
	  .attr("height", 200)
	  .attr("width", 200)
    .attr('transform', 'translate(375,80)')

        legend.selectAll('rect')
      .data(data)
      .enter()
      .append("rect")
	  .attr("x", w - 65)
      .attr("y", function (d, i) { return i * 30; })
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function (d) {
	      var color = color_hash[data.indexOf(d)][1];
	      return color;
	  })
        legend.selectAll('text')

      .data(data)
      .enter()
      .append("text")
      .attr("class", "legend-text")
	  .attr("x", w - 52)
      .attr("y", function (d, i) { return i * 30 + 9; })
      .style("fill", function (d) {
          var color = color_hash[data.indexOf(d)][1];
          return color;
      })
	  .text(function (d) {
	      var text = color_hash[data.indexOf(d)][0];
	      return text;
	  });


        var centertext = svg.append("g")
        .attr("class", "centertext")
        .attr("height", 100)
        .attr("width", 50)
      .attr('transform', 'translate(245,110)')

        centertext
        .append("text")
        .attr("x", w - 52)
        .attr("y", function (d, i) { return i * 20 + 9; })
        //.text(function (d) {
        //    var text = "100%";
        //    return text;
        //});


        nv.utils.windowResize(chart.update);
        return chart;
    });
}
//Piechart overall method
function drawPieChartOverall(ChartID, data) {

    nv.addGraph(function () {
        var w = 200;
        var h = 200;
        var padding = 0;
        var color_hash = {
            0: ["Build Success", "#31B2B1 "],
            1: ["Build Failure", "#E4B34A"],
            2: ["Deployment Success", "#D16056"],
            3: ["Deployment Failure", "#6FB979"]

        }
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        .margin({ top: 0, right: 0, bottom: 20, left: 10 })
         .donut(false)
         .donutLabelsOutside(true)
       .color(['#31B2B1', '#E4B34A', '#D16056', '#6FB979'])
       .width(w)
        .height(h);
        chart.showLegend(false);
        chart.showLabels(false);
        chart.labelType(labelType = "value");
        chart.defaultState(true);
        chart.donutRatio(0.65);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1"></label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContentProjection(data, key, x, y) + '">' + x + '% on' + " " + key + '</label></div></div>'
        });
        chart.donutRatio(0.60)
        var svg = d3.select("#" + ChartID + "");
        svg
          .datum(data)
          .attr('transform', 'translate(20,0)')
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });

        // add legend  
        var w = 100;
        var h = 150;
        var padding = 0;
        var color_hash = {
            0: ["Build Success", "#31B2B1 "],
            1: ["Build Failure", "#E4B34A"],
            2: ["Deployment Success", "#D16056"],
            3: ["Deployment Failure", "#6FB979"]
        }
        var legend = svg.append("g")
	  .attr("class", "legend")
	  .attr("height", 200)
	  .attr("width", 200)
    .attr('transform', 'translate(190,50)')

        legend.selectAll('rect')
      .data(data)
      .enter()
      .append("rect")
	  .attr("x", w - 65)
      .attr("y", function (d, i) { return i * 25; })
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function (d) {
	      var color = color_hash[data.indexOf(d)][1];
	      return color;
	  })
        legend.selectAll('text')

      .data(data)
      .enter()
      .append("text")
      .attr("class", "legend-text")
	  .attr("x", w - 52)
      .attr("y", function (d, i) { return i * 25 + 9; })
      .style("fill", function (d) {
          var color = color_hash[data.indexOf(d)][1];
          return color;
      })
	  .text(function (d) {
	      var text = color_hash[data.indexOf(d)][0];
	      return text;
	  });


        var centertext = svg.append("g")
        .attr("class", "centertext")
        .attr("height", 100)
        .attr("width", 50)
      .attr('transform', 'translate(40,85)')

        centertext
        .append("text")
        .attr("x", w - 52)
        .attr("y", function (d, i) { return i * 20 + 9; })
        .text(function (d) {
            var text = "100%";
            return text;
        });


        nv.utils.windowResize(chart.update);
        return chart;
    });
}
//Piechart Internal Chart methods
function drawPieChartInternal(ChartID, data) {

    nv.addGraph(function () {
        var w = 600;
        var h = 250;
        var padding = 0;
        var color_hash = {
            0: ["Yet to Start", "#FC6E17 "],
            1: ["In Progress  ", "#73A140"],
            2: ["Completed ", "#00AFBD"],
            3: ["Hold", "#ff8080"]
        }
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        .margin({ top: 0, right: 0, bottom: 20, left: 10 })
         .donut(false)
         .donutLabelsOutside(true)
       .color(['#FC6E17', '#73A140', '#00AFBD', '#ff8080'])
       .width(w)
        .height(h);
        chart.showLegend(false);
        chart.showLabels(false);
        chart.labelType(labelType = "value");
        chart.defaultState(true);
        chart.donutRatio(0.65);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1"></label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContentProjection(data, key, x, y) + '">' + x + '% on' + " " + key + '</label></div></div>'
        });
        chart.donutRatio(0.60)
        var svg = d3.select("#" + ChartID + "");
        svg
          .datum(data)
          .attr('transform', 'translate(0,0)')
            .attr("width", w)
          .attr("height", h)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });

        // add legend  
        var w = 100;
        var h = 150;
        var padding = 0;
        var color_hash = {
            0: ["Yet to Start (30)", "#FC6E17 "],
            1: ["In Progress  (20)", "#73A140"],
            2: ["Completed (40)", "#00AFBD"],
            3: ["Hold (10)", "#ff8080"]
        }
        var legend = svg.append("g")
	  .attr("class", "legend")
	  .attr("height", 200)
	  .attr("width", 200)
    .attr('transform', 'translate(400,75)')

        legend.selectAll('rect')
      .data(data)
      .enter()
      .append("rect")
	  .attr("x", w - 65)
      .attr("y", function (d, i) { return i * 30; })
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function (d) {
	      var color = color_hash[data.indexOf(d)][1];
	      return color;
	  })
        legend.selectAll('text')

      .data(data)
      .enter()
      .append("text")
      .attr("class", "legend-text")
	  .attr("x", w - 52)
      .attr("y", function (d, i) { return i * 30 + 9; })
      .style("fill", function (d) {
          var color = color_hash[data.indexOf(d)][1];
          return color;
      })
	  .text(function (d) {
	      var text = color_hash[data.indexOf(d)][0];
	      return text;
	  });


        var centertext = svg.append("g")
        .attr("class", "centertext")
        .attr("height", 100)
        .attr("width", 50)
      .attr('transform', 'translate(245,110)')

        centertext
        .append("text")
        .attr("x", w - 52)
        .attr("y", function (d, i) { return i * 20 + 9; })
        //.text(function (d) {
        //    var text = "100%";
        //    return text;
        //});


        nv.utils.windowResize(chart.update);
        return chart;
    });
}
//Piechart External Chart methods
function drawPieChartExternal(ChartID, data) {

    nv.addGraph(function () {
        var w = 600;
        var h = 250;
        var padding = 0;
        var color_hash = {
            0: ["Waiting for approval", "#FC6E17 "],
            1: ["Overdue ", "#73A140"],
            2: ["Approved ", "#00AFBD"],
            3: ["Re-Requested", "#ff8080"]
        }
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        .margin({ top: 0, right: 0, bottom: 20, left: 10 })
         .donut(false)
         .donutLabelsOutside(true)
       .color(['#FC6E17', '#73A140', '#00AFBD', '#ff8080'])
       .width(w)
        .height(h);
        chart.showLegend(false);
        chart.showLabels(false);
        chart.labelType(labelType = "value");
        chart.defaultState(true);
        chart.donutRatio(0.65);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1"></label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContentProjection(data, key, x, y) + '">' + x + '% on' + " " + key + '</label></div></div>'
        });
        chart.donutRatio(0.60)
        var svg = d3.select("#" + ChartID + "");
        svg
          .datum(data)
          .attr('transform', 'translate(0,0)')
            .attr("width", w)
          .attr("height", h)
        .transition().duration(1200)
          .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });

        // add legend  
        var w = 100;
        var h = 150;
        var padding = 0;
        var color_hash = {
            0: ["Design (30)", "#FC6E17 "],
            1: ["Development (20)", "#73A140"],
            2: ["Discussion (40)", "#00AFBD"],
            3: ["POC (10)", "#ff8080"]
        }
        var legend = svg.append("g")
	  .attr("class", "legend")
	  .attr("height", 200)
	  .attr("width", 200)
    .attr('transform', 'translate(400,75)')

        legend.selectAll('rect')
      .data(data)
      .enter()
      .append("rect")
	  .attr("x", w - 65)
      .attr("y", function (d, i) { return i * 30; })
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function (d) {
	      var color = color_hash[data.indexOf(d)][1];
	      return color;
	  })
        legend.selectAll('text')

      .data(data)
      .enter()
      .append("text")
      .attr("class", "legend-text")
	  .attr("x", w - 52)
      .attr("y", function (d, i) { return i * 30 + 9; })
      .style("fill", function (d) {
          var color = color_hash[data.indexOf(d)][1];
          return color;
      })
	  .text(function (d) {
	      var text = color_hash[data.indexOf(d)][0];
	      return text;
	  });


        var centertext = svg.append("g")
        .attr("class", "centertext")
        .attr("height", 100)
        .attr("width", 50)
      .attr('transform', 'translate(245,110)')

        centertext
        .append("text")
        .attr("x", w - 52)
        .attr("y", function (d, i) { return i * 20 + 9; })
        //.text(function (d) {
        //    var text = "100%";
        //    return text;
        //});


        nv.utils.windowResize(chart.update);
        return chart;
    });
}