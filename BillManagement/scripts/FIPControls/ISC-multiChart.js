/// <reference path="../LibraryJS/jquery-1.11.0.min.js" />


function Get_multiChart(ChartID) {

    var testdata = [{
        "key": "Challenged",
        "values": [{
            "x": 0,
            "y": 60
        }, {
            "x": 1,
            "y": 80
        }, {
            "x": 2,
            "y": 60
        }, {
            "x": 3,
            "y": 50
        }, {
            "x": 4,
            "y": 90
        }, {
            "x": 5,
            "y": 70
        }, {
            "x": 6,
            "y": 80
        }, {
            "x": 7,
            "y": 80
        }, {
            "x": 8,
            "y": 40
        }, {
            "x": 9,
            "y": 70
        }, {
            "x": 10,
            "y": 60
        }]
    }, {
        "key": " Pending",
        "values": [{
            "x": 0,
            "y": 50
        }, {
            "x": 1,
            "y": 70
        }, {
            "x": 2,
            "y": 40
        }, {
            "x": 3,
            "y": 60
        }, {
            "x": 4,
            "y": 30
        }, {
            "x": 5,
            "y": 30
        }, {
            "x": 6,
            "y": 20
        }, {
            "x": 7,
            "y": 40
        }, {
            "x": 8,
            "y": 60
        }, {
            "x": 9,
            "y": 50
        }, {
            "x": 10,
            "y": 20
        }]
    },
     {
         "key": "Rejected",
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
    testdata[2].color = "#26A7DD"


    nv.addGraph(function () {
        var chart = nv.models.multiChart()

            .options({ reduceXTicks: false })
.height(280)
        //.width(1475)
        .showLegend(true)
        //.margin({ top: 30, right: 80, bottom: 60, left: 80 })
        // .color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5).axisLabel("Month").width(60)
        .tickFormat(function (d, i) {

            return ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV'][d];
        });

        chart.yAxis1.axisLabel("Amount").width(60)
        .tickFormat(function (f) { return "" + f; });

        chart.yAxis2.axisLabel("Opportunity Conversion Rate").width(60)
        .tickFormat(function (f) { return f + "%"; });

        //chart.xAxis.attr('transform', 'translate(50,200)');
        chart.yDomain1([0, 120]);
        chart.yDomain2([0, 10]);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2" style="border:2px solid ' + ToolTipContent(testdata, key, x, y) + '"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(testdata, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        d3.select('#' + ChartID)
        .datum(testdata)
      .transition().duration(100).call(chart);
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

//type2
function Get_multiCharttype1(ChartID) {

    var testdata = [{
        "key": "Draft Bills",
        "values": [{
            "x": 0,
            "y": 60
        }, {
            "x": 1,
            "y": 80
        }, {
            "x": 2,
            "y": 60
        }, {
            "x": 3,
            "y": 50
        }, {
            "x": 4,
            "y": 90
        }, {
            "x": 5,
            "y": 70
        }, {
            "x": 6,
            "y": 80
        }, {
            "x": 7,
            "y": 80
        }, {
            "x": 8,
            "y": 40
        }, {
            "x": 9,
            "y": 70
        }, {
            "x": 10,
            "y": 60
        }]
    }, {
        "key": " Rejected Bills",
        "values": [{
            "x": 0,
            "y": 50
        }, {
            "x": 1,
            "y": 70
        }, {
            "x": 2,
            "y": 40
        }, {
            "x": 3,
            "y": 60
        }, {
            "x": 4,
            "y": 30
        }, {
            "x": 5,
            "y": 30
        }, {
            "x": 6,
            "y": 20
        }, {
            "x": 7,
            "y": 40
        }, {
            "x": 8,
            "y": 60
        }, {
            "x": 9,
            "y": 50
        }, {
            "x": 10,
            "y": 20
        }]
    },
     {
         "key": "Approval Pending",
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
    testdata[2].color = "#26A7DD"


    nv.addGraph(function () {
        var chart = nv.models.multiChart()

            .options({ reduceXTicks: false })
.height(280)
        //.width(1475)
        .showLegend(true)
        //.margin({ top: 30, right: 80, bottom: 60, left: 80 })
        // .color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5).axisLabel("Month").width(60)
        .tickFormat(function (d, i) {

            return ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV'][d];
        });

        chart.yAxis1.axisLabel("Amount").width(60)
        .tickFormat(function (f) { return "" + f; });

        chart.yAxis2.axisLabel("Opportunity Conversion Rate").width(60)
        .tickFormat(function (f) { return f + "%"; });

        //chart.xAxis.attr('transform', 'translate(50,200)');
        chart.yDomain1([0, 120]);
        chart.yDomain2([0, 10]);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2" style="border:2px solid ' + ToolTipContent(testdata, key, x, y) + '"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(testdata, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        d3.select('#' + ChartID)
        .datum(testdata)
      .transition().duration(100).call(chart);
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


function Get_multiCharttype14(ChartID) {

    var testdata = [{
        "key": "Ageing Days",
        "values": [{
            "x": 0,
            "y": 40
        }, {
            "x": 1,
            "y": 80
        }, {
            "x": 2,
            "y": 60
        }, {
            "x": 3,
            "y": 50
        }, {
            "x": 4,
            "y": 90
        }, {
            "x": 5,
            "y": 70
        }, {
            "x": 6,
            "y": 80
        }, {
            "x": 7,
            "y": 80
        }, {
            "x": 8,
            "y": 40
        }, {
            "x": 9,
            "y": 80
        }, {
            "x": 10,
            "y": 80
        }, {
            "x": 11,
            "y": 40
        },
        ]
    },

     {
         "key": "Overdue Invoice",
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
         },
         {
             "x": 8,
             "y": 6.2
         },
         {
             "x": 8,
             "y": 6.2
         },
         {
             "x": 8,
             "y": 6.2
         },
         ]
     }

    ];

    testdata[0].type = "bar"
    testdata[0].yAxis = 1

    testdata[0].color = "#57D0B5"
    //testdata[1].type = "bar"
    //testdata[1].yAxis = 1
    //testdata[1].color = "#26A7DD"
    testdata[1].type = "line"
    testdata[1].yAxis = 2
    testdata[1].color = "#26A7DD"


    nv.addGraph(function () {
        var chart = nv.models.multiChart()

            .options({ reduceXTicks: false })
.height(280)
        //.width(1475)
        .showLegend(true)
        //.margin({ top: 30, right: 80, bottom: 60, left: 80 })
        // .color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5).axisLabel("Days").width(60)
        .tickFormat(function (d, i) {

            return ['0-5 days', '6-10 days', '11-15 days', '16-20 days', '21-25 days', '26-30 days', '31-35 days', '36-40 days', '41-45 days', '46-50 days', '51-55 days', '56-60 days'][d];
        });

        chart.yAxis1.axisLabel("Amount($)").width(60)
        .tickFormat(function (f) { return "" + f; });

        chart.yAxis2.axisLabel("Opportunity Conversion Rate").width(60)
        .tickFormat(function (f) { return f + "%"; });

        //chart.xAxis.attr('transform', 'translate(50,200)');
        chart.yDomain1([0, 120]);
        chart.yDomain2([0, 10]);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2" style="border:2px solid ' + ToolTipContent(testdata, key, x, y) + '"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(testdata, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        d3.select('#' + ChartID)
        .datum(testdata)
      .transition().duration(100).call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });

}
function Get_multiCharttype15(ChartID) {

    var testdata = [{
        "key": "Sales Amount",
        "values": [{
            "x": 0,
            "y": 40
        }, {
            "x": 1,
            "y": 80
        }, {
            "x": 2,
            "y": 60
        }, {
            "x": 3,
            "y": 50
        }, {
            "x": 4,
            "y": 90
        }, {
            "x": 5,
            "y": 70
        }, {
            "x": 6,
            "y": 80
        }, {
            "x": 7,
            "y": 80
        }, {
            "x": 8,
            "y": 40
        }, {
            "x": 9,
            "y": 80
        }, {
            "x": 10,
            "y": 80
        }, {
            "x": 11,
            "y": 40
        },
        ]
    },

     {
         "key": "Company Name",
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
         },
         {
             "x": 8,
             "y": 6.2
         },
         {
             "x": 8,
             "y": 6.2
         },
         {
             "x": 8,
             "y": 6.2
         },
         ]
     }

    ];

    testdata[0].type = "bar"
    testdata[0].yAxis = 1

    testdata[0].color = "#57D0B5"
    //testdata[1].type = "bar"
    //testdata[1].yAxis = 1
    //testdata[1].color = "#26A7DD"
    testdata[1].type = "line"
    testdata[1].yAxis = 2
    testdata[1].color = "#26A7DD"


    nv.addGraph(function () {
        var chart = nv.models.multiChart()

            .options({ reduceXTicks: false })
.height(280)
        //.width(1475)
        .showLegend(true)
        //.margin({ top: 30, right: 80, bottom: 60, left: 80 })
        // .color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5).axisLabel("Company Name").width(60)
        .tickFormat(function (d, i) {

            return ['Aberdeen Business Consulting Ltd', 'Accountable Accounting Inc', 'Aboriginal Strategies Inc', 'AccSys Solutions Inc (*Vancouver)', 'ARX Business Solutions', 'Intel CPA', 'Aberdeen Business Consulting Ltd', 'AccSys Solutions Inc (*Vancouver)', 'Accountable Accounting Inc', 'Zaam Inc', 'Sonia stuart', 'Aberdeen Business Consulting Ltd'][d];
        });

        chart.yAxis1.axisLabel("Sales Amount($)").width(60)
        .tickFormat(function (f) { return "" + f; });

        chart.yAxis2.axisLabel("Opportunity Conversion Rate").width(60)
        .tickFormat(function (f) { return f + "%"; });

        //chart.xAxis.attr('transform', 'translate(50,200)');
        chart.yDomain1([0, 120]);
        chart.yDomain2([0, 10]);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2" style="border:2px solid ' + ToolTipContent(testdata, key, x, y) + '"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(testdata, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        d3.select('#' + ChartID)
        .datum(testdata)
      .transition().duration(100).call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });

}
function Get_multiCharttype16(ChartID) {

    var testdata = [{
        "key": "Sales Amount",
        "values": [{
            "x": 0,
            "y": 40
        }, {
            "x": 1,
            "y": 80
        }, {
            "x": 2,
            "y": 60
        }, {
            "x": 3,
            "y": 50
        }, {
            "x": 4,
            "y": 90
        }, {
            "x": 5,
            "y": 70
        }, {
            "x": 6,
            "y": 80
        }, {
            "x": 7,
            "y": 80
        }, {
            "x": 8,
            "y": 40
        }, {
            "x": 9,
            "y": 80
        }, {
            "x": 10,
            "y": 80
        }, {
            "x": 11,
            "y": 40
        },
        ]
    },

     {
         "key": "Company Name",
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
         },
         {
             "x": 8,
             "y": 6.2
         },
         {
             "x": 8,
             "y": 6.2
         },
         {
             "x": 8,
             "y": 6.2
         },
         ]
     }

    ];

    testdata[0].type = "bar"
    testdata[0].yAxis = 1

    testdata[0].color = "#57D0B5"
    //testdata[1].type = "bar"
    //testdata[1].yAxis = 1
    //testdata[1].color = "#26A7DD"
    testdata[1].type = "line"
    testdata[1].yAxis = 2
    testdata[1].color = "#26A7DD"


    nv.addGraph(function () {
        var chart = nv.models.multiChart()

            .options({ reduceXTicks: false })
.height(280)
        //.width(1475)
        .showLegend(true)
        //.margin({ top: 30, right: 80, bottom: 60, left: 80 })
        // .color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5).axisLabel("Company Name").width(60)
        .tickFormat(function (d, i) {

            return ['Aberdeen Business Consulting Ltd', 'Accountable Accounting Inc', 'Aboriginal Strategies Inc', 'AccSys Solutions Inc (*Vancouver)', 'ARX Business Solutions', 'Intel CPA', 'Aberdeen Business Consulting Ltd', 'AccSys Solutions Inc (*Vancouver)', 'Accountable Accounting Inc', 'Zaam Inc', 'Sonia stuart', 'Aberdeen Business Consulting Ltd'][d];
        });

        chart.yAxis1.axisLabel("Sales Amount($)").width(60)
        .tickFormat(function (f) { return "" + f; });

        chart.yAxis2.axisLabel("Opportunity Conversion Rate").width(60)
        .tickFormat(function (f) { return f + "%"; });

        //chart.xAxis.attr('transform', 'translate(50,200)');
        chart.yDomain1([0, 120]);
        chart.yDomain2([0, 10]);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2" style="border:2px solid ' + ToolTipContent(testdata, key, x, y) + '"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(testdata, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        d3.select('#' + ChartID)
        .datum(testdata)
      .transition().duration(100).call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });

}
function Get_multiCharttype17(ChartID) {

    var testdata = [{
        "key": "November",
        "values": [{
            "x": 0,
            "y": 60
        }, {
            "x": 1,
            "y": 80
        }, {
            "x": 2,
            "y": 60
        }, {
            "x": 3,
            "y": 50
        }, {
            "x": 4,
            "y": 90
        }, {
            "x": 5,
            "y": 70
        }, {
            "x": 6,
            "y": 80
        }, {
            "x": 7,
            "y": 80
        }, {
            "x": 8,
            "y": 40
        }, {
            "x": 9,
            "y": 70
        }, {
            "x": 10,
            "y": 60
        }]
    }, {
        "key": " December",
        "values": [{
            "x": 0,
            "y": 50
        }, {
            "x": 1,
            "y": 70
        }, {
            "x": 2,
            "y": 40
        }, {
            "x": 3,
            "y": 60
        }, {
            "x": 4,
            "y": 30
        }, {
            "x": 5,
            "y": 30
        }, {
            "x": 6,
            "y": 20
        }, {
            "x": 7,
            "y": 40
        }, {
            "x": 8,
            "y": 60
        }, {
            "x": 9,
            "y": 50
        }, {
            "x": 10,
            "y": 20
        }]
    },
    

    ];

    testdata[0].type = "bar"
    testdata[0].yAxis = 1

    testdata[0].color = "#ED7D31"
    testdata[1].type = "bar"
    testdata[1].yAxis = 1
    testdata[1].color = "#FFC000"
   


    nv.addGraph(function () {
        var chart = nv.models.multiChart()

            .options({ reduceXTicks: false })
.height(280)
        //.width(1475)
        .showLegend(true)
        //.margin({ top: 30, right: 80, bottom: 60, left: 80 })
        // .color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5).axisLabel("Company").width(60)
        .tickFormat(function (d, i) {

            return ['ARX Business', 'Aboriginal', 'Accountable', 'AccSys Solutions', 'Intel CPA', 'North 49 business', 'TCJ enterprises', 'Zaam Inc', 'Sonia stuart', 'BDO canada LLP', 'OCP Constructions'][d];
        });

        chart.yAxis1.axisLabel("Amount").width(60)
        .tickFormat(function (f) { return "" + f; });

        chart.yAxis2.axisLabel("Opportunity Conversion Rate").width(60)
        .tickFormat(function (f) { return f + "%"; });

        //chart.xAxis.attr('transform', 'translate(50,200)');
        chart.yDomain1([0, 120]);
        chart.yDomain2([0, 10]);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2" style="border:2px solid ' + ToolTipContent(testdata, key, x, y) + '"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(testdata, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        d3.select('#' + ChartID)
        .datum(testdata)
      .transition().duration(100).call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });

}
function Get_multiCharttype18(ChartID) {

    var testdata = [{
        "key": "November",
        "values": [{
            "x": 0,
            "y": 60
        }, {
            "x": 1,
            "y": 80
        }, {
            "x": 2,
            "y": 60
        }, {
            "x": 3,
            "y": 50
        }, {
            "x": 4,
            "y": 90
        }, {
            "x": 5,
            "y": 70
        }, {
            "x": 6,
            "y": 80
        }, {
            "x": 7,
            "y": 80
        }, {
            "x": 8,
            "y": 40
        }, {
            "x": 9,
            "y": 70
        }, {
            "x": 10,
            "y": 60
        }]
    }, {
        "key": " December",
        "values": [{
            "x": 0,
            "y": 50
        }, {
            "x": 1,
            "y": 70
        }, {
            "x": 2,
            "y": 40
        }, {
            "x": 3,
            "y": 60
        }, {
            "x": 4,
            "y": 30
        }, {
            "x": 5,
            "y": 30
        }, {
            "x": 6,
            "y": 20
        }, {
            "x": 7,
            "y": 40
        }, {
            "x": 8,
            "y": 60
        }, {
            "x": 9,
            "y": 50
        }, {
            "x": 10,
            "y": 20
        }]
    },


    ];

    testdata[0].type = "bar"
    testdata[0].yAxis = 1

    testdata[0].color = "#ED7D31"
    testdata[1].type = "bar"
    testdata[1].yAxis = 1
    testdata[1].color = "#FFC000"



    nv.addGraph(function () {
        var chart = nv.models.multiChart()

            .options({ reduceXTicks: false })
.height(280)
        //.width(1475)
        .showLegend(true)
        //.margin({ top: 30, right: 80, bottom: 60, left: 80 })
        // .color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5).axisLabel("Company").width(60)
        .tickFormat(function (d, i) {

            return ['ARX Business', 'Aboriginal', 'Accountable', 'AccSys Solutions', 'Intel CPA', 'North 49 business', 'TCJ enterprises', 'Zaam Inc', 'Sonia stuart', 'BDO canada LLP', 'OCP Constructions'][d];
        });

        chart.yAxis1.axisLabel("Amount").width(60)
        .tickFormat(function (f) { return "" + f; });

        chart.yAxis2.axisLabel("Opportunity Conversion Rate").width(60)
        .tickFormat(function (f) { return f + "%"; });

        //chart.xAxis.attr('transform', 'translate(50,200)');
        chart.yDomain1([0, 120]);
        chart.yDomain2([0, 10]);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2" style="border:2px solid ' + ToolTipContent(testdata, key, x, y) + '"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(testdata, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        d3.select('#' + ChartID)
        .datum(testdata)
      .transition().duration(100).call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });

}
//type3
function Get_multiCharttype11(ChartID) {

    var testdata = [{
        "key": "Ageing Days",
        "values": [{
            "x": 0,
            "y": 60
        }, {
            "x": 1,
            "y": 80
        }, {
            "x": 2,
            "y": 60
        }, {
            "x": 3,
            "y": 50
        }, {
            "x": 4,
            "y": 90
        }, {
            "x": 5,
            "y": 70
        }, {
            "x": 6,
            "y": 80
        }, {
            "x": 7,
            "y": 80
        }, {
            "x": 8,
            "y": 40
        }, {
            "x": 9,
            "y": 80
        }, {
            "x": 10,
            "y": 80
        }, {
            "x": 11,
            "y": 40
        },
        ]
    },
   
     {
         "key": "Overdew Invoice",
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
         },
         {
             "x": 8,
             "y": 6.2
         },
         {
             "x": 8,
             "y": 6.2
         },
         {
             "x": 8,
             "y": 6.2
         },
        ]
     }

    ];

    testdata[0].type = "bar"
    testdata[0].yAxis = 1

    testdata[0].color = "#57D0B5"
    //testdata[1].type = "bar"
    //testdata[1].yAxis = 1
    //testdata[1].color = "#26A7DD"
    testdata[1].type = "line"
    testdata[1].yAxis = 2
    testdata[1].color = "#26A7DD"


    nv.addGraph(function () {
        var chart = nv.models.multiChart()

            .options({ reduceXTicks: false })
.height(280)
        //.width(1475)
        .showLegend(true)
        //.margin({ top: 30, right: 80, bottom: 60, left: 80 })
        // .color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5).axisLabel("Month").width(60)
        .tickFormat(function (d, i) {

            return ['0-5 days', '6-10 days', '11-15 days', '16-20 days', '21-25 days', '26-30 days', '31-35 days', '36-40 days', '41-45 days', '46-50 days', '51-55 days', '56-60 days'][d];
        });

        chart.yAxis1.axisLabel("Amount($)").width(60)
        .tickFormat(function (f) { return "" + f; });

        chart.yAxis2.axisLabel("Opportunity Conversion Rate").width(60)
        .tickFormat(function (f) { return f + "%"; });

        //chart.xAxis.attr('transform', 'translate(50,200)');
        chart.yDomain1([0, 120]);
        chart.yDomain2([0, 10]);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2" style="border:2px solid ' + ToolTipContent1(testdata, key, x, y) + '"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent1(testdata, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        d3.select('#' + ChartID)
        .datum(testdata)
      .transition().duration(100).call(chart);
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

function ToolTipContent1(data, key, x, y) {
    var color = "";
    var _temp = [];
    $.each(data, function (index, item) {
        if (item.key == key) {
            color = item.color;
        }

    });

    return color;
}
//type4
function Get_multiCharttype12(ChartID) {

    var testdata = [{
        "key": "Ageing Days",
        "values": [{
            "x": 0,
            "y": 60
        }, {
            "x": 1,
            "y": 80
        }, {
            "x": 2,
            "y": 60
        }, {
            "x": 3,
            "y": 50
        }, {
            "x": 4,
            "y": 90
        }, {
            "x": 5,
            "y": 70
        }, {
            "x": 6,
            "y": 80
        }, {
            "x": 7,
            "y": 80
        }, {
            "x": 8,
            "y": 40
        }, {
            "x": 9,
            "y": 80
        }, {
            "x": 10,
            "y": 80
        }, {
            "x": 11,
            "y": 40
        },
        ]
    },

     {
         "key": "Overdew Invoice",
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
         },
         {
             "x": 8,
             "y": 6.2
         },
         {
             "x": 8,
             "y": 6.2
         },
         {
             "x": 8,
             "y": 6.2
         },
         ]
     }

    ];

    testdata[0].type = "bar"
    testdata[0].yAxis = 1

    testdata[0].color = "#57D0B5"
    //testdata[1].type = "bar"
    //testdata[1].yAxis = 1
    //testdata[1].color = "#26A7DD"
    testdata[1].type = "line"
    testdata[1].yAxis = 2
    testdata[1].color = "#26A7DD"


    nv.addGraph(function () {
        var chart = nv.models.multiChart()

            .options({ reduceXTicks: false })
.height(280)
        //.width(1475)
        .showLegend(true)
        //.margin({ top: 30, right: 80, bottom: 60, left: 80 })
        // .color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5).axisLabel("Month").width(60)
        .tickFormat(function (d, i) {

            return ['0-5 days', '6-10 days', '11-15 days', '16-20 days', '21-25 days', '26-30 days', '31-35 days', '36-40 days', '41-45 days', '46-50 days', '51-55 days', '56-60 days'][d];
        });

        chart.yAxis1.axisLabel("Amount($)").width(60)
        .tickFormat(function (f) { return "" + f; });

        chart.yAxis2.axisLabel("Opportunity Conversion Rate").width(60)
        .tickFormat(function (f) { return f + "%"; });

        //chart.xAxis.attr('transform', 'translate(50,200)');
        chart.yDomain1([0, 120]);
        chart.yDomain2([0, 10]);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2" style="border:2px solid ' + ToolTipContent(testdata, key, x, y) + '"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(testdata, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        d3.select('#' + ChartID)
        .datum(testdata)
      .transition().duration(100).call(chart);
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

function Get_multiChartType2(ChartID) {
    
    var multiChartType2 =
  [{
      "key": "Created Count",
      "values": [{
          "x": 0,
          "y": 138
      }, {
          "x": 1,
          "y": 145
      }, {
          "x": 2,
          "y": 59
      }, {
          "x": 3,
          "y": 76
      }, {
          "x": 4,
          "y": 124
      }, {
          "x": 5,
          "y": 87
      }, {
          "x": 6,
          "y": 75
      }, {
          "x": 7,
          "y": 88
      }, {
          "x": 8,
          "y": 145
      }, {
          "x": 9,
          "y": 123
      },
        {
            "x": 10,
            "y": 137
        }, {
            "x": 11,
            "y": 96
        }]
  }, {
      "key": "Lost Count",
      "values": [{
          "x": 0,
          "y": -72
      }, {
          "x": 1,
          "y": -52
      }, {
          "x": 2,
          "y": -72
      }, {
          "x": 3,
          "y": -54
      }, {
          "x": 4,
          "y": -54
      }, {
          "x": 5,
          "y": -65
      }, {
          "x": 6,
          "y": -60
      }, {
          "x": 7,
          "y": -80
      }, {
          "x": 8,
          "y": -40
      }, {
          "x": 9,
          "y": -72
      },
        {
            "x": 10,
            "y": -58
        }, {
            "x": 11,
            "y": -45
        }]
    },
    {
      "key": "Won Count",
      "values": [{
          "x": 0,
          "y": -10
      }, {
          "x": 1,
          "y": -20
      }, {
          "x": 2,
          "y": -22
      }, {
          "x": 3,
          "y": -34
      }, {
          "x": 4,
          "y": -44
      }, {
          "x": 5,
          "y": -25
      }, {
          "x": 6,
          "y": -49
      }, {
          "x": 7,
          "y": -30
      }, {
          "x": 8,
          "y": -20
      }, {
          "x": 9,
          "y": -22
      },
        {
            "x": 10,
            "y": -38
        }, {
            "x": 11,
            "y": -25
        }]
  },
     {
         "key": "Flow %",
         "values": [{
             "x": 0, "y": 83
         }, {
             "x": 1, "y": 92
         },
         {
             "x": 2, "y": 99
         }, {
             "x": 3, "y": 100
         }, {
             "x": 4, "y": 98
         }, {
             "x": 5, "y": 79
         }, {
             "x": 6, "y": 77
         }, {
             "x": 7, "y": 75
         }, {
             "x": 8, "y": 72
         }, {
             "x": 9, "y": 68
         }, {
             "x": 10, "y": 64
         }, {
             "x": 11, "y": 60
         }]
     }
      ];

    multiChartType2[0].type = "bar"
    multiChartType2[0].yAxis = 1
    multiChartType2[0].color = "#26A7DD"
    multiChartType2[1].type = "bar"
    multiChartType2[1].yAxis = 1
    multiChartType2[1].color = "#F16B50"
    multiChartType2[2].type = "bar"
    multiChartType2[2].yAxis = 1
    multiChartType2[2].color = "#8179C5"
    multiChartType2[3].type = "line"
    multiChartType2[3].yAxis = 2
    multiChartType2[3].color = "#57D0B5"
    //    testdata[3].type = "line"
    //    testdata[3].yAxis = 2
    //    testdata[3].color = "#E0D555"

    nv.addGraph(function () {
        var chart = nv.models.multiChart()
          // .height(350)
        .showLegend(false)
      //  .margin({ top: 30, right: 80, bottom: 60, left: 80 })
        .color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5)
        .tickFormat(function (d, i) {
            return ['Mar-03', 'Apr-03', 'May-03', 'Jun-03', 'Jul-03', 'Aug-03', 'Sep-03', 'Oct-03', 'Nov-03', 'Dec-03', 'Jan-04', 'Feb-04'][d];
        });

        chart.yAxis1.axisLabel("Pipe Line Count").width(60)
        .tickFormat(function (f) { return "$" + f; });

        chart.yAxis2
        .tickFormat(function (f) { return f + "%"; });

        chart.yDomain1([-150, 150]);
        chart.yDomain2([-150, 150]);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(multiChartType2, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select('#' + ChartID)
        .datum(multiChartType2)
      .transition().duration(10).call(chart);
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

//Modal3
function Get_multiChartType3(ChartID) {

    var multiChartType3 =
  [{
      "key": "Gross sales in this month $",
      "values": [{
          "x": 0,
          "y": 138
      }, {
          "x": 1,
          "y": 145
      }, {
          "x": 2,
          "y": 59
      }, {
          "x": 3,
          "y": 76
      }, {
          "x": 4,
          "y": 124
      }, {
          "x": 5,
          "y": 87
      }, {
          "x": 6,
          "y": 75
      }, {
          "x": 7,
          "y": 88
      }, {
          "x": 8,
          "y": 145
      }, {
          "x": 9,
          "y": 123
      },
        {
            "x": 10,
            "y": 137
        }, {
            "x": 11,
            "y": 96
        }]
  }, {
      "key": "Earning in this month $",
      "values": [{
          "x": 0,
          "y": 72
      }, {
          "x": 1,
          "y": 52
      }, {
          "x": 2,
          "y": 72
      }, {
          "x": 3,
          "y": 54
      }, {
          "x": 4,
          "y": 54
      }, {
          "x": 5,
          "y": 65
      }, {
          "x": 6,
          "y": 60
      }, {
          "x": 7,
          "y": 80
      }, {
          "x": 8,
          "y": 40
      }, {
          "x": 9,
          "y": 72
      },
        {
            "x": 10,
            "y": 58
        }, {
            "x": 11,
            "y": 45
        }]
  },
    {
        "key": "Sold in this month",
        "values": [{
            "x": 0,
            "y": 10
        }, {
            "x": 1,
            "y": 20
        }, {
            "x": 2,
            "y": 22
        }, {
            "x": 3,
            "y": 34
        }, {
            "x": 4,
            "y": 44
        }, {
            "x": 5,
            "y": 25
        }, {
            "x": 6,
            "y": 49
        }, {
            "x": 7,
            "y": 30
        }, {
            "x": 8,
            "y": 20
        }, {
            "x": 9,
            "y": 22
        },
        {
            "x": 10,
            "y": 38
        }, {
            "x": 11,
            "y": 25
        }]
    },
     {
         "key": "Payable in this month$",
         "values": [{
             "x": 0, "y": 83
         }, {
             "x": 1, "y": 92
         },
         {
             "x": 2, "y": 99
         }, {
             "x": 3, "y": 100
         }, {
             "x": 4, "y": 98
         }, {
             "x": 5, "y": 79
         }, {
             "x": 6, "y": 77
         }, {
             "x": 7, "y": 75
         }, {
             "x": 8, "y": 72
         }, {
             "x": 9, "y": 68
         }, {
             "x": 10, "y": 64
         }, {
             "x": 11, "y": 60
         }]
     }
      ];


     multiChartType3[0].type = "bar"
     multiChartType3[0].yAxis = 1
     multiChartType3[0].color = "#6FC362"
     multiChartType3[1].type = "bar"
     multiChartType3[1].yAxis = 1
     multiChartType3[1].color = "#4FB6E1"
     multiChartType3[2].type = "bar"
     multiChartType3[2].yAxis = 1
     multiChartType3[2].color = "#F16B50"
     multiChartType3[3].type = "line"
     multiChartType3[3].yAxis = 2
     multiChartType3[3].color = "#FFCD42"
    //    testdata[3].type = "line"
    //    testdata[3].yAxis = 2
    //    testdata[3].color = "#E0D555"

    nv.addGraph(function () {
        var chart = nv.models.multiChart()
        // .height(350)
        .showLegend(true)
       // .margin({ top: 30, right: 80, bottom: 60, left: 80 })
        .color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5).axisLabel("Job Order Created Date").width(60)
        .tickFormat(function (d, i) {
            return ['Mar-03', 'Apr-03', 'May-03', 'Jun-03', 'Jul-03', 'Aug-03', 'Sep-03', 'Oct-03', 'Nov-03', 'Dec-03', 'Jan-04', 'Feb-04'][d];
        });

        chart.yAxis1.axisLabel("Number of Openings").width(60)
        .tickFormat(function (f) { return "" + f; });

        chart.yAxis2.axisLabel("Win Percent").width(60)
        .tickFormat(function (f) { return f + "%"; });

        chart.yDomain1([0, 250]);
        //chart.yDomain2([-150, 150]);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(multiChartType3, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select('#' + ChartID)
        .datum(multiChartType3)
      .transition().duration(10).call(chart);
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
//Modal4
function Get_multiChartType13(ChartID) {

    var multiChartType3=
  [{
      "key": "Paid",
      "values": [{
          "x": 0,
          "y": 138
      }, {
          "x": 1,
          "y": 145
      }, {
          "x": 2,
          "y": 59
      }, {
          "x": 3,
          "y": 76
      }, {
          "x": 4,
          "y": 124
      }, {
          "x": 5,
          "y": 87
      }, {
          "x": 6,
          "y": 75
      }, {
          "x": 7,
          "y": 88
      }, {
          "x": 8,
          "y": 145
      }, {
          "x": 9,
          "y": 123
      },
        {
            "x": 10,
            "y": 137
        }, {
            "x": 11,
            "y": 96
        }]
  }, {
      "key": "Unpaid",
      "values": [{
          "x": 0,
          "y": 72
      }, {
          "x": 1,
          "y": 52
      }, {
          "x": 2,
          "y": 72
      }, {
          "x": 3,
          "y": 54
      }, {
          "x": 4,
          "y": 54
      }, {
          "x": 5,
          "y": 65
      }, {
          "x": 6,
          "y": 60
      }, {
          "x": 7,
          "y": 80
      }, {
          "x": 8,
          "y": 40
      }, {
          "x": 9,
          "y": 72
      },
        {
            "x": 10,
            "y": 58
        }, {
            "x": 11,
            "y": 45
        }]
  },
    {
        "key": "Over due paid",
        "values": [{
            "x": 0,
            "y": 10
        }, {
            "x": 1,
            "y": 20
        }, {
            "x": 2,
            "y": 22
        }, {
            "x": 3,
            "y": 34
        }, {
            "x": 4,
            "y": 44
        }, {
            "x": 5,
            "y": 25
        }, {
            "x": 6,
            "y": 49
        }, {
            "x": 7,
            "y": 30
        }, {
            "x": 8,
            "y": 20
        }, {
            "x": 9,
            "y": 22
        },
        {
            "x": 10,
            "y": 38
        }, {
            "x": 11,
            "y": 25
        }]
    },
     {
         "key": "Paid before due date",
         "values": [{
             "x": 0, "y": 83
         }, {
             "x": 1, "y": 92
         },
         {
             "x": 2, "y": 99
         }, {
             "x": 3, "y": 100
         }, {
             "x": 4, "y": 98
         }, {
             "x": 5, "y": 79
         }, {
             "x": 6, "y": 77
         }, {
             "x": 7, "y": 75
         }, {
             "x": 8, "y": 72
         }, {
             "x": 9, "y": 68
         }, {
             "x": 10, "y": 64
         }, {
             "x": 11, "y": 60
         },
         ]
     },
     {
         "key": "Partially paid",
         "values": [{
             "x": 0,
             "y": 40
         }, {
             "x": 1,
             "y": 60
         }, {
             "x": 2,
             "y": 32
         }, {
             "x": 3,
             "y": 54
         }, {
             "x": 4,
             "y": 65
         }, {
             "x": 5,
             "y": 58
         }, {
             "x": 6,
             "y": 80
         }, {
             "x": 7,
             "y": 52
         }, {
             "x": 8,
             "y": 66
         }, {
             "x": 9,
             "y": 79
         },
         {
             "x": 10,
             "y": 86
         }, {
             "x": 11,
             "y": 40
         }]
     },
  ];


    multiChartType3[0].type = "bar"
    multiChartType3[0].yAxis = 1
    multiChartType3[0].color = "#6FC362"
    multiChartType3[1].type = "bar"
    multiChartType3[1].yAxis = 1
    multiChartType3[1].color = "#4FB6E1"
    multiChartType3[2].type = "bar"
    multiChartType3[2].yAxis = 1
    multiChartType3[2].color = "#F16B50"
    multiChartType3[3].type = "line"
    multiChartType3[3].yAxis = 2
    multiChartType3[3].color = "#6FC362"
    multiChartType3[4].type = "line"
    multiChartType3[4].yAxis = 2
    multiChartType3[4].color = "#E3DE4D"
    //  testdata[3].type = "line"
    //    testdata[3].yAxis = 2
    //    testdata[3].color = "#E0D555"

    nv.addGraph(function () {
        var chart = nv.models.multiChart()
        // .height(350)
        .showLegend(true)
       // .margin({ top: 30, right: 80, bottom: 60, left: 80 })
        .color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5).axisLabel("Job Order Created Date").width(60)
        .tickFormat(function (d, i) {
            return ['Mar-03', 'Apr-03', 'May-03', 'Jun-03', 'Jul-03', 'Aug-03', 'Sep-03', 'Oct-03', 'Nov-03', 'Dec-03', 'Jan-04', 'Feb-04'][d];
        });

        chart.yAxis1.axisLabel("Number of Openings").width(60)
        .tickFormat(function (f) { return "" + f; });

        chart.yAxis2.axisLabel("Win Percent").width(60)
        .tickFormat(function (f) { return f + "%"; });

        chart.yDomain1([0, 250]);
        //chart.yDomain2([-150, 150]);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(multiChartType3, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select('#' + ChartID)
        .datum(multiChartType3)
      .transition().duration(10).call(chart);
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
//PAYMENTS
function Get_multiChartType14(ChartID) {

    var multiChartType3 =
  [{
      "key": "Paid",
      "values": [{
          "x": 0,
          "y": 138
      }, {
          "x": 1,
          "y": 145
      }, {
          "x": 2,
          "y": 59
      }, {
          "x": 3,
          "y": 76
      }, {
          "x": 4,
          "y": 124
      }, {
          "x": 5,
          "y": 87
      }, {
          "x": 6,
          "y": 75
      }, {
          "x": 7,
          "y": 88
      }, {
          "x": 8,
          "y": 145
      }, {
          "x": 9,
          "y": 123
      },
        {
            "x": 10,
            "y": 137
        }, {
            "x": 11,
            "y": 96
        }]
  }, {
      "key": "Yet to Pay",
      "values": [{
          "x": 0,
          "y": 72
      }, {
          "x": 1,
          "y": 52
      }, {
          "x": 2,
          "y": 72
      }, {
          "x": 3,
          "y": 54
      }, {
          "x": 4,
          "y": 54
      }, {
          "x": 5,
          "y": 65
      }, {
          "x": 6,
          "y": 60
      }, {
          "x": 7,
          "y": 80
      }, {
          "x": 8,
          "y": 40
      }, {
          "x": 9,
          "y": 72
      },
        {
            "x": 10,
            "y": 58
        }, {
            "x": 11,
            "y": 45
        }]
  },
    {
        "key": "pre-paid",
        "values": [{
            "x": 0,
            "y": 10
        }, {
            "x": 1,
            "y": 20
        }, {
            "x": 2,
            "y": 22
        }, {
            "x": 3,
            "y": 34
        }, {
            "x": 4,
            "y": 44
        }, {
            "x": 5,
            "y": 25
        }, {
            "x": 6,
            "y": 49
        }, {
            "x": 7,
            "y": 30
        }, {
            "x": 8,
            "y": 20
        }, {
            "x": 9,
            "y": 22
        },
        {
            "x": 10,
            "y": 38
        }, {
            "x": 11,
            "y": 25
        }]
    },
     {
         "key": "Refund",
         "values": [{
             "x": 0, "y": 83
         }, {
             "x": 1, "y": 92
         },
         {
             "x": 2, "y": 99
         }, {
             "x": 3, "y": 100
         }, {
             "x": 4, "y": 98
         }, {
             "x": 5, "y": 79
         }, {
             "x": 6, "y": 77
         }, {
             "x": 7, "y": 75
         }, {
             "x": 8, "y": 72
         }, {
             "x": 9, "y": 68
         }, {
             "x": 10, "y": 64
         }, {
             "x": 11, "y": 60
         },
         ]
     },
     {
         "key": "Close",
         "values": [{
             "x": 0,
             "y": 40
         }, {
             "x": 1,
             "y": 60
         }, {
             "x": 2,
             "y": 32
         }, {
             "x": 3,
             "y": 54
         }, {
             "x": 4,
             "y": 65
         }, {
             "x": 5,
             "y": 58
         }, {
             "x": 6,
             "y": 80
         }, {
             "x": 7,
             "y": 52
         }, {
             "x": 8,
             "y": 66
         }, {
             "x": 9,
             "y": 79
         },
         {
             "x": 10,
             "y": 86
         }, {
             "x": 11,
             "y": 40
         }]
     },
  ];


    multiChartType3[0].type = "bar"
    multiChartType3[0].yAxis = 1
    multiChartType3[0].color = "#6FC362"
    multiChartType3[1].type = "bar"
    multiChartType3[1].yAxis = 1
    multiChartType3[1].color = "#4FB6E1"
    multiChartType3[2].type = "bar"
    multiChartType3[2].yAxis = 1
    multiChartType3[2].color = "#F16B50"
    multiChartType3[3].type = "line"
    multiChartType3[3].yAxis = 2
    multiChartType3[3].color = "#6FC362"
    multiChartType3[4].type = "line"
    multiChartType3[4].yAxis = 2
    multiChartType3[4].color = "#E3DE4D"
    //  testdata[3].type = "line"
    //    testdata[3].yAxis = 2
    //    testdata[3].color = "#E0D555"

    nv.addGraph(function () {
        var chart = nv.models.multiChart()
        // .height(350)
        .showLegend(true)
       // .margin({ top: 30, right: 80, bottom: 60, left: 80 })
        .color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5).axisLabel("Job Order Created Date").width(60)
        .tickFormat(function (d, i) {
            return ['Mar-03', 'Apr-03', 'May-03', 'Jun-03', 'Jul-03', 'Aug-03', 'Sep-03', 'Oct-03', 'Nov-03', 'Dec-03', 'Jan-04', 'Feb-04'][d];
        });

        chart.yAxis1.axisLabel("Number of Openings").width(60)
        .tickFormat(function (f) { return "" + f; });

        chart.yAxis2.axisLabel("Win Percent").width(60)
        .tickFormat(function (f) { return f + "%"; });

        chart.yDomain1([0, 250]);
        //chart.yDomain2([-150, 150]);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(multiChartType3, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select('#' + ChartID)
        .datum(multiChartType3)
      .transition().duration(10).call(chart);
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

//Stacked Bar Modal1

function Get_StackedBarChartModal2(ContralID) {


    var StackedBarChartModal2 =
        [
     { "color": "#E3DE4D", "key": "Q1", "values": [{ "x": "Mar 13", "y": 2000000 }, { "x": "Apr 13", "y": 5000000 }, { "x": "May 13", "y": 7000000 }, { "x": "Jun 13", "y": 7500000 }, { "x": "Jul 13", "y": 7700000 }, { "x": "Aug 13", "y": 3500000 }, { "x": "Sep 13", "y": 4000000 }, { "x": "Oct 13", "y": 4500000 }, { "x": "Nov 13", "y": 5000000 }, { "x": "Dec 13", "y": 1500000 }, { "x": "Jan 14", "y": 1600000 }, { "x": "Feb 14", "y": 6500000 }, { "x": "Mar 14", "y": 7000000 }, { "x": "Apr 14", "y": 7000000 }, { "x": "May 14", "y": 7000000}] },
     { "color": "#5FBA50", "key": "Q2", "values": [{ "x": "Mar 13", "y": 1000000 }, { "x": "Apr 13", "y": 2500000 }, { "x": "May 13", "y": 4600000 }, { "x": "Jun 13", "y": 4000000 }, { "x": "Jul 13", "y": 1800000 }, { "x": "Aug 13", "y": 1900000 }, { "x": "Sep 13", "y": 2000000 }, { "x": "Oct 13", "y": 2100000 }, { "x": "Nov 13", "y": 12200000 }, { "x": "Dec 13", "y": 2300000 }, { "x": "Jan 14", "y": 2400000 }, { "x": "Feb 14", "y": 12500000 }, { "x": "Mar 14", "y": 22600000 }, { "x": "Apr 14", "y": 7000000 }, { "x": "May 14", "y": 7000000}] },
     { "color": "#57D0B5", "key": "Q3", "values": [{ "x": "Mar 13", "y": 6000000 }, { "x": "Apr 13", "y": 7000000 }, { "x": "May 13", "y": 4500000 }, { "x": "Jun 13", "y": 9000000 }, { "x": "Jul 13", "y": 2700000 }, { "x": "Aug 13", "y": 1800000 }, { "x": "Sep 13", "y": 5900000 }, { "x": "Oct 13", "y": 2000000 }, { "x": "Nov 13", "y": 100000 }, { "x": "Dec 13", "y": 2200000 }, { "x": "Jan 14", "y": 2300000 }, { "x": "Feb 14", "y": 2400000 }, { "x": "Mar 14", "y": 500000 }, { "x": "Apr 14", "y": 7000000 }, { "x": "May 14", "y": 7000000}] },
     { "color": "#26A7DD", "key": "Q4", "values": [{ "x": "Mar 13", "y": 9000000 }, { "x": "Apr 13", "y": 8500000 }, { "x": "May 13", "y": 22000000 }, { "x": "Jun 13", "y": 16500000 }, { "x": "Jul 13", "y": 27700000 }, { "x": "Aug 13", "y": 23500000 }, { "x": "Sep 13", "y": 24000000 }, { "x": "Oct 13", "y": 24500000 }, { "x": "Nov 13", "y": 35000000 }, { "x": "Dec 13", "y": 15500000 }, { "x": "Jan 14", "y": 6000000 }, { "x": "Feb 14", "y": 12900000 }, { "x": "Mar 14", "y": 12100000 }, { "x": "Apr 14", "y": 7000000 }, { "x": "May 14", "y": 7000000}]}];
    nv.addGraph(function () {
        var chart = nv.models.multiBarChart()
          .groupSpacing(0.4)
          //  .margin({ top: 10, right: 10, bottom: 20, left: 130 });
        var formatter;
        formatter = function (d, i) {
            return d;
        }
        chart.xAxis
        .tickFormat(formatter);

        chart.yAxis
        .tickFormat(function (f) { return "$" + f; });
        chart.showLegend(false);
        chart.multibar.stacked(true); // default to stacked
        chart.showControls(false); // don't show controls
        chart.reduceXTicks(false);
        chart.forceY([0, 60000000]);

        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(StackedBarChartModal2, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select('#' + ContralID)
        .datum(StackedBarChartModal2)
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
//Modal3


function Get_multiChartType4(ChartID) {

    var multiChartType4 = [
  {
      "key": "Consumer",
      "values": [{ "x": 0, "y": -27 }, { "x": 1, "y": -127 }, { "x": 2, "y": 26 }, { "x": 3, "y": 126 }, { "x": 4, "y": 126 }, { "x": 5, "y": 123 }, { "x": 6, "y": 123 }, { "x": 7, "y": 22 }, { "x": 8, "y": 27 }, { "x": 9, "y": 69 }, { "x": 10, "y": 78 }, { "x": 11, "y": 84 }, { "x": 12, "y": 92 }, { "x": 13, "y": 122 }, { "x": 14, "y": 117}]

  },
  {
      "key": "Quantity",
      "values": [{ "x": 0, "y": -70 }, { "x": 1, "y": -70 }, { "x": 2, "y": -80 }, { "x": 3, "y": -80 }, { "x": 4, "y": -80 }, { "x": 5, "y": -50 }, { "x": 6, "y": -60 }, { "x": 7, "y": -60 }, { "x": 8, "y": -40 }, { "x": 9, "y": -40 }, { "x": 10, "y": -40 }, { "x": 11, "y": -60 }, { "x": 12, "y": -70 }, { "x": 13, "y": -70 }, { "x": 14, "y": -100}]

  },
  {
      "key": "Discretionary",
      "values": [{ "x": 0, "y": 71 }, { "x": 1, "y": 73 }, { "x": 2, "y": 84 }, { "x": 3, "y": 85 }, { "x": 4, "y": 98 }, { "x": 5, "y": 65 }, { "x": 6, "y": 76 }, { "x": 7, "y": 46 }, { "x": 8, "y": 54 }, { "x": 9, "y": 74 }, { "x": 10, "y": 94 }, { "x": 11, "y": 86 }, { "x": 12, "y": 87 }, { "x": 13, "y": 57 }, { "x": 14, "y": 100}]

  },
  {
      "key": "Products",
      "values": [{ "x": 0, "y": -70 }, { "x": 1, "y": -70 }, { "x": 2, "y": -80 }, { "x": 3, "y": -80 }, { "x": 4, "y": -80 }, { "x": 5, "y": -50 }, { "x": 6, "y": -60 }, { "x": 7, "y": -60 }, { "x": 8, "y": -40 }, { "x": 9, "y": -40 }, { "x": 10, "y": -40 }, { "x": 11, "y": -60 }, { "x": 12, "y": -100 }, { "x": 13, "y": -60 }, { "x": 14, "y": -100}]

  },
  {
      "key": "Gain",
      "values": [{ "x": 0, "y": 17 }, { "x": 1, "y": 27 }, { "x": 2, "y": 38 }, { "x": 3, "y": 48 }, { "x": 4, "y": 49 }, { "x": 5, "y": 50 }, { "x": 6, "y": 66 }, { "x": 7, "y": 68 }, { "x": 8, "y": 70 }, { "x": 9, "y": 70 }, { "x": 10, "y": 80 }, { "x": 11, "y": 84 }, { "x": 12, "y": 86 }, { "x": 13, "y": 88 }, { "x": 14, "y": 100}]

  }
  ,
  {
      "key": "Loss",
      "values": [{ "x": 0, "y": 17 }, { "x": 1, "y": 27 }, { "x": 2, "y": 38 }, { "x": 3, "y": 48 }, { "x": 4, "y": 49 }, { "x": 5, "y": 50 }, { "x": 6, "y": 66 }, { "x": 7, "y": 68 }, { "x": 8, "y": 70 }, { "x": 9, "y": 70 }, { "x": 10, "y": 80 }, { "x": 11, "y": 84 }, { "x": 12, "y": 86 }, { "x": 13, "y": 88 }, { "x": 14, "y": 100}]

  }
];

    multiChartType4[0].type = "line"
    multiChartType4[0].yAxis = 1
    multiChartType4[0].color = "#F16B50"
    multiChartType4[1].type = "bar"
    multiChartType4[1].yAxis = 2
    multiChartType4[1].color = "#26A7DD"
    multiChartType4[2].type = "line"
    multiChartType4[2].yAxis = 1
    multiChartType4[2].color = "#5CB74F"
    multiChartType4[3].type = "bar"
    multiChartType4[3].yAxis = 2
    multiChartType4[3].color = "#57D0B5"
    multiChartType4[4].type = "bar"
    multiChartType4[4].yAxis = 2
    multiChartType4[4].color = "#5FBA50"
    multiChartType4[5].type = "bar"
    multiChartType4[5].yAxis = 2
    multiChartType4[5].color = "#F16B50"


    nv.addGraph(function () {
        var chart = nv.models.multiChart()
        //   .height(350)
        .showLegend(true)
      //  .margin({ top: 30, right: 60, bottom: 20, left: 70 })
        .color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5)
        .tickFormat(function (d, i) {
            return ['Mar-03', 'Apr-03', 'May-03', 'Jun-03', 'Jul-03', 'Aug-03', 'Sep-03', 'Oct-03', 'Nov-03', 'Dec-03', 'Jan-04', 'Feb-04', 'Mar-04', 'Apr-04', 'May-04', 'Jun-04'][d];
        });

        chart.yAxis1
        .tickFormat(function (f) { return "$" + f; });

        chart.yAxis2
        .tickFormat(function (f) { return f + "%"; });

        chart.yDomain1([-150, 100]);
        chart.yDomain2([-150, 100]);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(multiChartType4, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });

        d3.select('#' + ChartID)
        .datum(multiChartType4)
      .transition().duration(10).call(chart);
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
///Modal4
function Get_multiChart4(ChartID) {

        var testdata = stream_layers(7, 10 + Math.random() * 10, .1).map(function (data, i) {
            return {
                key: 'Stream' + i,
                values: data.map(function (a) { a.y = a.y * (i <= 1 ? -1 : 1); return a })
            };
        });

        testdata[0].type = "area"
        testdata[0].yAxis = 1
        testdata[0].color = "#7B94AF"
        testdata[1].type = "area"
        testdata[1].yAxis = 1
        testdata[1].color = "#5FBA50"
        testdata[2].type = "line"
        testdata[2].yAxis = 1
        testdata[3].type = "line"
        testdata[3].yAxis = 2
        testdata[4].type = "bar"
        testdata[4].yAxis = 2
        testdata[4].color = "#E8DB49"
        testdata[5].type = "bar"
        testdata[5].yAxis = 2
        testdata[5].color = "#45CEB5"
        testdata[6].type = "bar"
        testdata[6].yAxis = 2
        testdata[6].color = "#F16B50"



    nv.addGraph(function () {
        var chart = nv.models.multiChart()
            .options({ reduceXTicks: false })
         //  .height(350)
        .showLegend(true)
       // .margin({ top: 30, right: 60, bottom: 20, left: 70 })
        //.color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5)
        .tickFormat(function (d, i) {
                        // alert(d+"  "+i);
                        var now = (new Date()).getTime(); // -86400 * 1000 * 365;
                         now = new Date(now); // + d * 86400 * 1000);

            //return ['Mar-03', 'Apr-03', 'May-03', 'Jun-03', 'Jul-03', 'Aug-03', 'Sep-03', 'Oct-03', 'Nov-03', 'Dec-03', 'Jan-03', 'Feb-03'][d];
        });

        chart.yAxis1
        .tickFormat(function (f) { return "$" + f; });

        chart.yAxis2
        .tickFormat(function (f) { return f + "%"; });

      //  chart.yDomain1([-10, 10]);
        chart.yDomain2([-10, 10]);

        d3.select('#' + ChartID)
        .datum(testdata)
      .transition().duration(100).call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });

    function stream_layers(n, m, o) {
        if (arguments.length < 3) o = 0;
        function bump(a) {
            var x = 1 / (.1 + Math.random()),
                    y = 2 * Math.random() - .5,
                    z = 10 / (.1 + Math.random());
            for (var i = 0; i < m; i++) {
                var w = (i / m - y) * z;
                a[i] += x * Math.exp(-w * w);
            }
        }
        return d3.range(n).map(function () {
            var a = [], i;
            for (i = 0; i < m; i++) a[i] = o + o * Math.random();
            for (i = 0; i < 5; i++) bump(a);
            return a.map(stream_index);
        });
    }

    function stream_index(d, i) {
        return { x: i, y: Math.max(0, d) };
    }


}


//HOME KPI

function Get_multiChartPipeLineHistory(ChartID) {

    var multiChartType4 = [
  {
      "key": "Consumer",
      "values": [{ "x": 0, "y": -27 }, { "x": 1, "y": -127 }, { "x": 2, "y": 26 }, { "x": 3, "y": 126 }, { "x": 4, "y": 126 }, { "x": 5, "y": 123 }, { "x": 6, "y": 123 }, { "x": 7, "y": 22 }, { "x": 8, "y": 27 }, { "x": 9, "y": 69 }, { "x": 10, "y": 78 }, { "x": 11, "y": 84 }, { "x": 12, "y": 92 }, { "x": 13, "y": 122 }, { "x": 14, "y": 117}]

  },
  
  {
      "key": "Discretionary",
      "values": [{ "x": 0, "y": 71 }, { "x": 1, "y": 73 }, { "x": 2, "y": 84 }, { "x": 3, "y": 85 }, { "x": 4, "y": 98 }, { "x": 5, "y": 65 }, { "x": 6, "y": 76 }, { "x": 7, "y": 46 }, { "x": 8, "y": 54 }, { "x": 9, "y": 74 }, { "x": 10, "y": 94 }, { "x": 11, "y": 86 }, { "x": 12, "y": 87 }, { "x": 13, "y": 57 }, { "x": 14, "y": 100}]

  },
  {
      "key": "Gain %",
      "values": [{ "x": 0, "y": -70 }, { "x": 1, "y": -70 }, { "x": 2, "y": -80 }, { "x": 3, "y": -80 }, { "x": 4, "y": -80 }, { "x": 5, "y": -50 }, { "x": 6, "y": -60 }, { "x": 7, "y": -60 }, { "x": 8, "y": -40 }, { "x": 9, "y": -40 }, { "x": 10, "y": -40 }, { "x": 11, "y": -60 }, { "x": 12, "y": -100 }, { "x": 13, "y": -60 }, { "x": 14, "y": -100}]

  },
  {
      "key": "Products",
      "values": [{ "x": 0, "y": 17 }, { "x": 1, "y": 27 }, { "x": 2, "y": 38 }, { "x": 3, "y": 48 }, { "x": 4, "y": 49 }, { "x": 5, "y": 50 }, { "x": 6, "y": 66 }, { "x": 7, "y": 68 }, { "x": 8, "y": 70 }, { "x": 9, "y": 70 }, { "x": 10, "y": 80 }, { "x": 11, "y": 84 }, { "x": 12, "y": 86 }, { "x": 13, "y": 88 }, { "x": 14, "y": 100}]

 }
  
];

    multiChartType4[0].type = "line"
    multiChartType4[0].yAxis = 2
    multiChartType4[0].color = "#99D290"
//    multiChartType4[1].type = "bar"
//    multiChartType4[1].yAxis = 1
//    multiChartType4[1].color = "#04B1D3"
    multiChartType4[1].type = "line"
    multiChartType4[1].yAxis = 2
    multiChartType4[1].color = "#55CFB3"
    multiChartType4[2].type = "bar"
    multiChartType4[2].yAxis = 2
    multiChartType4[2].color = "#E76955"
    multiChartType4[3].type = "bar"
    multiChartType4[3].yAxis = 1
    multiChartType4[3].color = "#04B1D3"
//    multiChartType4[4].type = "bar"
//    multiChartType4[4].yAxis = 1
//    multiChartType4[4].color = "#8179C5"


    nv.addGraph(function () {
        var chart = nv.models.multiChart()
        //   .height(220)
        .showLegend(false)
       // .margin({ top: 30, right: 60, bottom: 20, left: 70 })
        .color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5)
        .tickFormat(function (d, i) {
            return ['Mar 2012', 'Apr 2012', 'May 2012', 'Jun 2012', 'Jul 2012', 'Aug 2012', 'Sep 2012', 'Oct 2012', 'Nov 2012', 'Dec 2012', 'Jan 2013', 'Feb 2013', 'Mar 2013', 'Apr 2013', 'May 2013', 'Jun 2013'][d];
        });

        chart.yAxis1.axisLabel("PipeLine Count").width(60)
        .tickFormat(function (f) { return "$" + f; });

        chart.yAxis2
        .tickFormat(function (f) { return f + "%"; });

        chart.yDomain1([-150, 100]);
        chart.yDomain2([-150, 100]);

        d3.select('#' + ChartID)
        .datum(multiChartType4)
      .transition().duration(10).call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });

}
//1

function Get_multiChartPipeLineHistory1(ChartID) {

    var multiChartType4 = [
  {
      "key": "Consumer",
      "values": [{ "x": 0, "y": -30 }, { "x": 1, "y": -70 }, { "x": 2, "y": 106 }, { "x": 3, "y": 89 }, { "x": 4, "y": 77 }, { "x": 5, "y": 55 }, { "x": 6, "y": 80 }, { "x": 7, "y": 79 }, { "x": 8, "y": 27 }, { "x": 9, "y": 69 }, { "x": 10, "y": 78 }, { "x": 11, "y": 84 }, { "x": 12, "y": 92 }, { "x": 13, "y": 122 }, { "x": 14, "y": 117}]

  },

  {
      "key": "Discretionary",
      "values": [{ "x": 0, "y": 71 }, { "x": 1, "y": 73 }, { "x": 2, "y": 84 }, { "x": 3, "y": 85 }, { "x": 4, "y": 98 }, { "x": 5, "y": 65 }, { "x": 6, "y": 76 }, { "x": 7, "y": 46 }, { "x": 8, "y": 54 }, { "x": 9, "y": 74 }, { "x": 10, "y": 94 }, { "x": 11, "y": 86 }, { "x": 12, "y": 87 }, { "x": 13, "y": 57 }, { "x": 14, "y": 100}]

  },
  {
      "key": "Gain %",
      "values": [{ "x": 0, "y": -70 }, { "x": 1, "y": -70 }, { "x": 2, "y": -80 }, { "x": 3, "y": -80 }, { "x": 4, "y": -80 }, { "x": 5, "y": -50 }, { "x": 6, "y": -60 }, { "x": 7, "y": -60 }, { "x": 8, "y": -40 }, { "x": 9, "y": -40 }, { "x": 10, "y": -40 }, { "x": 11, "y": -60 }, { "x": 12, "y": -100 }, { "x": 13, "y": -60 }, { "x": 14, "y": -100}]

  },
  {
      "key": "Products",
      "values": [{ "x": 0, "y": 17 }, { "x": 1, "y": 27 }, { "x": 2, "y": 38 }, { "x": 3, "y": 48 }, { "x": 4, "y": 49 }, { "x": 5, "y": 50 }, { "x": 6, "y": 66 }, { "x": 7, "y": 68 }, { "x": 8, "y": 70 }, { "x": 9, "y": 70 }, { "x": 10, "y": 80 }, { "x": 11, "y": 84 }, { "x": 12, "y": 86 }, { "x": 13, "y": 88 }, { "x": 14, "y": 100}]

  }

];

    multiChartType4[0].type = "line"
    multiChartType4[0].yAxis = 2
    multiChartType4[0].color = "#F39C12"
    //    multiChartType4[1].type = "bar"
    //    multiChartType4[1].yAxis = 1
    //    multiChartType4[1].color = "#04B1D3"
    multiChartType4[1].type = "line"
    multiChartType4[1].yAxis = 2
    multiChartType4[1].color = "#0088DD"
    multiChartType4[2].type = "bar"
    multiChartType4[2].yAxis = 2
    multiChartType4[2].color = "#FC5242"
    multiChartType4[3].type = "bar"
    multiChartType4[3].yAxis = 1
    multiChartType4[3].color = "#75B289"
    //    multiChartType4[4].type = "bar"
    //    multiChartType4[4].yAxis = 1
    //    multiChartType4[4].color = "#8179C5"


    nv.addGraph(function () {
        var chart = nv.models.multiChart()
          // .height(220)
        .showLegend(false)
       // .margin({ top: 30, right: 60, bottom: 20, left: 70 })
        .color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5)
        .tickFormat(function (d, i) {
            return ['Mar 2012', 'Apr 2012', 'May 2012', 'Jun 2012', 'Jul 2012', 'Aug 2012', 'Sep 2012', 'Oct 2012', 'Nov 2012', 'Dec 2012', 'Jan 2013', 'Feb 2013', 'Mar 2013', 'Apr 2013', 'May 2013', 'Jun 2013'][d];
        });

        chart.yAxis1.axisLabel("PipeLine Count").width(60)
        .tickFormat(function (f) { return "$" + f; });

        chart.yAxis2
        .tickFormat(function (f) { return f + "%"; });

        chart.yDomain1([-150, 100]);
        chart.yDomain2([-150, 100]);

        d3.select('#' + ChartID)
        .datum(multiChartType4)
      .transition().duration(10).call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });

}

//Admissions


function Get_multiChartTypeAdmissions(ChartID) {

    var multiChartType1 =
  [{
      "key": "Created Count",
      "values": [{
          "x": 0,
          "y": 20
      }, {
          "x": 1,
          "y": 55
      }, {
          "x": 2,
          "y": 59
      }, {
          "x": 3,
          "y": 76
      }, {
          "x": 4,
          "y": 64
      }, {
          "x": 5,
          "y": 87
      }, {
          "x": 6,
          "y": 75
      }, {
          "x": 7,
          "y": 88
      }, {
          "x": 8,
          "y": 55
      }, {
          "x": 9,
          "y": 63
      },
        {
            "x": 10,
            "y": 87
        }, {
            "x": 11,
            "y": 96
        }, {
            "x": 12,
            "y": 66
        }, {
            "x": 13,
            "y": 72
        }, {
            "x": 14,
            "y": 57
        }, {
            "x": 15,
            "y": 88
        }]
    }, {
        "key": "Lost Count",
        "values": [{
            "x": 0,
            "y": 10
        }, {
            "x": 1,
            "y": 20
        }, {
            "x": 2,
            "y": 22
        }, {
            "x": 3,
            "y": 34
        }, {
            "x": 4,
            "y": 44
        }, {
            "x": 5,
            "y": 25
        }, {
            "x": 6,
            "y": 49
        }, {
            "x": 7,
            "y": 30
        }, {
            "x": 8,
            "y": 20
        }, {
            "x": 9,
            "y": 22
        },
        {
            "x": 10,
            "y": 38
        }, {
            "x": 11,
            "y": 25
        }]
    },
     {
         "key": "Flow %",
         "values": [{
             "x": 0, "y": 83
         }, {
             "x": 1, "y": 92
         },
         {
             "x": 2, "y": 99
         }, {
             "x": 3, "y": 100
         }, {
             "x": 4, "y": 98
         }, {
             "x": 5, "y": 79
         }, {
             "x": 6, "y": 77
         }, {
             "x": 7, "y": 75
         }, {
             "x": 8, "y": 72
         }, {
             "x": 9, "y": 68
         }, {
             "x": 10, "y": 64
         }, {
             "x": 11, "y": 60
         }, {
             "x": 12, "y": 70
         }, {
             "x": 13, "y": 80
         }, {
             "x": 14, "y": 96
         }, {
             "x": 15, "y": 100
         }]
     }
      ];

    multiChartType1[0].type = "bar"
    multiChartType1[0].yAxis = 1
    multiChartType1[0].color = "#5FBA50"
    multiChartType1[1].type = "line"
    multiChartType1[1].yAxis = 1
    multiChartType1[1].color = "#E0D555"
    multiChartType1[2].type = "line"
    multiChartType1[2].yAxis = 2
    multiChartType1[2].color = "#F16B50"
      
//    multiChartType1[2].type = "line"
//    multiChartType1[2].yAxis = 1
//    multiChartType1[2].color = "#57D0B5"
    //    testdata[3].type = "line"
    //    testdata[3].yAxis = 2
    //    testdata[3].color = "#E0D555"

    nv.addGraph(function () {
        var chart = nv.models.multiChart()
         //  .height(200)
        .showLegend(true)
       // .margin({ top: 30, right: 60, bottom: 20, left: 70 })
        .color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5)
        .tickFormat(function (d, i) {
            return ['Mar-03', 'Apr-03', 'May-03', 'Jun-03', 'Jul-03', 'Aug-03', 'Sep-03', 'Oct-03', 'Nov-03', 'Dec-03', 'Jan-04', 'Feb-04', 'Mar-04', 'Apr-04', 'May-04', 'Jun-04'][d];
        });

        chart.yAxis1
        .tickFormat(function (f) { return "$" + f; });

        chart.yAxis2
        .tickFormat(function (f) { return f + "%"; });

        chart.yDomain1([-100, 100]);
        //chart.yDomain2([-100, 100]);

        d3.select('#' + ChartID)
        .datum(multiChartType1)
      .transition().duration(10).call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });

}
//SelfService
//Modal3
function Get_multiChartSelfService(ChartID) {

    var SelfService =
  [{
      "key": "Low",
      "values": [{
          "x": 0,
          "y": 38
      }, {
          "x": 1,
          "y": 45
      }, {
          "x": 2,
          "y": 29
      }, {
          "x": 3,
          "y": 46
      }, {
          "x": 4,
          "y": 34
      }, {
          "x": 5,
          "y": 27
      }, {
          "x": 6,
          "y": 35
      }, {
          "x": 7,
          "y": 48
      }, {
          "x": 8,
          "y": 50
      }, {
          "x": 9,
          "y": 30
      },
        {
            "x": 10,
            "y": 32
        }, {
            "x": 11,
            "y": 15
        }, {
            "x": 12,
            "y": 10
        }, {
            "x": 13,
            "y": 16
        }, {
            "x": 14,
            "y": 7
        }, {
            "x": 15,
            "y": 14
        }, {
            "x": 16,
            "y": 17
        }, {
            "x": 17,
            "y": 19
        }, {
            "x": 18,
            "y": 10
        }, {
            "x": 19,
            "y": 11
        }, {
            "x": 20,
            "y": 13
        }]
  }, {
      "key": "Medium",
      "values": [{
          "x": 0,
          "y": 112
      }, {
          "x": 1,
          "y": 122
      }, {
          "x": 2,
          "y": 192
      }, {
          "x": 3,
          "y": 174
      }, {
          "x": 4,
          "y": 124
      }, {
          "x": 5,
          "y": 115
      }, {
          "x": 6,
          "y": 120
      }, {
          "x": 7,
          "y": 120
      }, {
          "x": 8,
          "y": 110
      }, {
          "x": 9,
          "y": 145
      },
        {
            "x": 10,
            "y": 118
        }, {
            "x": 11,
            "y": 65
        }, {
            "x": 12,
            "y": 10
        }, {
            "x": 13,
            "y": 12
        }, {
            "x": 14,
            "y": 6
        }, {
            "x": 15,
            "y": 45
        }, {
            "x": 16,
            "y": 112
        }, {
            "x": 17,
            "y": 132
        }, {
            "x": 18,
            "y": 19
        }, {
            "x": 19,
            "y": 112
        }, {
            "x": 20,
            "y": 62
        }]
  },
    {
        "key": "High",
        "values": [{
            "x": 0,
            "y": 6
        }, {
            "x": 1,
            "y": 3
        }, {
            "x": 2,
            "y": 5
        }, {
            "x": 3,
            "y": 2
        }, {
            "x": 4,
            "y": 11
        }, {
            "x": 5,
            "y": 13
        }, {
            "x": 6,
            "y": 10
        }, {
            "x": 7,
            "y": 13
        }, {
            "x": 8,
            "y": 2
        }, {
            "x": 9,
            "y": 11
        },
        {
            "x": 10,
            "y": 0
        }, {
            "x": 11,
            "y": 0
        }, {
            "x": 12,
            "y": 4
        }, {
            "x": 13,
            "y": 11
        }, {
            "x": 14,
            "y": 4
        }, {
            "x": 15,
            "y": 12
        }, {
            "x": 16,
            "y": 4
        }, {
            "x": 17,
            "y": 12
        }, {
            "x": 18,
            "y": 11
        }, {
            "x": 19,
            "y": 17
        }, {
            "x": 20,
            "y": 30
        }]
    },
     {
         "key": "Data Quality",
         "values": [{
             "x": 0, "y": 63
         }, {
             "x": 1, "y": 68
         },
         {
             "x": 2, "y": 84
         }, {
             "x": 3, "y": 72
         }, {
             "x": 4, "y": 94
         }, {
             "x": 5, "y": 80
         }, {
             "x": 6, "y": 76
         }, {
             "x": 7, "y": 96
         }, {
             "x": 8, "y": 86
         }, {
             "x": 9, "y": 68
         }, {
             "x": 10, "y": 80
         }, {
             "x": 11, "y": 98
         }, {
             "x": 12, "y": 77
         }, {
             "x": 13, "y": 67
         }, {
             "x": 14, "y": 79
         }, {
             "x": 15, "y": 80
         }, {
             "x": 16, "y": 97
         }, {
             "x": 17, "y": 82
         }, {
             "x": 18, "y": 85
         }, {
             "x": 19, "y": 86
         }, {
             "x": 20, "y": 100
         }]
     }
      ];


     SelfService[0].type = "bar"
     SelfService[0].yAxis = 1
     SelfService[0].color = "#FDEF3A"
     SelfService[1].type = "bar"
     SelfService[1].yAxis = 1
     SelfService[1].color = "#F8B418"
     SelfService[2].type = "bar"
     SelfService[2].yAxis = 1
     SelfService[2].color = "#DA4919"
     SelfService[3].type = "line"
     SelfService[3].yAxis = 2
     SelfService[3].color = "#5AB53D"
    

    nv.addGraph(function () {
        var chart = nv.models.multiChart()
         .height(300)
        .showLegend(true)
        .margin({ top: 30, right: 80, bottom: 60, left: 80 })
        .color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5).axisLabel("Job Order Created Date").width(60).rotateLabels(-30)
        .tickFormat(function (d, i) {
            return ['Mar-13', 'Apr-13', 'May-13', 'Jun-13', 'Jul-13', 'Aug-13', 'Sep-13', 'Oct-13', 'Nov-13', 'Dec-13', 'Jan-14', 'Feb-14', 'Mar-14', 'Apr-14', 'May-14', 'Jun-14', 'Jul-14', 'Aug-14', 'Sep-14', 'Oct-14', 'Nov-14', 'Dec-14'][d];
        });

        chart.yAxis1.axisLabel("Job Order Errors").width(60)
        .tickFormat(function (f) { return "" + f; });

        chart.yAxis2.axisLabel("Data Quality Score").width(60)
        .tickFormat(function (f) { return f + "%"; });

        chart.yDomain1([0, 250]);
        chart.yDomain2([0, 100]);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(SelfService, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select('#' + ChartID)
        .datum(SelfService)
      .transition().duration(10).call(chart);
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

//SelfServiceNew
function Get_multiChartSelfService1(ChartID) {

    var SelfService =
  [{
      "key": "Low",
      "values": [{
          "x": 0,
          "y": 38
      }, {
          "x": 1,
          "y": 45
      }, {
          "x": 2,
          "y": 29
      }, {
          "x": 3,
          "y": 46
      }, {
          "x": 4,
          "y": 34
      }, {
          "x": 5,
          "y": 27
      }, {
          "x": 6,
          "y": 35
      }, {
          "x": 7,
          "y": 48
      }, {
          "x": 8,
          "y": 50
      }, {
          "x": 9,
          "y": 30
      },
        {
            "x": 10,
            "y": 32
        }, {
            "x": 11,
            "y": 15
        }, {
            "x": 12,
            "y": 10
        }, {
            "x": 13,
            "y": 16
        }, {
            "x": 14,
            "y": 7
        }, {
            "x": 15,
            "y": 14
        }, {
            "x": 16,
            "y": 17
        }, {
            "x": 17,
            "y": 19
        }, {
            "x": 18,
            "y": 10
        }, {
            "x": 19,
            "y": 11
        }, {
            "x": 20,
            "y": 13
        }]
  }, {
      "key": "Medium",
      "values": [{
          "x": 0,
          "y": 112
      }, {
          "x": 1,
          "y": 122
      }, {
          "x": 2,
          "y": 192
      }, {
          "x": 3,
          "y": 174
      }, {
          "x": 4,
          "y": 124
      }, {
          "x": 5,
          "y": 115
      }, {
          "x": 6,
          "y": 120
      }, {
          "x": 7,
          "y": 120
      }, {
          "x": 8,
          "y": 110
      }, {
          "x": 9,
          "y": 145
      },
        {
            "x": 10,
            "y": 118
        }, {
            "x": 11,
            "y": 65
        }, {
            "x": 12,
            "y": 10
        }, {
            "x": 13,
            "y": 12
        }, {
            "x": 14,
            "y": 6
        }, {
            "x": 15,
            "y": 45
        }, {
            "x": 16,
            "y": 112
        }, {
            "x": 17,
            "y": 132
        }, {
            "x": 18,
            "y": 19
        }, {
            "x": 19,
            "y": 112
        }, {
            "x": 20,
            "y": 62
        }]
  },
    {
        "key": "High",
        "values": [{
            "x": 0,
            "y": 6
        }, {
            "x": 1,
            "y": 3
        }, {
            "x": 2,
            "y": 5
        }, {
            "x": 3,
            "y": 2
        }, {
            "x": 4,
            "y": 11
        }, {
            "x": 5,
            "y": 13
        }, {
            "x": 6,
            "y": 10
        }, {
            "x": 7,
            "y": 13
        }, {
            "x": 8,
            "y": 2
        }, {
            "x": 9,
            "y": 11
        },
        {
            "x": 10,
            "y": 0
        }, {
            "x": 11,
            "y": 0
        }, {
            "x": 12,
            "y": 4
        }, {
            "x": 13,
            "y": 11
        }, {
            "x": 14,
            "y": 4
        }, {
            "x": 15,
            "y": 12
        }, {
            "x": 16,
            "y": 4
        }, {
            "x": 17,
            "y": 12
        }, {
            "x": 18,
            "y": 11
        }, {
            "x": 19,
            "y": 17
        }, {
            "x": 20,
            "y": 30
        }]
    },
     {
         "key": "Data Quality",
         "values": [{
             "x": 0, "y": 63
         }, {
             "x": 1, "y": 68
         },
         {
             "x": 2, "y": 84
         }, {
             "x": 3, "y": 72
         }, {
             "x": 4, "y": 94
         }, {
             "x": 5, "y": 80
         }, {
             "x": 6, "y": 76
         }, {
             "x": 7, "y": 96
         }, {
             "x": 8, "y": 86
         }, {
             "x": 9, "y": 68
         }, {
             "x": 10, "y": 80
         }, {
             "x": 11, "y": 98
         }, {
             "x": 12, "y": 77
         }, {
             "x": 13, "y": 67
         }, {
             "x": 14, "y": 79
         }, {
             "x": 15, "y": 80
         }, {
             "x": 16, "y": 97
         }, {
             "x": 17, "y": 82
         }, {
             "x": 18, "y": 85
         }, {
             "x": 19, "y": 86
         }, {
             "x": 20, "y": 100
         }]
     }
      ];


    SelfService[0].type = "bar"
    SelfService[0].yAxis = 1
    SelfService[0].color = "#26A6DC"
    SelfService[1].type = "line"
    SelfService[1].yAxis = 1
    SelfService[1].color = "#F8B418"
    SelfService[2].type = "bar"
    SelfService[2].yAxis = 1
    SelfService[2].color = "#F16B50"
    SelfService[3].type = "line"
    SelfService[3].yAxis = 2
    SelfService[3].color = "#5AB53D"


    nv.addGraph(function () {
        var chart = nv.models.multiChart()
         .height(300)
        .showLegend(true)
        .margin({ top: 30, right: 80, bottom: 60, left: 80 })
        .color(d3.scale.category20().range());

        chart.xAxis.orient('bottom').tickPadding(5).axisLabel("Job Order Created Date").width(60).rotateLabels(-30)
        .tickFormat(function (d, i) {
            return ['Mar-13', 'Apr-13', 'May-13', 'Jun-13', 'Jul-13', 'Aug-13', 'Sep-13', 'Oct-13', 'Nov-13', 'Dec-13', 'Jan-14', 'Feb-14', 'Mar-14', 'Apr-14', 'May-14', 'Jun-14', 'Jul-14', 'Aug-14', 'Sep-14', 'Oct-14', 'Nov-14', 'Dec-14'][d];
        });

        chart.yAxis1.axisLabel("Job Order Errors").width(60)
        .tickFormat(function (f) { return "" + f; });

        chart.yAxis2.axisLabel("Data Quality Score").width(60)
        .tickFormat(function (f) { return f + "%"; });

        chart.yDomain1([0, 250]);
        chart.yDomain2([0, 100]);
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(SelfService, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select('#' + ChartID)
        .datum(SelfService)
      .transition().duration(10).call(chart);
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



