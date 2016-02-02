console.log(location.pathname);

      var handleHash = function(){
        var container = document.getElementById('container');
        var locPath = location.pathname.split('/');
        locPath = locPath[1];
        console.log(locPath);
        if(location.pathname == "/") {
            container.innerHTML = '<object type="text/html" data="html/dashboard.html" ></object>';
        } else {
             var container = document.getElementById('container');
            container.innerHTML = '<object type="text/html" data="html/' + locPath+ '.html" ></object>';
        }
      };
      
      window.addEventListener("hashchange", handleHash);
      window.addEventListener("load", handleHash);
    