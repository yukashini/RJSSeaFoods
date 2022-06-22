
//grouped bar

function Get_StackedBarChartModal3(ContralID, StackedBarChartModal3) {
    //var StackedBarChartModal3 =
    //    [

    // { "color": "#57D0B5", "key": "Approved Bills ", "values": [{ "x": " Jan 2019", "y": 10000000 }, { "x": " Jan 2019", "y": 17000000 }, { "x": " May 2020", "y": 14500000 }, { "x": "Customer Success", "y": 19000000 }, { "x": " Jul 2020", "y": 12700000 }, { "x": "My Portal", "y": 11800000 }, { "x": " Sep 2020", "y": 15900000 }, { "x": "ELM", "y": 12000000 }, { "x": " Nov 2020", "y": 100000 }, { "x": "LPM", "y": 12200000 }, { "x": " Jan 2014", "y": 12300000 }, { "x": "LM", "y": 12400000 }, { "x": " Mar 2014", "y": 1500000 }, { "x": "Process Management", "y": 17000000 }, { "x": " May 2014", "y": 17000000 }] },
    // { "color": "#26A7DD", "key": "Rejected Bills ", "values": [{ "x": " Jan 2019", "y": 900000000000 }, { "x": " Jan 2019", "y": 8500000 }, { "x": " May 2020", "y": 22000000 }, { "x": "Customer Success", "y": 16500000 }, { "x": " Jul 2020", "y": 27700000 }, { "x": "My Portal", "y": 23500000 }, { "x": " Sep 2020", "y": 24000000 }, { "x": "ELM", "y": 24500000 }, { "x": " Nov 2020", "y": 35000000 }, { "x": "LPM", "y": 15500000 }, { "x": " Jan 2014", "y": 6000000 }, { "x": "LM", "y": 12900000 }, { "x": " Mar 2014", "y": 12100000 }, { "x": "Process Management", "y": 4000000 }, { "x": " May 2014", "y": 9000000 }] }];


    //var StackedBarChartModal3 =
    //    [

    // { "color": "#57D0B5", "key": "Approved Bills", "values": [{ "x": " Jan 2019", "y": 16000000 }] },
    // { "color": "#26A7DD", "key": "Rejected Bills ", "values": [{ "x": " Jan 2019", "y": 9000000 }, { "x": " May 2014", "y": 17000000 }] }];
    nv.addGraph(function () {
        var chart = nv.models.multiBarChart()
            .groupSpacing(0.2)
       .margin({ top: 10, right: 10, bottom: 20, left: 45 });
        var formatter;
        formatter = function (d, i) {
            return d;
        }
        chart.xAxis
        .tickFormat(formatter);

        chart.yAxis
        .tickFormat(function (f) { return "$" + f });
        chart.showLegend(true);
        chart.multibar.stacked(true); // default to stacked

        chart.showControls(true); // don't show controls
        chart.reduceXTicks(true);
        chart.forceY([0, 200]);

        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1"></label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(StackedBarChartModal3, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        d3.select('#' + ContralID)
        .datum(StackedBarChartModal3)
      .transition().duration(500).call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });

}
function Get_StackedBarChartModal3Financer(ContralID, StackedBarChartModal3) {
    //var StackedBarChartModal3 =
    //    [

    // { "color": "#57D0B5", "key": "Approved Bills ", "values": [{ "x": " Jan 2019", "y": 10000000 }, { "x": " Jan 2019", "y": 17000000 }, { "x": " May 2020", "y": 14500000 }, { "x": "Customer Success", "y": 19000000 }, { "x": " Jul 2020", "y": 12700000 }, { "x": "My Portal", "y": 11800000 }, { "x": " Sep 2020", "y": 15900000 }, { "x": "ELM", "y": 12000000 }, { "x": " Nov 2020", "y": 100000 }, { "x": "LPM", "y": 12200000 }, { "x": " Jan 2014", "y": 12300000 }, { "x": "LM", "y": 12400000 }, { "x": " Mar 2014", "y": 1500000 }, { "x": "Process Management", "y": 17000000 }, { "x": " May 2014", "y": 17000000 }] },
    // { "color": "#26A7DD", "key": "Rejected Bills ", "values": [{ "x": " Jan 2019", "y": 900000000000 }, { "x": " Jan 2019", "y": 8500000 }, { "x": " May 2020", "y": 22000000 }, { "x": "Customer Success", "y": 16500000 }, { "x": " Jul 2020", "y": 27700000 }, { "x": "My Portal", "y": 23500000 }, { "x": " Sep 2020", "y": 24000000 }, { "x": "ELM", "y": 24500000 }, { "x": " Nov 2020", "y": 35000000 }, { "x": "LPM", "y": 15500000 }, { "x": " Jan 2014", "y": 6000000 }, { "x": "LM", "y": 12900000 }, { "x": " Mar 2014", "y": 12100000 }, { "x": "Process Management", "y": 4000000 }, { "x": " May 2014", "y": 9000000 }] }];


    //var StackedBarChartModal3 =
    //    [

    // { "color": "#57D0B5", "key": "Approved Bills", "values": [{ "x": " Jan 2019", "y": 16000000 }] },
    // { "color": "#26A7DD", "key": "Rejected Bills ", "values": [{ "x": " Jan 2019", "y": 9000000 }, { "x": " May 2014", "y": 17000000 }] }];
    nv.addGraph(function () {
        var chart = nv.models.multiBarChart()
            .groupSpacing(0.2)
       .margin({ top: 10, right: 10, bottom: 20, left: 45 });
        var formatter;
        formatter = function (d, i) {
            return d;
        }
        chart.xAxis
        .tickFormat(formatter);

        chart.yAxis
        .tickFormat(function (f) { return "$" + f });
        chart.showLegend(true);
        chart.multibar.stacked(false); // default to stacked

        chart.showControls(true); // don't show controls
        chart.reduceXTicks(false);
        chart.forceY([0, 200]);

        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1"></label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(StackedBarChartModal3, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        d3.select('#' + ContralID)
        .datum(StackedBarChartModal3)
      .transition().duration(500).call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });

}
function Get_StackedBarChartModal5(ContralID, StackedBarChartModal5) {

    //var StackedBarChartModal5 =
    //    [

    // { "color": "#57D0B5", "key": "Outstanding Payments", "values": [{ "x": " Jan 2019", "y": 16000000 }, { "x": " Jan 2019", "y": 17000000 }] },
    // { "color": "#26A7DD", "key": "Overdue Payments ", "values": [{ "x": " Jan 2019", "y": 9000000 }, { "x": " Jan 2019", "y": 17000000 }] }];
    nv.addGraph(function () {
        var chart = nv.models.multiBarChart()
            .groupSpacing(0.2)
       .margin({ top: 10, right: 10, bottom: 20, left: 30 });
        var formatter;
        formatter = function (d, i) {
            return d;
        }
        chart.xAxis
        .tickFormat(formatter);

        chart.yAxis
        .tickFormat(function (f) { return "$" + f });
        chart.showLegend(true);
        chart.multibar.stacked(true); // default to stacked
        chart.showControls(true); // don't show controls
        chart.reduceXTicks(true);
        chart.forceY([0, 20000]);

        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1"></label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(StackedBarChartModal5, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        d3.select('#' + ContralID)
        .datum(StackedBarChartModal5)
      .transition().duration(500).call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });

}
function fnum(x) {
    if (isNaN(x)) return x;

    if (x < 9999) {
        return x;
    }

    if (x < 1000000) {
        return Math.round(x / 1000) + "";
    }
    if (x < 10000000) {
        return (x / 1000000).toFixed(2) + "";
    }

    if (x < 1000000000) {
        return Math.round((x / 1000000)) + "";
    }

    if (x < 1000000000000) {
        return Math.round((x / 1000000000)) + "";
    }

    return "1T+";
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
//Stacked
function Get_StackedBarChartHome(ContralID) {

    var StackedBarChartModal3 =
        [

     { "color": "#E96955", "key": "Quantity", "values": [{ "x": " Mar 13", "y": 16000000 }, { "x": " Apr 13", "y": 17000000 }, { "x": " May 13", "y": 14500000 }, { "x": " Jun 13", "y": 19000000 }, { "x": " Jul 13", "y": 12700000 }, { "x": " Aug 13", "y": 11800000 }, { "x": " Sep 13", "y": 15900000 }, { "x": " Oct 13", "y": 12000000 }, { "x": " Nov 13", "y": 100000 }, { "x": " Dec 13", "y": 12200000 }, { "x": " Jan 14", "y": 12300000 }, { "x": " Feb 14", "y": 12400000 }, { "x": " Mar 14", "y": 1500000 }, { "x": " Apr 14", "y": 17000000 }, { "x": " May 14", "y": 17000000 }] },
     { "color": "#6EC362", "key": "Price", "values": [{ "x": " Mar 13", "y": 9000000 }, { "x": " Apr 13", "y": 8500000 }, { "x": " May 13", "y": 22000000 }, { "x": " Jun 13", "y": 16500000 }, { "x": " Jul 13", "y": 27700000 }, { "x": " Aug 13", "y": 23500000 }, { "x": " Sep 13", "y": 24000000 }, { "x": " Oct 13", "y": 24500000 }, { "x": " Nov 13", "y": 35000000 }, { "x": " Dec 13", "y": 15500000 }, { "x": " Jan 14", "y": 6000000 }, { "x": " Feb 14", "y": 12900000 }, { "x": " Mar 14", "y": 2100000 }, { "x": " Apr 14", "y": 4000000 }, { "x": " May 14", "y": 9000000 }] }];
    nv.addGraph(function () {
        var chart = nv.models.multiBarChart()
            .groupSpacing(0.2)
        //    .margin({ top: 10, right: 10, bottom: 20, left: 130 });
        var formatter;
        formatter = function (d, i) {
            return d;
        }
        chart.xAxis.rotateLabels(30)
        .tickFormat(formatter);

        chart.yAxis
        .tickFormat(function (f) { return "$" + f; });
        chart.showLegend(false);
        chart.multibar.stacked(true); // default to stacked
        chart.showControls(false); // don't show controls
        chart.reduceXTicks(false);
        chart.forceY([0, 40000000]);

        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1"></label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(StackedBarChartModal3, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        d3.select('#' + ContralID)
        .datum(StackedBarChartModal3)
      .transition().duration(500).call(chart);
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


//Stacked Bar Modal1(Invoice)

function Get_StackedBarChartModal1(ContralID) {
    //var StackedBarChartModal1 =
    //    [
    // { "color": "#E3DE4D", "key": "Order placement", "values": [{ "x": "Mar 2020", "y": 2000000 }, { "x": "Apr 2020", "y": 5000000 }, { "x": "May 2020", "y": 7000000 }, { "x": "Jun 2020", "y": 7500000 }, { "x": "Jul 2020", "y": 7700000 }, { "x": "Aug 2020", "y": 3500000 }, { "x": "Sep 2020", "y": 4000000 }, { "x": "Oct 2020", "y": 4500000 }, { "x": "Nov 2020", "y": 5000000 }, { "x": "Dec 2020", "y": 1500000 }, { "x": "Jan 2014", "y": 1600000 }, { "x": "Feb 2014", "y": 6500000 }, { "x": "Mar 2014", "y": 7000000 }, { "x": "Apr 2014", "y": 7000000 }, { "x": "May 2014", "y": 7000000 }] },
    // { "color": "#5FBA50", "key": "Confirmation", "values": [{ "x": "Mar 2020", "y": 1000000 }, { "x": "Apr 2020", "y": 2500000 }, { "x": "May 2020", "y": 4600000 }, { "x": "Jun 2020", "y": 4000000 }, { "x": "Jul 2020", "y": 1800000 }, { "x": "Aug 2020", "y": 1900000 }, { "x": "Sep 2020", "y": 2000000 }, { "x": "Oct 2020", "y": 2100000 }, { "x": "Nov 2020", "y": 12200000 }, { "x": "Dec 2020", "y": 2300000 }, { "x": "Jan 2014", "y": 2400000 }, { "x": "Feb 2014", "y": 12500000 }, { "x": "Mar 2014", "y": 22600000 }, { "x": "Apr 2014", "y": 7000000 }, { "x": "May 2014", "y": 7000000 }] },
    // { "color": "#57D0B5", "key": "Invoicing", "values": [{ "x": "Mar 2020", "y": 6000000 }, { "x": "Apr 2020", "y": 7000000 }, { "x": "May 2020", "y": 4500000 }, { "x": "Jun 2020", "y": 9000000 }, { "x": "Jul 2020", "y": 2700000 }, { "x": "Aug 2020", "y": 1800000 }, { "x": "Sep 2020", "y": 5900000 }, { "x": "Oct 2020", "y": 2000000 }, { "x": "Nov 2020", "y": 100000 }, { "x": "Dec 2020", "y": 2200000 }, { "x": "Jan 2014", "y": 2300000 }, { "x": "Feb 2014", "y": 2400000 }, { "x": "Mar 2014", "y": 500000 }, { "x": "Apr 2014", "y": 7000000 }, { "x": "May 2014", "y": 7000000 }] },
    // { "color": "#26A7DD", "key": "Delivery", "values": [{ "x": "Mar 2020", "y": 9000000 }, { "x": "Apr 2020", "y": 8500000 }, { "x": "May 2020", "y": 22000000 }, { "x": "Jun 2020", "y": 16500000 }, { "x": "Jul 2020", "y": 27700000 }, { "x": "Aug 2020", "y": 23500000 }, { "x": "Sep 2020", "y": 24000000 }, { "x": "Oct 2020", "y": 24500000 }, { "x": "Nov 2020", "y": 35000000 }, { "x": "Dec 2020", "y": 15500000 }, { "x": "Jan 2014", "y": 6000000 }, { "x": "Feb 2014", "y": 12900000 }, { "x": "Mar 2014", "y": 12100000 }, { "x": "Apr 2014", "y": 7000000 }, { "x": "May 2014", "y": 7000000 }] }];
    nv.addGraph(function () {
        var chart = nv.models.multiBarChart()
          .groupSpacing(0.5)
            .margin({ right: 50 });
        var formatter;
        formatter = function (d, i) {
            return d;
        }
        //Creates new tooltip container, or uses existing one on DOM.
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2"></label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(StackedBarChartModal1, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        chart.xAxis.orient("bottom")
        .tickFormat(formatter);
        chart.yAxis.orient("left")
        .tickFormat(function (f) { return "$" + fnum(f); });
        chart.showLegend(true);
        chart.multibar.stacked(true); // default to stacked
        chart.showControls(true); // don't show controls
        chart.reduceXTicks(false);
        chart.forceY([0, 60000000]);
        d3.select('#' + ContralID)
        .datum(StackedBarChartModal1)
        .transition().duration(500).call(chart);
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
//Stacked Bar Modal1(Invoice)

function Get_StackedBarChartModal11(ContralID) {
    var StackedBarChartModal11 =
        [
     { "color": "#E3DE4D", "key": "Open batch", "values": [{ "x": "Mar 2020", "y": 2000000 }, { "x": "Apr 2020", "y": 5000000 }, { "x": "May 2020", "y": 7000000 }, { "x": "Jun 2020", "y": 7500000 }, { "x": "Jul 2020", "y": 7700000 }, { "x": "Aug 2020", "y": 3500000 }, { "x": "Sep 2020", "y": 4000000 }, { "x": "Oct 2020", "y": 4500000 }, { "x": "Nov 2020", "y": 5000000 }, { "x": "Dec 2020", "y": 1500000 }, { "x": "Jan 2014", "y": 1600000 }, { "x": "Feb 2014", "y": 6500000 }, { "x": "Mar 2014", "y": 7000000 }, { "x": "Apr 2014", "y": 7000000 }, { "x": "May 2014", "y": 7000000 }] },
     { "color": "#5FBA50", "key": "workflow", "values": [{ "x": "Mar 2020", "y": 1000000 }, { "x": "Apr 2020", "y": 2500000 }, { "x": "May 2020", "y": 4600000 }, { "x": "Jun 2020", "y": 4000000 }, { "x": "Jul 2020", "y": 1800000 }, { "x": "Aug 2020", "y": 1900000 }, { "x": "Sep 2020", "y": 2000000 }, { "x": "Oct 2020", "y": 2100000 }, { "x": "Nov 2020", "y": 12200000 }, { "x": "Dec 2020", "y": 2300000 }, { "x": "Jan 2014", "y": 2400000 }, { "x": "Feb 2014", "y": 12500000 }, { "x": "Mar 2014", "y": 22600000 }, { "x": "Apr 2014", "y": 7000000 }, { "x": "May 2014", "y": 7000000 }] },
     { "color": "#57D0B5", "key": "Approved", "values": [{ "x": "Mar 2020", "y": 6000000 }, { "x": "Apr 2020", "y": 7000000 }, { "x": "May 2020", "y": 4500000 }, { "x": "Jun 2020", "y": 9000000 }, { "x": "Jul 2020", "y": 2700000 }, { "x": "Aug 2020", "y": 1800000 }, { "x": "Sep 2020", "y": 5900000 }, { "x": "Oct 2020", "y": 2000000 }, { "x": "Nov 2020", "y": 100000 }, { "x": "Dec 2020", "y": 2200000 }, { "x": "Jan 2014", "y": 2300000 }, { "x": "Feb 2014", "y": 2400000 }, { "x": "Mar 2014", "y": 500000 }, { "x": "Apr 2014", "y": 7000000 }, { "x": "May 2014", "y": 7000000 }] },
     { "color": "#26A7DD", "key": "Rejected", "values": [{ "x": "Mar 2020", "y": 9000000 }, { "x": "Apr 2020", "y": 8500000 }, { "x": "May 2020", "y": 22000000 }, { "x": "Jun 2020", "y": 16500000 }, { "x": "Jul 2020", "y": 27700000 }, { "x": "Aug 2020", "y": 23500000 }, { "x": "Sep 2020", "y": 24000000 }, { "x": "Oct 2020", "y": 24500000 }, { "x": "Nov 2020", "y": 35000000 }, { "x": "Dec 2020", "y": 15500000 }, { "x": "Jan 2014", "y": 6000000 }, { "x": "Feb 2014", "y": 12900000 }, { "x": "Mar 2014", "y": 12100000 }, { "x": "Apr 2014", "y": 7000000 }, { "x": "May 2014", "y": 7000000 }] }];
    nv.addGraph(function () {
        var chart = nv.models.multiBarChart()
          .groupSpacing(0.5)
            .margin({ right: 50 });
        var formatter;
        formatter = function (d, i) {
            return d;
        }
        //Creates new tooltip container, or uses existing one on DOM.
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(StackedBarChartModal1, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        chart.xAxis.orient("bottom")
        .tickFormat(formatter);
        chart.yAxis.orient("left")
        .tickFormat(function (f) { return "$" + fnum(f); });
        chart.showLegend(true);
        chart.multibar.stacked(true); // default to stacked
        chart.showControls(true); // don't show controls
        chart.reduceXTicks(false);
        chart.forceY([0, 60000000]);
        d3.select('#' + ContralID)
        .datum(StackedBarChartModal11)
        .transition().duration(500).call(chart);
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
//prchasechart
function Get_StackedBarChartModal1(ContralID, StackedBarChartModal1) {
    //var StackedBarChartModal1 =
    //    [
    // { "color": "#E3DE4D", "key": "Unapproved", "values": [{ "x": "Mar 2020", "y": 2000000 }, { "x": "Apr 2020", "y": 5000000 }] },
    //{ "color": "#5FBA50", "key": " Approved", "values": [{ "x": "Mar 2020", "y": 1000000 }, { "x": "Apr 2020", "y": 2500000 }] },
    
    // { "color": "#26A7DD", "key": "Rejected ", "values": [{ "x": "Mar 2020", "y": 9000000 }, { "x": "Apr 2020", "y": 5000000 }] }];
    nv.addGraph(function () {
        var chart = nv.models.multiBarChart()
          .groupSpacing(0.5)
            .margin({ right: 50 });
        var formatter;
        formatter = function (d, i) {
            return d;
        }
        //Creates new tooltip container, or uses existing one on DOM.
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2"></label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(StackedBarChartModal1, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        chart.xAxis.orient("bottom")
        .tickFormat(formatter);
        chart.yAxis.orient("left")
        .tickFormat(function (f) { return "$" + f });
        chart.showLegend(true);
        chart.multibar.stacked(false); // default to stacked
        chart.showControls(true); // don't show controls
        chart.reduceXTicks(false);
        chart.forceY([0, 100]);
        d3.select('#' + ContralID)
        .datum(StackedBarChartModal1)
        .transition().duration(500).call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });

}
function Get_StackedBarChartModalUserHome(ContralID, StackedBarChartModal1) {
    //var StackedBarChartModal1 =
    //    [
    // { "color": "#E3DE4D", "key": "Unapproved", "values": [{ "x": "Mar 2020", "y": 2000000 }, { "x": "Apr 2020", "y": 5000000 }] },
    //{ "color": "#5FBA50", "key": " Approved", "values": [{ "x": "Mar 2020", "y": 1000000 }, { "x": "Apr 2020", "y": 2500000 }] },

    // { "color": "#26A7DD", "key": "Rejected ", "values": [{ "x": "Mar 2020", "y": 9000000 }, { "x": "Apr 2020", "y": 5000000 }] }];
    nv.addGraph(function () {
        var chart = nv.models.multiBarChart()
          .groupSpacing(0.5)
            .margin({ right: 50 });

        var formatter;
        formatter = function (d, i) {
            return d;
        }
        //Creates new tooltip container, or uses existing one on DOM.
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2"></label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(StackedBarChartModal1, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        chart.xAxis.orient("bottom")
        .tickFormat(formatter);
        chart.yAxis.orient("left")
        .tickFormat(function (f) { return "$" + f });
        chart.showLegend(true);
        chart.multibar.stacked(false); // default to stacked
        chart.showControls(true); // don't show controls
        chart.reduceXTicks(false);
        chart.forceY([0, 100]);
        d3.select('#' + ContralID)
        .datum(StackedBarChartModal1)
        .transition().duration(500).call(chart);
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
//PAYMENT
function Get_StackedBarChartModal15(ContralID) {
    var StackedBarChartModal15 =
        [
     { "color": "#E3DE4D", "key": "Hold", "values": [{ "x": "Mar 2020", "y": 2000000 }, { "x": "Apr 2020", "y": 5000000 }, { "x": "May 2020", "y": 7000000 }, { "x": "Jun 2020", "y": 7500000 }, { "x": "Jul 2020", "y": 7700000 }, { "x": "Aug 2020", "y": 3500000 }, { "x": "Sep 2020", "y": 4000000 }, { "x": "Oct 2020", "y": 4500000 }, { "x": "Nov 2020", "y": 5000000 }, { "x": "Dec 2020", "y": 1500000 }, { "x": "Jan 2014", "y": 1600000 }, { "x": "Feb 2014", "y": 6500000 }, { "x": "Mar 2014", "y": 7000000 }, { "x": "Apr 2014", "y": 7000000 }, { "x": "May 2014", "y": 7000000 }] },
     { "color": "#5FBA50", "key": "Refund", "values": [{ "x": "Mar 2020", "y": 1000000 }, { "x": "Apr 2020", "y": 2500000 }, { "x": "May 2020", "y": 4600000 }, { "x": "Jun 2020", "y": 4000000 }, { "x": "Jul 2020", "y": 1800000 }, { "x": "Aug 2020", "y": 1900000 }, { "x": "Sep 2020", "y": 2000000 }, { "x": "Oct 2020", "y": 2100000 }, { "x": "Nov 2020", "y": 12200000 }, { "x": "Dec 2020", "y": 2300000 }, { "x": "Jan 2014", "y": 2400000 }, { "x": "Feb 2014", "y": 12500000 }, { "x": "Mar 2014", "y": 22600000 }, { "x": "Apr 2014", "y": 7000000 }, { "x": "May 2014", "y": 7000000 }] },
     { "color": "#57D0B5", "key": "Payment error ", "values": [{ "x": "Mar 2020", "y": 6000000 }, { "x": "Apr 2020", "y": 7000000 }, { "x": "May 2020", "y": 4500000 }, { "x": "Jun 2020", "y": 9000000 }, { "x": "Jul 2020", "y": 2700000 }, { "x": "Aug 2020", "y": 1800000 }, { "x": "Sep 2020", "y": 5900000 }, { "x": "Oct 2020", "y": 2000000 }, { "x": "Nov 2020", "y": 100000 }, { "x": "Dec 2020", "y": 2200000 }, { "x": "Jan 2014", "y": 2300000 }, { "x": "Feb 2014", "y": 2400000 }, { "x": "Mar 2014", "y": 500000 }, { "x": "Apr 2014", "y": 7000000 }, { "x": "May 2014", "y": 7000000 }] },
     { "color": "#26A7DD", "key": "Awaiting for approval ", "values": [{ "x": "Mar 2020", "y": 9000000 }, { "x": "Apr 2020", "y": 8500000 }, { "x": "May 2020", "y": 22000000 }, { "x": "Jun 2020", "y": 16500000 }, { "x": "Jul 2020", "y": 27700000 }, { "x": "Aug 2020", "y": 23500000 }, { "x": "Sep 2020", "y": 24000000 }, { "x": "Oct 2020", "y": 24500000 }, { "x": "Nov 2020", "y": 35000000 }, { "x": "Dec 2020", "y": 15500000 }, { "x": "Jan 2014", "y": 6000000 }, { "x": "Feb 2014", "y": 12900000 }, { "x": "Mar 2014", "y": 12100000 }, { "x": "Apr 2014", "y": 7000000 }, { "x": "May 2014", "y": 7000000 }] }];
    nv.addGraph(function () {
        var chart = nv.models.multiBarChart()
          .groupSpacing(0.5)
            .margin({ right: 50 });
        var formatter;
        formatter = function (d, i) {
            return d;
        }
        //Creates new tooltip container, or uses existing one on DOM.
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(StackedBarChartModal1, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        chart.xAxis.orient("bottom")
        .tickFormat(formatter);
        chart.yAxis.orient("left")
        .tickFormat(function (f) { return "$" + fnum(f); });
        chart.showLegend(true);
        chart.multibar.stacked(true); // default to stacked
        chart.showControls(true); // don't show controls
        chart.reduceXTicks(false);
        chart.forceY([0, 60000000]);
        d3.select('#' + ContralID)
        .datum(StackedBarChartModal15)
        .transition().duration(500).call(chart);
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
//PAYMENT
function Get_StackedBarChartModal16(ContralID) {
    var StackedBarChartModal16 =
        [
     { "color": "#E3DE4D", "key": "Paid", "values": [{ "x": "Mar 2020", "y": 2000000 }, { "x": "Apr 2020", "y": 5000000 }, { "x": "May 2020", "y": 7000000 }, { "x": "Jun 2020", "y": 7500000 }, { "x": "Jul 2020", "y": 7700000 }, { "x": "Aug 2020", "y": 3500000 }, { "x": "Sep 2020", "y": 4000000 }, { "x": "Oct 2020", "y": 4500000 }, { "x": "Nov 2020", "y": 5000000 }, { "x": "Dec 2020", "y": 1500000 }, { "x": "Jan 2014", "y": 1600000 }, { "x": "Feb 2014", "y": 6500000 }, { "x": "Mar 2014", "y": 7000000 }, { "x": "Apr 2014", "y": 7000000 }, { "x": "May 2014", "y": 7000000 }] },
     { "color": "#D94F43", "key": "Received", "values": [{ "x": "Mar 2020", "y": 1000000 }, { "x": "Apr 2020", "y": 2500000 }, { "x": "May 2020", "y": 4600000 }, { "x": "Jun 2020", "y": 4000000 }, { "x": "Jul 2020", "y": 1800000 }, { "x": "Aug 2020", "y": 1900000 }, { "x": "Sep 2020", "y": 2000000 }, { "x": "Oct 2020", "y": 2100000 }, { "x": "Nov 2020", "y": 12200000 }, { "x": "Dec 2020", "y": 2300000 }, { "x": "Jan 2014", "y": 2400000 }, { "x": "Feb 2014", "y": 7000000 }, { "x": "Mar 2014", "y": 7000000 }, { "x": "Apr 2014", "y": 7000000 }, { "x": "May 2014", "y": 7000000 }] },
     { "color": "#5FBA50", "key": "Deposit", "values": [{ "x": "Mar 2020", "y": 1000000 }, { "x": "Apr 2020", "y": 2500000 }, { "x": "May 2020", "y": 4600000 }, { "x": "Jun 2020", "y": 4000000 }, { "x": "Jul 2020", "y": 1800000 }, { "x": "Aug 2020", "y": 1900000 }, { "x": "Sep 2020", "y": 2000000 }, { "x": "Oct 2020", "y": 2100000 }, { "x": "Nov 2020", "y": 12200000 }, { "x": "Dec 2020", "y": 2300000 }, { "x": "Jan 2014", "y": 2400000 }, { "x": "Feb 2014", "y": 12500000 }, { "x": "Mar 2014", "y": 22600000 }, { "x": "Apr 2014", "y": 7000000 }, { "x": "May 2014", "y": 7000000 }] },
     { "color": "#57D0B5", "key": "Cancalled", "values": [{ "x": "Mar 2020", "y": 6000000 }, { "x": "Apr 2020", "y": 7000000 }, { "x": "May 2020", "y": 4500000 }, { "x": "Jun 2020", "y": 9000000 }, { "x": "Jul 2020", "y": 2700000 }, { "x": "Aug 2020", "y": 1800000 }, { "x": "Sep 2020", "y": 5900000 }, { "x": "Oct 2020", "y": 2000000 }, { "x": "Nov 2020", "y": 100000 }, { "x": "Dec 2020", "y": 2200000 }, { "x": "Jan 2014", "y": 2300000 }, { "x": "Feb 2014", "y": 2400000 }, { "x": "Mar 2014", "y": 500000 }, { "x": "Apr 2014", "y": 7000000 }, { "x": "May 2014", "y": 7000000 }] },

     { "color": "#26A7DD", "key": "Waiting ", "values": [{ "x": "Mar 2020", "y": 9000000 }, { "x": "Apr 2020", "y": 8500000 }, { "x": "May 2020", "y": 22000000 }, { "x": "Jun 2020", "y": 16500000 }, { "x": "Jul 2020", "y": 27700000 }, { "x": "Aug 2020", "y": 23500000 }, { "x": "Sep 2020", "y": 24000000 }, { "x": "Oct 2020", "y": 24500000 }, { "x": "Nov 2020", "y": 35000000 }, { "x": "Dec 2020", "y": 15500000 }, { "x": "Jan 2014", "y": 6000000 }, { "x": "Feb 2014", "y": 12900000 }, { "x": "Mar 2014", "y": 12100000 }, { "x": "Apr 2014", "y": 7000000 }, { "x": "May 2014", "y": 7000000 }] }];
    nv.addGraph(function () {
        var chart = nv.models.multiBarChart()
          .groupSpacing(0.5)
            .margin({ right: 50 });
        var formatter;
        formatter = function (d, i) {
            return d;
        }
        //Creates new tooltip container, or uses existing one on DOM.
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(StackedBarChartModal1, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        chart.xAxis.orient("bottom")
        .tickFormat(formatter);
        chart.yAxis.orient("left")
        .tickFormat(function (f) { return "$" + fnum(f); });
        chart.showLegend(true);
        chart.multibar.stacked(true); // default to stacked
        chart.showControls(true); // don't show controls
        chart.reduceXTicks(false);
        chart.forceY([0, 60000000]);
        d3.select('#' + ContralID)
        .datum(StackedBarChartModal16)
        .transition().duration(500).call(chart);
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
//Type1
function Get_StackedBarChartType1(ContralID) {
    var StackedBarChartType1 =
        [
     { "color": "#5FBA50", "key": "TAL", "values": [{ "x": "Never Had Activity", "y": 0 }, { "x": "0 to 7 days", "y": 150 }, { "x": "8 to 15 days", "y": 98 }, { "x": "16 to 30 days", "y": 270 }, { "x": "31 to 60 days ", "y": 125 }, { "x": "61 to 120 days", "y": 68 }, { "x": ">120 days", "y": 283 }] },
     { "color": "#57D0B5", "key": "MQL", "values": [{ "x": "Never Had Activity", "y": 20 }, { "x": "0 to 7 days", "y": 580 }, { "x": "8 to 15 days", "y": 382 }, { "x": "16 to 30 days", "y": 223 }, { "x": "31 to 60 days ", "y": 232 }, { "x": "61 to 120 days", "y": 219 }, { "x": ">120 days", "y": 1286 }] },
     { "color": "#3FC0F6", "key": "Lead", "values": [{ "x": "Never Had Activity", "y": 120 }, { "x": "0 to 7 days", "y": 860 }, { "x": "8 to 15 days", "y": 155 }, { "x": "16 to 30 days", "y": 132 }, { "x": "31 to 60 days ", "y": 87 }, { "x": "61 to 120 days", "y": 56 }, { "x": ">120 days", "y": 178 }] },
        ];
    nv.addGraph(function () {
        var chart = nv.models.multiBarChart()
          .groupSpacing(0.5)
        //  .margin({ right: 50 });
        var formatter;
        formatter = function (d, i) {
            return d;
        }
        //Creates new tooltip container, or uses existing one on DOM.
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(StackedBarChartType1, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        chart.xAxis.orient("bottom")
        .tickFormat(formatter);
        chart.yAxis.orient("left")
        .tickFormat(function (f) { return "" + f; });
        chart.showLegend(false);
        chart.multibar.stacked(true); // default to stacked
        chart.showControls(false); // don't show controls
        chart.reduceXTicks(false);
        chart.forceY([0, 2000]);
        d3.select('#' + ContralID)
        .datum(StackedBarChartType1)
        .transition().duration(500).call(chart);
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


//Type2
function Get_StackedBarChartType2(ContralID) {
    var StackedBarChartType2 =
        [
     { "color": "#FFC23D", "key": "Meeting Schd.", "values": [{ "x": "31 Oct 2020", "y": 1 }, { "x": "30 Nov 2020", "y": 2 }, { "x": "31 Dec 2020", "y": 3 }, { "x": "28 Jan 2014", "y": 4 }] },
     { "color": "#E3DE4D", "key": "TQL", "values": [{ "x": "31 Oct 2020", "y": 4 }, { "x": "30 Nov 2020", "y": 8 }, { "x": "31 Dec 2020", "y": 6 }, { "x": "28 Jan 2014", "y": 7 }] },
     { "color": "#5FBA50", "key": "TAL", "values": [{ "x": "31 Oct 2020", "y": 3 }, { "x": "30 Nov 2020", "y": 4 }, { "x": "31 Dec 2020", "y": 5 }, { "x": "28 Jan 2014", "y": 6 }] },
     { "color": "#57D0B5", "key": "MQL", "values": [{ "x": "31 Oct 2020", "y": 4 }, { "x": "30 Nov 2020", "y": 5 }, { "x": "31 Dec 2020", "y": 6 }, { "x": "28 Jan 2014", "y": 7 }] },
     { "color": "#3FC0F6", "key": "Lead", "values": [{ "x": "31 Oct 2020", "y": 5 }, { "x": "30 Nov 2020", "y": 4 }, { "x": "31 Dec 2020", "y": 9 }, { "x": "28 Jan 2014", "y": 15 }] }
        ];
    nv.addGraph(function () {
        var chart = nv.models.multiBarChart()
          .groupSpacing(0.65)
        // .margin({ right: 50 });
        var formatter;
        formatter = function (d, i) {
            return d;
        }
        //Creates new tooltip container, or uses existing one on DOM.
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2"></label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(StackedBarChartType2, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        chart.xAxis.orient("bottom")
        .tickFormat(formatter);
        chart.yAxis.orient("left")
        .tickFormat(function (f) { return "" + f + "K"; });
        chart.showLegend(false);
        chart.multibar.stacked(true); // default to stacked
        chart.showControls(false); // don't show controls
        chart.reduceXTicks(false);
        chart.forceY([0, 40]);
        d3.select('#' + ContralID)
        .datum(StackedBarChartType2)
        .transition().duration(500).call(chart);
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

//LinePlusBarwithFocus
function Get_LinePlusBarwithFocusChart(ChartID) {
    var testdata = [{
        "key": "Unconverted Leads",
        "bar": true,
        "values": [{
            "x": 0,
            "y": 2420
        }, {
            "x": 1,
            "y": 1330
        }, {
            "x": 2,
            "y": 1760
        }, {
            "x": 3,
            "y": 1460
        }, {
            "x": 4,
            "y": 2895
        }, {
            "x": 5,
            "y": 2195
        }, {
            "x": 6,
            "y": 1845
        }, {
            "x": 7,
            "y": 2255
        }, {
            "x": 8,
            "y": 1195
        }, {
            "x": 9,
            "y": 1355
        }, {
            "x": 10,
            "y": 2145
        }]
    }, {
        "key": "Converted Leads",
        "bar": true,
        "values": [{
            "x": 0,
            "y": 120
        }, {
            "x": 1,
            "y": 121
        }, {
            "x": 2,
            "y": 148
        }, {
            "x": 3,
            "y": 218
        }, {
            "x": 4,
            "y": 164
        }, {
            "x": 5,
            "y": 120
        }, {
            "x": 6,
            "y": 134
        }, {
            "x": 7,
            "y": 121
        }, {
            "x": 8,
            "y": 134
        }, {
            "x": 9,
            "y": 113
        }, {
            "x": 10,
            "y": 164
        }]
    },
     {
         "key": "Opportunity Conversion Rate",
         "values": [{
             "x": 0, "y": 4.5
         }, {
             "x": 1, "y": 6
         },
         {
             "x": 2, "y": 4
         }, {
             "x": 3, "y": 4.8
         }, {
             "x": 4, "y": 1.6
         }, {
             "x": 5,
             "y": 1.2
         }, {
             "x": 6,
             "y": 5.6
         }, {
             "x": 7,
             "y": 6.8
         }, {
             "x": 8,
             "y": 6.2
         }, {
             "x": 9,
             "y": 8
         }, {
             "x": 10,
             "y": 8.2
         }]
     }

    ];
    testdata[0].type = "bar"
    testdata[0].yAxis = 1

    testdata[0].color = "#57D0B5"
    testdata[1].type = "bar"
    testdata[1].yAxis = 1
    testdata[1].color = "#26A7DD"
    testdata[2].type = "line"
    testdata[2].yAxis = 2
    testdata[2].color = "#5FBA4F"
    nv.addGraph(function () {
        var chart = nv.models.linePlusBarWithFocusChart()

        //  .margin({ top: 30, right: 80, bottom: 50, left: 70 })
                .x(function (d, i) { return i })
                .color(d3.scale.category10().range());
        chart.xAxis.tickFormat(function (d) {
            var dx = testdata[0].values[d] && testdata[0].values[d].x || 0;
            if (dx > 0) {
                return d3.time.format('%x')(new Date(dx))
            }
            return null;
        });
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(testdata, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        chart.x2Axis.tickFormat(function (d) {
            var dx = testdata[0].values[d] && testdata[0].values[d].x || 0;
            return d3.time.format('%x')(new Date(dx))
        });
        chart.y1Axis.tickFormat(function (f) { return "$" + f + ""; });
        chart.y3Axis.tickFormat(d3.format(',f'));
        chart.y2Axis.tickFormat(function (f) { return f + "%"; });
        chart.y4Axis.tickFormat(function (d) { return '' + d3.format(',.2f')(d) });

        chart.bars.forceY([0, 3000]);
        //  chart.bars2.forceY([0,10]);
        chart.lines.forceY([0, 10]);
        nv.log(testdata);
        d3.select('#' + ChartID)
                .datum(testdata)
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
//AdminHome
function Get_StackedBarChartModal19(ContralID) {
    var StackedBarChartModal19 =
        [
     { "color": "#E3DE4D", "key": "Order placement", "values": [{ "x": "Jun 2019", "y": 2000000 }, { "x": "Jul 2019", "y": 5000000 }, { "x": "Aug 2019", "y": 7000000 }, { "x": "Sep 2019", "y": 7500000 }, { "x": "Oct 2019", "y": 7700000 }, { "x": "Nov 2019", "y": 3500000 }, { "x": "Dec 2019", "y": 4000000 }, { "x": "Jan 2020", "y": 4500000 }, { "x": "Feb 2020", "y": 5000000 }, { "x": "Mar 2020", "y": 1500000 }] },
     { "color": "#5FBA50", "key": "Confirmation", "values": [{ "x": "Jun 2019", "y": 1000000 }, { "x": "Jul 2019", "y": 2500000 }, { "x": "Aug 2019", "y": 4600000 }, { "x": "Sep 2019", "y": 4000000 }, { "x": "Oct 2019", "y": 1800000 }, { "x": "Nov 2019", "y": 1900000 }, { "x": "Dec 2019", "y": 2000000 }, { "x": "Jan 2020", "y": 2100000 }, { "x": "Feb 2020", "y": 12200000 }, { "x": "Mar 2020", "y": 2300000 }] },
     { "color": "#57D0B5", "key": "Invoicing", "values": [{ "x": "Jun 2019", "y": 6000000 }, { "x": "Jul 2019", "y": 7000000 }, { "x": "Aug 2019", "y": 4500000 }, { "x": "Sep 2019", "y": 9000000 }, { "x": "Oct 2019", "y": 2700000 }, { "x": "Nov 2019", "y": 1800000 }, { "x": "Dec 2019", "y": 5900000 }, { "x": "Jan 2020", "y": 2000000 }, { "x": "Feb 2020", "y": 100000 }, { "x": "Mar 2020", "y": 2200000 }] },
     { "color": "#26A7DD", "key": "Delivery", "values": [{ "x": "Jun 2019", "y": 9000000 }, { "x": "Jul 2019", "y": 8500000 }, { "x": "Aug 2019", "y": 22000000 }, { "x": "Sep 2019", "y": 16500000 }, { "x": "Oct 2019", "y": 27700000 }, { "x": "Nov 2019", "y": 23500000 }, { "x": "Dec 2019", "y": 24000000 }, { "x": "Jan 2020", "y": 24500000 }, { "x": "Feb 2020", "y": 35000000 }, { "x": "Mar 2020", "y": 15500000 }] }];
    nv.addGraph(function () {
        var chart = nv.models.multiBarChart()
          .groupSpacing(0.5)
            .margin({ right: 0 });
        var formatter;
        formatter = function (d, i) {
            return d;
        }
        //Creates new tooltip container, or uses existing one on DOM.
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(StackedBarChartModal1, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        chart.xAxis.orient("bottom")
        .tickFormat(formatter);
        chart.yAxis.orient("left")
        .tickFormat(function (f) { return "$" + fnum(f); });
        chart.showLegend(true);
        chart.multibar.stacked(true); // default to stacked
        chart.showControls(true); // don't show controls
        chart.reduceXTicks(false);
        chart.forceY([0, 60000000]);
        d3.select('#' + ContralID)
        .datum(StackedBarChartModal19)
        .transition().duration(500).call(chart);
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



//Income And Expenses- Home Screen
function Get_Income_Expenses(ContralID) {
    var StackedBarChartModal19 =
        [
     { "color": "#26A7DD", "key": "Expenses", "values": [{ "x": "Jun 2019", "y": 20000000 }, { "x": "Jul 2019", "y": 20000000 }, { "x": "Aug 2019", "y": 1500000 }, { "x": "Sep 2019", "y": 40000000 }, { "x": "Oct 2019", "y": 15000000 }, { "x": "Nov 2019", "y": 3500000 }, { "x": "Dec 2019", "y": 20000000 }, { "x": "Jan 2020", "y": 4500000 }, { "x": "Feb 2020", "y": 5000000 }, { "x": "Mar 2020", "y": 40000000 }] },
     { "color": "#57D0B5", "key": "Income", "values": [{ "x": "Jun 2019", "y": 35000000 }, { "x": "Jul 2019", "y": 25000000 }, { "x": "Aug 2019", "y": 20000000 }, { "x": "Sep 2019", "y": 35000000 }, { "x": "Oct 2019", "y": 45000000 }, { "x": "Nov 2019", "y": 50000000 }, { "x": "Dec 2019", "y": 25000000 }, { "x": "Jan 2020", "y": 35000000 }, { "x": "Feb 2020", "y": 12200000 }, { "x": "Mar 2020", "y": 35000000 }] },
        ];
    nv.addGraph(function () {
        var chart = nv.models.multiBarChart()
          .groupSpacing(0.5)
            .margin({ right: 0 });
        var formatter;
        formatter = function (d, i) {
            return d;
        }
        //Creates new tooltip container, or uses existing one on DOM.
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(StackedBarChartModal1, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        chart.xAxis.orient("bottom")
        .tickFormat(formatter);
        chart.yAxis.orient("left")
        .tickFormat(function (f) { return "$" + fnum(f); });
        chart.showLegend(true);
        chart.multibar.stacked(true); // default to stacked
        chart.showControls(true); // don't show controls
        chart.reduceXTicks(false);
        chart.forceY([0, 60000000]);
        d3.select('#' + ContralID)
        .datum(StackedBarChartModal19)
        .transition().duration(500).call(chart);
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

//Income And Expenses Modal Popu- Home Screen
function Get_Income_Expenses_product(ContralID) {
    var StackedBarChartModal20 =
        [
     { "color": "#219AB5", "key": "Expenses", "values": [{ "x": "2018", "y": 20000000 }, { "x": "2019", "y": 50000000 }, { "x": "2020", "y": 1500000 }] },
     
        ];
    nv.addGraph(function () {
        var chart = nv.models.multiBarChart()
          .groupSpacing(0.5)
            .margin({ right: 0 });
        var formatter;
        formatter = function (d, i) {
            return d;
        }
        //Creates new tooltip container, or uses existing one on DOM.
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(StackedBarChartModal1, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        chart.xAxis.orient("bottom")
        .tickFormat(formatter);
        chart.yAxis.orient("left")
        .tickFormat(function (f) { return "$" + fnum(f); });
        chart.showLegend(false);
        chart.multibar.stacked(false); // default to stacked
        chart.showControls(false); // don't show controls
        chart.reduceXTicks(false);
        chart.forceY([0, 60000000]);
        d3.select('#' + ContralID)
        .datum(StackedBarChartModal20)
        .transition().duration(500).call(chart);
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


//Payable by Category Modal Popu- Home Screen
function Get_pay_catgry(ContralID) {
    var StackedBarChartModalPay =
        [
     { "color": "#34D3EB", "key": "Expenses", "values": [{ "x": "Total Bills", "y": 98411000.64 }, { "x": "Unapproved", "y": 42244000.63 }, { "x": "Approved", "y": 22623000.03 }, { "x": "Reject", "y": 17480000.94 }] },

        ];
    nv.addGraph(function () {
        var chart = nv.models.multiBarChart()
          .groupSpacing(0.5)
            .margin({ right: 0 });
        var formatter;
        formatter = function (d, i) {
            return d;
        }
        //Creates new tooltip container, or uses existing one on DOM.
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(StackedBarChartModal1, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        chart.xAxis.orient("bottom")
        .tickFormat(formatter);
        chart.yAxis.orient("left")
        .tickFormat(function (f) { return "" + fnum(f); });
        chart.showLegend(false);
        chart.multibar.stacked(false); // default to stacked
        chart.showControls(false); // don't show controls
        chart.reduceXTicks(false);
        chart.forceY([0, 60000000]);
        d3.select('#' + ContralID)
        .datum(StackedBarChartModalPay)
        .transition().duration(500).call(chart);
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