var $tabContainer = document.querySelector('.tab-container');
var $tab = document.querySelectorAll('.tab');
var $view = document.querySelectorAll('.view');

$tabContainer.addEventListener('click', tabContainerFunction);

function tabContainerFunction(event) {
  if (event.target && event.target.matches('.tab')) {
    for (var i = 0; i < $tab.length; i++) {
      if ($tab[i] === event.target) {
        $tab[i].className = 'tab active';
      } else {
        $tab[i].className = 'tab';
      }
    }
    var $dataView = event.target.getAttribute('data-view');
    for (var j = 0; j < $view.length; j++) {
      if ($view[j].getAttribute('data-view') === $dataView) {
        $view[j].setAttribute('class', 'view');
      } else {
        $view[j].setAttribute('class', 'view hidden');
      }
    }
  }
}
