/* Function that test if our API works */

var $productListing = document.querySelector('#product-listing');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://makeup-api.herokuapp.com/api/v1/products.json');
xhr.responseType = 'json';

xhr.addEventListener('load', function () {

  /* log the xhr status & response to ensure it works
      console.log(xhr.status);
      console.log(xhr.response); */

  for (var i = 0; i < xhr.response.length; i++) {
    var brandObject = document.createElement('li');
    brandObject.textContent = xhr.response[i].name;
    $productListing.appendChild(brandObject);
  }
});

xhr.send();
