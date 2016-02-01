var firstURL = window.location.pathname;
var pageNumberData = 0;

var renderPageNumber = function(n){
  pnum.innerHTML = n || "root";
  nextPage.setAttribute("href", "page"+n);
};

var changePageTo = function(newURL){
  pageNumberData += 1;
  history.pushState({dataAboutThisPage: pageNumberData}, "Page Title", newURL);
  //URL only changes in normal sites not codepen...
  renderPageNumber(pageNumberData);
};

window.addEventListener('popstate', function(backButtonEvent){
  pageNumberData -= 1;
  console.log(backButtonEvent.state);
  renderPageNumber(pageNumberData);
});

document.body.addEventListener('click', function(ev){
  ev.preventDefault(); //stops the link from executing
  if (ev.target.nodeName == 'A'){
    var fakeURL = ev.target.getAttribute('href');
    changePageTo(fakeURL);
  }
});