!function(d,w){

  var debug = false

  /*
   * @desc Lose the URL bar for mobile version by sliding screen up.
   * @param {Number} The number of milliseconds to delay the slideUp (optional)
   * @return void	
   */
  function scrollUp(delay){
    // via @rem
  	/mobile/i.test(navigator.userAgent) && !location.hash && setTimeout(function ()
  	{
  		window.scrollTo(0, 1);
  	}, delay || 100);
  	
  }
   
  /*
   * @desc Fade the <body> by adding a class.
   * @return void	
   */ 
  function showBody(){
    d.body.className = 'slick'
  }
  
  function init(){}
  
  function loaded(){
    scrollUp()    
    showBody()
  }
  
  domReady(init);  
  w.onload = loaded
  
}(document,window)