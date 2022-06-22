var margin = {top: 20, right: 0, bottom: 100, left: 50},
    width = ($(window).width()-117) - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

 
var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);
 
var x1 = d3.scale.ordinal();
 
var y = d3.scale.linear()
    .range([height, 0]);
 
var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");
 
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".1s"));
 
var color = d3.scale.ordinal()
    .range(["#ffcc80", "#6BC2E6", "#8CDDCB"]);
 
var svg = d3.select("#chart_workload")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
var yBegin;


 
//var innerColumns = {
//  "column1" : ["Under 5 Years","5 to 13 Years","14 to 17 Years"],
//  "column2" : ["18 to 24 Years"],
//  "column3" : ["25 to 44 Years"],
//  "column4" : ["45 to 64 Years", "65 Years and Over"]
//}
// 
var innerColumns = {
  "column1" : ["Waiting to Release","Ready to Release"],
  "column2" : ["Released"]
}
 
d3.csv("T37-ChartControls/Data/data1.csv", function(error, data) {
  var columnHeaders = d3.keys(data[0]).filter(function(key) { return key !== "Date"; });
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Date"; }));
  data.forEach(function(d) {
    var yColumn = new Array();
    d.columnDetails = columnHeaders.map(function(name) {
      for (ic in innerColumns) {
        if($.inArray(name, innerColumns[ic]) >= 0){
          if (!yColumn[ic]){
            yColumn[ic] = 0;
          }
          yBegin = yColumn[ic];
          yColumn[ic] += +d[name];
          return {name: name, column: ic, yBegin: yBegin, yEnd: +d[name] + yBegin,};
        }
      }
    });
    d.total = d3.max(d.columnDetails, function(d) { 
      return d.yEnd; 
    });
  });
 
  x0.domain(data.map(function(d) { return d.Date; }));
  x1.domain(d3.keys(innerColumns)).rangeRoundBands([0, x0.rangeBand()]);
 
  y.domain([0, d3.max(data, function(d) { 
    return d.total; 
  })]);
 
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
 
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".7em")
      .style("text-anchor", "end")
      .text("");
 
  var project_stackedbar = svg.selectAll(".project_stackedbar")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x0(d.Date) + ",0)"; });
 
  project_stackedbar.selectAll("rect")
      .data(function(d) { return d.columnDetails; })
    .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { 
        return x1(d.column);
         })
      .attr("y", function(d) { 
        return y(d.yEnd); 
      })
      .attr("height", function(d) { 
        return y(d.yBegin) - y(d.yEnd); 
      })
      .style("fill", function(d) { return color(d.name); })
      .on("mouseover", function() { tooltip.style("display", null); })
  .on("mouseout", function() { tooltip.style("display", "none"); })
  .on("mousemove", function(d) {
   var xPosition = d3.mouse(this)[0] + 105;
    var yPosition = d3.mouse(this)[1] + 25;
    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    tooltip.select("text").text(d.yEnd);
  });
 
//  var legend = svg.selectAll(".legend")
//      .data(columnHeaders.slice())
//    .enter().append("g")
//      .attr("class", "legend")
//      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
// 
//  legend.append("rect")
//      .attr("x", (width+90))
//      .attr("width", 18)
//      .attr("height", 18)
//      .style("fill", color);
// 
//  legend.append("text")
//      .attr("x", width - 24)
//      .attr("y", 9)
//      .attr("dy", ".35em")
//      .style("text-anchor", "end")
//      .text(function(d) { return d; });

      // Prep the tooltip bits, initial display is hidden
 var tooltip = svg.append("g")
  .attr("class", "tooltip-s1")
  .style("display", "block");
    
tooltip.append("rect")
  .attr("width", 30)
  .attr("height", 20)
  .attr("fill", "white")
  .style("opacity", 0.5);

tooltip.append("text")
  .attr("x", 15)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");
 
});