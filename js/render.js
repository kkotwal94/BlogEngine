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


var firebaseref = new Firebase("https://scorching-heat-6412.firebaseio.com/");

$("#login-btn").on('click', function() 
{
        var email = $("#login-email").val();
        var password = $("#login-password").val();
        firebaseref.authWithPassword({
            email: email,
            password: password
        }, 
        function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
            }
        });
});

$("#signup-btn").on('click', function() 
{
	var email = $("#email").val();
	var password = $("#password").val();
	firebaseref.createUser({
		email: email,
		password: password
	},function(error, userData) {
		if (error) {
			console.log("Error creating user:", error);
		} 
		else {
			console.log("Successfully created user account with uid:", userData.uid);
			//additionally, you can log the user in right after the signup is successful and add more data about the user like name etc.              
		}
	});
});

//Callback for Auth Changes
var authDataCallback = function(authData) 
{
        //authData is the object sent by Firebase in the callback.
        if (authData) {
            console.log("User " + authData.uid + " is logged in");
        } 
        else {
            console.log("User is logged out");
        }
}

//register a callback for the change in Authentication Status
firebaseref.onAuth(authDataCallback);

var setUpFirebaseEvents = function() 
{
    listRef = new Firebase('https://dazzling-fire-8954.firebaseio.com/lists/sharedlist/items');
    $("#sharedlist").html('');
    listRef.off('child_added', childAddedFunction)
    listRef.on("child_added", childAddedFunction);

    listRef.off('child_changed', childChangedFunction);
    listRef.on('child_changed', childChangedFunction);

    listRef.off('child_removed', childRemovedFunction);
    listRef.on('child_removed', childRemovedFunction);
}
var authDataCallback = function(authData) 
{
    console.log("authCallback Event is called from onAuth Event");
    if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        setUpFirebaseEvents();

    } 
    else 
    {
        console.log("User is logged out");
    }
}
var childAddedFunction = function(snapshot) {
    var key = snapshot.key(); //return the key for the item
    var listItem = snapshot.val(); //returns the value of the item as JSON
    console.log("Key - " + key + " has been added");
    buildNewListItem(listItem, key); //adds the new item to the list
    $("#lists .status").fadeIn(400).html('New item added!')
}
var childChangedFunction = function(snapshot) {
    var listItem = snapshot.val();
    var key = snapshot.key();
    console.log("Key - " + key + " has been changed");
    updateListItem(listItem, key); //updates the position of the item
}
var childRemovedFunction = function(snapshot) {
    var key = snapshot.key();
    removeListItem(key); //remove the list item
    console.log('Child Removed');
}
