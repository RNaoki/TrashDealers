google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawTrendlines);
var server = "http://ec2-34-238-191-59.compute-1.amazonaws.com:5000/"
var url = server + '/historicoResgatesPremio/resgate/idUsuario&' + localStorage.getItem('user')
var url2 = server + '/coletas/coleta/idUsuario&' + localStorage.getItem('user')
var url3 = server + '/reciclaveis/todos'

var points = []

function drawTrendlines() {
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Points');
    $.ajax({
      url: url3,
      crossDomain: true,
      type: 'GET',
      success: function(reciclaveis) {
        $.ajax({
          url: url,
          crossDomain: true,
          type: 'GET',
          success: function(values) {
            $.ajax({
              url: url2,
              crossDomain: true,
              type: 'GET',
              success: function(values2) {
                console.log(reciclaveis)
                for(item in values){
                  points.push([new Date(values[item].dataAcao), -values[item].pontos])
                }
                for(item in values2){
                  points.push([new Date(values2[item].dataColeta), values2[item].quantia * reciclaveis[values2[item].idReciclavel-1].valor])
                }
                console.log(points)
                data.addRows(points);
      
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
            });
          }
        });
      }
    });
    
    
  }
