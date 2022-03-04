/* exported data */
var data = {
  view: 'product-lists',
  details: null,
  select: {},
  entries: []
};

var previousEntries = localStorage.getItem('saved-makeup');

if (previousEntries !== null) {
  data = JSON.parse(previousEntries);
}

window.addEventListener('beforeunload', function (event) {
  var makeUpStorage = JSON.stringify(data);
  localStorage.setItem('saved-makeup', makeUpStorage);
});
