﻿function Get_HeatMap(ChartID) {
    "use strict";

    var csvDataString = "day,hour,value\n\
1,1,16\n\
1,2,20\n\
1,3,0\n\
1,4,0\n\
1,5,0\n\
1,6,2\n\
1,7,0\n\
1,8,9\n\
1,9,25\n\
1,10,49\n\
1,11,57\n\
1,12,61\n\
1,13,37\n\
1,14,66\n\
1,15,70\n\
1,16,55\n\
1,17,51\n\
1,18,55\n\
1,19,17\n\
1,20,20\n\
1,21,9\n\
1,22,4\n\
1,23,0\n\
1,24,12\n\
1,25,12\n\
1,26,12\n\
1,27,0\n\
1,28,0\n\
1,29,0\n\
1,30,0\n\
1,31,0\n\
2,1,6\n\
2,2,2\n\
2,3,0\n\
2,4,0\n\
2,5,0\n\
2,6,2\n\
2,7,4\n\
2,8,11\n\
2,9,28\n\
2,10,49\n\
2,11,51\n\
2,12,47\n\
2,13,38\n\
2,14,65\n\
2,15,60\n\
2,16,50\n\
2,17,65\n\
2,18,50\n\
2,19,22\n\
2,20,11\n\
2,21,12\n\
2,22,9\n\
2,23,0\n\
2,24,13\n\
2,25,12\n\
2,26,12\n\
2,27,13\n\
2,28,13\n\
2,29,15\n\
2,30,19\n\
2,31,104\n\
3,1,5\n\
3,2,8\n\
3,3,8\n\
3,4,0\n\
3,5,0\n\
3,6,2\n\
3,7,5\n\
3,8,12\n\
3,9,34\n\
3,10,43\n\
3,11,54\n\
3,12,44\n\
3,13,40\n\
3,14,48\n\
3,15,54\n\
3,16,59\n\
3,17,60\n\
3,18,51\n\
3,19,21\n\
3,20,16\n\
3,21,9\n\
3,22,5\n\
3,23,4\n\
3,24,7\n\
3,25,48\n\
3,26,7\n\
3,27,29\n\
3,28,21\n\
3,29,15\n\
3,30,26\n\
3,31,34\n\
4,1,0\n\
4,2,0\n\
4,3,0\n\
4,4,0\n\
4,5,0\n\
4,6,2\n\
4,7,4\n\
4,8,13\n\
4,9,26\n\
4,10,58\n\
4,11,61\n\
4,12,59\n\
4,13,53\n\
4,14,54\n\
4,15,64\n\
4,16,55\n\
4,17,52\n\
4,18,53\n\
4,19,18\n\
4,20,3\n\
4,21,9\n\
4,22,12\n\
4,23,2\n\
4,24,8\n\
4,25,0\n\
4,26,0\n\
4,27,0\n\
4,28,0\n\
4,29,0\n\
4,30,0\n\
4,31,0\n\
5,1,2\n\
5,2,0\n\
5,3,8\n\
5,4,2\n\
5,5,0\n\
5,6,2\n\
5,7,4\n\
5,8,14\n\
5,9,31\n\
5,10,48\n\
5,11,46\n\
5,12,50\n\
5,13,66\n\
5,14,54\n\
5,15,56\n\
5,16,67\n\
5,17,54\n\
5,18,23\n\
5,19,14\n\
5,20,6\n\
5,21,8\n\
5,22,7\n\
5,23,0\n\
5,24,8\n\
5,25,7\n\
5,26,30\n\
5,27,10\n\
5,28,9\n\
5,29,5\n\
5,30,30\n\
5,31,45\n\
6,1,2\n\
6,2,0\n\
6,3,2\n\
6,4,0\n\
6,5,0\n\
6,6,0\n\
6,7,4\n\
6,8,8\n\
6,9,8\n\
6,10,6\n\
6,11,14\n\
6,12,12\n\
6,13,9\n\
6,14,14\n\
6,15,0\n\
6,16,4\n\
6,17,7\n\
6,18,6\n\
6,19,0\n\
6,20,0\n\
6,21,0\n\
6,22,0\n\
6,23,0\n\
6,24,0\n\
6,25,48\n\
6,26,7\n\
6,27,29\n\
6,28,21\n\
6,29,15\n\
6,30,26\n\
6,31,34\n\
7,1,7\n\
7,2,6\n\
7,3,0\n\
7,4,0\n\
7,5,0\n\
7,6,0\n\
7,7,0\n\
7,8,0\n\
7,9,0\n\
7,10,0\n\
7,11,2\n\
7,12,2\n\
7,13,5\n\
7,14,6\n\
7,15,0\n\
7,16,4\n\
7,17,0\n\
7,18,2\n\
7,19,10\n\
7,20,7\n\
7,21,0\n\
7,22,19\n\
7,23,9\n\
7,24,4\n\
7,25,48\n\
7,26,7\n\
7,27,29\n\
7,28,21\n\
7,29,15\n\
7,30,26\n\
7,31,34";

    //    var dim = Math.min(parseInt(d3.select("#" + ChartID).style("width")), parseInt(d3.select("#" + ChartID).style("height"))),
    //    width = dim - margin.left - margin.right,
    //    height = dim - margin.top - margin.bottom;
    //alert("width:" + width + "  height: " + height);


    var margin = { top: 50, right: 0, bottom: 100, left: 15 },
          width = 960 - margin.left - margin.right,
          height = 430 - margin.top - margin.bottom,
          gridSize = Math.floor(width / 24),
          legendElementWidth = gridSize * 2,
          buckets = 9,
          colors = ["#ffffd9", "#69f0ae", "#00e676", "#00c853", "#ffb74d", "#ffa726", "#ff5722", "#ff3d00", "#dd2c00"], // alternatively colorbrewer.YlGnBu[9]
    //days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
          days = ["Chris", "Jeff B", "Britt", "Mitch", "Sampson", "Andrew ", "Grant"],
    times = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
    // times = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

    var data1 = d3.csv.parse(csvDataString);
    console.log("first parse data1=", data1);

    var dataArray = d3.csv.parse(csvDataString,
        function (d) {
            return {
                day: +d.day,
                hour: +d.hour,
                value: +d.value
            };
        });

    var dataHandler = function (error, data) {
        console.log("data=", data);
        var colorScale = d3.scale.quantile()
              .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
              .range(colors);

        var svg = d3.select("#" + ChartID).append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left * 9 + "," + margin.top + ")");

        var dayLabels = svg.selectAll(".dayLabel")
              .data(days)
              .enter().append("text")
                .text(function (d) { return d; })
                .attr("x", 0)
                .attr("y", function (d, i) { return i * gridSize; })
                .style("text-anchor", "end")
                .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
                .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

        var timeLabels = svg.selectAll(".timeLabel")
              .data(times)
              .enter().append("text")
                .text(function (d) { return d; })
                .attr("x", function (d, i) { return i * gridSize; })
                .attr("y", 0)
                .style("text-anchor", "middle")
                .attr("transform", "translate(" + gridSize / 2 + ", -6)")
                .attr("class", function (d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

        var heatMap = svg.selectAll(".hour")
              .data(data)
              .enter().append("rect")
              .attr("x", function (d) { return (d.hour - 1) * gridSize; })
              .attr("y", function (d) { return (d.day - 1) * gridSize; })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "hour bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", colors[0]);

        heatMap.transition().duration(3000)
              .style("fill", function (d) { return colorScale(d.value); });

        heatMap.append("title").text(function (d) { return d.value; });

        var legend = svg.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), function (d) { return d; })
              .enter().append("g")
              .attr("class", "legend");

        legend.append("rect")
            .attr("x", function (d, i) { return legendElementWidth * i; })
            .attr("y", height)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", function (d, i) { return colors[i]; });

        legend.append("text")
            .attr("class", "mono")
            .text(function (d) { return "= " + Math.round(d); })
            .attr("x", function (d, i) { return legendElementWidth * i; })
            .attr("y", height + gridSize);
    }

    dataHandler(null, dataArray);
}



