

var firebaseref = new Firebase("https://scorching-heat-6412.firebaseio.com/");
console.log("Im in db.js");
var regButton = document.getElementById("reg-btn");
var loginButton = document.getElementById("login-btn");


var loginCallback = function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
            loginButton.parentElement.getElementsByClassName('status')[0].innerHTML = ("Login Failed!:" + error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
            loginButton.parentElement.getElementsByClassName('status')[0].innerHTML = ("You are logged in as:" + authData.uid);
        }
}

var signupLoginCallback = function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
            addUserName(userData.uid);
        }
}

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
			console.log("Error creating user:", error);
		} 
		else {
			console.log("Successfully created user account with uid:", userData.uid);
			console.log(regButton.parentElement.getElementsByClassName('status')[0]);
			regButton.parentElement.getElementsByClassName('status')[0].innerHTML = ("Successfully created user account with uid:" + userData.uid);
			console.log(regButton.parentElement.getElementsByClassName('status')[0]);    
                firebaseref.authWithPassword({
                    email: email,
                    password: password,
                }, signupLoginCallback);
            //additionally, you can log the user in right after the signup is successful and add more data about the user like name etc.              
		}
	});

    
			console.log(regButton.parentElement.getElementsByClassName('status')[0]);
};

//Callback for Auth Changes
var authDataCallback = function(authData) {
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
        var userRef = new Firebase('https://scorching-heat-6412.firebaseio.com/' + userid);
        userRef.set({
            full_name: name
        },

        function(error) {
            if (error) {
                console.log("Error adding user data:", error);
                regButton.parentElement.getElementsByClassName('status')[0].innerHTML = ("Error adding user data:" + error);
            } else {
                console.log("Successfully added user data for");
                var successLogin = document.querySelector(".cd-main-nav > li > a[data-target= '#login']").click();
            }
        });
    };