     var handleHash = function(){
        var container = document.getElementById('container');
        var dashboard = document.getElementById('dashboard');
        var innerPost = document.getElementById('innerPost');
        var profileView = document.getElementById('profileView');
        var locPaths = location.pathname.split('/');
        var size = locPaths.length;
        locPath = locPaths[1];
        console.log(locPath);
        //getInitialBlogData();
        
        if(location.pathname == "/") {
            container.innerHTML = dashboard.innerHTML;
            
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


 

if(userData != null) {
    var myName = document.getElementById("myName");
        var myPosts = document.getElementById("myPosts");
    console.log("In page entry we are still logged in");
    var creatingStory = document.getElementById("creatingStory");
userRef.on("value", function(snapshot) {
        userDatum = snapshot.val();
        //console.log(userDatum);
        //console.log(userData);
        console.log("getting user data");
        },
        function(errorObject) {
            console.log("Error here : " + errorObject.code);
    
});
     creatingStory.style.display="block";
     console.log(userData);
        console.log(userDatum);
            for(var key in userDatum) {
                if(key == userData.uid) {
                    myName.innerHTML = userDatum[key].full_name;
                    myPosts.innerHTML = userDatum[key].posts;
                }
            }
     updatingNav();
     

}

else {
    console.log("In page entry dashboard we are logged out");
     var creatingStory = document.getElementById("creatingStory");
     creatingStory.style.display="none";
}

        }
        
        
        
        
        if(locPath == "post") {
             getSinglePostData(locPaths[2]);
            container.innerHTML = innerPost.innerHTML;
        }
        
        
        else {
             var container = document.getElementById('container');
             var fillingWithElement = document.getElementById(locPath);
             if(fillingWithElement != null) {
            container.innerHTML = fillingWithElement.innerHTML;
             }
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

 var editor = AlloyEditor.editable('Body', {
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

if(userData != null) {
     var myName = document.getElementById("myName");
        var myPosts = document.getElementById("myPosts");
    console.log("In page entry we are still logged in");
    var creatingStory = document.getElementById("creatingStory");
     creatingStory.style.display="block";
        console.log(userData);
        console.log(userDatum);
            for(var key in userDatum) {
                if(key == userData.uid) {
                    myName.innerHTML = userDatum[key].full_name;
                    myPosts.innerHTML = userDatum[key].posts;
                }
            }
    updatingNav();
    
     
}

else {
    console.log("In page entry dashboard we are logged out");
     var creatingStory = document.getElementById("creatingStory");
     creatingStory.style.display="none";
}

}



if(size > 2) {
    if(locPath=="profile") {
        //getSingleProfileData(locPaths[2]);
        //create function to grab prof data
        console.log("im doing this gay shit");
        getSingleProfileData(locPaths[2], "mine");
        container.innerHTML = profileView.innerHTML;
    }
}
        
      };
      
      window.addEventListener("hashchange", handleHash);
      window.addEventListener("load", handleHash);
    