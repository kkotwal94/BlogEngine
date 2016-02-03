

var firebaseref = new Firebase("https://scorching-heat-6412.firebaseio.com/");
console.log("Im in db.js");
var regButton = document.getElementById("reg-btn");
var loginButton = document.getElementById("login-btn");
var logoutButton = document.getElementById("logout");
var generalNav = document.getElementById("loge");
var removedLoginNav = null;
var removedRegNav = null;
var addedLogoutNav = null;


var loginCallback = function(error, authData) {
        if (error) {
            var status = document.getElementById("status");
                status.innerHTML = ("Login Failed!: ", error);
        } else {
            var status = document.getElementById("status");
            status.innerHTML = ("Authenticated successfully with payload: ", authData);
            updatingNav();
            changePageTo("about");
           }
}

var signupLoginCallback = function(error, authData) {
        if (error) {
            	var status = document.getElementById("status");
                status.innerHTML = ("Error adding user to db:",error);
        } else {
            	var status = document.getElementById("status");
                status.innerHTML = ("Authenticated successfully with payload:", authData);
                addUserName(userData.uid);
                updatingNav();
                changePageTo("about");
        }
}

var logoutButton = function(){
        firebaseref.unauth();
        userData = null;
        var status = document.getElementById("status");
        status.innerHTML = ("Successfully logged out!");
        addedLogoutNav.parentNode.removeChild(addedLogoutNav);
        generalNav.insertBefore(removedRegNav, generalNav.children[generalNav.children.length - 1]);
        generalNav.insertBefore(removedLoginNav, generalNav.children[generalNav.children.length - 1]);
    };


var loginButton = function(){
        var email = document.getElementById('login-email').value;
        var password = document.getElementById('login-password').value;
        firebaseref.authWithPassword({
            email: email,
            password: password
        }, loginCallback);
};

var registerButton = function(){
    console.log("register button clicked");
	var email = document.getElementById('email').value;
	console.log(email);
	var password = document.getElementById('password').value;
	var name = document.getElementById('name').value;
	
	firebaseref.createUser({
	    name: name,
		email: email,
		password: password
	},function(error, userData) {
		if (error) {
			var status = document.getElementById("status");
                status.innerHTML = ("Error creating user:",error);
                
		} 
		else {
                firebaseref.authWithPassword({
                    email: email,
                    password: password,
                }, signupLoginCallback);
            //additionally, you can log the user in right after the signup is successful and add more data about the user like name etc.              
		}
	});
};

//Callback for Auth Changes
var authDataCallback = function(authData) {
    console.log(authData);
        //authData is the object sent by Firebase in the callback.
        if (authData) {
            console.log("User " + authData.uid + " is logged in");
            userData = authData;
        } 
        else {
            console.log("User is logged out");
            userData = null;
        }
};

//register a callback for the change in Authentication Status
firebaseref.onAuth(authDataCallback);

var addUserName = function(userid) {
        var name = document.getElementById('name').value;
        var userRef = new Firebase('https://scorching-heat-6412.firebaseio.com/users/' + userid);
        userRef.set({
            full_name: name
        },

        function(error) {
            if (error) {
                var status = document.getElementById("status");
                status.innerHTML = ("Error adding user data: ", error);
            } else {
                var status = document.getElementById("status");
                status.innerHTML = ("Successfully added user data for: ", userid);
            }
        });
    };

var updatingNav = function() {
    removedLoginNav = generalNav.children[generalNav.children.length - 2];
    removedLoginNav.parentNode.removeChild(removedLoginNav);
    removedRegNav = generalNav.children[generalNav.children.length - 2];
    removedRegNav.parentNode.removeChild(removedRegNav);
    var logoutNavLi = document.createElement("LI");                 // Create a <li> node                              // Append the text to <li>
    var logoutNavA = document.createElement("A");
    var logoutTextA = document.createTextNode("Logout");         // Create a text node
    logoutNavA.appendChild(logoutTextA);
    logoutNavA.setAttribute("id","logout");
    logoutNavA.setAttribute("href","#login");
    logoutNavA.setAttribute("onclick","return logoutButton();");
    logoutNavLi.appendChild(logoutNavA);
    console.log(logoutNavLi);
    addedLogoutNav = generalNav.children[generalNav.children.length - 1];
    addedLogoutNav.parentNode.insertBefore(logoutNavLi,addedLogoutNav);
    addedLogoutNav = generalNav.children[generalNav.children.length - 2];
}