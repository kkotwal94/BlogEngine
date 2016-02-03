     var handleHash = function(){
        var container = document.getElementById('container');
        var dashboard = document.getElementById('dashboard');
        var locPath = location.pathname.split('/');
        locPath = locPath[1];
        console.log(locPath);
        if(location.pathname == "/") {
            container.innerHTML = dashboard.innerHTML;
        } else {
             var container = document.getElementById('container');
             var fillingWithElement = document.getElementById(locPath);
            container.innerHTML = fillingWithElement.innerHTML;
           /*
            var editor = new MediumEditor('.editable', {
    toolbar: {
       
        allowMultiParagraphSelection: true,
        buttons: ['bold', 'italic', 'underline', 'anchor','h1', 'h2', 'h3', 'quote'],
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

        var editor = AlloyEditor.editable('editable', {
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

}
        
      };
      
      window.addEventListener("hashchange", handleHash);
      window.addEventListener("load", handleHash);
    