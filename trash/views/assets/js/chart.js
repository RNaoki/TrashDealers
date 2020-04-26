google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawTrendlines);

function drawTrendlines() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Points');

    data.addRows([
      [0,0], [1,2], [2,7], [3,1]
    ]);

    var options = {
      hAxis: {
        title: 'Date'
      },
      vAxis: {
        title: 'Points'
      },
      colors: ['#4CAF50'],
      backgroundColor: '#fafafa'
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }
