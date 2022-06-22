function Get_PieChart(ChartID) {

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
        //        height = 230;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        //.margin({ top: -14, right: -170, bottom: 10, left: 60 })
         .donut(false)

        .color(['#EF7F67', '#aaa', '#5fba50', '#ffc23e', '#19ccff'])
        //        .width(width)
        //         .height(height);
        chart.showLegend(false);
        chart.labelType(false);
        chart.pieLabelsOutside(false);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Apr 27, 2020 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(Data_PieChart, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
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
//Pie Labels Outside

function Get_PieChartLabelsOutside(ChartID) {

    var Data_PieChart = [
    {
        key: "Bills & Utilities (26%)",
        y: 26


    },
    {
        key: "travel (8%)",
        y: 8


    },
    {
        key: "Food (24%)",
        y: 24


    },
    {
        key: "Shopping (14%)",
        y: 14


    },
    {
        key: "Entertainment (8%)",
        y: 8


    },
    {
        key: "Others (20%)",
        y: 20


    }
    ];


    nv.addGraph(function () {
        // var width = cWidth,
        //    height = cHeight;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        // .margin({ top: 5, right: 0, bottom: 5, left: 0 })
         .donut(false)
         .showLegend(true)
         .donutRatio(0.75)
         .height(550)
         .width(550)
         .color(['#6FB979', '#31B2B1', '#E4B34A', '#F7F06C', '#CB9AC7', '#D16056']);
        

        chart.showLegend(false);
        chart.labelType(false);
        chart.pieLabelsOutside(true);
        chart.labelThreshold(labelThreshold = .09);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Apr 27, 2020 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(Data_PieChart, key, x, y) + '">' + x + ' on' + "   " + key + '</label><label class="label-tooltip-kpi-title-s2"></label>' + "   " + '<br></div></div>'
        });

        d3.select("#" + ChartID + "")
        .attr("fill", "white")
         .datum(Data_PieChart)
        .transition().duration(1200)
          .call(chart);
        // chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
        nv.utils.windowResize(chart.update);
        return chart;
    });
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

}

//Pie Labels Inside 

function Get_PieChartLabelsInside(ChartID) {

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
        //        var width = cWidth,
        //        height = cHeight;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
         //.margin({ top: 0, right: 60, bottom: 5, left:0 })
         .donut(false)
         .showLegend(true)
         .color(['#F45B5B', '#7798BF', '#AAEEEE', '#2B908F', '#90EE7E']);
        //.width(width)
        // .height(height);
        chart.showLegend(true);
        chart.labelType(true);
        chart.pieLabelsOutside(false);
        chart.labelThreshold(labelThreshold = .09);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Apr 27, 2020 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(Data_PieChart, key, x, y) + '">' + x + ' on' + "   " + key + '</label><label class="label-tooltip-kpi-title-s2"></label>' + "   " + '<br></div></div>'
        });
        d3.select("#" + ChartID + "")
        .attr("fill", "white")
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

//Pie chart values inside

function Get_PieChartValuesInside(ChartID) {

    var Data_PieChartinside = [
    {
        key: "Bills & Utilities (26%)",
        y: 26


    },
    {
        key: "travel (8%)",
        y: 8


    },
    {
        key: "Food (24%)",
        y: 24


    },
    {
        key: "Shopping (14%)",
        y: 14


    },
    {
        key: "Entertainment (8%)",
        y: 8


    },
    {
        key: "Others (20%)",
        y: 20


    }
    ];


    nv.addGraph(function () {
        //        var width = cWidth,
        //        height = cHeight;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
       // .margin({ top: 5, right: 0, bottom: 5, left: 0 })
         .donut(false)

          .color(['#6FB979', '#31B2B1', '#E4B34A', '#F7F06C', '#CB9AC7', '#D16056']);
        //  .width(width)
        // .height(height);

        chart.labelType(labelType = "key")
        chart.showLabels(false);
         chart.pieLabelsOutside(true);
        chart.showLegend(true);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2020</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_PieChartinside, key, x, y) + '">' + x + ' on' + " " + key + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select("#" + ChartID + "")

  .style("stroke-width", "4px")
          .datum(Data_PieChartinside)
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

//Pie chart Values outside

function Get_PieChartValuesOutside(ChartID, Data_PieChartoutside) {

    //var Data_PieChartoutside = [
    //{
    //    key: "TM",
    //    y: 10

    //},
    //{
    //    key: "CRM",
    //    y: 0

    //},
    //{
    //    key: "PST",
    //    y: 0

    //},
    //{
    //    key: "FMLA",
    //    y: 0

    //}
    //];


    nv.addGraph(function () {
        //        var width = cWidth,
        //        height = cHeight;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        //  .margin({ top: 5, right: 0, bottom: 5, left: 0 })
         .donut(false)

         .color(['#2DB5D4', '#c8a0e2', '#04763c', '#DE756C', '#BAE16E', '#5ace78', '#f3a23d', '#DE756C']);
        // .width(width)
        // .height(height);
        chart.labelType(labelType = "value")

        chart.pieLabelsOutside(true);
        chart.showLegend(false);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2"></label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(Data_PieChartoutside, key, x, y) + '">' + x + ' on' + key + '</label><label class="label-tooltip-kpi-title-s2"></label>' + "   " + '<br></div></div>'
        });
        d3.select("#" + ChartID + "")

        .style("stroke-width", "10px")
        .datum(Data_PieChartoutside)
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
//percent indide

function Get_PieChartpercentInside(ChartID) {

    var Data_PieChartinside = [
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
        //        var width = cWidth,
        //        height = cHeight;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        //  .margin({ top: 5, right: 0, bottom: 5, left: 0 })
         .donut(false)

         .color(['#DB821A', '#E8D701', '#33A142', '#4B548D']);
        // .width(width)
        //   .height(height);
        chart.labelType(labelType = "percent")

        chart.pieLabelsOutside(false);
        chart.showLegend(false);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Apr 27, 2020 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(Data_PieChartinside, key, x, y) + '">' + x + ' on' + key + '</label><label class="label-tooltip-kpi-title-s2"></label>' + "   " + '<br></div></div>'
        });
        d3.select("#" + ChartID + "")

        .style("stroke-width", "4px")
        .datum(Data_PieChartinside)
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
//percent outside

function Get_PieChartpercentOutside(ChartID) {

    var Data_PieChartoutside = [
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
        key: "FMLA",
        y: 10

    }
    ];


    nv.addGraph(function () {
        // var width = cWidth,
        // height = cHeight;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        //  .margin({ top: 0, right: 0, bottom: 0, left: 160 })
         .donut(false)

         .color(['#26A7DD', '#E96955', '#FFC23E', '#E1DB3F', '#5FBA50']);
        // .width(300)
        // .height(300);
        chart.labelType(labelType = "percent")

        chart.pieLabelsOutside(true);
        chart.showLegend(false);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Apr 27, 2020 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(Data_PieChartoutside, key, x, y) + '">' + x + ' on' + key + '</label><label class="label-tooltip-kpi-title-s2"></label>' + "   " + '<br></div></div>'
        });
        d3.select("#" + ChartID + "")
       .style("stroke-width", "4px")
       .attr("text-anchor", "middle")
          .datum(Data_PieChartoutside)
           .attr("class", "slice")
        .transition().duration(1200)
        .attr("transform", "translate(" + 1.5 * 1000 + "," + 1.5 * 1000 + ")")
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
//percent indide

function Get_PieChartSmall2(ChartID) {

    var Data_PieChartinside = [
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
        // var width = cWidth,
        //    height = cHeight;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        //  .margin({ top: 50, right: 60, bottom: 5, left: 70 })
         .donut(false)

         .color(['#DB821A', '#E8D701', '#33A142', '#4B548D']);
        // .width(width)
        //  .height(height);
        chart.labelType(labelType = "percent")

        chart.pieLabelsOutside(false);
        chart.showLegend(false);
        chart.showLabels(false);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Apr 27, 2020 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(Data_PieChartinside, key, x, y) + '">' + x + ' on' + key + '</label><label class="label-tooltip-kpi-title-s2"></label>' + "   " + '<br></div></div>'
        });
        d3.select("#" + ChartID + "")

  .style("stroke-width", "4px")
          .datum(Data_PieChartinside)
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


//percent outside

function Get_PieChartsmall1(ChartID) {

    var Data_PieChartoutside = [
    {
        key: "TM (10%)",
        y: 10

    },
    {
        key: "CRM (20%)",
        y: 20

    },
    {
        key: "PST (40%)",
        y: 40

    },
    {
        key: "FMLA (10%)",
        y: 10

    },
    {
        key: "FMLA (10%)",
        y: 10

    }
    ];


    nv.addGraph(function () {
        //        var width = cWidth,
        //        height = cheight;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        //  .margin({ top: 5, right: 0, bottom: 5, left: 0 })
         .donut(false)

         .color(['#95CEFF', '#FF7599', '#FFBC75', '#90ED7D', '#8085E9']);
        //        .width(width)
        //         .height(height);
        // chart.labelType(labelType = "percent");
        chart.showLabels(true);
        chart.pieLabelsOutside(true);
        chart.showLegend(false);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2"></label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(Data_PieChartoutside, key, x, y) + '">' + x + ' on ' + key + '</label><label class="label-tooltip-kpi-title-s2"></label>' + "   " + '<br></div></div>'
        });
        d3.select("#" + ChartID + "")
         .style("stroke-width", "4px")
          .datum(Data_PieChartoutside)
            .attr("class", "slice")
            .attr("font-size", "14")
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

//ReceivedAR

function Get_PieChartReceivedAR(ChartID) {

    var ReceivedAR = [
    {
        key: "Jan",
        y: 10


    },
    {
        key: "Apr",
        y: 20


    },
    {
        key: "Mar",
        y: 40


    },
    {
        key: "Apr",
        y: 10


    },
    {
        key: "May",
        y: 20


    }
    ];

    nv.addGraph(function () {
        //        var width = cWidth,
        //        height = cheight;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        //  .margin({ top: 0, right: 0, bottom: 0, left: 0 })
         .donut(false)
         .showLegend(true)
         .color(['#F45B5B', '#7798BF', '#AAEEEE', '#2B908F', '#90EE7E'])
        //        .width(width)
        //         .height(height);
        chart.showLegend(false);
        chart.labelType(false);
        chart.pieLabelsOutside(false);
        chart.labelThreshold(labelThreshold = .09);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Apr 27, 2020 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(ReceivedAR, key, x, y) + '">' + x + ' on' + key + '</label><label class="label-tooltip-kpi-title-s2"></label>' + "   " + '<br></div></div>'
        });
        d3.select("#" + ChartID + "")
        .attr("fill", "white")
         .datum(ReceivedAR)
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

function Get_PieChart(ChartID, data, option) {

    nv.addGraph(function () {
        option.width = 300,
        option.height = 300;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        .showLegend(option.showLegend)
          .tooltips(option.tooltips)
          .labelType(option.labelType = "key")
          .pieLabelsOutside(option.pieLabelsOutside)
        //.margin({ top: 30, right: 5, bottom: 50, left: 450 })
         .donut(option.donut)

        .color(['#EF7F67', '#aaa', '#5fba50', '#6FC352', '#D18FE2', '#E3DE4D', '#5FBA50', '#57D0B5', '#FFC23E', '#26A7DD', '#EF7F67', '#5699C7'])
                     .width(option.width)
                     .height(option.height);
        d3.select("#" + ChartID + "")
          .datum(data)
          .attr("transform", "translate(230,30)")
        .transition().duration(1200)
        .call(chart);
        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });

        return chart;
    });
}



function Get_PieChartLabelsOverall(ChartID) {

    var Data_PieChart = [
    {
        key: "Open Requests",
        y: 30


    },
    {
        key: "Uploaded ",
        y: 20


    },
    {
        key: "Approved ",
        y: 40


    },
    {
        key: "Re-Requests",
        y: 10


    }
    ];


    nv.addGraph(function () {
        //  var width = cWidth,
        //    height = cHeight;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        // .margin({ top: 5, right: 0, bottom: 5, left: 0 })
         .donut(false)
         .showLegend(true)
         .donutRatio(0.75)
         .height(200)
         .color(['#68478D', '#2DB5D4', '#77C45A', '#DE756C']);
        //.width(width)

        chart.showLegend(true);
        chart.labelType(false);
        chart.pieLabelsOutside(true);
        chart.labelThreshold(labelThreshold = .09);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Jan, 2019 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(Data_PieChart, key, x, y) + '">' + x + '% on' + "   " + key + '</label><label class="label-tooltip-kpi-title-s2"></label>' + "   " + '<br></div></div>'
        });


        d3.select("#" + ChartID + "")
        .attr("fill", "#7c7c7c")

         .datum(Data_PieChart)
         .attr('transform', 'translate(-50, 5)')

        .transition().duration(1200)
          .call(chart);

        var positionX = 230;
        var positionY = 30;
        var verticalOffset = 25;

        d3.selectAll('.nv-legend .nv-series')[0].forEach(function (d) {
            positionY += verticalOffset;
            d3.select(d).attr('transform', 'translate(' + (positionX + 40) + ',' + positionY + ')');
        });


        // chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
        nv.utils.windowResize(chart.update);
        return chart;
    });
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

}

function Get_PieChartLabelsInternal(ChartID) {

    var Data_PieChart = [

    {
        key: "Approved ",
        y: 40


    },
    {
        key: "Re-Requests",
        y: 20


    },
     {
         key: "New Requests",
         y: 40


     },
    {
        key: "Overdue Requests ",
        y: 30


    }
    ];


    nv.addGraph(function () {
        //  var width = cWidth,
        //    height = cHeight;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        // .margin({ top: 5, right: 0, bottom: 5, left: 0 })
         .donut(false)
         .showLegend(true)
         .donutRatio(0.75)
         .height(200)
         .color(['#77C45A', '#DE756C', '#0787A3', '#2DB5D4']);
        //.width(width)

        chart.showLegend(true);
        chart.labelType(false);
        chart.pieLabelsOutside(true);
        chart.labelThreshold(labelThreshold = .09);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Jan, 2019 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(Data_PieChart, key, x, y) + '">' + x + '% on' + "   " + key + '</label><label class="label-tooltip-kpi-title-s2"></label>' + "   " + '<br></div></div>'
        });

        d3.select("#" + ChartID + "")
        .attr("fill", "#7c7c7c")

         .datum(Data_PieChart)
         .attr('transform', 'translate(-50, 5)')

        .transition().duration(1200)
          .call(chart);

        var positionX = 230;
        var positionY = 10;
        var verticalOffset = 25;

        d3.selectAll('.nv-legend .nv-series')[0].forEach(function (d) {
            positionY += verticalOffset;

            d3.select(d).attr('transform', 'translate(' + (positionX + 40) + ',' + positionY + ')');
        });


        // chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
        nv.utils.windowResize(chart.update);
        return chart;
    });
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

}

function Get_PieChartLabelsExternal(ChartID) {

    var Data_PieChart = [
    {
        key: "New Requests",
        y: 50


    },
    {
        key: "Overdue Requests ",
        y: 30


    },
    {
        key: "Re-Requests ",
        y: 20


    }
    ];


    nv.addGraph(function () {
        //  var width = cWidth,
        //    height = cHeight;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        // .margin({ top: 5, right: 0, bottom: 5, left: 0 })
         .donut(false)
         .showLegend(true)
         .donutRatio(0.75)
         .height(200)
         .color(['#0787A3', '#2DB5D4', '#DE756C']);
        //.width(width)

        chart.showLegend(true);
        chart.labelType(false);
        chart.pieLabelsOutside(true);
        chart.labelThreshold(labelThreshold = .09);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Jan, 2019 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(Data_PieChart, key, x, y) + '">' + x + '% on' + "   " + key + '</label><label class="label-tooltip-kpi-title-s2"></label>' + "   " + '<br></div></div>'
        });

        d3.select("#" + ChartID + "")
        .attr("fill", "#7c7c7c")

         .datum(Data_PieChart)
         .attr('transform', 'translate(-50, 5)')

        .transition().duration(1200)
          .call(chart);

        var positionX = 230;
        var positionY = 30;
        var verticalOffset = 25;

        d3.selectAll('.nv-legend .nv-series')[0].forEach(function (d) {
            positionY += verticalOffset;
            d3.select(d).attr('transform', 'translate(' + (positionX + 40) + ',' + positionY + ')');
        });

        // chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
        nv.utils.windowResize(chart.update);
        return chart;
    });
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

}

function Get_PieChartLabelsOverallStatus(ChartID) {

    var Data_PieChart = [
    {
        key: "Waiting for approval",
        y: 40


    },
    {
        key: "Overdue ",
        y: 20


    },
    {
        key: "Approved ",
        y: 30

    },
    {
        key: "Re-Requested",
        y: 10


    }
    ];


    nv.addGraph(function () {
        //  var width = cWidth,
        //    height = cHeight;
        var chart = nv.models.pieChart()
        .x(function (d) { return d.key })
        .y(function (d) { return d.y })
        // .margin({ top: 5, right: 0, bottom: 5, left: 0 })
         .donut(false)
         .showLegend(true)
         .donutRatio(0.75)
         .height(250)
         .color(['#FC6E17 ', '#73A140', '#00AFBD', '#ff8080']);
        //.width(width)

        chart.showLegend(true);
        chart.labelType(false);
        chart.pieLabelsOutside(true);
        chart.labelThreshold(labelThreshold = .09);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Jan, 2019 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(Data_PieChart, key, x, y) + '">' + x + '% on' + "   " + key + '</label><label class="label-tooltip-kpi-title-s2"></label>' + "   " + '<br></div></div>'
        });

        d3.select("#" + ChartID + "")
        .attr("fill", "#7c7c7c")
        .attr('transform', 'translate(-150,0)')
         .datum(Data_PieChart)
        .transition().duration(1200)
          .call(chart);

        var positionX = 275;
        var positionY = 50;
        var verticalOffset = 25;

        d3.selectAll('.nv-legend .nv-series')[0].forEach(function (d) {
            positionY += verticalOffset;
            d3.select(d).attr('transform', 'translate(' + positionX + ',' + positionY + ')');
        });


        // chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
        nv.utils.windowResize(chart.update);
        return chart;
    });
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

}