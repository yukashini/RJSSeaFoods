
/// <reference path="../LibraryJS/jquery-1.11.0.min.js" />
/// <reference path="DataCSV/data.json" />
$(document).ready(function () {
    Get_WaterFallChart("WaterFallChart1");
});

function Get_WaterFallChart(ChartID) {
    
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom,
    padding = 0.3;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], padding);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(function(d) { return dollarFormatter(d); });

var chart = d3.select("#" + ChartID)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("Scripts/OtherCharts/DataCSV/data1.csv", type, function (error, data) {
    
    // Transform data (i.e., finding cumulative values and total) for easier charting
    var cumulative = 0;
    for (var i = 0; i < data.length; i++) {
        data[i].start = cumulative;
        cumulative += data[i].value;
        data[i].end = cumulative;

        data[i].class = (data[i].value >= 0) ? 'positive' : 'negative'
    }
    data.push({
        name: 'Total',
        end: cumulative,
        start: 0,
        class: 'total'
    });

    x.domain(data.map(function (d) { return d.name; }));
    y.domain([0, d3.max(data, function (d) { return d.end; })]);

    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    var bar = chart.selectAll(".bar")
      .data(data)
    .enter().append("g")
      .attr("class", function (d) { return "bar " + d.class })
      .attr("transform", function (d) { return "translate(" + x(d.name) + ",0)"; });

    bar.append("rect")
      .attr("y", function (d) { return y(Math.max(d.start, d.end)); })
      .attr("height", function (d) { return Math.abs(y(d.start) - y(d.end)); })
      .attr("width", x.rangeBand());

    bar.append("text")
      .attr("x", x.rangeBand() / 2)
      .attr("y", function (d) { return y(d.end) + 5; })
      .attr("dy", function (d) { return ((d.class == 'negative') ? '-' : '') + ".75em" })
      .text(function (d) { return dollarFormatter(d.end - d.start); });

    bar.filter(function (d) { return d.class != "total" }).append("line")
      .attr("class", "connector")
      .attr("x1", x.rangeBand() + 5)
      .attr("y1", function (d) { return y(d.end) })
      .attr("x2", x.rangeBand() / (1 - padding) - 5)
      .attr("y2", function (d) { return y(d.end) })
    return chart;
    
});

function type(d) {
  d.value = +d.value;
  return d;
}

function dollarFormatter(n) {
  n = Math.round(n);
  var result = n;
  if (Math.abs(n) > 1000) {
    result = Math.round(n/1000) + 'K';
  }
  return '$' + result;
}

}

//WaterFallChart2
function Get_WaterFallChart2(ChartID) {
    
    var svg = dimple.newSvg("#" + ChartID, 590, 200);
    d3.tsv("Scripts/OtherCharts/DataCSV/example_data.tsv", function (data) {
        var myChart = new dimple.chart(svg, data);
        myChart.setBounds(90, 50, 480, 310)
        myChart.addCategoryAxis("x", ["Channel", "Price Tier"]);
        myChart.addCategoryAxis("y", "Owner");
        myChart.addSeries("Price Tier", dimple.plot.bar);
        myChart.addLegend(240, 10, 330, 20, "right");
        myChart.draw();

        return myChart;
    });

}

//WaterFallChart3
function Get_WaterFallChart3(ChartID) {
    
    var svg = dimple.newSvg("#" + ChartID, 590,200);
    d3.tsv("Scripts/OtherCharts/DataCSV/example_data.tsv", function (data) {
        var myChart = new dimple.chart(svg, data);
        myChart.setBounds(75, 30, 480, 315);
        myChart.addMeasureAxis("x", "Unit Sales");
        var y = myChart.addCategoryAxis("y", "Month");
        y.addOrderRule("Date");
        var s = myChart.addSeries("Channel", dimple.plot.bar);
        s.stacked = false;
        myChart.addLegend(60, 10, 510, 20, "right");
        myChart.draw();

        return myChart;
    });
   
}