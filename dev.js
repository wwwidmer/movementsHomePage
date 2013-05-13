/*

Development js file for new home page set to launch Mid-May 2013.
Features a redesigned menu featuring new content with less room on the front page given to the Blog.
The new menu cycles through a set of Page Objects that are populated using Expression Engine tags.
They cycle every five seconds or when a user clicks on their respective button.
The most recent blog posts are right below the menu along with a short About Us.
- ww 5/6/2013
*/

// Define three globals, timerQueue is a queue for regulating the menu's cycle. Headline is the set of all used Page objects. Interval is a timer which calls a function to cycle through pages every five seconds.
var headline = new Array();
var timerQueue = [];

var interval = window.setInterval(function(){
var q = timerQueue.shift();
change(q);
timerQueue.push(q);},5000);

// When a user clicks on a page there needs to be a reset so they have a chance to read what they selected.
function resetErval(){
  window.clearInterval(interval);
  interval = window.setInterval(function(){
  var q = timerQueue.shift();
  change(q);
  timerQueue.push(q);},5000);
}

// Defines Page objects and is called during an ee entries tag.
function populateHeadline(w,x,y,z){
        timerQueue.push(headline.length);
        addButton(headline.length);
        page ={
      "name": w, // new property for this object
	    "desc": x,
 	    "img": y,
 	    "url": z,
	     }
        headline.push(page);
}
// Create a button for use with each Page object.
function addButton(count){
         jQuery('#allcc').append(' <div class ="campaign-cycle" id = "cc'+count+'" onclick=setShift("'+count+'")></div> '); 
}

// Calls another function to reset the timer and orders the Queue. This function is called when the user selects a Page by clicking its respective button.
function setShift(c){  
  resetErval();
  c = parseInt(c);
  for(var i = timerQueue.length-1;i < timerQueue.length;i++){
      if(timerQueue[0]==c){var q = timerQueue.shift();
      timerQueue.push(q);}
  }
  change(c);
}

// Alters the color of buttons to signify which is selected.
function change(c){
  jQuery('.campaign-cycle').css("background-color","rgb(0,125,200)");
  jQuery('#cc' + c).css("background-color","rgb(0,170,220)");
  changeHeadline(c);
}
// Changes the display information, fades out the featured image, fades it back in with a new image.
function changeHeadline(c){
  jQuery('#featuredh').html('<a href ="'+ headline[c].url+'">'+ headline[c].name +'</a>');
  jQuery('#featuredp').html(headline[c].desc);
  jQuery('.feature-pic a').attr('href',headline[c].url);
  jQuery('.feature-pic img').fadeOut('slow',function(){jQuery(this).attr('src',headline[c].img); jQuery(this).fadeIn('slow');});
}
