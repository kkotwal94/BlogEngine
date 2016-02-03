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
        var editor = AlloyEditor.editable('editable');
        }
        
        
      };
      
      window.addEventListener("hashchange", handleHash);
      window.addEventListener("load", handleHash);
    