/* exported data */
var data = {
  listings: []
};

var previousEntries = localStorage.getItem('makeup-listing');

if (previousEntries !== null) {
  data = JSON.parse(previousEntries);
}

window.addEventListener('beforeunload', function (event) {
  var makeUpStorage = JSON.stringify(data);
  localStorage.setItem('makeup-listing', makeUpStorage);
});
