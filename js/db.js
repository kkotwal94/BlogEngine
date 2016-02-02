
var firebaseref = new Firebase("https://scorching-heat-6412.firebaseio.com/");
console.log("Im in db.js");
var regButton = document.getElementById("regbtn");


var loginButton = function(){
        var email = document.getElementById('login-email').value;
        var password = document.getElementById('login-password').value;
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
};

var registerButton = function(){
    console.log("register button clicked");
	var email = document.getElementById('email').value;
	console.log(email);
	var password = document.getElementById('password').value;
	
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
};

//Callback for Auth Changes
var authDataCallback = function(authData) {
        //authData is the object sent by Firebase in the callback.
        if (authData) {
            console.log("User " + authData.uid + " is logged in");
        } 
        else {
            console.log("User is logged out");
        }
};

//register a callback for the change in Authentication Status
firebaseref.onAuth(authDataCallback);

var div = document.getElementById('login-btn').addEventListener("click",loginButton);

console.log(regButton);
console.log(document.getElementById('pp'));
regButton.onclick = function() {
    console.log("yo?");
registerButton();
    
};

