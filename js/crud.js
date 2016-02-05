var tags = [];

var filterTags = [];
/*
window.addEventListener('load',function(){
var toggle = document.getElementById('toggs');
    var close = document.getElementById('closer');
    var logincontainer = document.getElementById('logincontainer');
toggle.addEventListener('click', function(){
    console.log("Hit");
   logincontainer.classList.add('active'); 
    
});
close.addEventListener('click', function() {
    console.log("Hit");
    logincontainer.classList.remove('active'); 
});
});
*/

var showReg = function() {
    var toggle = document.getElementById('toggs');
    var close = document.getElementById('closer');
    var logincontainer = document.getElementById('logincontainer');
    document.getElementById("reg-status").innerHTML = ("");
    var nameField = document.getElementById("name");
    nameField.value = "";
    var emailField = document.getElementById("email")
    emailField.value = "";
    var passField = document.getElementById("password")
    passField.value = "";
    var comPassField = document.getElementById("repeat-password")
    comPassField.value = "";
    logincontainer.classList.add('active'); 
}

var showLogin = function() {
    var toggle = document.getElementById('toggs');
    var close = document.getElementById('closer');
    var logincontainer = document.getElementById('logincontainer');
    document.getElementById("login-status").innerHTML = ("");
    var emailField = document.getElementById("login-email");
    emailField.value = "";
    var passField = document.getElementById("login-password");
    passField.value = "";
    logincontainer.classList.remove('active');
}

var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("log");

var modalcontent = document.getElementById("modcontent");
var modbody = document.getElementById("modbody");
// Get the <span> element that closes the modal
//var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
/*
span.onclick = function() {
  modal.style.display = "none";
}
*/

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

modalcontent.onclick = function(event) {
    if(event.target == modbody) {
        modal.style.display = "none";
    }
}
var postContent = function() {

    var title = document.getElementById('Title');
    var body = document.getElementById('Body');
    
    var titleHTML = title.innerHTML;
    var bodyHTML = body.innerHTML;
    console.log("Title's innerHTML");
    console.log(titleHTML);
    
    console.log("Body's innerHTML");
    console.log(bodyHTML);
    
    console.log("Our tags");
    console.log(tags);
    console.log(userData);
    if(userData != null) {
        addBlogPost(bodyHTML, userData, titleHTML, tags);
        tags = [];
        var tagList = document.getElementById('taggers');
        tagList.innerHTML = "";
    } else {
        modal.style.display = "block";
    }
};

var getTags = function() {
    var inputTag = document.getElementById('taginput').value;
    console.log(inputTag);
    tags.push(inputTag);
    console.log(tags);
    taggers();
}

var taggers = function() {
    var tagList = document.getElementById('taggers');
    tagList.innerHTML = "";
    for(var i = 0; i < tags.length; i++){
        var tag = document.createElement('li');
        var textNode = document.createTextNode(tags[i]);
        tag.className="tag";
        tag.appendChild(textNode);
        tagList.appendChild(tag);
    }
    
}


var filtertaggers = function() {
    var tagList = document.getElementById('preferredtaggers');
    tagList.innerHTML = "";
    for(var i = 0; i < filterTags.length; i++){
        var tag = document.createElement('li');
        var textNode = document.createTextNode(filterTags[i]);
        tag.className="tag";
        tag.appendChild(textNode);
        tagList.appendChild(tag);
    }
    
}


var getfilterTaggers = function() {
    var inputTag = document.getElementById('filterInput').value;
    console.log(inputTag);
    filterTags.push(inputTag);
    console.log(filterTags);
    filtertaggers();
}