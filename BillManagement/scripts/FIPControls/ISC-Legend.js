/// <reference path="../Internalplugin/jquery-1.8.3.min.js" />


function Get_Legend(ChartID) {

    //Format A
    nv.addGraph({
        generate: function () {
            var width = 500,
        height = 20;

            var chart = nv.models.legend()
                .width(width)
                .height(height);

            chart.dispatch.on('legendClick', function (d, i) { console.log(d, i) });

            //chart.xaxis.tickFormat(d3.format(".02f"))

            d3.select('#' + ChartID + '')
      .attr('width', width)
      .attr('height', height)
      .datum(sinAndCos())
      .call(chart);

            return chart;
        },
        callback: function (graph) {
            var chart = graph,
        height = chart.height();

            d3.select('#' + ChartID + '')
        .attr('height', height)
        .call(chart)
        }
    });

}

function sinAndCos() {
    return [
    {
        key: "Sine Wave",
        color: "#EF7F67"
    },
    {
        key: "A Very Long Series Label",
        color: "#aaa"
    },
    {
        key: "A Very Long Series Label",
        color: "#5fba50"
    },
    {
        key: "A Very Long Series Label",
        color: "#ffc23e"
    },
    {
        key: "Cosine Wave",
        color: "#19ccff"
    },
    {
        key: "Another test label",
        color: "#d18fe2"
    }
  ];
}
