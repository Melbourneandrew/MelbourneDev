anychart.onDocumentReady(function () {

    // load data
    anychart.data.loadCsvFile("https://static.anychart.com/git-storage/word-press/data/candlestick-chart-tutorial/EUR_USDHistoricalData2year.csv", function (data) {

    // create a data table
    var dataTable = anychart.data.table(0, 'MMM d, yyyy');
    dataTable.addData(data);

    // map data
    var mapping = dataTable.mapAs({ 'open': 2, 'high': 3, 'low': 4, 'close': 1 });

    // set the chart type
    var chart = anychart.stock();

    // set the series
    var series = chart.plot(0).candlestick(mapping);
    series.name("EUR USD Trade Data");

    // set the chart title
    chart.title("EUR USD Historical Trade Data");

    // set the container id
    chart.container('container');

    // draw the chart
    chart.draw();

  });

});
