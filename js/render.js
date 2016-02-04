 var firstURL = window.location.pathname;
var pageNumberData = 0;
console.log(location.hash);
console.log(location.pathname);

var historyTracker  = [];
var renderPage = function(newURL){
  console.log(window.history);
  var dashboard = document.getElementById('dashboard');
  var pageToLoad = document.getElementById(newURL);
  console.log(pageToLoad);
  //we are setting the innerhtml here, we would want it to be things based on buttons we click or url we visit
  container.innerHTML = pageToLoad.innerHTML || dashboard.innerHTML;
	 /*var editor = new MediumEditor('.editable', {
    toolbar: {
       
        allowMultiParagraphSelection: true,
        buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
        diffLeft: 0,
        diffTop: -10,
        firstButtonClass: 'medium-editor-button-first',
        lastButtonClass: 'medium-editor-button-last',
        standardizeSelectionStart: false,
        static: false,
        relativeContainer: null,
        
        align: 'center',
        sticky: false,
        updateOnEmptySelection: false
    }
});
*/
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

var nav = document.getElementById('nav');
var tags = document.getElementById('taggers');

nav.addEventListener('click', function(ev){
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

tags.addEventListener('click', function(ev){
  ev.preventDefault(); //stops the link from executing
});