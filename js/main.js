/* code for <div> element that holds our list items */
var $productListing = document.querySelector('#product-listing');
/* code for <div> that holds our value for the detail page */
var $productDetails = document.querySelector('#product-details');

/* TODO make sure to change website */
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl&product_type=lipstick');
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

  event.preventDefault();

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

  var makeUpContainer = document.createElement('ul');

  var makeUpListing = document.createElement('li');
  makeUpListing.setAttribute('class', 'column-mobile-full column-desktop-half padding-right margin-top');
  makeUpContainer.appendChild(makeUpListing);

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

  data.view = 'product-lists';

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

function detailListingPage(event) {
  $productDetails.className = 'margin-top';
  $productListing.className = 'row no-padding hidden';
  data.view = 'product-details';
}

/* addEventListener for home button being clicked */
var $homeButton = document.querySelector('#home-button');
$homeButton.addEventListener('click', listingHomePage);
function listingHomePage(event) {
  $productDetails.className = 'margin-top hidden';
  $productListing.className = 'row no-padding';
  $beautyHeader.className = 'beauty-header';
  $savedHeader.className = 'saved-header hidden';
  $savedItemsStorage.className = 'row no-padding hidden';
  data.view = 'product-lists';
}

var $productImageDetails = document.querySelector('.product-img-details');
var $productNameDetails = document.querySelector('.product-name-span');
var $productPriceDetails = document.querySelector('.product-price-span');
var $productDescriptionDetails = document.querySelector('.product-description-details');

/* addEventListener for parent element <ul> that is being clicked */
$productListing.addEventListener('click', productListingClicked);
function productListingClicked(event) {
  var getListingItem = event.target.closest('li');
  var getListingId = parseInt(getListingItem.getAttribute('data-entry-id'));
  detailListingPage();

  for (var i = 0; i < xhr.response.length; i++) {
    if (xhr.response[i].id === getListingId) {
      $productImageDetails.setAttribute('src', xhr.response[i].image_link);
      $productNameDetails.textContent = xhr.response[i].name;
      $productPriceDetails.textContent = '$' + Number.parseFloat(xhr.response[i].price).toFixed(2);
      $productDescriptionDetails.textContent = xhr.response[i].description;

      /* Create an object to store the values of the details into data.id; push the
      values from data.id into our data.save in save function */
      var detailsObject = {
        image: xhr.response[i].image_link,
        name: xhr.response[i].name,
        price: '$' + Number.parseFloat(xhr.response[i].price).toFixed(2),
        id: xhr.response[i].id,
        description: xhr.response[i].description
      };
      data.id = detailsObject;
      data.view = 'product-details';
      var savedProducts = renderSavedItems(detailsObject);
      $savedItemsStorage.appendChild(savedProducts);
    }

  }
}

/* Function that checks if a listing exist within our array of objects */
function containsObject(object, array) {
  for (var i = 0; i < array.length; i++) {
    if (object.id === array[i].id) {
      return true;
    }
  }
  return false;
}

/* addEventListener and function for saving to local storage */
var $saveSubmitButton = document.querySelector('.save-submit-button');
$saveSubmitButton.addEventListener('click', saveSubmitButtonFunction);
function saveSubmitButtonFunction(event) {

  event.preventDefault();

  /* if containObject returns true, data.id will not be pushed. if containObject
  returns false, it will get pushed into data.save */
  if (event.target.matches('.save-submit-button')) {
    savedHomePage();
    if (containsObject(data.id, data.save) !== true) {
      data.save.push(data.id);
      savedHomePage();
    }
  }
}

var $savedHeader = document.querySelector('.saved-header');
var $beautyHeader = document.querySelector('.beauty-header');
var $savedItemsStorage = document.querySelector('#saved-items');

/* addEventListener and function for saved button and home page */
var $savedHomePage = document.querySelector('#save-heart-button');
$savedHomePage.addEventListener('click', savedHomePage);
function savedHomePage(event) {

  $savedHeader.className = 'saved-header';
  $beautyHeader.className = 'beauty-header hidden';
  $productListing.className = 'row no-padding hidden';
  $savedItemsStorage.className = 'row no-padding';
  $productDetails.className = 'margin-top hidden';

  /* this removes all the duplicate children before appending them again */
  removeAllChildNodes($savedItemsStorage);

  for (var i = 0; i < data.save.length; i++) {
    // var dataSavedItems = {
    //   name: data.save[i].name,
    //   price: data.save[i].price,
    //   image: data.save[i].image,
    //   id: data.save[i].id
    // };
    var dataSavedItems = data.save[i];
    var savedProductsInStorage = renderSavedItems(dataSavedItems);
    $savedItemsStorage.appendChild(savedProductsInStorage);
    data.view = 'saved-items';
  }
}

/* function that removes all child nodes under parent */
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/* Dom Tree for saved items page */
function renderSavedItems(listing) {

  var savedContainer = document.createElement('ul');

  var savedListing = document.createElement('li');
  savedListing.setAttribute('class', 'column-mobile-full column-desktop-half padding-right margin-top');
  savedContainer.appendChild(savedListing);

  var firstDiv = document.createElement('div');
  firstDiv.setAttribute('class', 'wrapper row');
  savedListing.appendChild(firstDiv);

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

  var productPrice = document.createElement('h5');
  productPrice.textContent = 'Price: ' + listing.price;
  thirdDiv.appendChild(productPrice);

  savedListing.setAttribute('data-entry-id', listing.id);

  data.view = 'saved-items';

  return savedListing;
}

/* 'click' event functions cannot be called when we refresh. Create another function
to handle the refresh with values we have in our local storage */
function productDetailRefresh() {

  var getListingItem = data.id;
  detailListingPage();

  $productImageDetails.setAttribute('src', getListingItem.image);
  $productNameDetails.textContent = getListingItem.name;
  $productPriceDetails.textContent = getListingItem.price;
  $productDescriptionDetails.textContent = getListingItem.description;
}

function savedPageRefresh() {
  for (var i = 0; i < data.save.length; i++) {
    // var dataSavedItems = {
    //   name: data.save[i].name,
    //   price: data.save[i].price,
    //   image: data.save[i].image,
    //   id: data.save[i].id
    // };
    var dataSavedItems = data.save[i];

    var savedProducts = renderSavedItems(dataSavedItems);
    $savedItemsStorage.appendChild(savedProducts);
    savedHomePage();
  }
}

/* Condition for refresh */
if (data.view === 'product-lists') {
  listingHomePage();
} else if (data.view === 'product-details') {
  productDetailRefresh();
} else if (data.view === 'saved-items') {
  savedPageRefresh();
}
