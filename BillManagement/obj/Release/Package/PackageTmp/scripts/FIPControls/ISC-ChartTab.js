
/// <reference path="../Internalplugin/jquery-1.8.3.min.js" />

/// <reference path="ISC-VerticalBarChart.js" />
/// <reference path="ISC-HorizontalBarChart.js" />
/// <reference path="ISC-PieChart.js" />
/// <reference path="ISC-LineChart.js" />
/// <reference path="ISC-BubbleChart.js" />
/// <reference path="ISC-Legend.js" />
/// <reference path="ISC-SparkLines.js" />
/// <reference path="ISC-AreaChart.js" />
/// <reference path="ISC-dountChart.js" />
/// <reference path="ISC-StackedBarChart.js" />
/// <reference path="ISC-BulletChart.js" />
/// <reference path="ISC-CompareChart.js" />
/// <reference path="ISC-Stacked.js" />
/// <reference path="ISC-LinePlusBarChart.js" />

//DC-Chart
/// <reference path="DC-Charts/ISC-DC-chart/ISC-box-plot.js" />
/// <reference path="DC-Charts/ISC-DC-chart/ISC-PieMultiChart.js" />
/// <reference path="DC-Charts/ISC-DC-chart/ISC-CompositeChart.js" />
/// <reference path="DC-Charts/ISC-DC-chart/ISC-HeatChart.js" />
/// <reference path="DC-Charts/ISC-DC-chart/ISC-NumberChart.js" />


$(document).ready(function () {
    Get_VerticalBarChart("VerticalBarChart");
});
function TabClick(object) {
    var _tabID = object.id;
    var _chartID = $(object).attr("data-chartid");
    if (_tabID == "tab1") {
        Get_VerticalBarChart(_chartID);
    }
    else if (_tabID == "tab2") {
        Get_HorizontalBarChart(_chartID);
    }
    else if (_tabID == "tab3") {
        Get_PieChart(_chartID);
    }
    else if (_tabID == "tab4") {
        Get_LineChart(_chartID);
    }
    else if (_tabID == "tab5") {
        Get_BubbleChart(_chartID);
    }
    else if (_tabID == "tab6") {
        Get_AreaChart(_chartID);
    }
    else if (_tabID == "tab7") {
        Get_Legend(_chartID);
        SparkLineData();
    }
    else if (_tabID == "tab8") {
        Get_AreaChart("KPI_AreaChart");
        Get_VerticalBarChart("KPI_VerticalBarChart");
        Get_BubbleChart("KPI_BubbleChart");
          Get_PieChart("KPI_PieChart");
        Get_HorizontalBarChart("KPI_HorizontalBarChart");
        Get_LineChart("KPI_LineChart");
        Get_DonutChart("KPI_DonutChart");
        Get_StackedBarChart("KPI_StackedBarChart");
    }
    else if (_tabID == "tab9") {
        Get_DonutChart(_chartID);
    }
    else if (_tabID == "tab10") {
       // alert(_chartID);
        Get_StackedBarChart(_chartID);
    }
    else if (_tabID == "tab11") {
        // alert(_chartID);
        Get_BulletChart(_chartID);
    }
    else if (_tabID == "tab12") {
        Get_BoxPlot("box-test", "pie-chart");
    }
    else if (_tabID == "tab13") {
        Get_PieMultiChart("chart-ring-year", "chart-hist-spend","chart-row-spenders");
    }
    else if (_tabID == "tab14") {
        Get_CompositeChart("test_composed");
    }
    else if (_tabID == "tab15") {
        Get_HeatChart("Heatest");
    }
    else if (_tabID == "tab16") {
        Get_NumberChart("number-box");
    }
    else if (_tabID == "tab17") {
        Get_CompareChart("CompareChart");
    }
    else if (_tabID == "tab18") {
        Get_Stacked("StackedChart");
    }
    else if (_tabID == "tab19") {
        Get_LinePlusBarChart("LinePlusBarChart");
    }
}