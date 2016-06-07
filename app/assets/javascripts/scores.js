function showScores() {
  var $tables = $('table');
  if ($tables.length > 0) {
    $.each($tables, ((i, table) => {
      var scores = JSON.parse(localStorage.getItem('scores:' + table.dataset.measure));
      $.each(scores, ((key, val) => {
        $tr = $('<tr>');
        $tr.append($('<td>').text(val['name']));
        $tr.append($('<td>').text((new Date(val['date'])).toLocaleString()));
        $.each(val['report'], ((mc, metrics) => {
          $.each(metrics, ((metric, metric_score) => {
            if (metric === 'total') {
              $tr.append($('<td>').text(metric_score));
            }
          }));
        }));
        $tr.append($('<td>').text(val['total']));
        $(table).find('tbody').prepend($tr);
      }));
    }));
  }
}

$(showScores)
