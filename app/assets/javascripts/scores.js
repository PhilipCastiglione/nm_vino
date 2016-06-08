function showScores() {
  var $tables = $('table');
  if ($tables.length > 0) {
    $.each($tables, (function(i, table) {
      var scores = JSON.parse(localStorage.getItem('scores:' + table.dataset.measure));
      $.each(scores, (function(key, val) {
        $tr = $('<tr>');

        $tr.append($('<td>').text(val['name']));
        $tr.append($('<td>').text((new Date(val['date'])).toLocaleString()));

        let metricCategories = Object.keys(val['report']).sort();

        $.each(metricCategories, ((i, metricCategory) => {
          $tr.append($('<td>').text(val['report'][metricCategory]['total']));
        }));

        $tr.append($('<td>').text(val['total']));

        $(table).find('tbody').prepend($tr);
      }));
    }));
  }
}

$(showScores)
