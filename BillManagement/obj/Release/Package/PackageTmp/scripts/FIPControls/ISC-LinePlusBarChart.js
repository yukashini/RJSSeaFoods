/// <reference path="../Internalplugin/jquery-1.8.3.min.js" />



function Get_LinePlusBarChart(Chartid) {


    var testdata =
        [
        { "color": "#01AFD4", "key": "Quantity", "bar": true, "values": [{ "x": 1136005200000, "y": -1271000, "color": "#F16B50" }, { "x": 1138683600000, "y": 1271000 }, { "x": 1141102800000, "y": 1271000 }, { "x": 1156996800000, "y": 0 }, { "x": 1159588800000, "y": -3899486, "color": "#F16B50" }, { "x": 1162270800000, "y": 3899486 }, { "x": 1164862800000, "y": -3899486, "color": "#F16B50" }, { "x": 1167541200000, "y": 3564700 }, { "x": 1170219600000, "y": -3564700, "color": "#F16B50" }, { "x": 1172638800000, "y": 3564700 }, { "x": 1175313600000, "y": -2648493, "color": "#F16B50" }, { "x": 1177905600000, "y": 2648493 }, { "x": 1180584000000, "y": -2648493, "color": "#F16B50" }, { "x": 1183176000000, "y": 2522993 }, { "x": 1185854400000, "y": 2522993 }, { "x": 1188532800000, "y": -2522993, "color": "#F16B50" }, { "x": 1191124800000, "y": 2906501 }, { "x": 1193803200000, "y": -2906501, "color": "#F16B50" }, { "x": 1196398800000, "y": 2906501 }, { "x": 1199077200000, "y": -2206761, "color": "#F16B50"}] },
        { "color": "#aaa", "key": "Price", "values": [{ "x": 1136005200000, "y": 71.89 }, { "x": 1138683600000, "y": 75.51 },{ "x": 1159588800000, "y": 76.98 }, { "x": 1162270800000, "y": 81.08 }, { "x": 1164862800000, "y": 91.66 }, { "x": 1167541200000, "y": 84.84 }, { "x": 1170219600000, "y": 85.73 }, { "x": 1172638800000, "y": 84.61 }, { "x": 1175313600000, "y": 92.91 }, { "x": 1177905600000, "y": 99.8 }, { "x": 1180584000000, "y": 121.191 }, { "x": 1183176000000, "y": 122.04 }, { "x": 1185854400000, "y": 131.76 }, { "x": 1188532800000, "y": 138.48 }, { "x": 1191124800000, "y": 153.47 }, { "x": 1193803200000, "y": 189.95 }, { "x": 1196398800000, "y": 182.22 }, { "x": 1199077200000, "y": 198.08 }, { "x": 1201755600000, "y": 135.36 }] }
        ]
    
    var chart;


    nv.addGraph(function () {
        chart = nv.models.linePlusBarChart()
        //.margin({ right: 80 })
        .x(function (d, i) { return i })
       // .color(d3.scale.category10().range());

        chart.xAxis.tickFormat(function (d) {
            var dx = testdata[0].values[d] && testdata[0].values[d].x || '';
            return dx ? d3.time.format('%x')(new Date(dx)) : '';
            //  alert(dx);
            return dx;
        })
      .showMaxMin(false);

        chart.y1Axis.axisLabel('Pipeline Count').width(110)
        .tickFormat(d3.format(',f'));

        chart.y2Axis
        .tickFormat(function (d) { return '$' + d3.format(',.2f')(d) });

        chart.bars.forceY([0,4000000]).padData(false);
        chart.lines.forceY([0]);
        chart.showLegend(false);

        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(testdata, key, x, y) + '">' + y + ' on' + x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        
        d3.select('#' + Chartid)
        .datum(testdata)
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


function Get_LinePlusBarChartDailyRet(Chartid) {

    var testdata =
        [
            { "key": "Retrival Request", "bar": true, "values":
                [
                    { "x": "1", "y": 149 },
                    { "x": "2", "y": 249 },
                    { "x": "3", "y": 78149.25 },
                    { "x": "4", "y": 69823.03 },
                    { "x": "5", "y": 167 },
                    { "x": "6", "y": 204 },
                    { "x": "7", "y": 0 },
                    { "x": "8", "y": 170 },
                    { "x": "9", "y": 161 },
                    { "x": "10", "y": 71 },
                    { "x": "11", "y": 52 },
                    { "x": "12", "y": 105 },
                    { "x": "13", "y": 43 },
                    { "x": "14", "y": 0 },
                    { "x": "15", "y": 1 },
                    { "x": "16", "y": 80 },
                    { "x": "17", "y": 89 },
                    { "x": "18", "y": 13 },
                    { "x": "19", "y": 116 },
                    { "x": "20", "y": 262 },
                    { "x": "21", "y": 60 },
                    { "x": "22", "y": 112 },
                    { "x": "23", "y": 86 },
                    { "x": "24", "y": 52 },
                    { "x": "25", "y": 128 },
                    { "x": "26", "y": 65 },
                    { "x": "27", "y": 0 },
                    { "x": "28", "y": 0 },
                    { "x": "29", "y": 64 }

                ]
            },
            { "key": "Dollar", "values":
                [
                    { "x": "1", "y": 4236.24 },
                    { "x": "2", "y": 4236.24 },
                    { "x": "3", "y": 4236.24 },
                    { "x": "4", "y": 4236.24 },
                    { "x": "5", "y": 4236.24 },
                    { "x": "6", "y": 4236.24 },
                    { "x": "7", "y": 4236.24 },
                    { "x": "8", "y": 4236.24 },
                    { "x": "9", "y": 4236.24 },
                    { "x": "10", "y": 4236.24 },
                    { "x": "11", "y": 4236.24 },
                    { "x": "12", "y": 4236.24 },
                    { "x": "13", "y": 4236.24 },
                    { "x": "14", "y": 4236.24 },
                    { "x": "15", "y": 4236.24 },
                    { "x": "16", "y": 4236.24 },
                    { "x": "17", "y": 4236.24 },
                    { "x": "18", "y": 4236.24 },
                    { "x": "19", "y": 4236.24 },
                    { "x": "20", "y": 4236.24 },
                    { "x": "21", "y": 4236.24 },
                    { "x": "22", "y": 4236.24 },
                    { "x": "23", "y": 4236.24 },
                    { "x": "24", "y": 4236.24 },
                    { "x": "25", "y": 4236.24 },
                    { "x": "26", "y": 4236.24 },
                    { "x": "27", "y": 4236.24 },
                    { "x": "28", "y": 4236.24 },
                    { "x": "29", "y": 4236.24 }
                ]
            }
        ]
    var chart;


    nv.addGraph(function () {
        chart = nv.models.linePlusBarChart()
        //.margin({ top: 30, right: 60, bottom: 50, left: 70 })
        .x(function (d, i) { return i })
        .color(d3.scale.category10().range())
        chart.xAxis.tickFormat(function (d) {
            //  alert(d);
            var dx = testdata[0].values[d] && testdata[0].values[d].x || '';
            //  return dx ? d3.time.format('%x')(new Date(dx)) : '';
            //  alert(dx);
            return dx;
        })
      .showMaxMin(false);

        chart.y1Axis
        .tickFormat(d3.format(',f'));

        chart.y2Axis
        .tickFormat(function (d) { return '' + d3.format(',.0f')(d) });

        chart.y1Axis.axisLabel('Retirived (GB)').width(50);
        chart.y2Axis.axisLabel('Allowable').width(50);
        chart.xAxis.axisLabel('Days').width(30)
        chart.showLegend(false);
        chart.bars.forceY([0]).padData(false);
        //chart.lines.forceY([0]);

        d3.select('#' + Chartid)
        .datum(testdata)
      .transition().duration(500).call(chart);

        nv.utils.windowResize(chart.update);

        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });

        return chart;
    });


}
function Get_LinePlusBarChartDailyRetHourly(Chartid) {

    var testdata =
        [
            { "key": "Retrival Request", "bar": true, "values":
                [
                    { "x": "0", "y": 221 },
                    { "x": "1", "y": 0 },
                    { "x": "2", "y": 0 },
                    { "x": "3", "y": 0 },
                    { "x": "4", "y": 18 },
                    { "x": "5", "y": 0 },
                    { "x": "6", "y": 0 },
                    { "x": "7", "y": 0 },
                    { "x": "8", "y": 0 },
                    { "x": "9", "y": 0 },
                    { "x": "10", "y": 0 },
                    { "x": "11", "y": 0 },
                    { "x": "12", "y": 0 },
                    { "x": "13", "y": 0 },
                    { "x": "14", "y": 0 },
                    { "x": "15", "y": 0 },
                    { "x": "16", "y": 125.25 },
                    { "x": "17", "y": 0 },
                    { "x": "18", "y": 0 },
                    { "x": "19", "y": 0 },
                    { "x": "20", "y": 299 },
                    { "x": "21", "y": 0 },
                    { "x": "22", "y": 0 },
                    { "x": "23", "y": 0 },
                ]
            },
            { "key": "Dollar", "values":
                [
                    { "x": "0", "y": 732.63 },
                    { "x": "1", "y": 732.63 },
                    { "x": "2", "y": 732.63 },
                    { "x": "3", "y": 732.63 },

                    { "x": "4", "y": 732.63 },
                    { "x": "5", "y": 732.63 },
                    { "x": "6", "y": 732.63 },
                    { "x": "7", "y": 732.63 },

                    { "x": "8", "y": 732.63 },
                    { "x": "9", "y": 732.63 },
                    { "x": "10", "y": 732.63 },
                    { "x": "11", "y": 732.63 },

                    { "x": "12", "y": 732.63 },
                    { "x": "13", "y": 732.63 },
                    { "x": "14", "y": 732.63 },
                    { "x": "15", "y": 732.63 },

                    { "x": "16", "y": 732.63 },
                    { "x": "17", "y": 732.63 },
                    { "x": "18", "y": 732.63 },
                    { "x": "19", "y": 732.63 },

                    { "x": "20", "y": 732.63 },
                    { "x": "21", "y": 732.63 },
                    { "x": "22", "y": 732.63 },
                    { "x": "23", "y": 732.63 }
                ]
            }
        ]
    var chart;


    nv.addGraph(function () {
        chart = nv.models.linePlusBarChart()
        //.margin({ top: 30, right: 60, bottom: 50, left: 70 })
        .x(function (d, i) { return i })
        .color(d3.scale.category10().range())
        chart.xAxis.tickFormat(function (d) {
            //  alert(d);
            var dx = testdata[0].values[d] && testdata[0].values[d].x || '';
            //  return dx ? d3.time.format('%x')(new Date(dx)) : '';
            //  alert(dx);
            return dx;
        })
      .showMaxMin(false);

        chart.y1Axis
        .tickFormat(d3.format(',f'));

        chart.y2Axis
        .tickFormat(function (d) { return '' + d3.format(',.0f')(d) });

        chart.y1Axis.axisLabel('Retirived (GB)').width(50);

        chart.y2Axis.axisLabel('Allowable').width(50);

        chart.xAxis.axisLabel('Hours').width(30)
        chart.showLegend(false);
        chart.bars.forceY([0, 750]).padData(false);
        chart.lines.forceY([0, 750]).padData(false);

        d3.select('#' + Chartid)
        .datum(testdata)
      .transition().duration(500).call(chart);

        nv.utils.windowResize(chart.update);

        chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });

        return chart;
    });


}