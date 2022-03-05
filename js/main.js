/* code for <ul> element that holds our list items */
var $productListing = document.querySelector('#product-listing');
/* code for <div> that holds our value for the detail page */
var $productDetails = document.querySelector('#product-details');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://makeup-api.herokuapp.com/api/v1/products.json');
xhr.responseType = 'json';

/* Function that handles the API */
xhr.addEventListener('load', function () {

  event.preventDefault();

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
    }
  }

});

xhr.send();

/* Function that takes product listing object and returns a DOM TREE for home page */
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
  makeUpListing.setAttribute('class', 'column-mobile-full column-desktop-half padding-right list-data');

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

function viewProductDetails(event) {
  $productListing.className = 'hidden';
  $productDetails.className = 'margin-top view';
  data.view = 'product-details';
}

function listingHomePage(event) {
  $productListing.className = 'row no-padding view';
  $productDetails.className = 'margin-top hidden';
  data.view = 'product-listing';
}

var $homeButton = document.querySelector('#home-button');
$homeButton.addEventListener('click', homeButtonClicked);
function homeButtonClicked(event) {
  if (event.target.tagName === 'I') {
    return listingHomePage();
  }
}

var $productImageDetails = document.querySelector('.product-image-details');
var $productNameDetails = document.querySelector('.product-name-span');
var $productDescriptionDetails = document.querySelector('.product-description-details');
var $productPriceDetails = document.querySelector('.product-price-span');

$productListing.addEventListener('click', productListingClicked);
function productListingClicked(event) {
  if (event.target.closest('li')) {
    var getListingItem = event.target.closest('li');
    var getListingObjectId = parseInt(getListingItem.getAttribute('data-entry-id'));
    data.select = getListingObjectId;
    for (var i = 0; i < data.select.length; i++) {
      if (getListingObjectId === data.select[i].entryId) {
        $productImageDetails.setAttribute = ('src', xhr.response[i].image_link);
        $productNameDetails.value = data.select[i].name;
        $productDescriptionDetails.value = data.select[i].description;
        $productPriceDetails.value = data.select[i].price;

        viewProductDetails();
      }
    }
  }
}
