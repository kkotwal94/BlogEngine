var firstURL = window.location.pathname;
var pageNumberData = 0;
console.log(location.hash);
console.log(location.pathname);

var historyTracker  = [];
var renderPage = function(newURL){
  console.log(window.history);
  //we are setting the innerhtml here, we would want it to be things based on buttons we click or url we visit
  container.innerHTML ='<object type="text/html" data="html/'+newURL + '.html" ></object>' || "root";
  //we are changing the links href to decide where we go!
  //nextPage.setAttribute("href", "page"+n);
};

var changePageTo = function(newURL){
  history.pushState({typeofpage: newURL}, "Page Title", newURL);
  //URL only changes in normal sites not codepen...
  renderPage(newURL);
};

window.addEventListener('popstate', function(backButtonEvent){
  pageNumberData -= 1;
  console.log(backButtonEvent.state);
  if(backButtonEvent.state == null) {
    renderPage('dashboard');
  } else {
  renderPage(backButtonEvent.state.typeofpage);
  }
});

document.body.addEventListener('click', function(ev){
  ev.preventDefault(); //stops the link from executing
  if (ev.target.nodeName == 'A'){
    if(ev.target.getAttribute('href') != '#null') {
    var fakeURL = ev.target.getAttribute('href');
    var str = fakeURL.split('#');
    fakeURL = str[1];
    changePageTo(fakeURL);
  }
  }
});


