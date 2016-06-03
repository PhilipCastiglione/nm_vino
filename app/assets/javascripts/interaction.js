function activeClickToggle(className) {
 $('.' + className).click(function(e) {
   $('.' + className).removeClass('active inactive');
   $('.' + className).addClass('inactive');
   $(e.target).toggleClass('active inactive');
 });
}

function addListeners() {
  //['measure', 'disease', 'metric-category', 'metric', 'metric_detail', 'metric_subdetail']
  activeClickToggle('measure');
}

function main() {
  addListeners();
}

$(main);
