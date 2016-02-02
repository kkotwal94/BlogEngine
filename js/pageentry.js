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
        }
      };
      
      window.addEventListener("hashchange", handleHash);
      window.addEventListener("load", handleHash);
    