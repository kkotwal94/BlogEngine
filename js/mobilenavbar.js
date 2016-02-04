document.addEventListener('DOMContentLoaded', function(){ 
    // your code goes here


	//move nav element position according to window width
	moveNavigation();
	
	
/*	$(window).on('resize', function(){
		(!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
	});
  */  
	//mobile version - open/close navigation
	
	var cdNavTrigger = document.getElementsByClassName('cd-nav-trigger');
	var header = document.getElementsByClassName('header');
	var cdMainNav = document.getElementsByClassName('cd-main-nav');
	var cdMainContent = document.getElementsByClassName('main-container');
	var mainContent = document.getElementsByClassName('main')
	var pp = document.getElementById('pp');
	var srh = document.getElementById('srh');
	var cp = document.getElementById('cp');
	var log = document.getElementById('log');
	var ab = document.getElementById('ab');
	var com = document.getElementById('com');
	var edu = document.getElementById('edu');
	var pol = document.getElementById('pol');
	var art = document.getElementById('art');
	var vg = document.getElementById('vg');

	
	pp.addEventListener('click', function(event) {
		var screenSize = checkWindowWidth();
		if(screenSize == false) {
    	if(header[0].classList.contains('nav-is-visible')) { 	
        	var movesOut = document.getElementsByClassName('moves-out');   
    	    //console.log(movesOut[0]); movesOut[0].classList.remove('moves-out');  	
    	    header[0].classList.toggle('nav-is-visible');
    		cdMainNav[0].classList.toggle('nav-is-visible');
    		cdMainContent[0].classList.toggle('nav-is-visible');
		    
		}
		else {
		header[0].classList.toggle('nav-is-visible');
		cdMainNav[0].classList.toggle('nav-is-visible');
		cdMainContent[0].classList.toggle('nav-is-visible');
		}
		}
    });
    

    srh.addEventListener('click', function(event) {
    	var screenSize = checkWindowWidth();
    		if(screenSize == false) {
    	if(header[0].classList.contains('nav-is-visible')) { 	
        	var movesOut = document.getElementsByClassName('moves-out');   
    	    //console.log(movesOut[0]); movesOut[0].classList.remove('moves-out');  	
    	    header[0].classList.toggle('nav-is-visible');
    		cdMainNav[0].classList.toggle('nav-is-visible');
    		cdMainContent[0].classList.toggle('nav-is-visible');
		    
		}
		else {
		header[0].classList.toggle('nav-is-visible');
		cdMainNav[0].classList.toggle('nav-is-visible');
		cdMainContent[0].classList.toggle('nav-is-visible');
		}
		}
    });
    
    cp.addEventListener('click', function(event) {
    	var screenSize = checkWindowWidth();
    	if(screenSize == false) {
    	if(header[0].classList.contains('nav-is-visible')) { 	
        	var movesOut = document.getElementsByClassName('moves-out');   
    	    //console.log(movesOut[0]); movesOut[0].classList.remove('moves-out');  	
    	    header[0].classList.toggle('nav-is-visible');
    		cdMainNav[0].classList.toggle('nav-is-visible');
    		cdMainContent[0].classList.toggle('nav-is-visible');
		    
		}
		else {
		header[0].classList.toggle('nav-is-visible');
		cdMainNav[0].classList.toggle('nav-is-visible');
		cdMainContent[0].classList.toggle('nav-is-visible');
		}
		}
    });
	
	
	log.addEventListener('click', function(event) {
		var screenSize = checkWindowWidth();
    		if(screenSize == false) {
    	if(header[0].classList.contains('nav-is-visible')) { 	
        	var movesOut = document.getElementsByClassName('moves-out');   
    	    //console.log(movesOut[0]); movesOut[0].classList.remove('moves-out');  	
    	    header[0].classList.toggle('nav-is-visible');
    		cdMainNav[0].classList.toggle('nav-is-visible');
    		cdMainContent[0].classList.toggle('nav-is-visible');
		    
		}
		else {
		header[0].classList.toggle('nav-is-visible');
		cdMainNav[0].classList.toggle('nav-is-visible');
		cdMainContent[0].classList.toggle('nav-is-visible');
		}
		}
    });
	
	
	ab.addEventListener('click', function(event) {
		var screenSize = checkWindowWidth();
    		if(screenSize == false) {
    	if(header[0].classList.contains('nav-is-visible')) { 	
        	var movesOut = document.getElementsByClassName('moves-out');   
    	    //console.log(movesOut[0]); movesOut[0].classList.remove('moves-out');  	
    	    header[0].classList.toggle('nav-is-visible');
    		cdMainNav[0].classList.toggle('nav-is-visible');
    		cdMainContent[0].classList.toggle('nav-is-visible');
		    
		}
		else {
		header[0].classList.toggle('nav-is-visible');
		cdMainNav[0].classList.toggle('nav-is-visible');
		cdMainContent[0].classList.toggle('nav-is-visible');
		}
		}
    });
    
    com.addEventListener('click', function(event) {
    	var screenSize = checkWindowWidth();
    		if(screenSize == false) {
    	if(header[0].classList.contains('nav-is-visible')) { 	
        	var movesOut = document.getElementsByClassName('moves-out');   
    	    //console.log(movesOut[0]); movesOut[0].classList.remove('moves-out');  	
    	    header[0].classList.toggle('nav-is-visible');
    		cdMainNav[0].classList.toggle('nav-is-visible');
    		cdMainContent[0].classList.toggle('nav-is-visible');
		    
		}
		else {
		header[0].classList.toggle('nav-is-visible');
		cdMainNav[0].classList.toggle('nav-is-visible');
		cdMainContent[0].classList.toggle('nav-is-visible');
		}
		}
    });
    
    edu.addEventListener('click', function(event) {
    	var screenSize = checkWindowWidth();
    	if(screenSize == false) {
    	if(header[0].classList.contains('nav-is-visible')) { 	
        	var movesOut = document.getElementsByClassName('moves-out');   
    	    //console.log(movesOut[0]); movesOut[0].classList.remove('moves-out');  	
    	    header[0].classList.toggle('nav-is-visible');
    		cdMainNav[0].classList.toggle('nav-is-visible');
    		cdMainContent[0].classList.toggle('nav-is-visible');
		    
		}
		else {
		header[0].classList.toggle('nav-is-visible');
		cdMainNav[0].classList.toggle('nav-is-visible');
		cdMainContent[0].classList.toggle('nav-is-visible');
		}
		}
    });
	
	
	pol.addEventListener('click', function(event) {
		var screenSize = checkWindowWidth();
    		if(screenSize == false) {
    	if(header[0].classList.contains('nav-is-visible')) { 	
        	var movesOut = document.getElementsByClassName('moves-out');   
    	    //console.log(movesOut[0]); movesOut[0].classList.remove('moves-out');  	
    	    header[0].classList.toggle('nav-is-visible');
    		cdMainNav[0].classList.toggle('nav-is-visible');
    		cdMainContent[0].classList.toggle('nav-is-visible');
		    
		}
		else {
		header[0].classList.toggle('nav-is-visible');
		cdMainNav[0].classList.toggle('nav-is-visible');
		cdMainContent[0].classList.toggle('nav-is-visible');
		}
		}
    });
    
    
    art.addEventListener('click', function(event) {
    	var screenSize = checkWindowWidth();
    	if(screenSize == false) {
    	if(header[0].classList.contains('nav-is-visible')) { 	
        	var movesOut = document.getElementsByClassName('moves-out');   
    	    //console.log(movesOut[0]); movesOut[0].classList.remove('moves-out');  	
    	    header[0].classList.toggle('nav-is-visible');
    		cdMainNav[0].classList.toggle('nav-is-visible');
    		cdMainContent[0].classList.toggle('nav-is-visible');
		    
		}
		else {
		header[0].classList.toggle('nav-is-visible');
		cdMainNav[0].classList.toggle('nav-is-visible');
		cdMainContent[0].classList.toggle('nav-is-visible');
		}
		}
    });
    
    vg.addEventListener('click', function(event) {
    	var screenSize = checkWindowWidth();
    		if(screenSize == false) {
    	if(header[0].classList.contains('nav-is-visible')) { 	
        	var movesOut = document.getElementsByClassName('moves-out');   
    	    //console.log(movesOut[0]); movesOut[0].classList.remove('moves-out');  	
    	    header[0].classList.toggle('nav-is-visible');
    		cdMainNav[0].classList.toggle('nav-is-visible');
    		cdMainContent[0].classList.toggle('nav-is-visible');
		    
		}
		else {
		header[0].classList.toggle('nav-is-visible');
		cdMainNav[0].classList.toggle('nav-is-visible');
		cdMainContent[0].classList.toggle('nav-is-visible');
		}
		}
    });
	var subNavTrigger = document.getElementsByClassName('cd-subnav-trigger');
    
    
    
	 cdNavTrigger[0].addEventListener('click', function(event){
		event.preventDefault();
		//console.log("hit trigger");
		
		if(header[0].classList.contains('nav-is-visible')) { 	
        	var movesOut = document.getElementsByClassName('moves-out');   
    	    //console.log(movesOut[0]); movesOut[0].classList.remove('moves-out');  	
    	    header[0].classList.toggle('nav-is-visible');
    		cdMainNav[0].classList.toggle('nav-is-visible');
    		cdMainContent[0].classList.toggle('nav-is-visible');
		    
		}
		else {
		header[0].classList.toggle('nav-is-visible');
		cdMainNav[0].classList.toggle('nav-is-visible');
		cdMainContent[0].classList.toggle('nav-is-visible');
		}
		    
		});

    var goBack = document.getElementsByClassName('go-back');
	//mobile version - go back to main navigation
    goBack[0].addEventListener('click', function(event){
		event.preventDefault();
		cdMainNav[0].classList.remove('moves-out');
	});

	//open sub-navigation
	subNavTrigger[0].addEventListener('click', function(event){
		event.preventDefault();
		//console.log("hit");
	    cdMainNav[0].classList.toggle('moves-out');
	});

	function moveNavigation(){
	    var navigation = document.getElementsByClassName('cd-main-nav-wrapper');
  		var screenSize = checkWindowWidth();
  		//console.log(screenSize);
        if ( screenSize ) {
        	//desktop screen - insert navigation inside header element
			//navigation.remove();
			//console.log(navigation[0]);
			//navigation[0].parentNode.removeChild(navigation[0]);
			//console.log(navigation[0]);
		   	navigation[0].classList.toggle('.cd-nav-trigger');
		} else {
			//mobile screen - insert navigation after .cd-main-content element
			//navigation[0].parentNode.removeChild(navigation);
			navigation[0].classList.toggle('.cd-main-content');
		}
	}

	
    
	function checkWindowWidth() {
		var mq = window.getComputedStyle(document.querySelector('header'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, "");
		return ( mq == 'mobile' ) ? false : true;
	}
}, false);