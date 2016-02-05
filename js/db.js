var count = 0;
var firebaseref = new Firebase("https://scorching-heat-6412.firebaseio.com/");
console.log("Im in db.js");
var logoutButton = document.getElementById("logout");
var generalNav = document.getElementById("loge");
var modal = document.getElementById('myModal');
var removedLoginNav = null;
var addedLogoutNav = null;
var blogdata;
var userDatum;
//var userData;

var blogref = new Firebase("https://scorching-heat-6412.firebaseio.com/blogs");
var userRef = new Firebase("https://scorching-heat-6412.firebaseio.com/users");


blogref.on("value", function(snapshot) {
  blogdata = snapshot.val();
  //console.log(blogdata);
  createDashboardFeed();
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


userRef.on("value", function(snapshot) {
    userDatum = snapshot.val();
    //console.log(userDatum);
    //console.log(userData);
    var myName = document.getElementById("myName");
    var myPosts = document.getElementById("myPosts");
    
    for(var key in userDatum) {
                if(key == userData.uid) {
                    myName.innerHTML = userDatum[key].full_name;
                    myPosts.innerHTML = userDatum[key].posts;
                }
            }
    console.log("getting user data");
    },
    function(errorObject) {
        console.log("Error here : " + errorObject.code);
    
});


/*var getInitialBlogData = function() {

    var blogref = new Firebase("https://scorching-heat-6412.firebaseio.com/blogs");


blogref.on("value", function(snapshot) {
  blogdata = snapshot.val();
  console.log(blogdata);
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

}*/


var getSingleProfileData = function(id, whoseProfile) {
    if(whoseProfile == "mine") {
        
        var myProfile = document.getElementById('profile');
    } else {
        var myProfile = document.getElementById('profileView');
    }
    userRef.orderByKey().equalTo(id).on("child_added", function(snapshot) {
       console.log(snapshot.val()); 
    });
    
}

var getSinglePostData = function(id) {
    //console.log(id);
    var innerPost = document.getElementById('container');
    blogref.orderByKey().equalTo(id).on("child_added", function(snapshot) {
       console.log(snapshot.val()); 
       
       var tags = snapshot.val().tags_included;
       
       innerPost.innerHTML = null;
       var outerDiv = document.createElement('DIV');
       outerDiv.className = "contentEditing";
       
       var title = document.createElement('DIV');
       title.innerHTML = snapshot.val().title_blog;
       title.id = "Title";
       
       var body = document.createElement('DIV');
       body.innerHTML = snapshot.val().blog_content;
       body.id = "Body";
       
       
       var taglist = document.createElement('UL');
       taglist.id = "taggers";
       taglist.className = "tags viewtag";
       
       for(var i = 0; i < tags.length; i++) {
           var li = document.createElement('LI');
           var textNode = document.createTextNode(tags[i]);
           li.appendChild(textNode);
           li.className = "tag";
           taglist.appendChild(li);
           
       }
       outerDiv.appendChild(title);
       outerDiv.appendChild(body);
       outerDiv.appendChild(taglist);
       
       innerPost.appendChild(outerDiv);
    });
}

function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

var createDashboardFeed = function() {
    var feedElement = document.getElementById("feed");
    feedElement.innerHTML = "";
    var data = blogdata;
    //console.log("In dashboard feed");
    //console.log(data);
    for(var key in data) {
        //console.log(key);
        //console.log(data[key]);
        var title =strip(data[key].title_blog);
        var author =data[key].user_id.password.email;
        var content =strip(data[key].blog_content);
        var like = data[key].like;

            var cardMedium = document.createElement('DIV');
            var titleElement = document.createElement('H2');
            var authorElement = document.createElement('SPAN')
            var cardElement = document.createElement('P');
            var actionBar = document.createElement('DIV');
            var shareButton = document.createElement('BUTTON');
            var saveButton = document.createElement('BUTTON');
            var viewButton = document.createElement('BUTTON');
            var viewLink = document.createElement('A');
            
            var titleText = document.createTextNode(title);
            var authorText = document.createTextNode(author);
            var cardText = document.createTextNode(content);
            var shareText = document.createTextNode("SHARE");
            var saveText = document.createTextNode("SAVE");
            var viewText = document.createTextNode("VIEW");
            
            var numberLikes = document.createElement("SPAN");
            var numberText = document.createTextNode(like);
            
            numberLikes.style.paddingLeft = "10px";
            numberLikes.appendChild(numberText);
            
            var likeIcon = document.createElement('I');
            likeIcon.className = "fa fa-heart";
            likeIcon.style.color="red";
            likeIcon.id = key;
           likeIcon.addEventListener('click', function(event) {
               var data2 = userDatum;
              var uid = userData.uid;
              var doesContain = false;
               if(userData!=null) {
                   
            //=====================================Check if we already upvoted
            if(data2[uid].postUpvoted == null ||data2[uid].postUpvoted == undefined ){
                    var whatIliked = [];
                } else {
                    
                    var whatIliked = data2[uid].postUpvoted;
                }
              
                for(var i = 0; i < whatIliked.length; i ++){
                    if(whatIliked[i]== this.id){
                        console.log("in here..");
                        doesContain = true;
                    }
                    
                }
                
            //========================================================
                   
            //======================If we never liked--------
                   if(doesContain == false) {
                   if( data[this.id].tags_included == null ||  data[this.id].tags_included == undefined) {
                      var tagsy = [];
                   } else { var tagsy = data[this.id].tags_included;}
                   
              this.classList.toggle('clicked'); 
              //console.log(this.id);
             
              blogref.child(this.id).set({title_blog: data[this.id].title_blog, user_id: data[this.id].user_id, tags_included: tagsy, blog_content: data[this.id].blog_content, date: data[this.id].date, timestamp: data[this.id].timestamp, like: data[this.id].like + 1});
              
              //for updating inner user/bloger schema
            for(var userkey in data2) {
                //console.log(userkey);
                for(var blogkey in data2[userkey]) {
                    if(blogkey == "blogs"){
                        //console.log(data2[userkey].blogs);
                    for(var actualblog in data2[userkey].blogs){
                       // console.log(actualblog);
                        //console.log(data2[userkey].blogs[actualblog]);
                        if(actualblog == this.id) {
                        //userRef.update({userkey: {blogkey :{"blogs":{ actualblog: {title_blog: data[this.id].title_blog, user_id: data[this.id].user_id, tags_included: tagsy, blog_content: data[this.id].blog_content, date: data[this.id].date, timestamp: data[this.id].timestamp, like: like+1}}}}});
                        userRef.child(userkey).child(blogkey).child(actualblog).set({title_blog: data[this.id].title_blog, user_id: data[this.id].user_id, tags_included: tagsy, blog_content: data[this.id].blog_content, date: data[this.id].date, timestamp: data[this.id].timestamp, like: like+1});
                        //console.log(userkey + ": " + blogkey + ": blogs " + ": " + actualblog );
                            
                        }
                    }
                    
                  }
                }
                
            }
             if(doesContain == false) {
                    whatIliked.push(this.id);
                    
                }
                    userRef.child(uid).set({full_name: data2[uid].full_name, blogs: data2[uid].blogs, posts: data2[uid].posts, postUpvoted: whatIliked});
                }
                
                //==================if we already liked
                
                if(doesContain == true){

                   if( data[this.id].tags_included == null ||  data[this.id].tags_included == undefined) {
                      var tagsy = [];
                   } else { var tagsy = data[this.id].tags_included;}
                   
              this.classList.toggle('clicked'); 
              //console.log(this.id);
             
              blogref.child(this.id).set({title_blog: data[this.id].title_blog, user_id: data[this.id].user_id, tags_included: tagsy, blog_content: data[this.id].blog_content, date: data[this.id].date, timestamp: data[this.id].timestamp, like: data[this.id].like - 1});
              
              //for updating inner user/bloger schema
            for(var userkey in data2) {
                //console.log(userkey);
                for(var blogkey in data2[userkey]) {
                    if(blogkey == "blogs"){
                        //console.log(data2[userkey].blogs);
                    for(var actualblog in data2[userkey].blogs){
                       // console.log(actualblog);
                        //console.log(data2[userkey].blogs[actualblog]);
                        if(actualblog == this.id) {
                        //userRef.update({userkey: {blogkey :{"blogs":{ actualblog: {title_blog: data[this.id].title_blog, user_id: data[this.id].user_id, tags_included: tagsy, blog_content: data[this.id].blog_content, date: data[this.id].date, timestamp: data[this.id].timestamp, like: like+1}}}}});
                        userRef.child(userkey).child(blogkey).child(actualblog).set({title_blog: data[this.id].title_blog, user_id: data[this.id].user_id, tags_included: tagsy, blog_content: data[this.id].blog_content, date: data[this.id].date, timestamp: data[this.id].timestamp, like: like-1});
                        //console.log(userkey + ": " + blogkey + ": blogs " + ": " + actualblog );
                            
                        }
                    }
                    
                  }
                }
                
            }
            /*
             if(doesContain == false) {
                    whatIliked.push(this.id);
                    
                }*/
                
                for(var x = 0; x < whatIliked.length; x++) {
                    if(whatIliked[x] == this.id) {
                        whatIliked.splice(x, 1);
                    }
                }
                    userRef.child(uid).set({full_name: data2[uid].full_name, blogs: data2[uid].blogs, posts: data2[uid].posts, postUpvoted: whatIliked});
                }
               
                    
                
               }
                        
           
               
               else {
                   alert("log in please");
               }
           
               
               
                   
               });
            
            cardMedium.className = "card card--medium";
            
            titleElement.className = "card__title";
            titleElement.appendChild(titleText);
            
            authorElement.className = "card__subtitle";
            authorElement.appendChild(authorText);
            
            cardElement.className="card__text";
            cardElement.appendChild(cardText);
            
            actionBar.className = "card__action-bar";
            
            shareButton.className = "card__button";
            shareButton.appendChild(shareText);
            
            saveButton.className = "card__button";
            saveButton.appendChild(saveText);
            
            viewButton.className = "card__button";
            viewLink.id="nestedRoute";
            viewLink.href="/post/" + key;
            //viewButton.onclick=function() {return nestedonClick();};
            viewLink.appendChild(viewText);
            viewButton.appendChild(viewLink);
            
            viewButton.addEventListener('click', function(ev) {
               ev.preventDefault();
               console.log("Navigating to nested route");
               
               var fakeURL = ev.target.getAttribute('href');
               console.log("Fake URL: " + fakeURL);
               changePagesTo(fakeURL);
            });

            actionBar.appendChild(shareButton);
            actionBar.appendChild(saveButton);
            actionBar.appendChild(viewButton);
            actionBar.appendChild(likeIcon);
            actionBar.appendChild(numberLikes);
            
            
            cardMedium.appendChild(titleElement);
            cardMedium.appendChild(authorElement);
            cardMedium.appendChild(cardElement);
            cardMedium.appendChild(actionBar);
            feedElement.appendChild(cardMedium);
    }

}






var getHTTP = function(theUrl){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
         xmlHttp.send( null );
        return xmlHttp.responseText;
        }

var loginCallback = function(error, authData) {
        var loginStatus = document.getElementById("login-status");
        var creatingStory = document.getElementById("creatingStory");
        var myName = document.getElementById("myName");
        var myPosts = document.getElementById("myPosts");
        if (error) {
                loginStatus.innerHTML = ("Login Failed!: ", error);
                console.log(authData);
        } else {
            loginStatus.innerHTML = ("Authenticated successfully with payload: ", authData);
            
            updatingNav();
            modal.style.display = "none";
            creatingStory.style.display="block";
            
            //console.log(userData);
            //console.log(userDatum);
            
            for(var key in userDatum) {
                if(key == userData.uid) {
                    myName.innerHTML = userDatum[key].full_name;
                    myPosts.innerHTML = userDatum[key].posts;
                }
            }
            
            
            //changePageTo("about");
           }
}

var signupLoginCallback = function(error, authData) {
    var regStatus = document.getElementById("reg-status");
    var creatingStory = document.getElementById("creatingStory");
    var myName = document.getElementById("myName");
        var myPosts = document.getElementById("myPosts");
        if (error) {
            	regStatus.innerHTML = ("Error adding user to db:",error);
        } else {
                regStatus.innerHTML = ("Authenticated successfully with payload:", authData);
                addUserName(userData.uid);
                updatingNav();
                modal.style.display = "none";
                creatingStory.style.display="block";
                //changePageTo("about");
                for(var key in userDatum) {
                if(key == userData.uid) {
                    myName.innerHTML = userDatum[key].full_name;
                    myPosts.innerHTML = userDatum[key].posts;
                }
            }
        }
}

var logoutButton = function(){
    var creatingStory = document.getElementById("creatingStory");
        firebaseref.unauth();
        userData = null;
        var regStatus = document.getElementById("reg-status");
        regStatus.innerHTML = ("Successfully logged out!");
        addedLogoutNav.parentNode.removeChild(addedLogoutNav);
        generalNav.insertBefore(removedLoginNav, generalNav.children[generalNav.children.length - 1]);
        creatingStory.style.display = "none";
        
       
        showReg();
         showLogin();
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
    var status = document.getElementById("reg-status");
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	var repeatPassword = document.getElementById('repeat-password').value;
	var name = document.getElementById('name').value;
	if(password === repeatPassword){
	firebaseref.createUser({
	    name: name,
		email: email,
		password: password
	},function(error, userData) {
		if (error) {
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
	}
	else
	        status.innerHTML = ("Please check your password again");
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
        var regStatus = document.getElementById("reg-status");
        var name = document.getElementById('name').value;
        userRef = new Firebase('https://scorching-heat-6412.firebaseio.com/users/' + userid);
        userRef.set({
            full_name: name,
            posts: 0,
	        comments: [],
	         upvoted: [], //things we liked
	        saved: [],
        },

        function(error) {
            if (error) {
                regStatus.innerHTML = ("Error adding user data: ", error);
            } else {
                regStatus.innerHTML = ("Successfully added user data for: ", userid);
            }
        });
    };
    
var addBlogPost = function(blogPost, userid, title, tags) { //could either pass in a blog post or just grab it off screen
    
        console.log(userid);
        var id = getHTTP('http://guid.setgetgo.com/get.php');
        id = id.slice(1,-1);
        var date = new Date();
        var dateString = ((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
        var dateTime = (new Date().toTimeString().split(" ")[0]);
        //var blogPost = document.getElementById('blog').value; //get where ever a submitted form / post is, maybe have a button that goes to a confirmation page before the post, if not sent back to editor, else post
        var blogRef = new Firebase('https://scorching-heat-6412.firebaseio.com/users/' + userid.uid +'/blogs/' + id);
        var blogScheme = new Firebase('https://scorching-heat-6412.firebaseio.com/blogs/' + id);
        var key = blogRef.key();
        //key = key.slice(1, -1);
        console.log(key);
        blogRef.set({
            user_id: userid,
            title_blog: title,
            blog_content: blogPost,
            tags_included: tags,
            likes: 0,
            date: dateString,
            timestamp: dateTime
            
            
        },
        
    

        function(error) {
            if (error) {
                var status = document.getElementById("successPost");
                status.innerHTML ="";
                var statusText = document.createElement("H1");
                var textNode = document.createTextNode("Failed to create blog for: " + userid.password.email);
                statusText.appendChild(textNode);
                status.appendChild(statusText);
                console.log("failed poopoo");
            } else {
                 var status = document.getElementById("successPost");
                status.innerHTML ="";
                var statusText = document.createElement("H1");
                var textNode = document.createTextNode("Successfully added blog post for: " + userid.password.email);
                statusText.appendChild(textNode);
               
                var linkText = document.createElement("H1");
                var textNode = document.createTextNode("View the post here");
                var ref = document.createElement("A");
                ref.href="/post/" + key;
                ref.appendChild(textNode)
                
                ref.addEventListener('click', function(ev) {
               ev.preventDefault();
               console.log("Navigating to nested route");
               
               var fakeURL = ev.target.getAttribute('href');
               console.log("Fake URL: " + fakeURL);
               changePagesTo(fakeURL);
            });
                linkText.appendChild(ref);
                
                status.appendChild(statusText);
                status.appendChild(linkText);
            }
        });
        
        
         blogScheme.set({
            user_id: userid,
            title_blog: title,
            blog_content: blogPost,
            tags_included: tags,
            like: 0,
            date: dateString,
            timestamp: dateTime
            
        }, 
        
       function(error) {
            if (error) {
                 var status = document.getElementById("successPost");
                status.innerHTML ="";
                var statusText = document.createElement("H1");
                var textNode = document.createTextNode("Failed to create blog for: " + userid.password.email);
                statusText.appendChild(textNode);
                status.appendChild(statusText);
                console.log("failed poopoo");
            } else {
                var status = document.getElementById("successPost");
                status.innerHTML ="";
                var statusText = document.createElement("H1");
                var textNode = document.createTextNode("Successfully created blog post for: " + userid.password.email);
                statusText.appendChild(textNode);
                
               
                var linkText = document.createElement("H1");
                var textNode = document.createTextNode("View the post here");
                var ref = document.createElement("A");
                ref.href="/post/" + key;
                ref.appendChild(textNode);
                ref.addEventListener('click', function(ev) {
               ev.preventDefault();
               console.log("Navigating to nested route");
               
               var fakeURL = ev.target.getAttribute('href');
               console.log("Fake URL: " + fakeURL);
               changePagesTo(fakeURL);
            });
                linkText.appendChild(ref);
                
                status.appendChild(statusText);
                status.appendChild(linkText);
                console.log("success poopoo");
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
    //logoutNavA.setAttribute("href","#about");
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
    blogRef.on("child_added", childAddedFunction);

    blogRef.off('child_changed', childChangedFunction);
    blogRef.on('child_changed', childChangedFunction);

    blogRef.off('child_removed', childRemovedFunction);
    blogRef.on('child_removed', childRemovedFunction);
}

var childAddedFunction = function(snapshot) {
    var key = snapshot.key(); //return the key for the item
    var blogItem = snapshot.val(); //returns the value of the item as JSON
    console.log("Key - " + key + " has been added");
    addBlogPost(blogItem, key); //adds the new blog to the list (need something like this)
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
    
    //console.log(userData);