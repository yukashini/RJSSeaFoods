/// <reference path="../Internalplugin/jquery-1.8.3.min.js" />



function Get_LineChartAll(ChartID) {

    var Data_LineChart =
    [
      { "key": "TM", "values": [{ "x": 1, "y": 1 }, { "x": 2, "y": 5 }, { "x": 3, "y": 4 }, { "x": 4, "y": 5 }, { "x": 5, "y": 5}] },
      { "key": "CRM", "values": [{ "x": 1, "y": 11 }, { "x": 2, "y": 55 }, { "x": 3, "y": 44 }, { "x": 4, "y": 11 }, { "x": 5, "y": 33}] },
      { "key": "FMLA", "values": [{ "x": 1, "y": 1 }, { "x": 2, "y": 13 }, { "x": 3, "y": 15 }, { "x": 4, "y": 13 }, { "x": 5, "y": 12}] }
    ];

    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart().useInteractiveGuideline(true);

        chart
        .x(function (d, i) {
            return d.x;
        });

        if (auxOptions.width)
            chart.width(auxOptions.width);

        if (auxOptions.height)
            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([0]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            now = new Date(now); // + d * 86400 * 1000);
           
            return d;
        }

       // chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .tickFormat(
            formatter
          );

        chart.yAxis
        .axisLabel('')
        .tickFormat(d3.format(',.2f'));
        chart.showLegend(false);

        d3.select('#' + ChartID + ' ')
        .datum(Data_LineChart)
      .transition().duration(500)
        .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}

//1

function Get_LineChart1(ChartID) {


    var Data_LineChart1 =
    [
      { "key": "TM", "values": [{ "x": 1, "y": 1 }, { "x": 2, "y": 5 }, { "x": 3, "y": 4 }, { "x": 4, "y": 5 }, { "x": 5, "y": 5}] },
      { "key": "CRM", "values": [{ "x": 1, "y": 11 }, { "x": 2, "y": 55 }, { "x": 3, "y": 44 }, { "x": 4, "y": 11 }, { "x": 5, "y": 33}] },
      { "key": "FMLA", "values": [{ "x": 1, "y": 1 }, { "x": 2, "y": 13 }, { "x": 3, "y": 15 }, { "x": 4, "y": 13 }, { "x": 5, "y": 12}] }
    ];


    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart().useInteractiveGuideline(true);

        chart
        .x(function (d, i) {
            return d.x;
        });

        if (auxOptions.width)
            chart.width(auxOptions.width);

        if (auxOptions.height)
            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([0]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            now = new Date(now); // + d * 86400 * 1000);

            return d;
        }

      //  chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .tickFormat(
            formatter
          );

        chart.yAxis
        .axisLabel('')
        .tickFormat(d3.format(',.2f'));
        chart.showLegend(false);

        d3.select('#' + ChartID + ' ')
        .datum(Data_LineChart1)
      .transition().duration(500)
        .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}

//2

function Get_LineChart2(ChartID) {


    var Data_LineChart2 =
    [
      { "key": "TM", "values": [{ "x": 1, "y": 1 }, { "x": 2, "y": 5 }, { "x": 3, "y": 4 }, { "x": 4, "y": 5 }, { "x": 5, "y": 5}] },
      { "key": "CRM", "values": [{ "x": 1, "y": 11 }, { "x": 2, "y": 55 }, { "x": 3, "y": 44 }, { "x": 4, "y": 11 }, { "x": 5, "y": 33}] },
      { "key": "FMLA", "values": [{ "x": 1, "y": 1 }, { "x": 2, "y": 13 }, { "x": 3, "y": 15 }, { "x": 4, "y": 13 }, { "x": 5, "y": 12}] }
    ];




    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart().useInteractiveGuideline(true);

        chart
        .x(function (d, i) {
            return d.x;
        });

        if (auxOptions.width)
            chart.width(auxOptions.width);

        if (auxOptions.height)
            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([0]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            now = new Date(now); // + d * 86400 * 1000);

            return d;
        }

    //    chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .tickFormat(
            formatter
          );

        chart.yAxis
        .axisLabel('')
        .tickFormat(d3.format(',.2f'));
        chart.showLegend(false);

        d3.select('#' + ChartID + ' ')
        .datum(Data_LineChart2)
      .transition().duration(500)
        .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}

//Modal1

function Get_LineChartModal1(ChartID) {

    var data_PerformanceLoans = [{ "color": "#FCBE33", "key": "Draft Bills", "values": [{ "x": 0, "y": 2.3 }, { "x": 1, "y": 2.5 }, { "x": 2, "y": 2.2 }, { "x": 3, "y": 2.4 }, { "x": 4, "y": 2.7 }, { "x": 5, "y": 3 }, { "x": 6, "y": 2.3 }, { "x": 7, "y": 2.5 }, { "x": 8, "y": 2.7 }, { "x": 9, "y": 2.4 }, { "x": 10, "y": 2.1 }, { "x": 11, "y": 2.2 }] },
        { "color": "#ED5263", "key": "Rejected Bills", "values": [{ "x": 0, "y": 2.8 }, { "x": 1, "y": 2.1 }, { "x": 2, "y": 2.7 }, { "x": 3, "y": 2.5 }, { "x": 4, "y": 3.1 }, { "x": 5, "y": 2.6 }, { "x": 6, "y": 2.1 }, { "x": 7, "y": 2.7 }, { "x": 8, "y": 2 }, { "x": 9, "y": 1.5 }, { "x": 10, "y": 3.3 }, { "x": 11, "y": 1.2 }] },
                                 { "color": "#56B449", "key": "Approved Bills", "values": [{ "x": 0, "y": 2.2 }, { "x": 1, "y": 2.3 }, { "x": 2, "y": 2.4 }, { "x": 3, "y": 1.8 }, { "x": 4, "y": 2.3 }, { "x": 5, "y": 2.2 }, { "x": 6, "y": 2.4 }, { "x": 7, "y": 2.1 }, { "x": 8, "y": 2 }, { "x": 9, "y": 1.8 }, { "x": 10, "y": 2.3 }, { "x": 11, "y": 2.2 }] },
                                 
                                 ];

    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart()
         .interpolate("monotone") 
       // .height(300)
        .useInteractiveGuideline(true)
       // .margin({ top: 40, right: 50, bottom: 80, left: 120 });

        chart
        .x(function (d, i) {
            return d.x;
        });

//        if (auxOptions.width)
//            chart.width(auxOptions.width);

//        if (auxOptions.height)
//            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([0,4]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            //var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            // now = new Date(now); // + d * 86400 * 1000);

            return ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][d];
        }

    //    chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .tickFormat(
            formatter
          );

        chart.xAxis.axisLabel('Fiscal Year ').width(80);
        chart.yAxis.axisLabel('Delinquency Values ($ B)').axisLabelDistance(-80).width(0)
        .tickFormat(function (f) { return "$" + f + "B"; });
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-panel-s1"><img src="img/User-Img.png" class="tooltip-user-img-s1"><div class="tooltip-info-cell"><div class="tooltip-title-cell-s1">' +
                                    '<label class="label-tooltip-title-s1" style="color:' + ToolTipContent(data_PerformanceLoans, key, x, y) + '"> Name: <span>Nancy Davolio</span></label></div><label class="label-tooltip-title-s1"><span style="color:' + ToolTipContent(data_PerformanceLoans, key, x, y) + '">' + x + '</span></label>' +
                                '<label class="label-tooltip-title-s1"> New Patients: <span style="color:' + ToolTipContent(data_PerformanceLoans, key, x, y) + '">' + y + '</span></label></div></div>'
        });


        d3.select('#' + ChartID)
        .datum(data_PerformanceLoans)
      .transition().duration(500)
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

//Modal2
function Get_LineChartModal2(ChartID) {

    var data_PerformanceLoans = [{ "color": "#FCBE33", "key": "Challenged", "values": [{ "x": 0, "y": 2.3 }, { "x": 1, "y": 2.5 }, { "x": 2, "y": 2.2 }, { "x": 3, "y": 2.4 }, { "x": 4, "y": 2.7 }, { "x": 5, "y": 3 }, { "x": 6, "y": 2.3 }, { "x": 7, "y": 2.5 }, { "x": 8, "y": 2.7 }, { "x": 9, "y": 2.4 }, { "x": 10, "y": 2.1 }, { "x": 11, "y": 2.2 }] },
        { "color": "#009fe6", "key": "Pending", "values": [{ "x": 0, "y": 2.8 }, { "x": 1, "y": 2.1 }, { "x": 2, "y": 2.7 }, { "x": 3, "y": 2.5 }, { "x": 4, "y": 3.1 }, { "x": 5, "y": 2.6 }, { "x": 6, "y": 2.1 }, { "x": 7, "y": 2.7 }, { "x": 8, "y": 2 }, { "x": 9, "y": 1.5 }, { "x": 10, "y": 3.3 }, { "x": 11, "y": 1.2 }] },
                                 { "color": "#ED5263", "key": "Rejected", "values": [{ "x": 0, "y": 2.2 }, { "x": 1, "y": 2.3 }, { "x": 2, "y": 2.4 }, { "x": 3, "y": 1.8 }, { "x": 4, "y": 2.3 }, { "x": 5, "y": 2.2 }, { "x": 6, "y": 2.4 }, { "x": 7, "y": 2.1 }, { "x": 8, "y": 2 }, { "x": 9, "y": 1.8 }, { "x": 10, "y": 2.3 }, { "x": 11, "y": 2.2 }] },

    ];

    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart()
         .interpolate("monotone")
       // .height(300)
        .useInteractiveGuideline(true)
        // .margin({ top: 40, right: 50, bottom: 80, left: 120 });

        chart
        .x(function (d, i) {
            return d.x;
        });

        //        if (auxOptions.width)
        //            chart.width(auxOptions.width);

        //        if (auxOptions.height)
        //            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([0, 4]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            //var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            // now = new Date(now); // + d * 86400 * 1000);

            return ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][d];
        }

        //    chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .tickFormat(
            formatter
          );

        chart.xAxis.axisLabel('Fiscal Year ').width(80);
        chart.yAxis.axisLabel('Delinquency Values ($ B)').axisLabelDistance(-80).width(0)
        .tickFormat(function (f) { return "$" + f + "B"; });
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-panel-s1"><img src="img/User-Img.png" class="tooltip-user-img-s1"><div class="tooltip-info-cell"><div class="tooltip-title-cell-s1">' +
                                    '<label class="label-tooltip-title-s1" style="color:' + ToolTipContent(data_PerformanceLoans, key, x, y) + '"> Name: <span>Nancy Davolio</span></label></div><label class="label-tooltip-title-s1"><span style="color:' + ToolTipContent(data_PerformanceLoans, key, x, y) + '">' + x + '</span></label>' +
                                '<label class="label-tooltip-title-s1"> New Patients: <span style="color:' + ToolTipContent(data_PerformanceLoans, key, x, y) + '">' + y + '</span></label></div></div>'
        });


        d3.select('#' + ChartID)
        .datum(data_PerformanceLoans)
      .transition().duration(500)
       .call(chart);
        nv.utils.windowResize(chart.update);

        return chart;
    });
}
//Modal3
function Get_LineChartModal3(ChartID) {

    var data_PerformanceLoans = [{ "color": "#FCBE33", "key": "Outstanding Payments", "values": [{ "x": 0, "y": 2.3 }, { "x": 1, "y": 2.5 }, { "x": 2, "y": 2.2 }, { "x": 3, "y": 2.4 }, { "x": 4, "y": 2.7 }, { "x": 5, "y": 3 }, { "x": 6, "y": 2.3 }, { "x": 7, "y": 2.5 }, { "x": 8, "y": 2.7 }, { "x": 9, "y": 2.4 }, { "x": 10, "y": 2.1 }, { "x": 11, "y": 2.2 }] },
       
                                 { "color": "#ED5263", "key": "Overdue Payments", "values": [{ "x": 0, "y": 2.2 }, { "x": 1, "y": 2.3 }, { "x": 2, "y": 2.4 }, { "x": 3, "y": 1.8 }, { "x": 4, "y": 2.3 }, { "x": 5, "y": 2.2 }, { "x": 6, "y": 2.4 }, { "x": 7, "y": 2.1 }, { "x": 8, "y": 2 }, { "x": 9, "y": 1.8 }, { "x": 10, "y": 2.3 }, { "x": 11, "y": 2.2 }] },

    ];

    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart()
         .interpolate("monotone")
       // .height(300)
        .useInteractiveGuideline(true)
        // .margin({ top: 40, right: 50, bottom: 80, left: 120 });

        chart
        .x(function (d, i) {
            return d.x;
        });

        //        if (auxOptions.width)
        //            chart.width(auxOptions.width);

        //        if (auxOptions.height)
        //            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([0, 4]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            //var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            // now = new Date(now); // + d * 86400 * 1000);

            return ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][d];
        }

        //    chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .tickFormat(
            formatter
          );

        chart.xAxis.axisLabel('Fiscal Year ').width(80);
        chart.yAxis.axisLabel('Delinquency Values ($ B)').axisLabelDistance(-80).width(0)
        .tickFormat(function (f) { return "$" + f + "B"; });
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-panel-s1"><img src="img/User-Img.png" class="tooltip-user-img-s1"><div class="tooltip-info-cell"><div class="tooltip-title-cell-s1">' +
                                    '<label class="label-tooltip-title-s1" style="color:' + ToolTipContent(data_PerformanceLoans, key, x, y) + '"> Name: <span>Nancy Davolio</span></label></div><label class="label-tooltip-title-s1"><span style="color:' + ToolTipContent(data_PerformanceLoans, key, x, y) + '">' + x + '</span></label>' +
                                '<label class="label-tooltip-title-s1"> New Patients: <span style="color:' + ToolTipContent(data_PerformanceLoans, key, x, y) + '">' + y + '</span></label></div></div>'
        });


        d3.select('#' + ChartID)
        .datum(data_PerformanceLoans)
      .transition().duration(500)
       .call(chart);
        nv.utils.windowResize(chart.update);

        return chart;
    });
}
//Physician

function Get_LineChartPhysician(ChartID) {

    var data_PerformanceLoans = [{ "color": "#FCBE33", "key": "Hayden Finch", "values": [{ "x": 0, "y": 2.3 }, { "x": 1, "y": 2.5 }, { "x": 2, "y": 2.2 }, { "x": 3, "y": 2.4 }, { "x": 4, "y": 2.7 }, { "x": 5, "y": 3 }, { "x": 6, "y": 2.3 }, { "x": 7, "y": 2.5 }, { "x": 8, "y": 2.7 }, { "x": 9, "y": 2.4 }, { "x": 10, "y": 2.1 }, { "x": 11, "y": 2.2}] },
                                 { "color": "#56B449", "key": "Melissa Gough", "values": [{ "x": 0, "y": 2.2 }, { "x": 1, "y": 2.3 }, { "x": 2, "y": 2.4 }, { "x": 3, "y": 1.8 }, { "x": 4, "y": 2.3 }, { "x": 5, "y": 2.2 }, { "x": 6, "y": 2.4 }, { "x": 7, "y": 2.1 }, { "x": 8, "y": 2 }, { "x": 9, "y": 1.8 }, { "x": 10, "y": 2.3 }, { "x": 11, "y": 2.2}] },
                                 { "color": "#00A8DE", "key": "Daniel Health", "values": [{ "x": 0, "y": 2.1 }, { "x": 1, "y": 2.1 }, { "x": 2, "y": 2.3 }, { "x": 3, "y": 1.9 }, { "x": 4, "y": 1.8 }, { "x": 5, "y": 2 }, { "x": 6, "y": 1.9 }, { "x": 7, "y": 2.2 }, { "x": 8, "y": 1.9 }, { "x": 9, "y": 2.2 }, { "x": 10, "y": 2.4 }, { "x": 11, "y": 2.2}] },
                                 { "color": "#41CDB3", "key": "Skye Storey", "values": [{ "x": 0, "y": 2 }, { "x": 1, "y": 1.5 }, { "x": 2, "y": 3 }, { "x": 3, "y": 2.6 }, { "x": 4, "y": 2.2 }, { "x": 5, "y": 1.8 }, { "x": 6, "y": 1.8 }, { "x": 7, "y": 2.9 }, { "x": 8, "y": 2 }, { "x": 9, "y": 2.1 }, { "x": 10, "y": 1.8 }, { "x": 11, "y": 2.1}] },
                                 { "color": "#B27B76", "key": "Courtney Willis", "values": [{ "x": 0, "y": 2.3 }, { "x": 1, "y": 1.8 }, { "x": 2, "y": 3.3 }, { "x": 3, "y": 2.8 }, { "x": 4, "y": 2.9 }, { "x": 5, "y": 1.3 }, { "x": 6, "y": 3.8 }, { "x": 7, "y": 1.9 }, { "x": 8, "y": 2.8 }, { "x": 9, "y": 2.5 }, { "x": 10, "y": 1.7 }, { "x": 11, "y": 2.6}] }
                                 ];

    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart()
        .height(280)
        .width(660)
        .useInteractiveGuideline(true)
        .margin({ top: 40, right: 10, bottom: 80, left: 70 });

        chart
        .x(function (d, i) {
            return d.x;
        });

        if (auxOptions.width)
            chart.width(auxOptions.width);

        if (auxOptions.height)
            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([0, 4]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            //var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            // now = new Date(now); // + d * 86400 * 1000);

            return ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][d];
        }

        chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .tickFormat(
            formatter
          );

        chart.xAxis.axisLabel('Fiscal Year ').width(80);
        chart.yAxis.axisLabel('').axisLabelDistance(-80).width(0)
        .tickFormat(function (f) { return "$" + f + "M"; });

        d3.select('#' + ChartID + ' ')
        .datum(data_PerformanceLoans)
      .transition().duration(500)
        .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}

//RVU WorkUnit
function Get_LineChartRVUWorkUnit(ChartID) {

    var Data_LineChartRVUWorkUnit =
    [
      { "color": "#F16B50", "key": "Productivity", "values": [{ "x": 0, "y": 125 }, { "x": 1, "y": 150 }, { "x": 2, "y": 143 }, { "x": 3, "y": 175 }, { "x": 4, "y": 180 }] },
      { "color": "#379695", "key": "Collection", "values": [{ "x": 0, "y": 120 }, { "x": 1, "y": 190 }, { "x": 2, "y": 190 }, { "x": 3, "y": 175 }, { "x": 4, "y": 210}] }
    ];
    
    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart().useInteractiveGuideline(false)
       // .width(cWidth)
       // .margin({ top: 20, right: 60, bottom: 20, left: 30 });

        chart
        .x(function (d, i) {
            return d.x;
        });

//        if (auxOptions.width)
//            chart.width(auxOptions.width);

//        if (auxOptions.height)
//            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([100, 250]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            //var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            // now = new Date(now); // + d * 86400 * 1000);

            return ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'][d];
        }

        chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .tickFormat(
            formatter
          );

        chart.yAxis
        .axisLabel('')
       .tickFormat(function (f) { return "$" + f });
        chart.showLegend(false);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Nov 27, 2014 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(Data_LineChartRVUWorkUnit, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select('#' + ChartID + ' ')
        .datum(Data_LineChartRVUWorkUnit)
      .transition().duration(500)
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
//Appointments
function Get_LineChartAppointments(ChartID) {

    var Appointments =
    [
      { "color": "#D64541", "key": "Appointments Missed", "values": [{ "x": 0, "y": 125 }, { "x": 1, "y": 150 }, { "x": 2, "y": 143 }, { "x": 3, "y": 175 }, { "x": 4, "y": 180}] }
      
    ];
    
    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart().useInteractiveGuideline(false)
       // .width(cWidth)
      //  .margin({ top: 20, right: 60, bottom: 20, left: 30 });

        chart
        .x(function (d, i) {
            return d.x;
        });

//        if (auxOptions.width)
//            chart.width(auxOptions.width);

//        if (auxOptions.height)
//            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([100, 250]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            //var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            // now = new Date(now); // + d * 86400 * 1000);

            return ['Feb', 'Mar', 'Apr', 'May', 'Jun'][d];
        }

        chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .tickFormat(
            formatter
          );

        chart.yAxis
        .axisLabel('')
       .tickFormat(function (f) { return "" + f });
        chart.showLegend(false);

        d3.select('#' + ChartID + ' ')
        .datum(Appointments)
      .transition().duration(500)
        .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}


function Get_LineChartAnalytic(ChartID, ChartData) {

    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart().useInteractiveGuideline(true);

        chart
        .x(function (d, i) {
            return d.x;
        });

        if (auxOptions.width)
            chart.width(auxOptions.width);

        if (auxOptions.height)
            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([0, 60]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            //var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            // now = new Date(now); // + d * 86400 * 1000);

            return ['Jan-1', 'Jan-2', 'Jan-3', 'Jan-4', 'Jan-5', 'Jan-6', 'Jan-7', 'Jan-8', 'Jan-9', 'Jan-10', 'Jan-11'][d];
        }

        chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .tickFormat(
            formatter
          );

        chart.yAxis
        .axisLabel('Gross Charges').width(50)
       .tickFormat(function (f) { return "$" + f });
        chart.showLegend(true);

        d3.select('#' + ChartID + ' ')
        .datum(ChartData)
      .transition().duration(500)
        .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}


//NewPatients

function Get_LineChartNewPatients(ChartID) {


    var Data_LineChartNewPatients =
    [
      { "key": "Goal", "values": [{ "x": 1, "y": 23 }, { "x": 2, "y": 23 }, { "x": 3, "y": 23 }, { "x": 4, "y": 23 }, { "x": 5, "y": 23 }, { "x": 6, "y": 23 }, { "x": 7, "y": 23 }, { "x": 8, "y": 23 }, { "x": 9, "y": 23 }, { "x": 10, "y": 23 }, { "x": 11, "y": 23 }, { "x": 12, "y": 23}] },
      { "key": "Actual", "values": [{ "x": 1, "y": 20 }, { "x": 2, "y": 30 }, { "x": 3, "y": 15 }, { "x": 4, "y": 33 }, { "x": 5, "y": 26 }, { "x": 6, "y": 30 }, { "x": 7, "y": 49 }, { "x": 8, "y": 12 }, { "x": 9, "y": 19 }, { "x": 10, "y": 22 }, { "x": 11, "y": 18 }, { "x": 12, "y": 21}] }

    ];
    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart().useInteractiveGuideline(false)
        .margin({ top: 40, right: 30, bottom: 20, left: 70 });

        chart
        .x(function (d, i) {
            return d.x;
        });

        if (auxOptions.width)
            chart.width(auxOptions.width);

        if (auxOptions.height)
            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([10, 50]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            //var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            // now = new Date(now); // + d * 86400 * 1000);

            return ['0', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][d];
        }

        chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .tickFormat(
            formatter
          );

        chart.yAxis
        .axisLabel('')
        .tickFormat(d3.format(',.2f'));
        chart.showLegend(true);
        //chart.reduceXTicks(false);

        d3.select('#' + ChartID + ' ')
        .datum(Data_LineChartNewPatients)
      .transition().duration(500)
        .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}


//KPITile

function Get_LineChartKPITile(ChartID) {

    var data_PerformanceLoansKPITile = [{ "color": "#FCBE33", "key": "Total expense", "values": [{ "x": 0, "y": 2.3 }, { "x": 1, "y": 2.5 }, { "x": 2, "y": 2.2 }, { "x": 3, "y": 2.4 }, { "x": 4, "y": 2.7 }, { "x": 5, "y": 3 }, { "x": 6, "y": 2.3 }, { "x": 7, "y": 2.5 }, { "x": 8, "y": 2.7 }, { "x": 9, "y": 2.4 }, { "x": 10, "y": 2.1 }, { "x": 11, "y": 2.2 }] },
                                 { "color": "#56B449", "key": "Expense approved", "values": [{ "x": 0, "y": 2.2 }, { "x": 1, "y": 2.3 }, { "x": 2, "y": 2.4 }, { "x": 3, "y": 1.8 }, { "x": 4, "y": 2.3 }, { "x": 5, "y": 2.2 }, { "x": 6, "y": 2.4 }, { "x": 7, "y": 2.1 }, { "x": 8, "y": 2 }, { "x": 9, "y": 1.8 }, { "x": 10, "y": 2.3 }, { "x": 11, "y": 2.2 }] },
                                 
                                 ];

    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart()
        .height(300)
        .useInteractiveGuideline(true)
        .margin({ top: 40, right: 50, bottom: 80, left: 120 });

        chart
        .x(function (d, i) {
            return d.x;
        });

        if (auxOptions.width)
            chart.width(auxOptions.width);

        if (auxOptions.height)
            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([0, 4]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            //var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            // now = new Date(now); // + d * 86400 * 1000);

            return ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][d];
        }

        chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .tickFormat(
            formatter
          );

        chart.xAxis.axisLabel('Fiscal Year ( 2014 )').width(80);
        chart.yAxis.axisLabel('Delinquency Values ($ B)').axisLabelDistance(-80).width(0)
        .tickFormat(function (f) { return "$" + f + "B"; });

        d3.select('#' + ChartID + ' ')
        .datum(data_PerformanceLoansKPITile)
      .transition().duration(500)
        .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}

//KPITile

function Get_LineChartKPITile(ChartID) {


    var Data_LineChartKPITile =
    [
      { "key": "TM", "values": [{ "x": 1, "y": 1 }, { "x": 2, "y": 5 }, { "x": 3, "y": 4 }, { "x": 4, "y": 5 }, { "x": 5, "y": 5}] },
      { "key": "CRM", "values": [{ "x": 1, "y": 11 }, { "x": 2, "y": 55 }, { "x": 3, "y": 44 }, { "x": 4, "y": 11 }, { "x": 5, "y": 33}] },
      { "key": "FMLA", "values": [{ "x": 1, "y": 1 }, { "x": 2, "y": 13 }, { "x": 3, "y": 15 }, { "x": 4, "y": 13 }, { "x": 5, "y": 12}] }
    ];




    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart().useInteractiveGuideline(true);

        chart
        .x(function (d, i) {
            return d.x;
        });

        if (auxOptions.width)
            chart.width(auxOptions.width);

        if (auxOptions.height)
            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([0]);

        var formatter;


        formatter = function (d, i) {
            // alert(d+"  "+i);
            //var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            // now = new Date(now); // + d * 86400 * 1000);

            return ['0', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d];
        }

        chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .tickFormat(
            formatter
          );

        chart.yAxis
        .axisLabel('')
        .tickFormat(d3.format(',.2f'));
        chart.showLegend(false);

        d3.select('#' + ChartID + ' ')
        .datum(Data_LineChartKPITile)
      .transition().duration(500)
        .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}

function Get_LineChartNumberofNewPatients(ChartID) {
    var NumberofNewPatients =
    [
      { "key": "New Patients", "values": [{ "x": 1, "y": 185 }, { "x": 2, "y": 147 }, { "x": 3, "y": 140 }, { "x": 4, "y": 184 }, { "x": 5, "y": 179 }, { "x": 6, "y": 185}] },
      { "key": "Established Patients", "values": [{ "x": 1, "y": 120 }, { "x": 2, "y": 190 }, { "x": 3, "y": 190 }, { "x": 4, "y": 175 }, { "x": 5, "y": 210 }, { "x": 6, "y": 150}] }

    ];

    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart().useInteractiveGuideline(false)
        .margin({ top: 40, right: 30, bottom: 20, left: 70 });

        chart
        .x(function (d, i) {
            return d.x;
        });

        if (auxOptions.width)
            chart.width(auxOptions.width);

        if (auxOptions.height)
            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([100, 250]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            //var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            // now = new Date(now); // + d * 86400 * 1000);

            return ['0', 'Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6'][d];
        }

        chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .ticks(10)
        .tickFormat(
            formatter
          );
        chart.yAxis
        .axisLabel('')
        .tickFormat(d3.format(',.f'));
        chart.showLegend(true);

        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-panel-s1"><img src="img/User-Img.png" class="tooltip-user-img-s1"><div class="tooltip-info-cell"><div class="tooltip-title-cell-s1">' +
                                    '<label class="label-tooltip-title-s1" style="color:' + ToolTipContent(NumberofNewPatients, key, x, y) + '"> Name: <span>Nancy Davolio</span></label></div><label class="label-tooltip-title-s1"><span style="color:' + ToolTipContent(NumberofNewPatients, key, x, y) + '">' + x + '</span></label>' +
                                '<label class="label-tooltip-title-s1"> New Patients: <span style="color:' + ToolTipContent(NumberofNewPatients, key, x, y) + '">' + y + '</span></label></div></div>'
        });


        d3.select('#' + ChartID + ' ')
        .datum(NumberofNewPatients)
      .transition().duration(500)
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


function Get_LineChartNumberofNewPatients1(ChartID) {

    var NumberofNewPatients =
    [
      { "color": "#7BBAFE", "key": "New Patients", "values": [{ "x": 1, "y": 185 }, { "x": 2, "y": 147 }, { "x": 3, "y": 140 }, { "x": 4, "y": 184 }, { "x": 5, "y": 179}] }

    ];

    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart().useInteractiveGuideline(false)
      // .width(cWidth)
        //.margin({ top: 20, right: 60, bottom: 20, left: 30 });

        chart
        .x(function (d, i) {
            return d.x;
        });

//        if (auxOptions.width)
//            chart.width(auxOptions.width);

//        if (auxOptions.height)
//            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([100, 250]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            //var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            // now = new Date(now); // + d * 86400 * 1000);

            return ['0', 'Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6'][d];
        }

        chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .ticks(10)
        .tickFormat(
            formatter
          );

        chart.yAxis
        .axisLabel('')
        .tickFormat(d3.format(',.f'));
        chart.showLegend(false);

        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-panel-s1"><img src="img/User-Img.png" class="tooltip-user-img-s1"><div class="tooltip-info-cell"><div class="tooltip-title-cell-s1">'+
                                    '<label class="label-tooltip-title-s1" style="color:' + ToolTipContent(NumberofNewPatients, key, x, y) + '"> Name: <span>Nancy Davolio</span></label></div><label class="label-tooltip-title-s1"><span style="color:' + ToolTipContent(NumberofNewPatients, key, x, y) + '">' + x + '</span></label>' +
                                '<label class="label-tooltip-title-s1"> New Patients: <span style="color:' + ToolTipContent(NumberofNewPatients, key, x, y) + '">' + y + '</span></label></div></div>'
        });

        d3.select('#' + ChartID + ' ')
        .datum(NumberofNewPatients)
      .transition().duration(500)
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
function Get_LineChartAnalyticLatest(ChartID) {

    var Data_LineChartAnalyticssLatest =
    [
     { "key": "Actual", "values": [{ "x": 0, "y": 0 }, { "x": 1, "y": 3000 }, { "x": 2, "y": 2889 }, { "x": 3, "y": 1963 }, { "x": 4, "y": 3000 }, { "x": 5, "y": 2168 }, { "x": 6, "y": 2869 }, { "x": 7, "y": 2200 }, { "x": 8, "y": 1200 }, { "x": 9, "y": 1300 }, { "x": 10, "y": 1000}] },
      { "key": "Goal", "values": [{ "x": 0, "y": 3000 }, { "x": 1, "y": 3000 }, { "x": 2, "y": 3000 }, { "x": 3, "y": 3000 }, { "x": 4, "y": 3000 }, { "x": 5, "y": 3000 }, { "x": 6, "y": 3000 }, { "x": 7, "y": 3000 }, { "x": 8, "y": 3000 }, { "x": 9, "y": 3000 }, { "x": 10, "y": 3000}] },
      { "key": "Weekend", "values": [{ "x": 0, "y": 0 }, { "x": 1, "y": 4205 }, { "x": 2, "y": 5287 }, { "x": 3, "y": 2157 }, { "x": 4, "y": 1244 }, { "x": 5, "y": 2514 }, { "x": 6, "y": 1926 }, { "x": 7, "y": 3000 }, { "x": 8, "y": 1245 }, { "x": 9, "y": 3265 }, { "x": 10, "y": 1156}] }
    ];

    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart().useInteractiveGuideline(true);

        chart
        .x(function (d, i) {
            return d.x;
        });

        if (auxOptions.width)
            chart.width(auxOptions.width);

        if (auxOptions.height)
            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([0, 6000]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            //var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            // now = new Date(now); // + d * 86400 * 1000);

            return ['Jan-1', 'Jan-2', 'Jan-3', 'Jan-4', 'Jan-5', 'Jan-6', 'Jan-7', 'Jan-8', 'Jan-9', 'Jan-10', 'Jan-11'][d];
        }

        chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .tickFormat(
            formatter
          );

        chart.yAxis
        .axisLabel('').width(50)
       .tickFormat(function (f) { return "$" + f });
        chart.showLegend(true);

        d3.select('#' + ChartID + ' ')
        .datum(Data_LineChartAnalyticssLatest)
      .transition().duration(500)
        .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}

function Get_LineChartAnalytic1(ChartID, ChartData) {

    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart().useInteractiveGuideline(true);

        chart
        .x(function (d, i) {
            return d.x;
        });

        if (auxOptions.width)
            chart.width(auxOptions.width);

        if (auxOptions.height)
            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([30, 80]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            //var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            // now = new Date(now); // + d * 86400 * 1000);

            return ['02-2014', '03-2014', '04-2014', '05-2014', '06-2014', '07-2014', '08-2014', '09-2014', '10-2014', '11-2014', '12-2014', '01-2014'][d];
        }

        chart.margin({ right: 10 });

        chart.xAxis.rotateLabels(-45) // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .tickFormat(
            formatter
          );

        chart.yAxis
        .axisLabel('Average Days To Bill').width(50)
       .tickFormat(function (f) { return f });
        chart.showLegend(true);


        d3.select('#' + ChartID + ' ')
        .datum(ChartData)
      .transition().duration(500)
        .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}


function Get_LineChartRVUTrend(ChartID) {
    var Data_CompareChartRVUTrend = [
    { "key": "Laparoscopic gastric bypass with Roux-en Y ", "values": [{ "x": 0, "y": 27.9 }, { "x": 1, "y": 28.65 }, { "x": 2, "y": 30.06 }, { "x": 3, "y": 27.99 }, { "x": 4, "y": 29.4}] },
      { "key": "Laparoscopic place adjustable gastric band and port", "values": [{ "x": 0, "y": 18.4 }, { "x": 1, "y": 17.9 }, { "x": 2, "y": 18 }, { "x": 3, "y": 18.3 }, { "x": 4, "y": 18}] },
      { "key": "Laparoscopic revision of band only", "values": [{ "x": 0, "y": 18.65 }, { "x": 1, "y": 21.02 }, { "x": 2, "y": 20.34 }, { "x": 3, "y": 19.03 }, { "x": 4, "y": 20.79}] },
      { "key": "Laparoscopic sleeve gastrectomy", "values": [{ "x": 0, "y": 23.54 }, { "x": 1, "y": 21.04 }, { "x": 2, "y": 22 }, { "x": 3, "y": 22.57 }, { "x": 4, "y": 21.56}] },
      { "key": "Office/Outpatient visit,new", "values": [{ "x": 0, "y": 7.27 }, { "x": 1, "y": 10.1 }, { "x": 2, "y": 16.25 }, { "x": 3, "y": 12.35 }, { "x": 4, "y": 15.7}] },
      { "key": "Office/Outpatient visit,established", "values": [{ "x": 0, "y": 4.6 }, { "x": 1, "y": 7.7 }, { "x": 2, "y": 10.6 }, { "x": 3, "y": 4.05 }, { "x": 4, "y": 7.85}] }
    ];
    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart()
        .height(200)
         .margin({ top: 30, right: 30, bottom: 40, left: 70 })
        .useInteractiveGuideline(false);

        chart
        .x(function (d, i) {
            return d.x;
        });

        if (auxOptions.width)
            chart.width(auxOptions.width);

        if (auxOptions.height)
            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([0, 40]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            //var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            // now = new Date(now); // + d * 86400 * 1000);

            return ['2010', '2011', '2012', '2013', '2014'][d];
        }

        chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .tickFormat(
            formatter
          );

        chart.yAxis
        .axisLabel('').width(50)
       .tickFormat(function (f) { return f });
        chart.showLegend(true);

        d3.select('#' + ChartID + ' ')
        .datum(Data_CompareChartRVUTrend)
      .transition().duration(500)
        .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}

//ExpenseRvU

function Get_LineChartExpenseRvU(ChartID) {

    var Data_CompareChartExpenseRvU = [
    { "key": "Laparoscopic gastric bypass with Roux-en Y ", "values": [{ "x": 0, "y": 14.32 }, { "x": 1, "y": 17.25 }, { "x": 2, "y": 10.52 }, { "x": 3, "y": 14.52 }, { "x": 4, "y": 9.57}] },
      { "key": "Laparoscopic place adjustable gastric band and port", "values": [{ "x": 0, "y": 10 }, { "x": 1, "y": 12.04 }, { "x": 2, "y": 8.54 }, { "x": 3, "y": 11.54 }, { "x": 4, "y": 10.49}] },
      { "key": "Laparoscopic revision of band only", "values": [{ "x": 0, "y": 11.21 }, { "x": 1, "y": 14.38 }, { "x": 2, "y": 15.21 }, { "x": 3, "y": 8.17 }, { "x": 4, "y": 10.52}] },
      { "key": "laparoscopic sleeve gastrectomy", "values": [{ "x": 0, "y": 11.68 }, { "x": 1, "y": 14.68 }, { "x": 2, "y": 16.54 }, { "x": 3, "y": 8.247 }, { "x": 4, "y": 11}] },
      { "key": "Office/Outpatient visit,new", "values": [{ "x": 0, "y": 1.65 }, { "x": 1, "y": 3.45 }, { "x": 2, "y": 2.75 }, { "x": 3, "y": 5 }, { "x": 4, "y": 0.48}] },
      { "key": "Office/Outpatient visit,established", "values": [{ "x": 0, "y": 1.25 }, { "x": 1, "y": 0.45 }, { "x": 2, "y": 3.57 }, { "x": 3, "y": 4.12 }, { "x": 4, "y": 2}] }
    ];

    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart()
        .height(200)
         .margin({ top: 30, right: 30, bottom: 40, left: 70 })
        .useInteractiveGuideline(false);

        chart
        .x(function (d, i) {
            return d.x;
        });

        if (auxOptions.width)
            chart.width(auxOptions.width);

        if (auxOptions.height)
            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([0, 20]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            //var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            // now = new Date(now); // + d * 86400 * 1000);

            return ['2010', '2011', '2012', '2013', '2014'][d];
        }

        chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .tickFormat(
            formatter
          );

        chart.yAxis
        .axisLabel('').width(50)
       .tickFormat(function (f) { return f });
        chart.showLegend(true);

        d3.select('#' + ChartID + ' ')
        .datum(Data_CompareChartExpenseRvU)
      .transition().duration(500)
        .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}

//Malpractice

function Get_LineChartMalpracticeRVU(ChartID) {

    var Data_CompareChartMalpracticeRVU = [
    { "key": "Laparoscopic gastric bypass with Roux-en Y ", "values": [{ "x": 0, "y": 6.35 }, { "x": 1, "y": 10.3 }, { "x": 2, "y": 9.58 }, { "x": 3, "y": 3.57 }, { "x": 4, "y": 5}] },
      { "key": "Laparoscopic place adjustable gastric band and port", "values": [{ "x": 0, "y": 3.04 }, { "x": 1, "y": 7.26 }, { "x": 2, "y": 3.81 }, { "x": 3, "y": 5.41 }, { "x": 4, "y": 1.25}] },
      { "key": "Laparoscopic revision of band only", "values": [{ "x": 0, "y": 4.4 }, { "x": 1, "y": 8.21 }, { "x": 2, "y": 2.27 }, { "x": 3, "y": 6.51 }, { "x": 4, "y": 5}] },
      { "key": "Laparoscopic sleeve gastrectomy", "values": [{ "x": 0, "y": 4.2 }, { "x": 1, "y": 4 }, { "x": 2, "y": 4.69 }, { "x": 3, "y": 4.04 }, { "x": 4, "y": 4.6}] },
      { "key": "Office/Outpatient visit,new", "values": [{ "x": 0, "y": 0.12 }, { "x": 1, "y": 0.98 }, { "x": 2, "y": 1.25 }, { "x": 3, "y": 0.1 }, { "x": 4, "y": 0.57}] },
      { "key": "Office/Outpatient visit,established", "values": [{ "x": 0, "y": 0.06 }, { "x": 1, "y": 0.68 }, { "x": 2, "y": 0.99 }, { "x": 3, "y": 0.02 }, { "x": 4, "y": 0.58}] }
    ];

    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart()
        .height(200)
         .margin({ top: 30, right: 30, bottom: 40, left: 70 })
        .useInteractiveGuideline(false);

        chart
        .x(function (d, i) {
            return d.x;
        });

        if (auxOptions.width)
            chart.width(auxOptions.width);

        if (auxOptions.height)
            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([0, 15]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            //var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            // now = new Date(now); // + d * 86400 * 1000);

            return ['2010', '2011', '2012', '2013', '2014'][d];
        }

        chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .tickFormat(
            formatter
          );

        chart.yAxis
        .axisLabel('').width(50)
       .tickFormat(function (f) { return f });
        chart.showLegend(true);

        d3.select('#' + ChartID + ' ')
        .datum(Data_CompareChartMalpracticeRVU)
      .transition().duration(500)
        .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}

//
function Get_LineChartDemo(ChartID) {


    var Data_LineChart1 =
    [
      { "key": "TM", "values": [{ "x": 1, "y": 1 }, { "x": 2, "y": 5 }, { "x": 3, "y": 4 }, { "x": 4, "y": 5 }, { "x": 5, "y": 5}] },
      { "key": "CRM", "values": [{ "x": 1, "y": 11 }, { "x": 2, "y": 55 }, { "x": 3, "y": 44 }, { "x": 4, "y": 11 }, { "x": 5, "y": 33}] },
      { "key": "FMLA", "values": [{ "x": 1, "y": 1 }, { "x": 2, "y": 13 }, { "x": 3, "y": 15 }, { "x": 4, "y": 13 }, { "x": 5, "y": 12}] }
    ];


    var auxOptions = { forceY: true };
    if (auxOptions === undefined) auxOptions = {};
    nv.addGraph(function () {
        var chart;
        chart = nv.models.lineChart().useInteractiveGuideline(true);

        chart
        .x(function (d, i) {
            return d.x;
        });

        if (auxOptions.width)
            chart.width(auxOptions.width);

        if (auxOptions.height)
            chart.height(auxOptions.height);

        if (auxOptions.forceY)
            chart.forceY([0]);

        var formatter;

        formatter = function (d, i) {
            // alert(d+"  "+i);
            var now = (new Date()).getTime(); // -86400 * 1000 * 365;
            now = new Date(now); // + d * 86400 * 1000);

            return d;
        }

        //  chart.margin({ right: 40 });
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        .tickFormat(
            formatter
          );

        chart.yAxis
        .axisLabel('')
        .tickFormat(d3.format(',.2f'));
        chart.showLegend(false);

        d3.select('#' + ChartID + ' ')
        .datum(Data_LineChart1)
      .transition().duration(500)
        .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}


//lineWithFisheyeChart 
function Get_lineWithFisheyeChart(ChartID) {
    nv.addGraph(function () {
        var chart = nv.models.lineChart();
        chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
      .tickFormat(d3.format(',r'));
        chart.yAxis
      .axisLabel('Voltage (v)')
      .tickFormat(d3.format(',.2f'));
        chart.showLegend(false);
        d3.select('#' + ChartID)
      .datum(sinAndCos1())
    .transition().duration(500)
      .call(chart);
        //TODO: Figure out a good way to do this automatically
        nv.utils.windowResize(chart.update);
        //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });
        return chart;
    });
}
function sinAndCos1() {
    var sin = [],
      cos = [];
    for (var i = 0; i < 200; i++) {
        sin.push({ x: i, y: Math.sin(i / 2) });
        cos.push({ x: i, y: .5 * Math.cos(i) });
    }
    return [
    {
        values: sin,
        key: "Sine Wave",
        color: "#ff7f0e"
    },
    {
        values: cos,
        key: "Cosine Wave",
        color: "#2ca02c"
    }
  ];
}

//LinewithSvgResize
function Get_LinewithSvgResizeChart(ChartID) {

    nv.addGraph(function () {
        var chart = nv.models.lineChart();
        var fitScreen = false;
        var width = 950;
        var height = 200;
        var zoom = 1;
        chart.xAxis
      .tickFormat(d3.format(',r'));
        chart.showLegend(false);
        chart.yAxis
      .axisLabel('Voltage (v)')
      .tickFormat(d3.format(',.2f'));
        chart.showLegend(false);
        d3.select('#' + ChartID)
      .attr('perserveAspectRatio', 'xMinYMid')
      .attr('width', width)
      .attr('height', height)
      .datum(sinAndCos());
        setChartViewBox();
        resizeChart();
        // These resizes both do the same thing, and require recalculating the chart
        //nv.utils.windowResize(chart.update);
        //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });
        nv.utils.windowResize(resizeChart);
        d3.select('#zoomIn').on('click', zoomIn);
        d3.select('#zoomOut').on('click', zoomOut);
        function setChartViewBox() {
            var w = width * zoom,
        h = height * zoom;
            chart
        .width(w)
        .height(h);
            d3.select('#' + ChartID)
        .attr('viewBox', '0 0 ' + w + ' ' + h)
      .transition().duration(500)
        .call(chart);
        }
        function zoomOut() {
            zoom += .15;
            setChartViewBox();
        }
        function zoomIn() {
            if (zoom <= .5) return;
            zoom -= .25;
            setChartViewBox();
        }
        // This resize simply sets the SVG's dimensions, without a need to recall the chart code
        // Resizing because of the viewbox and perserveAspectRatio settings
        // This scales the interior of the chart unlike the above
        function resizeChart() {
            var container = d3.select('#' + ChartID);
            var svg = container.select('svg');
            if (fitScreen) {
                // resize based on container's width AND HEIGHT
                var windowSize = nv.utils.windowSize();
                svg.attr("width", windowSize.width);
                svg.attr("height", windowSize.height);
            } else {
                // resize based on container's width
                var aspect = chart.width() / chart.height();
                var targetWidth = parseInt(container.style('width'));
                svg.attr("width", targetWidth);
                svg.attr("height", Math.round(targetWidth / aspect));
            }
        };
        return chart;
    });
}
function sinAndCos() {
  var sin = [],
      cos = [];
  for (var i = 0; i < 100; i++) {
    sin.push({x: i, y: Math.sin(i/10) });
    cos.push({x: i, y: .5 * Math.cos(i/10)});
  }
  return [
    {
      values: sin,
      key: "Sine Wave",
      color: "#ff7f0e"      
    },
    {
      values: cos,
      key: "Cosine Wave",
      color: "#2ca02c"
    }
  ];
}





