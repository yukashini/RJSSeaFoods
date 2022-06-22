/// <reference path="../Internalplugin/jquery-1.8.3.min.js" />

function Get_BubbleChartAll(ChartID) {

    var Data_BubbleChart =
            [
           { "key": 1, "color": "#01AFD4", "values": [{ "x": 210, "y": 4, "size": 10, "shape": "diamond"}] }, { "key": 2, "color": "#FF0000", "values": [{ "x": 220, "y": 4, "size": 9, "shape": "triangle-down"}] }, { "key": 3, "color": "#FF0000", "values": [{ "x": 230, "y": 4, "size": 3, "shape": "triangle-down"}] }, { "key": 4, "color": "#01AFD4", "values": [{ "x": 240, "y": 4, "size": 17, "shape": "diamond"}] }, { "key": 5, "color": "#FF0000", "values": [{ "x": 250, "y": 4, "size": 5, "shape": "triangle-down"}] }, { "key": 6, "color": "#FF0000", "values": [{ "x": 260, "y": 4, "size": 1.1, "shape": "triangle-down"}] }, { "key": 7, "color": "#FF0000", "values": [{ "x": 270, "y": 4, "size": 3, "shape": "triangle-down"}] }, { "key": 8, "color": "#FF0000", "values": [{ "x": 280, "y": 4, "size": 3, "shape": "triangle-down"}] }, { "key": 9, "color": "#D35400", "values": [{ "x": 290, "y": 4, "size": 35, "shape": "square"}] }, { "key": 10, "color": "#FF0000", "values": [{ "x": 300, "y": 4, "size": 0, "shape": "triangle-down"}] },
           { "key": 11, "color": "#01AFD4", "values": [{ "x": 210, "y": 3, "size": 11, "shape": "diamond"}] }, { "key": 12, "color": "#01AFD4", "values": [{ "x": 220, "y": 3, "size": 16, "shape": "diamond"}] }, { "key": 13, "color": "#FF0000", "values": [{ "x": 230, "y": 3, "size": 0, "shape": "triangle-down"}] }, { "key": 14, "color": "#FF0000", "values": [{ "x": 240, "y": 3, "size": 7, "shape": "triangle-down"}] }, { "key": 15, "color": "#FF0000", "values": [{ "x": 250, "y": 3, "size": 0, "shape": "triangle-down"}] }, { "key": 16, "color": "#01AFD4", "values": [{ "x": 260, "y": 3, "size": 14, "shape": "diamond"}] }, { "key": 17, "color": "#01AFD4", "values": [{ "x": 270, "y": 3, "size": 19, "shape": "diamond"}] }, { "key": 18, "color": "#1E824C", "values": [{ "x": 280, "y": 3, "size": 21, "shape": "cross"}] }, { "key": 19, "color": "#D35400", "values": [{ "x": 290, "y": 3, "size": 32, "shape": "square"}] }, { "key": 20, "color": "#FF0000", "values": [{ "x": 300, "y": 3, "size": 0, "shape": "triangle-down"}] },
           { "key": 21, "color": "#FF0000", "values": [{ "x": 210, "y": 2, "size": 5, "shape": "triangle-down"}] }, { "key": 22, "color": "#9A12B3", "values": [{ "x": 220, "y": 2, "size": 10, "shape": "diamond"}] }, { "key": 23, "color": "#01AFD4", "values": [{ "x": 230, "y": 2, "size": 13, "shape": "diamond"}] }, { "key": 24, "color": "#01AFD4", "values": [{ "x": 240, "y": 2, "size": 16, "shape": "diamond"}] }, { "key": 25, "color": "#FF0000", "values": [{ "x": 250, "y": 2, "size": 0, "shape": "triangle-down"}] }, { "key": 26, "color": "#FF0000", "values": [{ "x": 260, "y": 2, "size": 8, "shape": "triangle-down"}] }, { "key": 27, "color": "#1E824C", "values": [{ "x": 270, "y": 2, "size": 22, "shape": "cross"}] }, { "key": 28, "color": "#1E824C", "values": [{ "x": 280, "y": 2, "size": 24, "shape": "cross"}] }, { "key": 29, "color": "#01AFD4", "values": [{ "x": 290, "y": 2, "size": 16, "shape": "diamond"}] }, { "key": 30, "color": "#FF0000", "values": [{ "x": 300, "y": 2, "size": 0, "shape": "triangle-down"}] },
           { "key": 31, "color": "#FF0000", "values": [{ "x": 210, "y": 1, "size": 8, "shape": "triangle-down"}] }, { "key": 32, "color": "#FF0000", "values": [{ "x": 220, "y": 1, "size": 8, "shape": "triangle-down"}] }, { "key": 33, "color": "#9A12B3", "values": [{ "x": 230, "y": 1, "size": 13, "shape": "cross"}] }, { "key": 34, "color": "#9A12B3", "values": [{ "x": 240, "y": 1, "size": 11, "shape": "cross"}] }, { "key": 35, "color": "#FF0000", "values": [{ "x": 250, "y": 1, "size": 0, "shape": "triangle-down"}] }, { "key": 36, "color": "#FF0000", "values": [{ "x": 260, "y": 1, "size": 0, "shape": "cross"}] }, { "key": 37, "color": "#FF0000", "values": [{ "x": 270, "y": 1, "size": 0, "shape": "triangle-down"}] }, { "key": 38, "color": "#FF0000", "values": [{ "x": 280, "y": 1, "size": 0, "shape": "triangle-down"}] }, { "key": 39, "color": "#FF0000", "values": [{ "x": 290, "y": 1, "size": 0, "shape": "triangle-down"}] }, { "key": 40, "color": "#FF0000", "values": [{ "x": 300, "y": 1, "size": 0, "shape": "triangle-down"}] },
           { "key": 41, "color": "#FF0000", "values": [{ "x": 210, "y": 0, "size": 8, "shape": "triangle-down"}] }, { "key": 42, "color": "#01AFD4", "values": [{ "x": 220, "y": 0, "size": 16, "shape": "diamond"}] }, { "key": 43, "color": "#FF0000", "values": [{ "x": 230, "y": 0, "size": 8, "shape": "triangle-down"}] }, { "key": 44, "color": "#01AFD4", "values": [{ "x": 240, "y": 0, "size": 17, "shape": "diamond"}] }, { "key": 45, "color": "#FF0000", "values": [{ "x": 250, "y": 0, "size": 0, "shape": "triangle-down"}] }, { "key": 46, "color": "#01AFD4", "values": [{ "x": 260, "y": 0, "size": 16, "shape": "diamond"}] }, { "key": 47, "color": "#01AFD4", "values": [{ "x": 270, "y": 0, "size": 17, "shape": "diamond"}] }, { "key": 48, "color": "#1E824C", "values": [{ "x": 280, "y": 0, "size": 25, "shape": "cross"}] }, { "key": 49, "color": "#01AFD4", "values": [{ "x": 290, "y": 0, "size": 19, "shape": "diamond"}] }, { "key": 50, "color": "#FF0000", "values": [{ "x": 300, "y": 0, "size": 0, "shape": "triangle-down"}]}];


           nv.addGraph(function () {
               var chart = nv.models.scatterChart()
                .showDistX(true)
                .showDistY(true)
                .sizeRange([0, 500])
                .interactive(true)
                .color(d3.scale.category10().range());
               chart.scatter.onlyCircles(false);
               chart.showLegend(true);
               chart.yAxis.tickFormat(d3.format('.02f'));
               chart.showLegend(false);
               //var myData = randomData(4, 50);


               d3.select('#' + ChartID)
      .datum(Data_BubbleChart)
    .transition().duration(500)
      .call(chart);

               nv.utils.windowResize(chart.update);

               return chart;
           });
}


function Get_BubbleChart(ChartID) {
    var Data_BubbleChart =
            [
           { "key": 1, "color": "#9A12B3", "values": [{ "x": 210, "y": 4, "size": 10}] }, { "key": 2, "color": "#FF0000", "values": [{ "x": 220, "y": 4, "size": 9}] }, { "key": 3, "color": "#FF0000", "values": [{ "x": 230, "y": 4, "size": 3}] }, { "key": 4, "color": "#9A12B3", "values": [{ "x": 240, "y": 4, "size": 17}] }, { "key": 5, "color": "#FF0000", "values": [{ "x": 250, "y": 4, "size": 5}] }, { "key": 6, "color": "#FF0000", "values": [{ "x": 260, "y": 4, "size": 1.1}] }, { "key": 7, "color": "#FF0000", "values": [{ "x": 270, "y": 4, "size": 3}] }, { "key": 8, "color": "#FF0000", "values": [{ "x": 280, "y": 4, "size": 3}] }, { "key": 9, "color": "#D35400", "values": [{ "x": 290, "y": 4, "size": 35}] }, { "key": 10, "color": "#FF0000", "values": [{ "x": 300, "y": 4, "size": 0}] },
           { "key": 11, "color": "#9A12B3", "values": [{ "x": 210, "y": 3, "size": 11}] }, { "key": 12, "color": "#9A12B3", "values": [{ "x": 220, "y": 3, "size": 16}] }, { "key": 13, "color": "#FF0000", "values": [{ "x": 230, "y": 3, "size": 0}] }, { "key": 14, "color": "#FF0000", "values": [{ "x": 240, "y": 3, "size": 7}] }, { "key": 15, "color": "#FF0000", "values": [{ "x": 250, "y": 3, "size": 0}] }, { "key": 16, "color": "#9A12B3", "values": [{ "x": 260, "y": 3, "size": 14}] }, { "key": 17, "color": "#9A12B3", "values": [{ "x": 270, "y": 3, "size": 19}] }, { "key": 18, "color": "#1E824C", "values": [{ "x": 280, "y": 3, "size": 21}] }, { "key": 19, "color": "#D35400", "values": [{ "x": 290, "y": 3, "size": 32}] }, { "key": 20, "color": "#FF0000", "values": [{ "x": 300, "y": 3, "size": 0}] },
           { "key": 21, "color": "#FF0000", "values": [{ "x": 210, "y": 2, "size": 5}] }, { "key": 22, "color": "#9A12B3", "values": [{ "x": 220, "y": 2, "size": 10}] }, { "key": 23, "color": "#9A12B3", "values": [{ "x": 230, "y": 2, "size": 13}] }, { "key": 24, "color": "#9A12B3", "values": [{ "x": 240, "y": 2, "size": 16}] }, { "key": 25, "color": "#FF0000", "values": [{ "x": 250, "y": 2, "size": 0}] }, { "key": 26, "color": "#FF0000", "values": [{ "x": 260, "y": 2, "size": 8}] }, { "key": 27, "color": "#1E824C", "values": [{ "x": 270, "y": 2, "size": 22}] }, { "key": 28, "color": "#1E824C", "values": [{ "x": 280, "y": 2, "size": 24}] }, { "key": 29, "color": "#9A12B3", "values": [{ "x": 290, "y": 2, "size": 16}] }, { "key": 30, "color": "#FF0000", "values": [{ "x": 300, "y": 2, "size": 0}] },
           { "key": 31, "color": "#FF0000", "values": [{ "x": 210, "y": 1, "size": 8}] }, { "key": 32, "color": "#FF0000", "values": [{ "x": 220, "y": 1, "size": 8}] }, { "key": 33, "color": "#9A12B3", "values": [{ "x": 230, "y": 1, "size": 13}] }, { "key": 34, "color": "#9A12B3", "values": [{ "x": 240, "y": 1, "size": 11}] }, { "key": 35, "color": "#FF0000", "values": [{ "x": 250, "y": 1, "size": 0}] }, { "key": 36, "color": "#FF0000", "values": [{ "x": 260, "y": 1, "size": 0}] }, { "key": 37, "color": "#FF0000", "values": [{ "x": 270, "y": 1, "size": 0}] }, { "key": 38, "color": "#FF0000", "values": [{ "x": 280, "y": 1, "size": 0}] }, { "key": 39, "color": "#FF0000", "values": [{ "x": 290, "y": 1, "size": 0}] }, { "key": 40, "color": "#FF0000", "values": [{ "x": 300, "y": 1, "size": 0}] },
           { "key": 41, "color": "#FF0000", "values": [{ "x": 210, "y": 0, "size": 8}] }, { "key": 42, "color": "#9A12B3", "values": [{ "x": 220, "y": 0, "size": 16}] }, { "key": 43, "color": "#FF0000", "values": [{ "x": 230, "y": 0, "size": 8}] }, { "key": 44, "color": "#9A12B3", "values": [{ "x": 240, "y": 0, "size": 17}] }, { "key": 45, "color": "#FF0000", "values": [{ "x": 250, "y": 0, "size": 0}] }, { "key": 46, "color": "#9A12B3", "values": [{ "x": 260, "y": 0, "size": 16}] }, { "key": 47, "color": "#9A12B3", "values": [{ "x": 270, "y": 0, "size": 17}] }, { "key": 48, "color": "#1E824C", "values": [{ "x": 280, "y": 0, "size": 25}] }, { "key": 49, "color": "#9A12B3", "values": [{ "x": 290, "y": 0, "size": 19}] }, { "key": 50, "color": "#FF0000", "values": [{ "x": 300, "y": 0, "size": 0}]}];
    nv.addGraph(function () {
        var chart = nv.models.scatterPlusLineChart()
                .showDistX(true)
                .showDistY(true)
        //.height(500)
                .color(d3.scale.category10().range());
        chart.xAxis.tickFormat(d3.format('.02f'))
        chart.yAxis.tickFormat(d3.format('.02f'))
        d3.select('#' + ChartID)
      .datum(Data_BubbleChart)
    .transition().duration(500)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}
//2

function Get_BubbleChart2(ChartID) {

    var Data_BubbleChart2 =
            [
           { "key": 1, "color": "#9A12B3", "values": [{ "x": 210, "y": 4, "size": 10}] }, { "key": 2, "color": "#FF0000", "values": [{ "x": 220, "y": 4, "size": 9}] }, { "key": 3, "color": "#FF0000", "values": [{ "x": 230, "y": 4, "size": 3}] }, { "key": 4, "color": "#9A12B3", "values": [{ "x": 240, "y": 4, "size": 17}] }, { "key": 5, "color": "#FF0000", "values": [{ "x": 250, "y": 4, "size": 5}] }, { "key": 6, "color": "#FF0000", "values": [{ "x": 260, "y": 4, "size": 1.1}] }, { "key": 7, "color": "#FF0000", "values": [{ "x": 270, "y": 4, "size": 3}] }, { "key": 8, "color": "#FF0000", "values": [{ "x": 280, "y": 4, "size": 3}] }, { "key": 9, "color": "#D35400", "values": [{ "x": 290, "y": 4, "size": 35}] }, { "key": 10, "color": "#FF0000", "values": [{ "x": 300, "y": 4, "size": 0}] },
           { "key": 11, "color": "#9A12B3", "values": [{ "x": 210, "y": 3, "size": 11}] }, { "key": 12, "color": "#9A12B3", "values": [{ "x": 220, "y": 3, "size": 16}] }, { "key": 13, "color": "#FF0000", "values": [{ "x": 230, "y": 3, "size": 0}] }, { "key": 14, "color": "#FF0000", "values": [{ "x": 240, "y": 3, "size": 7}] }, { "key": 15, "color": "#FF0000", "values": [{ "x": 250, "y": 3, "size": 0}] }, { "key": 16, "color": "#9A12B3", "values": [{ "x": 260, "y": 3, "size": 14}] }, { "key": 17, "color": "#9A12B3", "values": [{ "x": 270, "y": 3, "size": 19}] }, { "key": 18, "color": "#1E824C", "values": [{ "x": 280, "y": 3, "size": 21}] }, { "key": 19, "color": "#D35400", "values": [{ "x": 290, "y": 3, "size": 32}] }, { "key": 20, "color": "#FF0000", "values": [{ "x": 300, "y": 3, "size": 0}] },
           { "key": 21, "color": "#FF0000", "values": [{ "x": 210, "y": 2, "size": 5}] }, { "key": 22, "color": "#9A12B3", "values": [{ "x": 220, "y": 2, "size": 10}] }, { "key": 23, "color": "#9A12B3", "values": [{ "x": 230, "y": 2, "size": 13}] }, { "key": 24, "color": "#9A12B3", "values": [{ "x": 240, "y": 2, "size": 16}] }, { "key": 25, "color": "#FF0000", "values": [{ "x": 250, "y": 2, "size": 0}] }, { "key": 26, "color": "#FF0000", "values": [{ "x": 260, "y": 2, "size": 8}] }, { "key": 27, "color": "#1E824C", "values": [{ "x": 270, "y": 2, "size": 22}] }, { "key": 28, "color": "#1E824C", "values": [{ "x": 280, "y": 2, "size": 24}] }, { "key": 29, "color": "#9A12B3", "values": [{ "x": 290, "y": 2, "size": 16}] }, { "key": 30, "color": "#FF0000", "values": [{ "x": 300, "y": 2, "size": 0}] },
           { "key": 31, "color": "#FF0000", "values": [{ "x": 210, "y": 1, "size": 8}] }, { "key": 32, "color": "#FF0000", "values": [{ "x": 220, "y": 1, "size": 8}] }, { "key": 33, "color": "#9A12B3", "values": [{ "x": 230, "y": 1, "size": 13}] }, { "key": 34, "color": "#9A12B3", "values": [{ "x": 240, "y": 1, "size": 11}] }, { "key": 35, "color": "#FF0000", "values": [{ "x": 250, "y": 1, "size": 0}] }, { "key": 36, "color": "#FF0000", "values": [{ "x": 260, "y": 1, "size": 0}] }, { "key": 37, "color": "#FF0000", "values": [{ "x": 270, "y": 1, "size": 0}] }, { "key": 38, "color": "#FF0000", "values": [{ "x": 280, "y": 1, "size": 0}] }, { "key": 39, "color": "#FF0000", "values": [{ "x": 290, "y": 1, "size": 0}] }, { "key": 40, "color": "#FF0000", "values": [{ "x": 300, "y": 1, "size": 0}] },
           { "key": 41, "color": "#FF0000", "values": [{ "x": 210, "y": 0, "size": 8}] }, { "key": 42, "color": "#9A12B3", "values": [{ "x": 220, "y": 0, "size": 16}] }, { "key": 43, "color": "#FF0000", "values": [{ "x": 230, "y": 0, "size": 8}] }, { "key": 44, "color": "#9A12B3", "values": [{ "x": 240, "y": 0, "size": 17}] }, { "key": 45, "color": "#FF0000", "values": [{ "x": 250, "y": 0, "size": 0}] }, { "key": 46, "color": "#9A12B3", "values": [{ "x": 260, "y": 0, "size": 16}] }, { "key": 47, "color": "#9A12B3", "values": [{ "x": 270, "y": 0, "size": 17}] }, { "key": 48, "color": "#1E824C", "values": [{ "x": 280, "y": 0, "size": 25}] }, { "key": 49, "color": "#9A12B3", "values": [{ "x": 290, "y": 0, "size": 19}] }, { "key": 50, "color": "#FF0000", "values": [{ "x": 300, "y": 0, "size": 0}]}];


    nv.addGraph(function () {
        var chart = nv.models.scatterChart()
                .showDistX(true)
                .showDistY(true)
                .sizeRange([0, 500])
                .color(d3.scale.category10().range());

        
        chart.showLegend(false);
        chart.xAxis.ticks(24)
                        .tickFormat(function (d, i) {
                            var m = (d == 9) + (d == 10) + (d == 11) ? "am" : "pm";
                            return (d % 12 == 0) ? 12 + m : d % 12 + m;
                        });
        chart.yAxis.ticks(5).tickFormat(function (d, i) {
            return ['Fri', 'Thu', 'Wed', 'Tue', 'Mon'][d];
        });
        d3.select('#' + ChartID + ' ')
      .datum(Data_BubbleChart2)
    .transition().duration(500)
      .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}


function data(groups, points) {
    var data = [],
      shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
      random = d3.random.normal();

    for (i = 0; i < groups; i++) {
        data.push({
            key: 'Group ' + i,
            values: []
        });

        for (j = 0; j < points; j++) {
            data[i].values.push({
                x: random()
      , y: random()
      , size: Math.random()
                //, shape: shapes[j % 6]
            });
        }
    }
    
    return data;
}
//4

function Get_BubbleChart4(ChartID) {

    var Data_BubbleChart4 =
            [
           { "key": 1, "color": "#9A12B3", "values": [{ "x": 210, "y": 4, "size": 10}] }, { "key": 2, "color": "#FF0000", "values": [{ "x": 220, "y": 4, "size": 9}] }, { "key": 3, "color": "#FF0000", "values": [{ "x": 230, "y": 4, "size": 3}] }, { "key": 4, "color": "#9A12B3", "values": [{ "x": 240, "y": 4, "size": 17}] }, { "key": 5, "color": "#FF0000", "values": [{ "x": 250, "y": 4, "size": 5}] }, { "key": 6, "color": "#FF0000", "values": [{ "x": 260, "y": 4, "size": 1.1}] }, { "key": 7, "color": "#FF0000", "values": [{ "x": 270, "y": 4, "size": 3}] }, { "key": 8, "color": "#FF0000", "values": [{ "x": 280, "y": 4, "size": 3}] }, { "key": 9, "color": "#D35400", "values": [{ "x": 290, "y": 4, "size": 35}] }, { "key": 10, "color": "#FF0000", "values": [{ "x": 300, "y": 4, "size": 0}] },
           { "key": 11, "color": "#9A12B3", "values": [{ "x": 210, "y": 3, "size": 11}] }, { "key": 12, "color": "#9A12B3", "values": [{ "x": 220, "y": 3, "size": 16}] }, { "key": 13, "color": "#FF0000", "values": [{ "x": 230, "y": 3, "size": 0}] }, { "key": 14, "color": "#FF0000", "values": [{ "x": 240, "y": 3, "size": 7}] }, { "key": 15, "color": "#FF0000", "values": [{ "x": 250, "y": 3, "size": 0}] }, { "key": 16, "color": "#9A12B3", "values": [{ "x": 260, "y": 3, "size": 14}] }, { "key": 17, "color": "#9A12B3", "values": [{ "x": 270, "y": 3, "size": 19}] }, { "key": 18, "color": "#1E824C", "values": [{ "x": 280, "y": 3, "size": 21}] }, { "key": 19, "color": "#D35400", "values": [{ "x": 290, "y": 3, "size": 32}] }, { "key": 20, "color": "#FF0000", "values": [{ "x": 300, "y": 3, "size": 0}] },
           { "key": 21, "color": "#FF0000", "values": [{ "x": 210, "y": 2, "size": 5}] }, { "key": 22, "color": "#9A12B3", "values": [{ "x": 220, "y": 2, "size": 10}] }, { "key": 23, "color": "#9A12B3", "values": [{ "x": 230, "y": 2, "size": 13}] }, { "key": 24, "color": "#9A12B3", "values": [{ "x": 240, "y": 2, "size": 16}] }, { "key": 25, "color": "#FF0000", "values": [{ "x": 250, "y": 2, "size": 0}] }, { "key": 26, "color": "#FF0000", "values": [{ "x": 260, "y": 2, "size": 8}] }, { "key": 27, "color": "#1E824C", "values": [{ "x": 270, "y": 2, "size": 22}] }, { "key": 28, "color": "#1E824C", "values": [{ "x": 280, "y": 2, "size": 24}] }, { "key": 29, "color": "#9A12B3", "values": [{ "x": 290, "y": 2, "size": 16}] }, { "key": 30, "color": "#FF0000", "values": [{ "x": 300, "y": 2, "size": 0}] },
           { "key": 31, "color": "#FF0000", "values": [{ "x": 210, "y": 1, "size": 8}] }, { "key": 32, "color": "#FF0000", "values": [{ "x": 220, "y": 1, "size": 8}] }, { "key": 33, "color": "#9A12B3", "values": [{ "x": 230, "y": 1, "size": 13}] }, { "key": 34, "color": "#9A12B3", "values": [{ "x": 240, "y": 1, "size": 11}] }, { "key": 35, "color": "#FF0000", "values": [{ "x": 250, "y": 1, "size": 0}] }, { "key": 36, "color": "#FF0000", "values": [{ "x": 260, "y": 1, "size": 0}] }, { "key": 37, "color": "#FF0000", "values": [{ "x": 270, "y": 1, "size": 0}] }, { "key": 38, "color": "#FF0000", "values": [{ "x": 280, "y": 1, "size": 0}] }, { "key": 39, "color": "#FF0000", "values": [{ "x": 290, "y": 1, "size": 0}] }, { "key": 40, "color": "#FF0000", "values": [{ "x": 300, "y": 1, "size": 0}] },
           { "key": 41, "color": "#FF0000", "values": [{ "x": 210, "y": 0, "size": 8}] }, { "key": 42, "color": "#9A12B3", "values": [{ "x": 220, "y": 0, "size": 16}] }, { "key": 43, "color": "#FF0000", "values": [{ "x": 230, "y": 0, "size": 8}] }, { "key": 44, "color": "#9A12B3", "values": [{ "x": 240, "y": 0, "size": 17}] }, { "key": 45, "color": "#FF0000", "values": [{ "x": 250, "y": 0, "size": 0}] }, { "key": 46, "color": "#9A12B3", "values": [{ "x": 260, "y": 0, "size": 16}] }, { "key": 47, "color": "#9A12B3", "values": [{ "x": 270, "y": 0, "size": 17}] }, { "key": 48, "color": "#1E824C", "values": [{ "x": 280, "y": 0, "size": 25}] }, { "key": 49, "color": "#9A12B3", "values": [{ "x": 290, "y": 0, "size": 19}] }, { "key": 50, "color": "#FF0000", "values": [{ "x": 300, "y": 0, "size": 0}]}];

    nv.addGraph(function () {
        var chart = nv.models.scatterChart()
         .margin({ top: 30, right: 10, bottom: 10, left: 175 })
                .showDistX(true)
                .showDistY(true)
                .showLegend(false)
                .sizeRange([0, 500])
                .interactive(true)
                .tooltips(true)
                .tooltipContent(function (key, x, y, e, graph) {
                    return '<center><b><h3>' + "Patients" + ToolTipContent(Data_BubbleChart, key, x, y) + '</h3></center></b>' + '<center></center>'
                })


                .color(d3.scale.category20().range());
        chart.xAxis.axisLabel('Patient Count').ticks(24)
                        .tickFormat(function (d, i) {
                            var m = (d == 210) + (d == 220) + (d == 230) ? "" : "";
                            return (d);
                        });

        chart.yAxis.axisLabel('Performance Indicator').width(40).ticks(5).tickFormat(function (d, i) {
            return ['60', '64', '68', '72', '74'][d];
        });

        d3.select('#' + ChartID + ' ')
      .datum(Data_BubbleChart4)
    .transition().duration(500)
      .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}

function ToolTipContent(data, key, x, y) {
    var _Sixe = 0;
    var _temp = [];
    $.each(data, function (index, item) {
        if (item.key == key) {
            $.each(item.values, function (index1, item1) {
                _Sixe = Math.round(item1.size);

            });
        }
    });
    return _Sixe;

}
function data(groups, points) {
    var data = [],
      shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
      random = d3.random.normal();

    for (i = 0; i < groups; i++) {
        data.push({
            key: 'Group ' + i,
            values: []
        });

        for (j = 0; j < points; j++) {
            data[i].values.push({
                x: random()
      , y: random()
      , size: Math.random()
                //, shape: shapes[j % 6]
            });
        }
    }
    //  alert($("#data").text(JSON.stringify(data)));
    return data;
}

//Modal1

function Get_BubbleChartMonthlydata(ChartID) {

    var Data_BubbleChart =
         [
                    { "key": "1", "values": [{ "x": 0, "y": 0, "size": 10, "color": "#2CA02C"}] },
                    { "key": "2", "values": [{ "x": 0, "y": 10, "size": 4, "color": "#D62728"}] },
                    { "key": "3", "values": [{ "x": 0, "y": 50, "size": 8, "color": "#2CA02C"}] },
                    { "key": "4", "values": [{ "x": 0, "y": 150, "size": 7, "color": "#D62728"}] },
                    { "key": "5", "values": [{ "x": 0, "y": 200, "size": 6, "color": "#2CA02C"}] },
                    { "key": "6", "values": [{ "x": 1, "y": 100, "size": 10, "color": "#D62728"}] },
                    { "key": "7", "values": [{ "x": 1, "y": 110, "size": 20, "color": "#2CA02C"}] },
                    { "key": "8", "values": [{ "x": 1, "y": 120, "size": 30, "color": "#D62728"}] },
                    { "key": "9.", "values": [{ "x": 1, "y": 113, "size": 14, "color": "#2CA02C"}] },
                    { "key": "10", "values": [{ "x": 1, "y": 117, "size": 16, "color": "#D62728"}] },
                    { "key": "11", "values": [{ "x": 2, "y": 150, "size": 30, "color": "#2CA02C"}] },
                    { "key": "12", "values": [{ "x": 2, "y": 170, "size": 60, "color": "#D62728"}] },
                    { "key": "13", "values": [{ "x": 2, "y": 200, "size": 30, "color": "#2CA02C"}] },
                    { "key": "14", "values": [{ "x": 2, "y": 215, "size": 19, "color": "#D62728"}] },
                    { "key": "15", "values": [{ "x": 2, "y": 224.6, "size": 16, "color": "#2CA02C"}] },
                    { "key": "16", "values": [{ "x": 3, "y": 230, "size": 10, "color": "#D62728"}] },
                    { "key": "17", "values": [{ "x": 3, "y": 240, "size": 20, "color": "#2CA02C"}] },

                    { "key": "18", "values": [{ "x": 3, "y": 220, "size": 50, "color": "#2CA02C"}] },
                    { "key": "19", "values": [{ "x": 3, "y": 216.6, "size": 20, "color": "#2CA02C"}] },
                    { "key": "20", "values": [{ "x": 3, "y": 124.6, "size": 20, "color": "#444444"}] },
                    { "key": "21", "values": [{ "x": 4, "y": 140, "size": 10, "color": "#2CA02C"}] },

                    { "key": "22", "values": [{ "x": 4, "y": 10, "size": 20, "color": "#D62728"}] },
                    { "key": "23", "values": [{ "x": 4, "y": 40, "size": 10, "color": "#D62728"}] },
                    { "key": "24", "values": [{ "x": 4, "y": 130.9, "size": 39, "color": "#2CA02C"}] },
                    { "key": "25", "values": [{ "x": 4, "y": 140.8, "size": 39, "color": "#2CA02C"}] },

                    { "key": "26", "values": [{ "x": 5, "y": 50, "size": 15, "color": "#D62728"}] },
                    { "key": "27", "values": [{ "x": 5, "y": 100, "size": 20, "color": "#D62728"}] },
                    { "key": "28", "values": [{ "x": 5, "y": 150.5, "size": 56, "color": "#2CA02C"}] },
                    { "key": "29", "values": [{ "x": 5, "y": 160.4, "size": 50, "color": "#2CA02C"}] },
                    { "key": "30", "values": [{ "x": 5, "y": 190, "size": 10, "color": "#2CA02C"}] },

                    { "key": "31", "values": [{ "x": 6, "y": 60, "size": 20, "color": "#D62728"}] },
                    { "key": "32", "values": [{ "x": 6, "y": 120, "size": 30, "color": "#D62728"}] },
                    { "key": "33", "values": [{ "x": 6, "y": 130, "size": 40, "color": "#2CA02C"}] },
                    { "key": "34", "values": [{ "x": 6, "y": 139, "size": 58, "color": "#2CA02C"}] },
                    { "key": "35", "values": [{ "x": 6, "y": 147, "size": 55, "color": "#2CA02C"}] },

                    { "key": "36", "values": [{ "x": 7, "y": 40, "size": 10, "color": "#D62728"}] },
                    { "key": "37", "values": [{ "x": 7, "y": 70, "size": 20, "color": "#D62728"}] },
                    { "key": "38", "values": [{ "x": 7, "y": 170, "size": 40, "color": "#D62728"}] },
                    { "key": "39", "values": [{ "x": 7, "y": 166, "size": 65, "color": "#2CA02C"}] },
                    { "key": "40", "values": [{ "x": 7, "y": 194, "size": 63, "color": "#2CA02C"}] },

                    { "key": "41", "values": [{ "x": 8, "y": 10, "size": 90, "color": "#D62728"}] },
                    { "key": "42", "values": [{ "x": 8, "y": 50, "size": 40, "color": "#2CA02C"}] },
                    { "key": "43", "values": [{ "x": 8, "y": 150, "size": 20, "color": "#D62728"}] },
                    { "key": "44", "values": [{ "x": 8, "y": 170, "size": 64, "color": "#2CA02C"}] },
                    { "key": "45", "values": [{ "x": 8, "y": 200, "size": 64, "color": "#2CA02C"}] },

                     { "key": "46", "values": [{ "x": 9, "y": 40, "size": 10, "color": "#D62728"}] },
                    { "key": "47", "values": [{ "x": 9, "y": 80, "size": 20, "color": "#D62728"}] },
                    { "key": "48", "values": [{ "x": 9, "y": 180, "size": 10, "color": "#D62728"}] },
                    { "key": "49", "values": [{ "x": 9, "y": 200, "size": 34, "color": "#D62728"}] },
                    { "key": "50", "values": [{ "x": 9, "y": 240, "size": 24, "color": "#444444"}] },

                    { "key": "51", "values": [{ "x": 10, "y": 50, "size": 20, "color": "#D62728"}] },
                    { "key": "52", "values": [{ "x": 10, "y": 100, "size": 10, "color": "#D62728"}] },
                    { "key": "53", "values": [{ "x": 10, "y": 150, "size": 40, "color": "#D62728"}] },
                    { "key": "54", "values": [{ "x": 10, "y": 200, "size": 34, "color": "#D62728"}] },
                    { "key": "55", "values": [{ "x": 10, "y": 250, "size": 24, "color": "#444444"}] },

                    { "key": "56", "values": [{ "x": 11, "y": 0, "size": 70, "color": "#D62728"}] },
                    { "key": "57", "values": [{ "x": 11, "y": 50, "size": 60, "color": "#D62728"}] },
                    { "key": "58", "values": [{ "x": 11, "y": 100, "size": 30, "color": "#D62728"}] },
                    { "key": "59", "values": [{ "x": 11, "y": 150, "size": 34, "color": "#D62728"}] },
                    { "key": "60", "values": [{ "x": 11, "y": 200, "size": 24, "color": "#444444"}] },

                    { "key": "61", "values": [{ "x": 12, "y": 100, "size": 20, "color": "#D62728"}] },
                    { "key": "62", "values": [{ "x": 12, "y": 110, "size": 10, "color": "#D62728"}] },
                    { "key": "63", "values": [{ "x": 12, "y": 120, "size": 50, "color": "#D62728"}] },
                    { "key": "64", "values": [{ "x": 12, "y": 130, "size": 34, "color": "#D62728"}] },
                    { "key": "65", "values": [{ "x": 12, "y": 150, "size": 24, "color": "#444444"}] },

                    { "key": "66", "values": [{ "x": 13, "y": 0, "size": 60, "color": "#D62728"}] },
                    { "key": "67", "values": [{ "x": 13, "y": 50, "size": 30, "color": "#D62728"}] },
                    { "key": "68", "values": [{ "x": 13, "y": 80, "size": 20, "color": "#D62728"}] },
                    { "key": "69", "values": [{ "x": 13, "y": 150, "size": 34, "color": "#D62728"}] },
                    { "key": "70", "values": [{ "x": 13, "y": 200, "size": 80, "color": "#26A7DD"}] },

                    { "key": "71", "values": [{ "x": 14, "y": 50, "size": 10, "color": "#D62728"}] },
                    { "key": "72", "values": [{ "x": 14, "y": 100, "size": 10, "color": "#D62728"}] },
                    { "key": "73", "values": [{ "x": 14, "y": 150, "size": 70, "color": "#D62728"}] },
                    { "key": "74", "values": [{ "x": 14, "y": 200, "size": 34, "color": "#D62728"}] },
                    { "key": "75", "values": [{ "x": 14, "y": 250, "size": 80, "color": "#26A7DD"}] },

                    { "key": "76", "values": [{ "x": 15, "y": 0, "size": 70, "color": "#D62728"}] },
                    { "key": "77", "values": [{ "x": 15, "y": 50, "size": 40, "color": "#26A7DD"}] },
                    { "key": "78", "values": [{ "x": 15, "y": 100, "size": 10, "color": "#D62728"}] },
                    { "key": "79", "values": [{ "x": 15, "y": 150, "size": 55, "color": "#26A7DD"}] },
                    { "key": "80", "values": [{ "x": 15, "y": 250, "size": 80, "color": "#D62728"}]}];
    nv.addGraph(function () {
        var chart = nv.models.scatterChart()
         .margin({ right: 50 })
//        .width(1300)
//        .height(250)
                .showDistX(true)
                .showDistY(true)
                .showLegend(false)
                .sizeRange([0, 500])
                .interactive(true)
                .tooltips(true)
                .tooltipContent(function (key, x, y, e, graph) {
                    return '<center><b><h3>' + "Job Orders: " + ToolTipContent(Data_BubbleChart, key, x, y) + '</h3></center></b><center><b>' + 'On  ' + x + '</b></center><center></center>'
                })

                .color(d3.scale.category10().range());
        chart.xAxis.axisLabel('Job Orders: Previous 12 months').width(0).ticks(10).tickFormat(function (d, i) {

            return ['25-Mar', '15-Apr', '6-May', '27-May', '17-Jun', '18-Jul', '29-Jul', '19-Aug', '9-Sep', '30-Sep', '21-Oct', '11-Nov', '2-Dec', '23-Dec', '13-Jan', '3-Feb'][d];
        });

        chart.yAxis.axisLabel('Job Order Value').ticks(10)
                        .tickFormat(function (d, i) {
                            return '$' + [d] + 'K';
                        });

                        chart.tooltipContent(function (key, x, y, e, graph) {
                            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_BubbleChart, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
                        });
        d3.select('#' + ChartID + ' ')
      .datum(Data_BubbleChart)
    .transition().duration(500)
      .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}

function ToolTipContent(data, key, x, y) {
    var _Sixe = 0;
    var _temp = [];
    $.each(data, function (index, item) {
        if (item.key == key) {
            $.each(item.values, function (index1, item1) {
                _Sixe = item1.size;

            });
        }
    });
    return _Sixe;

}
//Type2
function Get_BubbleChartType2(ChartID) {

    var Data_Type2 =
         [

                    { "key": "6", "values": [{ "x": 0, "y": 0, "size": 100, "color": "#2CA02C"}] },
                    { "key": "7", "values": [{ "x": 0, "y": 50, "size": 150, "color": "#2CA02C"}] },
                    { "key": "8", "values": [{ "x": 0, "y": 200, "size": 200, "color": "#2CA02C"}] },
                    { "key": "9.", "values": [{ "x":0, "y": 250, "size": 250, "color": "#2CA02C"}] },
                    { "key": "10", "values": [{ "x": 1, "y": 147, "size": 216, "color": "#2CA02C"}] },
                    { "key": "11", "values": [{ "x": 2, "y": 150, "size": 130, "color": "#D62728"}] },
                    { "key": "12", "values": [{ "x": 2, "y": 170, "size": 610, "color": "#2CA02C"}] },
                    { "key": "13", "values": [{ "x": 2, "y": 200, "size": 130, "color": "#D62728"}] },
                    { "key": "14", "values": [{ "x": 2, "y": 215, "size": 119, "color": "#2CA02C"}] },
                    { "key": "15", "values": [{ "x": 2, "y": 224.6, "size": 116, "color": "#D62728"}] },
                    { "key": "16", "values": [{ "x": 3, "y": 230, "size": 110, "color": "#D62728"}] },
                    { "key": "17", "values": [{ "x": 3, "y": 240, "size": 210, "color": "#2CA02C"}] },
                  
                    { "key": "22", "values": [{ "x": 4, "y": 10, "size": 120, "color": "#D62728"}] },
                    { "key": "23", "values": [{ "x": 4, "y": 40, "size": 110, "color": "#2CA02C"}] },
                    { "key": "24", "values": [{ "x": 4, "y": 130.9, "size": 139, "color": "#2CA02C"}] },
                    { "key": "25", "values": [{ "x": 4, "y": 140.8, "size": 139, "color": "#2CA02C"}] },

                    { "key": "26", "values": [{ "x": 5, "y": 50, "size": 115, "color": "#2CA02C"}] },
                    { "key": "27", "values": [{ "x": 5, "y": 100, "size": 210, "color": "#2CA02C"}] },
                    { "key": "28", "values": [{ "x": 5, "y": 150.5, "size": 156, "color": "#2CA02C"}] },
                    { "key": "29", "values": [{ "x": 5, "y": 160.4, "size": 150, "color": "#2CA02C"}] },
                    { "key": "30", "values": [{ "x": 5, "y": 190, "size": 110, "color": "#2CA02C"}] },

                    { "key": "31", "values": [{ "x": 6, "y": 60, "size": 210, "color": "#26A7DD"}] },
                    { "key": "32", "values": [{ "x": 6, "y": 120, "size": 310, "color": "#2CA02C"}] },
                    { "key": "33", "values": [{ "x": 6, "y": 130, "size": 140, "color": "#2CA02C"}] },
                    { "key": "34", "values": [{ "x": 6, "y": 139, "size": 158, "color": "#2CA02C"}] },
                    { "key": "35", "values": [{ "x": 6, "y": 147, "size": 515, "color": "#2CA02C"}] },

                     { "key": "46", "values": [{ "x": 9, "y": 40, "size": 110, "color": "#26A7DD"}] },
                    { "key": "47", "values": [{ "x": 9, "y": 80, "size": 210, "color": "#26A7DD"}] },
                    { "key": "48", "values": [{ "x": 9, "y": 180, "size": 110, "color": "#D62728"}] },
                    { "key": "49", "values": [{ "x": 9, "y": 200, "size": 134, "color": "#2CA02C"}] },
                    { "key": "50", "values": [{ "x": 9, "y": 240, "size": 124, "color": "#444444"}] },

                    { "key": "51", "values": [{ "x": 10, "y": 50, "size": 120, "color": "#D62728"}] },
                    { "key": "52", "values": [{ "x": 10, "y": 100, "size": 110, "color": "#D62728"}] },
                    { "key": "53", "values": [{ "x": 10, "y": 150, "size": 410, "color": "#26A7DD"}] },
                    { "key": "54", "values": [{ "x": 10, "y": 200, "size": 314, "color": "#D62728"}] },
                    { "key": "55", "values": [{ "x": 10, "y": 250, "size": 214, "color": "#444444"}] },

                    { "key": "61", "values": [{ "x": 12, "y": 100, "size": 120, "color": "#2CA02C"}] },
                    { "key": "62", "values": [{ "x": 12, "y": 110, "size": 110, "color": "#2CA02C"}] },
                    { "key": "63", "values": [{ "x": 12, "y": 120, "size": 510, "color": "#2CA02C"}] },
                    { "key": "64", "values": [{ "x": 12, "y": 130, "size": 134, "color": "#D62728"}] },
                    { "key": "65", "values": [{ "x": 12, "y": 150, "size": 124, "color": "#444444"}] },

                    { "key": "71", "values": [{ "x": 14, "y": 150, "size": 110, "color": "#D62728"}] },
                    { "key": "72", "values": [{ "x": 14, "y": 100, "size": 110, "color": "#2CA02C"}] },
                    { "key": "73", "values": [{ "x": 14, "y": 150, "size": 170, "color": "#D62728"}] },
                    { "key": "74", "values": [{ "x": 14, "y": 200, "size": 134, "color": "#2CA02C"}] },
                    { "key": "75", "values": [{ "x": 14, "y": 250, "size": 180, "color": "#26A7DD"}] },

                    { "key": "76", "values": [{ "x": 15, "y": 120, "size": 170, "color": "#D62728"}] },
                    { "key": "77", "values": [{ "x": 15, "y": 50, "size": 401, "color": "#26A7DD"}] },
                    { "key": "78", "values": [{ "x": 15, "y": 100, "size": 110, "color": "#2CA02C"}] },
                    { "key": "79", "values": [{ "x": 15, "y": 150, "size": 155, "color": "#26A7DD"}] },
                    { "key": "80", "values": [{ "x": 15, "y": 250, "size": 180, "color": "#D62728"}]}];
    nv.addGraph(function () {
        var chart = nv.models.scatterChart()
         .margin({ right: 50 })
        //        .width(1300)
        //        .height(250)
                .showDistX(true)
                .showDistY(true)
                .showLegend(false)
                .sizeRange([10, 1000])
                .interactive(true)
                .tooltips(true)
                .tooltipContent(function (key, x, y, e, graph) {
                    return '<center><b><h3>' + "Job Orders: " + ToolTipContent(Data_BubbleChart, key, x, y) + '</h3></center></b><center><b>' + 'On  ' + x + '</b></center><center></center>'
                })

                .color(d3.scale.category10().range());
        chart.xAxis.axisLabel('Job Orders: Previous 12 months').width(0).ticks(10).tickFormat(function (d, i) {

            return ['25-Mar', '15-Apr', '6-May', '27-May', '17-Jun', '18-Jul', '29-Jul', '19-Aug', '9-Sep', '30-Sep', '21-Oct', '11-Nov', '2-Dec', '23-Dec', '13-Jan', '3-Feb'][d];
        });

        chart.yAxis.axisLabel('Job Order Value')
                        .tickFormat(function (d, i) {
                            return '$' + [d] + 'K';
                        });
                        
        chart.tooltipContent(function (key, x, y, e, graph) {
            return '<div class="tooltip-tile-s1"><label class="label-tooltip-kpi-title-s1">Closing on Apr 29, 2014</label><div class="tooltip-kpi-title-s1"><label class="label-tooltip-kpi-val" style="color:' + ToolTipContent(Data_Type2, key, x, y) + '">' + y + ' on' + x + '</label></br><label class="label-tooltip-kpi-title-s1">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
        });
        d3.select('#' + ChartID + ' ')
      .datum(Data_Type2)
    .transition().duration(500)
      .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}

function ToolTipContent(data, key, x, y) {
    var _Sixe = 0;
    var _temp = [];
    $.each(data, function (index, item) {
        if (item.key == key) {
            $.each(item.values, function (index1, item1) {
                _Sixe = item1.size;

            });
        }
    });
    return _Sixe;

}
function data(groups, points) {
    var data = [],
      shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
      random = d3.random.normal();

    for (i = 0; i < groups; i++) {
        data.push({
            key: 'Group ' + i,
            values: []
        });

        for (j = 0; j < points; j++) {
            data[i].values.push({
                x: random()
      , y: random()
      , size: Math.random()
                //, shape: shapes[j % 6]
            });
        }
    }
    //  alert($("#data").text(JSON.stringify(data)));
    return data;
}

//Modal2



function Get_BubbleChartPatientdata(ChartID) {

    var Data_BubbleChartPatientdata =
         [
                    { "key": "1", "values": [{ "x": 0, "y": 0, "size": 0}] },
                    { "key": "2", "values": [{ "x": 0, "y": 0, "size": 0}] },
                    { "key": "3", "values": [{ "x": 0, "y": 0, "size": 0}] },
                    { "key": "4", "values": [{ "x": 0, "y": 0, "size": 0, "color": "#F59567"}] },
                    { "key": "5", "values": [{ "x": 0, "y": 0, "size": 6, "color": "#5FBA50"}] },
                    { "key": "6", "values": [{ "x": 1, "y": 0, "size": 0}] },
                    { "key": "7", "values": [{ "x": 1, "y": 0, "size": 0}] },
                    { "key": "8", "values": [{ "x": 1, "y": 0, "size": 0}] },
                    { "key": "9.", "values": [{ "x": 1, "y": 13, "size": 14.6, "color": "#F59567"}] },
                    { "key": "10", "values": [{ "x": 1, "y": 17.7, "size": 14.6, "color": "#5FBA50"}] },
                    { "key": "11", "values": [{ "x": 2, "y": 0, "size": 0}] },
                    { "key": "12", "values": [{ "x": 2, "y": 0, "size": 0}] },
                    { "key": "13", "values": [{ "x": 2, "y": 0, "size": 0}] },
                    { "key": "14", "values": [{ "x": 2, "y": 15, "size": 18.6, "color": "#F59567"}] },
                    { "key": "15", "values": [{ "x": 2, "y": 24.6, "size": 18.6, "color": "#5FBA50"}] },
                    { "key": "16", "values": [{ "x": 3, "y": 0, "size": 0}] },
                    { "key": "17", "values": [{ "x": 3, "y": 0, "size": 0}] },
                    { "key": "18", "values": [{ "x": 3, "y": 0, "size": 0}] },
                    { "key": "19", "values": [{ "x": 3, "y": 16.6, "size": 20, "color": "#F59567"}] },
                    { "key": "20", "values": [{ "x": 3, "y": 24.6, "size": 20, "color": "#5FBA50"}] },
                    { "key": "21", "values": [{ "x": 4, "y": 40, "size": 0}] },
                    { "key": "22", "values": [{ "x": 4, "y": 40, "size": 0}] },
                    { "key": "23", "values": [{ "x": 4, "y": 40, "size": 0}] },
                    { "key": "24", "values": [{ "x": 4, "y": 30.9, "size": 39.1, "color": "#F59567"}] },
                    { "key": "25", "values": [{ "x": 4, "y": 40.8, "size": 39.1, "color": "#5FBA50"}] },
                    { "key": "26", "values": [{ "x": 5, "y": 50, "size": 0}] },
                    { "key": "27", "values": [{ "x": 5, "y": 50, "size": 0}] },
                    { "key": "28", "values": [{ "x": 5, "y": 50.5, "size": 56.5, "color": "#F59567"}] },
                    { "key": "29", "values": [{ "x": 5, "y": 60.4, "size": 56.5, "color": "#5FBA50"}] },
                    { "key": "30", "values": [{ "x": 5, "y": 50, "size": 0}] },
                    { "key": "31", "values": [{ "x": 6, "y": 60, "size": 0}] },
                    { "key": "32", "values": [{ "x": 6, "y": 60, "size": 0}] },
                    { "key": "33", "values": [{ "x": 6, "y": 60, "size": 0}] },
                    { "key": "34", "values": [{ "x": 6, "y": 50.8, "size": 58.5, "color": "#F59567"}] },
                    { "key": "35", "values": [{ "x": 6, "y": 60.7, "size": 58.5, "color": "#5FBA50"}] },
                    { "key": "36", "values": [{ "x": 7, "y": 70, "size": 0}] },
                    { "key": "37", "values": [{ "x": 7, "y": 70, "size": 0}] },
                    { "key": "38", "values": [{ "x": 7, "y": 70, "size": 0}] },
                    { "key": "39", "values": [{ "x": 7, "y": 66, "size": 61.5, "color": "#F59567"}] },
                    { "key": "40", "values": [{ "x": 7, "y": 74, "size": 61.5, "color": "#5FBA50"}] },
                    { "key": "41", "values": [{ "x": 8, "y": 80, "size": 0}] },
                    { "key": "42", "values": [{ "x": 8, "y": 80, "size": 0}] },
                    { "key": "43", "values": [{ "x": 8, "y": 80, "size": 0}] },
                    { "key": "44", "values": [{ "x": 8, "y": 68, "size": 64, "color": "#F59567"}] },
                    { "key": "45", "values": [{ "x": 8, "y": 77, "size": 64, "color": "#5FBA50"}]}];

    nv.addGraph(function () {
        var chart = nv.models.scatterChart()
         .margin({ right: 50 })
//        .width(1200)
//        .height(250)
                .showDistX(true)
                .showDistY(true)
                .showLegend(false)
                .sizeRange([0, 500])
                .interactive(true)
                .tooltips(true)
                .tooltipContent(function (key, x, y, e, graph) {
                    return '<center><b><h3>' + "Average Minutes" + ToolTipContent(Data_BubbleChartPatientdata, key, x, y) + '</h3></center></b>' + '<center></center>'
                })

                .color(d3.scale.category10().range());
        chart.xAxis.axisLabel('Average Time: Waiting in waiting room').width(0).ticks(10).tickFormat(function (d, i) {

            return ['Wait at check-in', 'Wait in waiting room', 'Complete check-in', 'Move to exam room', 'Wait for physician', 'Interact with physician', 'Move to checkout', 'Wait at checkout', 'Check out'][d];
        });

        chart.yAxis.axisLabel('Average Minutes at Each Step').ticks(10)
                        .tickFormat(function (d, i) {
                            return [d];
                        });
                        chart.tooltipContent(function (key, x, y, e, graph) {
                            return '<div class="tooltip-tile-s2"><label class="label-tooltip-kpi-title-s2">Thursday Feb 27, 2014 at 16:43:05</label><div class="tooltip-kpi-title-s2"><label class="label-tooltip-kpi-qs-data" style="color:' + ToolTipContent(Data_BubbleChartPatientdata, key, x, y) + '">' + y + ' on' +" "+ x + '</label><label class="label-tooltip-kpi-title-s2">for </label>' + "   " + '<label class="label-tooltip-kpi-data-s1">' + key + '</label><br></div></div>'
                        });


        d3.select('#' + ChartID + ' ')
      .datum(Data_BubbleChartPatientdata)
    .transition().duration(500)
      .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}

function ToolTipContent(data, key, x, y) {
    var _Sixe = 0;
    var _temp = [];
    $.each(data, function (index, item) {
        if (item.key == key) {
            $.each(item.values, function (index1, item1) {
                _Sixe = item1.size;

            });
        }
    });
    return _Sixe;

}
function data(groups, points) {
    var data = [],
      shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
      random = d3.random.normal();

    for (i = 0; i < groups; i++) {
        data.push({
            key: 'Group ' + i,
            values: []
        });

        for (j = 0; j < points; j++) {
            data[i].values.push({
                x: random()
      , y: random()
      , size: Math.random()
                //, shape: shapes[j % 6]
            });
        }
    }
    //  alert($("#data").text(JSON.stringify(data)));
    return data;
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
        d3.select('#' + ChartID)
      .datum(sinAndCos())
    .transition().duration(500)
      .call(chart);
        //TODO: Figure out a good way to do this automatically
        nv.utils.windowResize(chart.update);
        //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });
        return chart;
    });
}
function sinAndCos() {
  var sin = [],
      cos = [];
  for (var i = 0; i < 200; i++) {
    sin.push({x: i, y: Math.sin(i/2)});
    cos.push({x: i, y: .5 * Math.cos(i)});
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
//LineWithScatterChart
function Get_LineWithScatterChart(ChartID) {
    nv.addGraph(function () {
        var chart = nv.models.scatterPlusLineChart()
                .showDistX(true)
                .showDistY(true)
        //.height(500)
                .color(d3.scale.category10().range());
        chart.xAxis.tickFormat(d3.format('.02f'))
        chart.yAxis.tickFormat(d3.format('.02f'))
        chart.showLegend(false);
        d3.select('#' + ChartID)
      .datum(randomData(4, 40))
    .transition().duration(500)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}
function randomData(groups, points) { //# groups,# points per group
  var data = [],
      shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
      random = d3.random.normal();
  for (i = 0; i < groups; i++) {
    data.push({
      key: 'Group ' + i,
      values: [],
      slope: Math.random() - .01,
      intercept: Math.random() - .5
    });
    for (j = 0; j < points; j++) {
      data[i].values.push({
        x: random(), 
        y: random(), 
        size: Math.random(), 
        shape: shapes[j % 6]
      });
    }
  }
  return data;
}

//SparklineChart
function SparklineChart(ChartID) {
    nv.addGraph(function () {
        var data = sine();
        var chart = nv.models.sparklinePlus()
        chart
    .x(function (d, i) { return i })
    .xTickFormat(function (d) {
        return d3.time.format('%x')(new Date(data[d].x))
    })
        d3.select("#" + ChartID)
      .datum(data)
    .transition().duration(250)
      .call(chart);
        return chart;
    });
}
var now =+new Date();
function sine() {
  var sin = [];
  nv.log(now);
  for (var i = 0; i < 100; i++) {
    sin.push({x: now + i * 1000 * 60 * 60 * 24, y: Math.sin(i/10)});
  }
  return sin;
}


