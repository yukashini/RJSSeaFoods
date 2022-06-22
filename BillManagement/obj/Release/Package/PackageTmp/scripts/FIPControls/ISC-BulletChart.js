/// <reference path="../Internalplugin/jquery-1.8.3.min.js" />


//function Get_BulletChartAll(ChartID) {

//    var width = 960,
//    height = 80,
//    margin = { top: 5, right: 40, bottom: 25, left: 120 };
//    var chart = nv.models.bulletChart()
//    .orient("bottom")
//    .width(width - margin.right - margin.left)
//    .height(height - margin.top - margin.bottom);
//    data = [
//  { "color": "#5FBA50", "title": "Revenue", "subtitle": "US$, in thousands", "ranges": [150, 225, 300], "measures": [220], "markers": [250] }
//  , { "color": "#5FBA50", "title": "Profit", "subtitle": "%", "ranges": [20, 25, 30], "measures": [21], "markers": [26] },
//    { "color": "#5FBA50", "title": "Order Size", "subtitle": "US$, average", "ranges": [350, 500, 600], "measures": [100], "markers": [550] },
//    { "color": "#5FBA50", "title": "New Customers", "subtitle": "count", "ranges": [1400, 2000, 2500], "measures": [1000], "markers": [1000] },
//    { "color": "#5FBA50", "title": "Satisfaction", "subtitle": "out of 5", "ranges": [3.5, 4.25, 5], "measures": [3.2, 4.7], "markers": [4.4] }
//    
//];
//    //TODO: to be consistent with other models, shouild be appending a g to an already made svg, not creating the svg element
//    var vis = d3.select("#" + ChartID).selectAll("svg")
//      .data(data)
//    .enter().append("svg")
//      .attr("class", "bullet nvd3")
//      .attr("width", width)
//      .attr("height", height)
//    vis
//      .transition()
//      .duration(1000)
//      .call(chart);
//    window.transition = function () {
//        vis.datum(randomize);
//        vis
//      .transition()
//      .duration(1000)
//      .call(chart);
//        nv.utils.windowResize(chart.update);
//        return chart;
//    };

//    function randomize(d) {
//        if (!d.randomizer) d.randomizer = randomizer(d);
//        d.ranges = d.ranges.map(d.randomizer);
//        d.markers = d.markers.map(d.randomizer);
//        d.measures = d.measures.map(d.randomizer);
//        return d;
//    }
//    function randomizer(d) {
//        var k = d3.max(d.ranges) * .2;
//        return function (d) {
//            return Math.max(0, d + k * (Math.random() - .5));
//        };
//    }

//}


$(document).ready(function () {
    $(window).resize(function () {
         //Type1
        Get_BulletChartNew("BulletChartNew");
        Get_BulletChartNew1("BulletChartNew1");
        Get_BulletChartNew2("BulletChartNew2");
        Get_BulletChartNew3("BulletChartNew3");
        Get_BulletChartNew4("BulletChartNew4");
        //Type2
        Get_BulletChart("BulletChart");
        Get_BulletChart1("BulletChart1");
        Get_BulletChart2("BulletChart2");
        Get_BulletChart3("BulletChart3");
        Get_BulletChart4("BulletChart4");

    });
});

function Get_BulletChartNew(ChartID) {

  nv.addGraph(function () {
      var chart = nv.models.bulletChart();
     
      d3.select('#' + ChartID)
     .datum(exampleData())
      .transition().duration(1000)
      .call(chart);
      nv.utils.windowResize(chart.update);
      return chart;
  });
}


function exampleData() {
    return {
        "color": "#5FBA50",
  	"title":"Revenue",		//Label the bullet chart
  	"subtitle":"US$, in thousands",		//sub-label for bullet chart
  	"ranges":[150,225,300],	 //Minimum, mean and maximum values.
  	"measures":[220],		 //Value representing current measurement (the thick blue line in the example)
  	"markers":[250]			 //Place a marker on the chart (the white triangle marker)
  };
}
//2
function Get_BulletChartNew1(ChartID) {
    
    nv.addGraph(function () {
        var chart = nv.models.bulletChart();

        d3.select('#' + ChartID)
       .datum(exampleData2())
      .transition().duration(1000)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}

function exampleData2() {
    return {
        "color": "#5FBA50",
        "title": "Profit", 	//Label the bullet chart
        "subtitle": "%", 	//sub-label for bullet chart
        "ranges": [20, 25, 30],  //Minimum, mean and maximum values.
        "measures": [21, 23], 	 //Value representing current measurement (the thick blue line in the example)
        "markers": [26]			 //Place a marker on the chart (the white triangle marker)
    };
}
//3
function Get_BulletChartNew2(ChartID) {

    nv.addGraph(function () {
        var chart = nv.models.bulletChart();

        d3.select('#' + ChartID)
       .datum(exampleData3())
      .transition().duration(1000)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}

function exampleData3() {
    return {
        "color": "#5FBA50",
        "title": "Order Size", 	//Label the bullet chart
        "subtitle": "US$, average", 	//sub-label for bullet chart
        "ranges": [350, 500, 600],  //Minimum, mean and maximum values.
        "measures": [100, 320], 	 //Value representing current measurement (the thick blue line in the example)
        "markers": [550]			 //Place a marker on the chart (the white triangle marker)
    };
}
//4
function Get_BulletChartNew3(ChartID) {

    nv.addGraph(function () {
        var chart = nv.models.bulletChart();

        d3.select('#' + ChartID)
       .datum(exampleData4())
      .transition().duration(1000)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}

function exampleData4() {
    return {
        "color": "#5FBA50",
        "title": "Order Size", 	//Label the bullet chart
        "subtitle": "US$, average", 	//sub-label for bullet chart
        "ranges": [350, 500, 600],  //Minimum, mean and maximum values.
        "measures": [100, 320], 	 //Value representing current measurement (the thick blue line in the example)
        "markers": [550]			 //Place a marker on the chart (the white triangle marker)
    };
}
//5
function Get_BulletChartNew4(ChartID) {

    nv.addGraph(function () {
        var chart = nv.models.bulletChart();

        d3.select('#' + ChartID)
       .datum(exampleData5())
      .transition().duration(1000)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}

function exampleData5() {
    return {
        "color": "#5FBA50",
        "title": "Satisfaction", 	//Label the bullet chart
        "subtitle": "Out of 5", 	//sub-label for bullet chart
        "ranges": [3.5, 4.25, 5],  //Minimum, mean and maximum values.
        "measures": [3.2, 4.7], 	 //Value representing current measurement (the thick blue line in the example)
        "markers": [4.4]			 //Place a marker on the chart (the white triangle marker)
    };
}

//BulletChart
function Get_BulletChart(ChartID) {

    nv.addGraph(function () {
        var chart = nv.models.bulletChart();

        d3.select('#' + ChartID)
     .datum(Data())
      .transition().duration(1000)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}


function Data() {
    return {
        "color": "#26A7DD",
        "title": "Revenue", 	//Label the bullet chart
        "subtitle": "US$, in thousands", 	//sub-label for bullet chart
        "ranges": [150, 225, 300],  //Minimum, mean and maximum values.
        "measures": [220], 	 //Value representing current measurement (the thick blue line in the example)
        "markers": [250]			 //Place a marker on the chart (the white triangle marker)
    };
}
//2
function Get_BulletChart1(ChartID) {

    nv.addGraph(function () {
        var chart = nv.models.bulletChart();

        d3.select('#' + ChartID)
       .datum(Data2())
      .transition().duration(1000)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}

function Data2() {
    return {
        "color": "#5FBA50",
        "title": "Profit", 	//Label the bullet chart
        "subtitle": "%", 	//sub-label for bullet chart
        "ranges": [20, 25, 30],  //Minimum, mean and maximum values.
        "measures": [21, 23], 	 //Value representing current measurement (the thick blue line in the example)
        "markers": [26]			 //Place a marker on the chart (the white triangle marker)
    };
}
//3
function Get_BulletChart2(ChartID) {

    nv.addGraph(function () {
        var chart = nv.models.bulletChart();

        d3.select('#' + ChartID)
       .datum(Data3())
      .transition().duration(1000)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}

function Data3() {
    return {
        "color": "#316CB1",
        "title": "Order Size", 	//Label the bullet chart
        "subtitle": "US$, average", 	//sub-label for bullet chart
        "ranges": [350, 500, 600],  //Minimum, mean and maximum values.
        "measures": [100, 320], 	 //Value representing current measurement (the thick blue line in the example)
        "markers": [550]			 //Place a marker on the chart (the white triangle marker)
    };
}
//4
function Get_BulletChart3(ChartID) {

    nv.addGraph(function () {
        var chart = nv.models.bulletChart();

        d3.select('#' + ChartID)
       .datum(Data4())
      .transition().duration(1000)
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}

function Data4() {
    return {
        "color": "#FD9C47",
        "title": "Order Size", 	//Label the bullet chart
        "subtitle": "US$, average", 	//sub-label for bullet chart
        "ranges": [350, 500, 600],  //Minimum, mean and maximum values.
        "measures": [100, 320], 	 //Value representing current measurement (the thick blue line in the example)
        "markers": [550]			 //Place a marker on the chart (the white triangle marker)
    };
}
//5
function Get_BulletChart4(ChartID) {

    nv.addGraph(function () {

    //    var margin = { top: 5, right: 40, bottom: 20, left: 0},
    //width = 960 - margin.left - margin.right,
    //height = 50 - margin.top - margin.bottom;


        var chart = nv.models.bulletChart();
       // .width(width)
       // .height(height);

        d3.select('#' + ChartID)
       .datum(Data5())
      .transition().duration(1000)
            .attr('transform', 'translate(5,5)')
      .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });
}

function Data5() {
    return {
        "color": "#F16B50",
       // "title": "Satisfaction", 	//Label the bullet chart
        //"subtitle": "Out of 5", 	//sub-label for bullet chart
        "ranges": [3.5, 4.25, 5],  //Minimum, mean and maximum values.
        "measures": [3.2, 4.7], 	 //Value representing current measurement (the thick blue line in the example)
        "markers": [4.4]			 //Place a marker on the chart (the white triangle marker)
    };
}

