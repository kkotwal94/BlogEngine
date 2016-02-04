var tags = [];

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