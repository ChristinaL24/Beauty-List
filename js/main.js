/* code for <ul> element that holds our list items */
var $productListing = document.querySelector('#product-listing');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://makeup-api.herokuapp.com/api/v1/products.json');
xhr.responseType = 'json';

/* Function that test if our API works */
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
      image: xhr.response[i].image_link,
      description: xhr.response[i].description

    };
    /* To account for broken links & values in API:
       This condition states that if the price is not strictly equal to zero
       or null, then to append it to our listing */
    if (xhr.response[i].price !== '0.0' && xhr.response[i].price !== null) {
      var makeUpProducts = renderListing(newListing);
      $productListing.appendChild(makeUpProducts);
      var detailListing = renderDetails(newListing);
      $productListing.appendChild(detailListing);
    }
  }

});

xhr.send();

/* Function that takes product listing object and returns a DOM TREE */

function renderListing(listing) {

  /* addEventListener for broken images:
     Used ./ because one dot represents the current directory;
     querySelectorAll returns a nodes list aka an array so the 'for
     each' function was used in this case to help target all images */
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
  productImg.setAttribute('class', 'product-img-listing');
  secondDiv.appendChild(productImg);

  var thirdDiv = document.createElement('div');
  thirdDiv.setAttribute('class', 'column-two-third product-info');
  firstDiv.appendChild(thirdDiv);

  var productName = document.createElement('h5');
  productName.textContent = capitalizeWords(listing.name);
  thirdDiv.appendChild(productName);

  /* Use Number.prototype.toFixed() to format the prices from ending at the tenths
     place to the hundreths */
  var productPrice = document.createElement('h5');
  productPrice.textContent = 'Price: $' + Number.parseFloat(listing.price).toFixed(2);
  thirdDiv.appendChild(productPrice);

  /* code to add a data-entry-id to each product listing */
  makeUpListing.setAttribute('data-entry-id', listing.entryId);

  return makeUpListing;
  /* use renderListing(xhr.response[index]) to check if it printed correctly */

}

/* Function that handles the title casing for our product name */
function capitalizeWords(string) {

  var array = string.split(' ');
  var newString = '';
  for (var i = 0; i < array.length; i++) {
    var word = array[i];
    var newWord = word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
    newString = newString + ' ' + newWord;
  }
  return newString.slice(1);
}

/* addEventListener for parent element for all rendered listings

function viewProductDetails(event) {
  $productListing.className = 'row no-padding hidden';
}

function listingHomePage(event) {
  $productListing.className = 'row no-padding view';
  data.view = 'product-listing';
}

var $homeButton = document.querySelector('#home-button');
$homeButton.addEventListener('click', homeButtonClicked);
function homeButtonClicked(event) {
  if (event.target.tagName === 'I') {
    return listingHomePage();
  }
}

$productListing.addEventListener('click', productListingClicked);
function productListingClicked(event) {
  if (event.target.tagName === 'LI') {
    return viewProductDetails();
  }
}
*/

function renderDetails(listing) {

  /* addEventListener for broken images:
    Used ./ because one dot represents the current directory;
    querySelectorAll returns a nodes list aka an array so the 'for
    each' function was used in this case to help target all images */
  var $imgBroken = document.querySelectorAll('img');
  [].forEach.call($imgBroken, function (event) {
    event.addEventListener('error', function (event) {
      event.target.src = './images/image.png';
    });
  });

  var firstDiv = document.createElement('div');
  firstDiv.setAttribute('class', 'row');

  var secondDiv = document.createElement('div');
  secondDiv.setAttribute('class', 'column-mobile-full column-desktop-half padding-right');
  firstDiv.appendChild(secondDiv);

  var detailImage = document.createElement('img');
  detailImage.setAttribute('src', listing.image);
  detailImage.setAttribute('class', 'product-img-details');
  secondDiv.appendChild(detailImage);

  var thirdDiv = document.createElement('div');
  thirdDiv.setAttribute('class', 'column-desktop-half');
  secondDiv.appendChild(thirdDiv);

  var detailProductName = document.createElement('h3');
  detailProductName.textContent = capitalizeWords(listing.name);
  thirdDiv.appendChild(detailProductName);

  var detailPrice = document.createElement('h3');
  detailPrice.textContent = 'Price: $' + Number.parseFloat(listing.price).toFixed(2);
  thirdDiv.appendChild(detailPrice);

  var detailDescription = document.createElement('h3');
  detailDescription.textContent = 'Description:';
  thirdDiv.appendChild(detailDescription);

  var detailDescriptionPara = document.createElement('h3');
  detailDescriptionPara.textContent = listing.description;
  thirdDiv.appendChild(detailDescriptionPara);

  return firstDiv;
}
