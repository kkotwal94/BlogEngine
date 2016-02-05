 var firstURL = window.location.pathname;
var pageNumberData = 0;
console.log(location.hash);
console.log(location.pathname);

var historyTracker  = [];
var renderPage = function(newURL){
  console.log(window.history);
  var dashboard = document.getElementById('dashboard');
  var innerPage = document.getElementById('innerPost');
  var pageToLoad = document.getElementById(newURL);
  var nestedURL = [];
 
  //console.log(pageToLoad);
  if(newURL != null) {
      
   nestedURL = newURL.split('/');
  }
  /*
  if(newURL == null) {
      createDashboardFeed();
      container.innerHTML == dashboard.innerHTML;
  }
*/  
    console.log(newURL);
    console.log(nestedURL);
  if(nestedURL.length > 2) {
      //grab post data here fam
      console.log(nestedURL);
      
      if(nestedURL[1] == "post") {
          console.log("In post");
          
        getSinglePostData(nestedURL[2], "mine");
        
        console.log(window.location.pathname);
      }
      
      
      if(nestedURL[1] == "profile") {
          console.log("In profile");
        //getSingleProfileData(nestedURL[2]);
        createProfileView();
        container.innerHTML = document.getElementById('profileView').innerHTML;
        console.log(window.location.pathname);
      }
      
      
      //container.innerHTML = innerPage.innerHTML || dashboard.innerHTML;
  }
  
  
  else {
      
if(newURL == '/') {
    console.log("in this else if");
    var myName = document.getElementById("myName");
        var myPosts = document.getElementById("myPosts");
        
       for(var key in userDatum) {
           if(userData!=null){
                if(key == userData.uid) {
                    myName.innerHTML = userDatum[key].full_name;
                    myPosts.innerHTML = userDatum[key].posts;
                }
                }
            }
            
     createDashboardFeed();
      container.innerHTML =  dashboard.innerHTML;
  } else {
       
       
  //we are setting the innerhtml here, we would want it to be things based on buttons we click or url we visit
  if(pageToLoad == null) {
      var load = dashboard.innerHTML;
  } else {
      var load = pageToLoad.innerHTML;
  }
  
  var myName = document.getElementById("myName");
        var myPosts = document.getElementById("myPosts");
        
       for(var key in userDatum) {
           if(userData!=null){
                if(key == userData.uid) {
                    myName.innerHTML = userDatum[key].full_name;
                    myPosts.innerHTML = userDatum[key].posts;
                }
            }
       }
            createDashboardFeed();
            
  container.innerHTML = load;
	 
 var Selections = [{
        name: 'link',
        buttons: ['linkEdit'],
        test: AlloyEditor.SelectionTest.link
    }, {
        name: 'image',
        buttons: ['imageLeft', 'imageRight'],
        test: AlloyEditor.SelectionTest.image
    }, {
        name: 'text',
        buttons: [{
                        name: 'styles',
                        cfg: {
                            styles: [
                                {
                                    name: 'Head 1',
                                    style: { element: 'h1' }
                                },
                                {
                                    name: 'Head 2',
                                    style: { element: 'h2' }
                                },
                                {
                                    name: 'Code',
                                    style: { element: 'code' }
                                },
                                
                            ]
                        }
                    }, 'bold', 'italic', 'underline','quote', 'strike', 'link', 'ul', 'ol', 'twitter', 'subscript', 'superscript'],
        test: AlloyEditor.SelectionTest.text
    }, {
        name: 'table',
        buttons: ['tableRow', 'tableColumn', 'tableCell', 'tableRemove'],
        getArrowBoxClasses: AlloyEditor.SelectionGetArrowBoxClasses.table,
        setPosition: AlloyEditor.SelectionSetPosition.table,
        test: AlloyEditor.SelectionTest.table
}];

       var editor = AlloyEditor.editable('Title', {
    toolbars: {
       add: {
        buttons: ['image', 'camera', 'hline', 'table'],
        tabIndex: 2
    },
        styles: {
            selections: Selections
        }
    }
});

 var editor1 = AlloyEditor.editable('Body', {
    toolbars: {
       add: {
        buttons: ['image', 'camera', 'hline', 'table'],
        tabIndex: 2
    },
        styles: {
            selections: Selections
        }
    }
});
}
}



  //we are changing the links href to decide where we go!
  //nextPage.setAttribute("href", "page"+n);
};

var changePageTo = function(newURL){
  history.pushState({typeofpage: newURL}, "Page Title", "/" + newURL);
  //URL only changes in normal sites not codepen...
  renderPage(newURL);
};

var changePagesTo = function(newURL){
  history.pushState({typeofpage: newURL}, "Page Title", newURL);
  //URL only changes in normal sites not codepen...
  renderPage(newURL);
};

var changePageToMyProfile = function(newURL){
  history.pushState({typeofpage: newURL}, "Page Title", newURL+ '/' + userData.uid);
  //URL only changes in normal sites not codepen...
  renderPage(newURL + '/' + userData.uid);
};

var changePageToHome = function() {
     history.pushState({typeofpage: '/'}, "Page Title", '/');
     
     renderPage('/');
};


window.addEventListener('popstate', function(backButtonEvent){
  pageNumberData -= 1;
  //console.log(backButtonEvent.state);
  if(backButtonEvent.state == null) {
    renderPage('dashboard');
  } else {
  renderPage(backButtonEvent.state.typeofpage);
  }
});

var nav = document.getElementById('nav');
var tags = document.getElementById('taggers');



nav.addEventListener('click', function(ev){
  ev.preventDefault(); //stops the link from executing
  
  if (ev.target.nodeName == 'A'){
    if(ev.target.getAttribute('href') != '#null') {
    var fakeURL = ev.target.getAttribute('href');
    console.log(fakeURL);
    var str = fakeURL.split('#');
    fakeURL = str[1];
    changePageTo(fakeURL);
  }
  }
});


/*
document.addEventListener('DOMContentLoaded', function() {
var nestedRoute = document.getElementById('nestedRoute');

console.log(nestedRoute);

nestedRoute.addEventListener('click', function(ev) {
   ev.preventDefault();
   console.log("Navigating to nested route");
   
   var fakeURL = ev.target.getAttribute('href');
   console.log("Fake URL: " + fakeURL);
   changePageTo(fakeURL);
});
});

*/
/*var nestedonClick = function() {
    event.preventDefault();
    
    var fakeURL = event.target.getAttribute('href');
   console.log("Fake URL: " + fakeURL);
   changePageTo(fakeURL);
};*/


