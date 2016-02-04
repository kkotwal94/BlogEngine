

var firebaseref = new Firebase("https://scorching-heat-6412.firebaseio.com/");
console.log("Im in db.js");
var logoutButton = document.getElementById("logout");
var generalNav = document.getElementById("loge");
var removedLoginNav = null;
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
                alert("hey");
        } else {
            	var status = document.getElementById("status");
                status.innerHTML = ("Authenticated successfully with payload:", authData);
                addUserName(userData.uid);
                updatingNav();
                alert("ran through updating nav");
                changePageTo("about");
        }
}

var logoutButton = function(){
        firebaseref.unauth();
        userData = null;
        var status = document.getElementById("status");
        status.innerHTML = ("Successfully logged out!");
        addedLogoutNav.parentNode.removeChild(addedLogoutNav);
        generalNav.insertBefore(removedLoginNav, generalNav.children[generalNav.children.length - 1]);
        changePageTo("about");
    };


var loginButton = function(){
        event.preventDefault();
        var email = document.getElementById('login-email').value;
        var password = document.getElementById('login-password').value;
        firebaseref.authWithPassword({
            email: email,
            password: password
        }, loginCallback);
};

var registerButton = function(){
    event.preventDefault();
    console.log("register button clicked");
    var status = document.getElementById("status");
	var email = document.getElementById('email').value;
	console.log(email);
	var password = document.getElementById('password').value;
	var repeatPassword = document.getElementById('repeat-password').value;
	var name = document.getElementById('name').value;
	firebaseref.createUser({
	    name: name,
		email: email,
		password: password
	},function(error, userData) {
		if (error) {
			status = document.getElementById("status");
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
            // setUpFirebaseEvents();
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
    
var addBlogPost = function(blogPost, userid, title) { //could either pass in a blog post or just grab it off screen
        var blogPost = document.getElementById('blog').value; //get where ever a submitted form / post is, maybe have a button that goes to a confirmation page before the post, if not sent back to editor, else post
        var blogRef = new Firebase('https://scorching-heat-6412.firebaseio.com/users/' + userid +'/blogs/');
        blogRef.set({
            blog_content: blog
        },

        function(error) {
            if (error) {
                var status = document.getElementById("status");
                status.innerHTML = ("Error adding blog post: ", error);
            } else {
                var status = document.getElementById("status");
                status.innerHTML = ("Successfully added blog post for: ", userid);
            }
        });
    };    

var updatingNav = function() {
    removedLoginNav = generalNav.children[generalNav.children.length - 2];
    removedLoginNav.parentNode.removeChild(removedLoginNav);
    var logoutNavLi = document.createElement("LI");                 // Create a <li> node                              // Append the text to <li>
    var logoutNavA = document.createElement("A");
    var logoutTextA = document.createTextNode("Logout");         // Create a text node
    logoutNavA.appendChild(logoutTextA);
    logoutNavA.setAttribute("id","logout");
    logoutNavA.setAttribute("href","#login");
    logoutNavA.setAttribute("onclick","return logoutButton();");
    logoutNavLi.appendChild(logoutNavA);
    addedLogoutNav = generalNav.children[generalNav.children.length - 1];
    console.log(addedLogoutNav);
    addedLogoutNav.parentNode.insertBefore(logoutNavLi,addedLogoutNav);
    addedLogoutNav = generalNav.children[generalNav.children.length - 2];
    console.log(addedLogoutNav);
}

//setting up firebase built in events
var setUpFirebaseEvents = function() 
{
    var blogRef = new Firebase('https://scorching-heat-6412.firebaseio.com/users/' + userid +'/blogs/');
    // $("#sharedlist").html(''); //he uses jquery to set a shared list to blank, we can set it to something else
    blogRef.off('child_added', childAddedFunction)
    blogRed.on("child_added", childAddedFunction);

    blogRef.off('child_changed', childChangedFunction);
    blogRef.on('child_changed', childChangedFunction);

    blogRef.off('child_removed', childRemovedFunction);
    blogRef.on('child_removed', childRemovedFunction);
}

var childAddedFunction = function(snapshot) {
    var key = snapshot.key(); //return the key for the item
    var blogItem = snapshot.val(); //returns the value of the item as JSON
    console.log("Key - " + key + " has been added");
    // buildNewBlogPost(blogItem, key); //adds the new blog to the list (need something like this)
    // $("#lists .status").fadeIn(400).html('New item added!')
}
var childChangedFunction = function(snapshot) {
    var blogItem = snapshot.val();
    var key = snapshot.key();
    console.log("Key - " + key + " has been changed");
    // updateBlogList(blogItem, key); //updates the position of the item (need something like this)
}
var childRemovedFunction = function(snapshot) {
    var key = snapshot.key();
    // removeBlogPost(key); //remove the list item (need something like this)
    console.log('Child Removed');
}

// functions for building blog posts

var buildNewBlogPost = function(blogItem, key) 
{
    var author = blogItem.author;
    var content = blogItem.content;
    var timestamp = blogItem.timestamp;
    var id = key;
    var css = blogItem.css;
    // var $newListItem = $("<li data-item-id='" + id + "'></li>").html("<p class='itemauthor'>Added By - " + author +
    // "<span class='removebtn'><i class='fa fa-remove'></i></span> " +
    // "<span class='time'> on " + timestamp + "</span></p><p class='itemtext'>" + content + "</p>");
    // $newListItem.prependTo($("#sharedlist"));
    // $newListItem.attr('style', css);
    // $("#sharedlist").prepend($newListItem);
    // bindEventsToItems($newListItem); // this function makes the item draggable and adds the remove button event. You can extend this function to create more functionality.
}

var updateBlogList = function(blogItem, key) {
    var author = blogItem.author;
    var content = blogItem.content;
    var timestamp = blogItem.timestamp;
    var id = key;
    var css = blogItem.css;
    // $("#lists [data-item-id='" + id + "']").attr('style', css);
}

var removeBlogPost = function(key) {
    // $("#lists [data-item-id='" + key + "']").remove();
}	

/////// imagine this is a handler for a post button

/*
$("#addItemToList").on('click', function() {
        var $content = $("#listitem");
        var content = $content.val();
        if (content === "") {
            $("#lists .status").html('Please enter the text for the new item!').fadeIn(400);
            return;
        }
        $("#listitem").val('');
        addListItem(content);
    });
    
var addListItem = function(content) {
        var postsRef = listRef;
        var x = Date();
        var random = randomIntFromInterval(1, 400);
        var randomColor = getRandomRolor();
        var topzindex = $("#sharedlist li").getMaxZ() + 1;
        $temp = $("<li></li>");
        $temp.css({
            'position': 'absolute',
            'top': random + 'px',
            'left': random / 2 + 'px',
            'background': randomColor,
            'z-index': topzindex
        });
        var css = $temp.attr('style');
        try {
            var newItemRef = postsRef.push({
                author: userData.fullname,
                content: content,
                timestamp: x,
                css: css
            });
        } catch (e) {
            $("#lists").find(".status").html(e);
        }
    }
    var removeItemFromFirebase = function(key) {
        var itemRef = new Firebase('https://dazzling-fire-8954.firebaseio.com/lists/sharedlist/items/' + key);
        itemRef.remove();
    }

    */