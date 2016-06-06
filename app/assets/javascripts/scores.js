function showScores() {
  var $table = $('table');
  if ($table.length > 0) {
    var $scores = JSON.parse(localStorage.getItem('scores')) || {}
    $.each($scores, function(key, val) {
      var $date = $("<td>").html(key);
      var $score = $("<td>").html(val);
      var $row = $("<tr>");
      $row.append($date);
      $row.append($score);
      $('tbody').append($row);
    });
  }
}

$(showScores)
