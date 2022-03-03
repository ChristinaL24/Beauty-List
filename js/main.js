/* Function that test if our API works */

/* code for <ul> element that holds our list items */
var $productListing = document.querySelector('#product-listing');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://makeup-api.herokuapp.com/api/v1/products.json');
xhr.responseType = 'json';

xhr.addEventListener('load', function () {

  event.preventDefault();

  /* log the xhr status & response to ensure it works
      console.log(xhr.status);
      console.log(xhr.response); */

  for (var i = 0; i < xhr.response.length; i++) {

    var newListing = {
      name: xhr.response[i].name,
      price: xhr.response[i].price,
      entryId: xhr.response[i].id,
      image: xhr.response[i].image_link

    };
    var makeUpProducts = renderListing(newListing);
    $productListing.appendChild(makeUpProducts);
  }

});

xhr.send();

/* Function that takes product listing object and returns a DOM TREE */

function renderListing(listing) {

  /* addEventListener for broken images */
  var $imgBroken = document.querySelectorAll('img');
  [].forEach.call($imgBroken, function (event) {
    event.addEventListener('error', function (event) {
      event.target.src = './images/image.png';
    });
  });

  var makeUpListing = document.createElement('li');
  makeUpListing.setAttribute('class', 'column-mobile-full column-desktop-half padding-right');

  var firstDiv = document.createElement('div');
  firstDiv.setAttribute('class', 'wrapper row');
  makeUpListing.appendChild(firstDiv);

  var secondDiv = document.createElement('div');
  secondDiv.setAttribute('class', 'column-one-third');
  firstDiv.appendChild(secondDiv);

  var productImg = document.createElement('img');
  productImg.setAttribute('src', listing.image);
  productImg.setAttribute('class', 'product-img');
  secondDiv.appendChild(productImg);

  var thirdDiv = document.createElement('div');
  thirdDiv.setAttribute('class', 'column-two-third product-info');
  firstDiv.appendChild(thirdDiv);

  var productName = document.createElement('h4');
  productName.textContent = listing.name;
  thirdDiv.appendChild(productName);

  var productPrice = document.createElement('p');
  productPrice.textContent = '$' + listing.price;
  thirdDiv.appendChild(productPrice);

  return makeUpListing;
  /* use renderListing(xhr.response[index]) to check if it printed correctly */
}
