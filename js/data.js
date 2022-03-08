/* exported data */
var data = {
  view: 'product-lists',
  save: []
};

var previousListing = localStorage.getItem('makeup-listing');

if (previousListing !== null) {
  data = JSON.parse(previousListing);
}

window.addEventListener('beforeunload', function (event) {
  var makeUpStorage = JSON.stringify(data);
  localStorage.setItem('makeup-listing', makeUpStorage);
});
