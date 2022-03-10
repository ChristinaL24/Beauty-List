/* exported data */
var data = {
  view: '',
  save: [],
  id: null,
  results: []
};

var previousListing = localStorage.getItem('beauty-list');

if (previousListing !== null) {
  data = JSON.parse(previousListing);
}

window.addEventListener('beforeunload', function (event) {
  var makeUpStorage = JSON.stringify(data);
  localStorage.setItem('beauty-list', makeUpStorage);
});
