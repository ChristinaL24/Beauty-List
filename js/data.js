/* exported data */
var data = {
  view: 'product-lists',
  storage: [],
  id: null,
  save: {}
};

var previousListing = localStorage.getItem('beauty-list');

if (previousListing !== null) {
  data = JSON.parse(previousListing);
}

window.addEventListener('beforeunload', function (event) {
  var makeUpStorage = JSON.stringify(data);
  localStorage.setItem('beauty-list', makeUpStorage);
});
